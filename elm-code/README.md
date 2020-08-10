# Wrapped Elm app for syntax validation via ENE

## Build

    elm make src/main.elm --output=syntax-validator.js --optimize

## Usage

    // hook up Elm Sytax validator
    var syntaxValidator = Elm.Main.init({
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

