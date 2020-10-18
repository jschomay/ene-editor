# Elm code usage

Using Elm code in html/javascript frame

## Wrapped Elm app for syntax validation via ENE

Dosn't need a view, just the logic

### Build

From the `syntax-validator` directory:

    elm make src/Validator.elm --output=../syntax-validator.js --optimize

### Usage

Include the `elm-code/syntax-vaildator.js` script, then

    // hook up Elm Sytax validator
    var syntaxValidator = Elm.Validator.init({
      node: document.createElement("div")
    });
    syntaxValidator.ports.reportErrors.subscribe(function([el, errors]) {
      // TODO put errors in the right cell (clear errors on edit)
      console.log("from validator:", el, errors);
    });

    syntaxValidator.ports.validateEntityRequests.send([
      "#my-element",
      "ENTITITY.tag-.stat=3.link=OTHER"
    ]);

## Preview Elm app

"Normal" elm ap

### Build

From the `preview` directory:

    elm make src/Preview.elm --output=../preview-elm.js --optimize

### Usage

Include the `elm-code/preview-elm.js` script, then

    var previewApp = Elm.Preview.init({
      node: document.querySelector("#game")
    });

    // TODO show how to load manifest/rules on load and on change
