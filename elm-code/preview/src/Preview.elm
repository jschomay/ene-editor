port module Preview exposing (main)

import Browser
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Markdown
import NarrativeEngine.Core.Rules as Rules
import NarrativeEngine.Core.WorldModel as WorldModel
import NarrativeEngine.Debug
import NarrativeEngine.Syntax.EntityParser as EntityParser
import NarrativeEngine.Syntax.Helpers as SyntaxHelpers
import NarrativeEngine.Syntax.NarrativeParser as NarrativeParser
import NarrativeEngine.Syntax.RuleParser as RuleParser


type alias EntityFields =
    NamedComponent {}


type alias NamedComponent a =
    { a
        | name : String
        , description : String
    }


type alias MyEntity =
    WorldModel.NarrativeComponent EntityFields


type alias MyWorldModel =
    Dict WorldModel.ID MyEntity


toEntity : String -> String -> String -> ( String, EntityFields )
toEntity entityString name description =
    ( entityString, { name = name, description = description } )


type alias RuleFields =
    NarrativeComponent {}


type alias NarrativeComponent a =
    { a | narrative : String }


type alias MyRule =
    Rules.Rule RuleFields


type alias MyRules =
    Dict String MyRule


type alias RulesSpec =
    Dict Rules.RuleID ( String, {} )


type alias Model =
    { parseErrors : Maybe SyntaxHelpers.ParseErrors
    , worldModel : MyWorldModel
    , rules : MyRules
    , started : Bool
    , story : String
    , ruleCounts : Dict String Int
    , debug : NarrativeEngine.Debug.State
    }


initialModel : ( Model, Cmd Msg )
initialModel =
    ( { parseErrors = Nothing
      , worldModel = Dict.empty
      , rules = Dict.empty
      , started = False
      , story = ""
      , ruleCounts = Dict.empty
      , debug = NarrativeEngine.Debug.init
      }
    , Cmd.none
    )


getDescription : NarrativeParser.Config MyEntity -> WorldModel.ID -> MyWorldModel -> String
getDescription config entityID worldModel_ =
    Dict.get entityID worldModel_
        |> Maybe.map .description
        |> Maybe.withDefault ("ERROR can't find entity " ++ entityID)
        |> NarrativeParser.parse config
        |> List.head
        |> Maybe.withDefault ("ERROR parsing narrative content for " ++ entityID)


getName : WorldModel.ID -> MyWorldModel -> String
getName entityID worldModel_ =
    Dict.get entityID worldModel_
        |> Maybe.map .name
        |> Maybe.withDefault ("ERROR can't find entity " ++ entityID)


makeConfig : WorldModel.ID -> Rules.RuleID -> Dict String Int -> MyWorldModel -> NarrativeParser.Config MyEntity
makeConfig trigger matchedRule ruleCounts worldModel =
    { cycleIndex = Dict.get matchedRule ruleCounts |> Maybe.withDefault 0
    , propKeywords = Dict.singleton "name" (\id -> Ok <| getName id worldModel)
    , worldModel = worldModel
    , trigger = trigger
    }


type alias ParsedEntity =
    Result SyntaxHelpers.ParseErrors ( WorldModel.ID, MyEntity )


type Msg
    = InteractWith WorldModel.ID
    | UpdateDebugSearchText String
    | AddEntities (EntityParser.ParsedWorldModel EntityFields)
    | AddRules (RuleParser.ParsedRules RuleFields)


type alias EntitySpec =
    { description : String, entity : String, name : String }


type alias RuleSpec =
    { rule : String, rule_id : String, narrative : String }


port addEntities : (List EntitySpec -> msg) -> Sub msg


port addRules : (List RuleSpec -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ addEntities <| AddEntities << parseEntities
        , addRules <| AddRules << parseRules
        ]


parseEntities : List EntitySpec -> EntityParser.ParsedWorldModel EntityFields
parseEntities entities =
    let
        addExtraEntityFields { description, name } { tags, stats, links } =
            { tags = tags
            , stats = stats
            , links = links
            , name = name
            , description = description
            }

        parsedEntities =
            entities
                |> List.map (\{ entity, description, name } -> ( entity, { description = description, name = name } ))
                |> EntityParser.parseMany addExtraEntityFields

        parsedDescriptions =
            entities
                |> List.map (\{ entity, description } -> ( entity, description ))
                |> Dict.fromList
                |> NarrativeParser.parseMany
    in
    parsedDescriptions |> Result.andThen (always parsedEntities)


parseRules : List RuleSpec -> RuleParser.ParsedRules RuleFields
parseRules rules =
    let
        addExtraEntityFields { narrative } { changes, conditions, trigger } =
            { trigger = trigger
            , conditions = conditions
            , changes = changes
            , narrative = narrative
            }

        parsedRules =
            rules
                |> List.map (\{ rule_id, rule, narrative } -> ( rule_id, ( rule, { narrative = narrative } ) ))
                |> Dict.fromList
                |> RuleParser.parseRules addExtraEntityFields

        parsedNarratives =
            rules
                |> List.map (\{ rule_id, narrative } -> ( rule_id, narrative ))
                |> Dict.fromList
                |> NarrativeParser.parseMany
    in
    parsedNarratives |> Result.andThen (always parsedRules)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        InteractWith trigger ->
            -- we need to check if any rule matched
            case Rules.findMatchingRule trigger model.rules model.worldModel of
                Just ( matchedRuleID, { changes, narrative } ) ->
                    ( { model
                        | worldModel = WorldModel.applyChanges changes trigger model.worldModel
                        , story =
                            narrative
                                |> NarrativeParser.parse (makeConfig trigger matchedRuleID model.ruleCounts model.worldModel)
                                |> String.join "\n\n"
                        , ruleCounts = Dict.update matchedRuleID (Maybe.map ((+) 1) >> Maybe.withDefault 1 >> Just) model.ruleCounts
                        , debug =
                            model.debug
                                |> NarrativeEngine.Debug.setLastMatchedRuleId matchedRuleID
                                |> NarrativeEngine.Debug.setLastInteractionId trigger
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( { model
                        | story = getDescription (makeConfig trigger trigger model.ruleCounts model.worldModel) trigger model.worldModel
                        , ruleCounts = Dict.update trigger (Maybe.map ((+) 1) >> Maybe.withDefault 1 >> Just) model.ruleCounts
                        , debug =
                            model.debug
                                |> NarrativeEngine.Debug.setLastMatchedRuleId trigger
                                |> NarrativeEngine.Debug.setLastInteractionId trigger
                      }
                    , Cmd.none
                    )

        UpdateDebugSearchText searchText ->
            ( { model | debug = NarrativeEngine.Debug.updateSearch searchText model.debug }, Cmd.none )

        AddEntities parsedEntities ->
            case parsedEntities of
                Err errors ->
                    ( { model | parseErrors = Just errors }, Cmd.none )

                Ok newEntities ->
                    ( { model | parseErrors = Nothing, worldModel = Dict.union newEntities model.worldModel }, Cmd.none )

        AddRules parsedRules ->
            case parsedRules of
                Err errors ->
                    ( { model | parseErrors = Just errors }, Cmd.none )

                Ok newRules ->
                    { model | parseErrors = Nothing, rules = Dict.union newRules model.rules }
                        |> (\m ->
                                if m.started then
                                    ( m, Cmd.none )

                                else
                                    update (InteractWith "start") { m | started = True }
                           )


query : String -> MyWorldModel -> List ( WorldModel.ID, MyEntity )
query q worldModel =
    RuleParser.parseMatcher q
        |> Result.map (\parsedMatcher -> WorldModel.query parsedMatcher worldModel)
        |> Result.withDefault []


assert : String -> MyWorldModel -> Bool
assert q worldModel =
    not <| List.isEmpty <| query q worldModel


view : Model -> Html Msg
view model =
    let
        currentLocation =
            WorldModel.getLink "PLAYER" "current_location" model.worldModel

        inventory =
            query "*.item.current_location=PLAYER" model.worldModel

        locations =
            query "*.location" model.worldModel
                |> List.filter (\( locationID, _ ) -> Just locationID /= currentLocation)

        items =
            query "*.item.current_location=(link PLAYER.current_location)" model.worldModel

        characters =
            query "*.character.current_location=(link PLAYER.current_location)" model.worldModel

        section heading entities =
            span []
                [ b [] [ text heading ]
                , ul [] entities
                ]

        ifNotEmpty l v =
            if List.isEmpty l then
                text ""

            else
                v l
    in
    div [ style "width" "90%", style "margin" "auto" ] <|
        [ NarrativeEngine.Debug.debugBar UpdateDebugSearchText model.worldModel model.debug
        , div [ style "display" "flex" ]
            [ div [ style "flex" "1 0 auto" ]
                [ currentLocation
                    |> Maybe.map
                        (\l ->
                            section "Current location" <| [ entityView ( l, { name = getName l model.worldModel } ) ]
                        )
                    |> Maybe.withDefault (text "")
                , ifNotEmpty locations (section "Other locations" << List.map entityView)
                , ifNotEmpty items (section "Nearby items" << List.map entityView)
                , ifNotEmpty characters (section "Nearby characters" << List.map entityView)
                , ifNotEmpty inventory (section "Inventory" << List.map entityView)
                ]
            , div [ style "flex" "1 0 50%", style "padding" "0 5em" ]
                [ Markdown.toHtml [] model.story ]
            ]
        ]


entityView : ( WorldModel.ID, { a | name : String } ) -> Html Msg
entityView ( id, { name } ) =
    li [ onClick <| InteractWith id, style "cursor" "pointer" ] [ text name ]


main : Program () Model Msg
main =
    Browser.element
        { init = \f -> initialModel
        , view =
            \model ->
                case model.parseErrors of
                    Just errors ->
                        SyntaxHelpers.parseErrorsView errors

                    Nothing ->
                        view model
        , update = update
        , subscriptions = subscriptions
        }
