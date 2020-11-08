window.ENE = window.ENE || {};
window.ENE.Completion = (() => {
  var entities = new Set();
  var properties = new Set();

  function parseEntity(entity) {
    var [e, ...props] = entity.replace(/\(.+?\)/g, "").split(".");
    entities.add(e);
    props.forEach((p) => properties.add(p.replace(/=.+$/, "")));
  }

  function removeEntity(entity) {
    var [e, ...props] = entity.replace(/\(.+?\)/g, "").split(".");
    entities.delete(e);
  }

  function parseRule(rule) {
    var doClause = rule.split("DO:")[1];
    if (!doClause) return;
    [
      ...doClause.replace(/\(.+?\)/g, "").matchAll(/\.-?([a-z0-9_-]+)/g)
    ].forEach(([_fullMatch, p]) => properties.add(p.replace(/=.+$/, "")));
  }

  function addAutocomplete(el, isRule) {
    // start of line or "=" or "=(" or "=(link " or rule, followed by ID
    // text to replace must be in capture group 2 and pattern must end in "$"
    // manifest must start with entity, rule has whitespace before it
    var manifestPattern = /(^|[a-z0-9]+=(?:\((?:link\s)?)?)([A-Z0-9\-\_]+)$/;
    var rulePattern = /(\s*|[a-z0-9]+=(?:\((?:link\s)?)?)([A-Z0-9\-\_]+)$/;
    var entityStrategy = {
      id: "entity",
      match: isRule ? rulePattern : manifestPattern,
      search: function (term, callback) {
        callback(
          [...entities].filter(function (name) {
            return name.startsWith(term);
          })
        );
      },
      template: function (name) {
        return name;
      },
      replace: function (name) {
        return "$1" + name;
      }
    };

    var propertyStrategy = {
      id: "entity",
      // ? or * or ID followed by . and maybe followed by -, then the property
      // the entire first part including the . and maybe - is preserved
      // matched property must be group 2, hence the uncaptured group
      // note that this will match - in entity defs and ON: lines, which isn't
      // accurate, but for now not worth complicating
      match: /((?:\$|\*|[A-Za-z0-9]+)\.-?)([a-z0-9_-]+)$/,
      search: function (term, callback) {
        callback(
          [...properties].filter(function (name) {
            return name.startsWith(term);
          })
        );
      },
      template: function (name) {
        return name;
      },
      replace: function (name) {
        return "$1" + name;
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
    textcomplete.on("rendered", function () {
      textcomplete.dropdown.items[0].activate();
    });
    el.addEventListener("blur", () => textcomplete.destroy());

    return textcomplete;
  }
  return { addAutocomplete, removeEntity, parseEntity, parseRule };
})();
