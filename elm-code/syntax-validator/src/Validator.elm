port module Validator exposing
    ( Model
    , Msg(..)
    , init
    , main
    , reportErrors
    , subscriptions
    , update
    , validateEntityRequests
    , validateRuleRequests
    , view
    )

import Browser
import Html exposing (..)
import NarrativeEngine.Syntax.EntityParser exposing (parseEntity)
import NarrativeEngine.Syntax.RuleParser exposing (parseRule)



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- PORTS


port reportErrors : ( String, String ) -> Cmd msg


port validateEntityRequests : (( String, String ) -> msg) -> Sub msg


port validateRuleRequests : (( String, String ) -> msg) -> Sub msg



-- MODEL


type alias Model =
    String


init : () -> ( Model, Cmd Msg )
init flags =
    ( "Hi"
    , Cmd.none
    )



-- UPDATE


type Msg
    = ValidateEntity ( String, String )
    | ValidateRule ( String, String )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ValidateEntity ( el, string ) ->
            ( model
            , case parseEntity (always identity) ( string, {} ) of
                Ok _ ->
                    Cmd.none

                Err errors ->
                    reportErrors ( el, errors )
            )

        ValidateRule ( el, string ) ->
            ( model
            , case parseRule (always identity) ( string, {} ) of
                Ok _ ->
                    Cmd.none

                Err errors ->
                    reportErrors ( el, errors )
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ validateEntityRequests ValidateEntity
        , validateRuleRequests ValidateRule
        ]



-- VIEW


view : Model -> Html Msg
view model =
    text "no view needed"
