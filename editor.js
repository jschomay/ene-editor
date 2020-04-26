window.ENE.Editor = (() => {
  //define some sample data
  var entities = [
    { entity: "PLAYER" },
    {
      entity: "CAVE.dark",
      name: "Dark cave",
      description: "It's a dark cave"
    }
  ];

  var rules = [
    {
      id: "go_to_location",
      rule: "ON: *.location\nDO: PLAYER.location=$",
      narrative: "Let's check out {$.name}"
    }
  ];

  var makeAutocompleteEditor = isRule => (
    cell,
    onRendered,
    success,
    cancel,
    editorParams
  ) => {
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass the successfuly updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell
    //editorParams - params object passed into the editorParams column definition property

    //create and style editor
    var editor = document.createElement(isRule ? "textarea" : "input");

    //create and style input
    editor.style.padding = "3px";
    editor.style.width = "100%";
    editor.style.boxSizing = "border-box";

    //Set value of editor to the current value of the cell
    editor.value = cell.getValue() || "";

    //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
    onRendered(function() {
      ENE.Completion.addAutocomplete(editor, isRule);
      editor.focus();
    });

    //when the value has been set, trigger the cell to update
    function successFunc() {
      success(editor.value);
    }

    editor.addEventListener("change", successFunc);
    editor.addEventListener("blur", successFunc);

    //return the editor element
    return editor;
  };

  var entitiesTable = new Tabulator("#manifest-table", {
    dataLoaded: data => {
      data.forEach(({ entity }) => window.ENE.Completion.parseEntity(entity));
    },
    height: "75vh", // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    keybindings: false,
    data: entities, //assign data to table
    layout: "fitColumns", //fit columns to width of table (optional)
    columns: [
      //Define Table Columns
      {
        title: "Entity definition (ID plus tags, stats and links)",
        field: "entity",
        editor: makeAutocompleteEditor(),
        variableHeight: true,
        headerFilter: "input",
        width: "40%",
        cellEdited: cell => {
          if (cell.getOldValue() !== cell.getValue())
            window.ENE.Completion.parseEntity(cell.getValue());
        }
      },
      { title: "Name", field: "name", editor: true },
      {
        title: "Description",
        field: "description",
        editor: "textarea",
        formatter: "textarea",
        width: "40%"
      },
      {
        formatter: "buttonCross",
        width: 10,
        align: "center",
        cellClick: (e, cell) =>
          confirm("Are you sure you want to delete this row?") &&
          cell.getRow().delete()
      }
    ]
  });

  var rulesTable = new Tabulator("#rules-table", {
    dataLoaded: data => {
      data.forEach(({ rule }) => window.ENE.Completion.parseRule(rule));
    },
    height: "75vh", // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    keybindings: false,
    data: rules, //assign data to table
    layout: "fitColumns", //fit columns to width of table (optional)
    columns: [
      //Define Table Columns
      { title: "ID", field: "id", editor: true, headerFilter: true },
      {
        title: "Rule",
        field: "rule",
        editor: makeAutocompleteEditor(true),
        formatter: "textarea",
        headerFilter: "input",
        cellEdited: cell => {
          if (cell.getOldValue() !== cell.getValue())
            window.ENE.Completion.parseRule(cell.getValue());
        }
      },
      {
        title: "Narrative",
        field: "narrative",
        editor: "textarea",
        formatter: "textarea"
      },
      {
        formatter: "buttonCross",
        width: "10px",
        align: "center",
        cellClick: (e, cell) =>
          confirm("Are you sure you want to delete this row?") &&
          cell.getRow().delete()
      }
    ]
  });

  $("#add-row-entities").click(() =>
    entitiesTable.addRow().then(row => entitiesTable.scrollToRow(row))
  );

  $("#add-row-rules").click(() =>
    rulesTable.addRow().then(row => rulesTable.scrollToRow(row))
  );

  window.addEventListener(
    "resize",
    () => entitiesTable.redraw(true) && rulesTable.redraw(true)
  );

  // window.addEventListener(
  //   "resize",
  //   () => entitiesTable.redraw(true) && rulesTable.redraw(true)
  // );

  return { entitiesTable, rulesTable };
})();
