module Preview exposing (main)

import Browser
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import NarrativeEngine.Core.Rules as Rules
import NarrativeEngine.Core.WorldModel as WorldModel
import NarrativeEngine.Debug
import NarrativeEngine.Syntax.EntityParser as EntityParser
import NarrativeEngine.Syntax.Helpers as SyntaxHelpers
import NarrativeEngine.Syntax.NarrativeParser as NarrativeParser
import NarrativeEngine.Syntax.RuleParser as RuleParser


type alias ExtraFields =
    NamedComponent {}


type alias NamedComponent a =
    { a
        | name : String
        , description : String
    }


type alias MyEntity =
    WorldModel.NarrativeComponent ExtraFields


type alias MyWorldModel =
    Dict WorldModel.ID MyEntity


entity : String -> String -> String -> ( String, ExtraFields )
entity entityString name description =
    ( entityString, { name = name, description = description } )


type alias MyRule =
    Rules.Rule {}


type alias MyRules =
    Dict String MyRule


type alias RulesSpec =
    Dict Rules.RuleID ( String, {} )


type alias Content =
    Dict String String


type Errors
    = Error SyntaxHelpers.ParseErrors
    | Loading


type alias Model =
    { worldModel : Result Errors MyWorldModel
    , rules : Result Errors MyRules
    , content : Result Errors Content
    , story : String
    , ruleCounts : Dict String Int
    , debug : NarrativeEngine.Debug.State
    }


initialModel : Model
initialModel =
    { worldModel = Err Loading
    , rules = Err Loading
    , content = Err Loading
    , story = ""
    , ruleCounts = Dict.empty
    , debug = NarrativeEngine.Debug.init
    }


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


type Msg
    = InteractWith WorldModel.ID
    | UpdateDebugSearchText String


update : Msg -> Model -> Model
update msg ({ worldModel, rules, content } as model) =
    Result.map3 (\a b c -> update_ a b c msg model)
        worldModel
        rules
        content
        |> Result.withDefault model


update_ : MyWorldModel -> MyRules -> Content -> Msg -> Model -> Model
update_ worldModel rules content msg model =
    -- this gets passed through the check for any parse errors to make the code simpler
    -- if you need to save back one of parsed fields, wrap in `Ok`
    case msg of
        InteractWith trigger ->
            -- we need to check if any rule matched
            case Rules.findMatchingRule trigger rules worldModel of
                Just ( matchedRuleID, { changes } ) ->
                    { model
                        | worldModel = Ok <| WorldModel.applyChanges changes trigger worldModel
                        , story =
                            Dict.get matchedRuleID content
                                |> Maybe.withDefault ("ERROR finding narrative content for " ++ matchedRuleID)
                                |> NarrativeParser.parse (makeConfig trigger matchedRuleID model.ruleCounts worldModel)
                                |> List.head
                                |> Maybe.withDefault ("ERROR parsing narrative content for " ++ matchedRuleID)
                        , ruleCounts = Dict.update matchedRuleID (Maybe.map ((+) 1) >> Maybe.withDefault 1 >> Just) model.ruleCounts
                        , debug =
                            model.debug
                                |> NarrativeEngine.Debug.setLastMatchedRuleId matchedRuleID
                                |> NarrativeEngine.Debug.setLastInteractionId trigger
                    }

                Nothing ->
                    { model
                        | story = getDescription (makeConfig trigger trigger model.ruleCounts worldModel) trigger worldModel
                        , ruleCounts = Dict.update trigger (Maybe.map ((+) 1) >> Maybe.withDefault 1 >> Just) model.ruleCounts
                        , debug =
                            model.debug
                                |> NarrativeEngine.Debug.setLastMatchedRuleId trigger
                                |> NarrativeEngine.Debug.setLastInteractionId trigger
                    }

        UpdateDebugSearchText searchText ->
            { model | debug = NarrativeEngine.Debug.updateSearch searchText model.debug }


query : String -> MyWorldModel -> List ( WorldModel.ID, MyEntity )
query q worldModel =
    RuleParser.parseMatcher q
        |> Result.map (\parsedMatcher -> WorldModel.query parsedMatcher worldModel)
        |> Result.withDefault []


assert : String -> MyWorldModel -> Bool
assert q worldModel =
    not <| List.isEmpty <| query q worldModel


view : Model -> Html Msg
view ({ worldModel, rules, content } as model) =
    let
        res =
            Result.map3 (\a b c -> view_ a b c model)
                worldModel
                rules
                content
    in
    case res of
        Ok rendered ->
            rendered

        Err (Error e) ->
            SyntaxHelpers.parseErrorsView e

        Err Loading ->
            text "LOADING"


view_ : MyWorldModel -> MyRules -> Content -> Model -> Html Msg
view_ worldModel rules content model =
    let
        -- we can get links and stats directly
        currentLocation =
            WorldModel.getLink "PLAYER" "current_location" worldModel
                |> Maybe.withDefault "ERROR getting current location"

        fearLevel =
            WorldModel.getStat "PLAYER" "fear" worldModel
                |> Maybe.map String.fromInt
                |> Maybe.withDefault "ERROR can't find PLAYER's fear stat"

        -- we can query the world model as needed
        inventory =
            query "*.item.current_location=PLAYER" worldModel

        locations =
            query "*.location" worldModel
                |> List.filter (\( locationID, _ ) -> locationID /= currentLocation)

        -- The next two use an advanced syntax to look up the player's current
        -- location
        items =
            query "*.item.current_location=(link PLAYER.current_location)" worldModel

        characters =
            query "*.character.current_location=(link PLAYER.current_location)" worldModel
    in
    div [ style "width" "70%", style "margin" "auto" ]
        [ NarrativeEngine.Debug.debugBar UpdateDebugSearchText worldModel model.debug
        , h1 [] [ text <| "You are currently located in the " ++ getName currentLocation worldModel ]
        , h2 [] [ text <| getDescription (makeConfig currentLocation currentLocation model.ruleCounts worldModel) currentLocation worldModel ]
        , h3 [] [ text <| "Fear level: " ++ fearLevel ]
        , div [ style "display" "flex" ]
            [ div [ style "flex" "0 0 auto" ]
                [ h3 [] [ text "You have:" ]
                , ul [] <| List.map entityView inventory
                , h3 [] [ text "You see the following items:" ]
                , ul [] <| List.map entityView items
                , h3 [] [ text "You see the following characters:" ]
                , ul [] <| List.map entityView characters
                , h3 [] [ text "Places near by:" ]
                , ul [] <| List.map entityView locations
                ]
            , div [ style "flex" "1 1 auto", style "font-size" "2em", style "padding" "0 2em" ]
                [ em [] [ text model.story ]
                ]
            ]
        ]


entityView : ( WorldModel.ID, MyEntity ) -> Html Msg
entityView ( id, { name } ) =
    li [ onClick <| InteractWith id, style "cursor" "pointer" ] [ text name ]



-- loadWorldModel =
--     let
--         addExtraEntityFields { name, description } { tags, stats, links } =
--             { tags = tags
--             , stats = stats
--             , links = links
--             , name = name
--             , description = description
--             }
--     in
--     EntityParser.parseMany addExtraEntityFields
--         initialWorldModelSpec
--         (NarrativeParser.parseMany narrative_content)
-- loadRules =
--     let
--         addExtraRuleFields extraFields rule =
--             -- no extra fields, so this is just a pass-through
--             rule
--                 (RuleParser.parseRules addExtraRuleFields rulesSpec)
--                 (NarrativeParser.parseMany narrative_content)
--     in
--     True


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
