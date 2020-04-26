window.ENE.Completion = (() => {
  var entities = new Set();
  var properties = new Set();

  function parseEntity(entity) {
    var [e, ...props] = entity.replace(/\(.+?\)/g, "").split(".");
    entities.add(e);
    props.forEach(p => properties.add(p.replace(/=.+$/, "")));
  }

  function parseRule(rule) {
    var doClause = rule.split("DO:")[1];
    if (!doClause) return;
    [
      ...doClause.replace(/\(.+?\)/g, "").matchAll(/\.-?([a-z0-9_-]+)/g)
    ].forEach(([_fullMatch, p]) => properties.add(p.replace(/=.+$/, "")));
  }

  function addAutocomplete(el, isRule) {
    var manifestPattern = /(^|[a-z0-9]+=(?:\((?:link\s)?)?)([A-Z0-9\-\_]+)$/;
    var rulePattern = /(\s*|[a-z0-9]+=(?:\((?:link\s)?)?)([A-Z0-9\-\_]+)$/;
    var entityStrategy = {
      id: "entity",
      // start of line or "=" or "=(" or "=(link " or rule, followed by ID
      // text to replace must be in capture group 2 and pattern must end in "$"
      match: isRule ? rulePattern : manifestPattern,
      search: function(term, callback) {
        callback(
          [...entities].filter(function(name) {
            return name.startsWith(term);
          })
        );
      },
      template: function(name) {
        return name;
      },
      replace: function(name) {
        return "$1" + name;
      }
    };

    var propertyStrategy = {
      id: "entity",
      match: /(\$|\*|[A-Za-z0-9]+)\.([a-z0-9_-]+)$/,
      search: function(term, callback) {
        callback(
          [...properties].filter(function(name) {
            return name.startsWith(term);
          })
        );
      },
      template: function(name) {
        return name;
      },
      replace: function(name) {
        return "$1." + name;
      }
    };

    var editor = new Textcomplete.editors.Textarea(el);

    var textcomplete = new Textcomplete(editor, {
      dropdown: {
        maxCount: 4,
        placement: "top"
      }
    });
    textcomplete.register([entityStrategy, propertyStrategy]);
    textcomplete.on("rendered", function() {
      textcomplete.dropdown.items[0].activate();
    });
    el.addEventListener("blur", () => textcomplete.destroy());
  }
  return { addAutocomplete, parseEntity, parseRule };
})();
