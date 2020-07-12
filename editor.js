window.ENE = window.ENE || {};
window.ENE.Editor = {
  init: user => {
    const searchParams = new URLSearchParams(window.location.search);
    const projectId = searchParams.get("id");

    const projectRef = firebase
      .firestore()
      .collection("projects")
      .doc(projectId);
    const manifestRef = projectRef.collection("manifest");
    const rulesRef = projectRef.collection("rules");

    // fetch project data
    projectRef
      .get()
      .then(doc => {
        let name = doc.data().name;
        $("#project-title").text(`Editing "${name}"`);
        document.title += ` - editing "${name}"`;
      })
      .catch(e => {
        console.error(e);
        window.location.href = window.location.origin + "/projects.html";
      });

    // fetch and import manifest data
    manifestRef
      .orderBy("createdAt")
      .get()
      .then(docs => {
        // entitiesTable will be defined by the time the promise returns
        docs.forEach(doc => {
          doc.data().entity &&
            window.ENE.Completion.parseEntity(doc.data().entity);
          entitiesTable.addRow({ ...doc.data(), id: doc.id });
        });
      })
      .catch(e => console.error(e));

    // fetch and import rules data
    rulesRef
      .orderBy("createdAt")
      .get()
      .then(docs => {
        // rulesTable will be defined by the time the promise returns
        docs.forEach(doc => {
          doc.data().rule && window.ENE.Completion.parseRule(doc.data().rule);
          rulesTable.addRow({ ...doc.data(), id: doc.id });
        });
      })
      .catch(e => console.error(e));

    // --- Editor ---

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

    // --- Tables ---

    var entitiesTable = new Tabulator("#manifest-table", {
      cellEdited: cell => {
        manifestRef
          .doc(cell.getData().id)
          .update({ [cell.getField()]: cell.getValue() })
          // .then(() => console.log("Entity updated"))
          .catch(e => console.error(e));
      },
      height: "75vh", // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
      keybindings: false,
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
          cellClick: (e, cell) => {
            if (confirm("Are you sure you want to delete this entity?")) {
              cell.getRow().delete();
              manifestRef
                .doc(cell.getData().id)
                .delete()
                .catch(e => console.error(e));
            }
          }
        }
      ]
    });

    var rulesTable = new Tabulator("#rules-table", {
      cellEdited: cell => {
        rulesRef
          .doc(cell.getData().id)
          .update({ [cell.getField()]: cell.getValue() })
          // .then(() => console.log("Rule updated"))
          .catch(e => console.error(e));
      },
      height: "75vh", // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
      keybindings: false,
      layout: "fitColumns", //fit columns to width of table (optional)
      columns: [
        //Define Table Columns
        {
          title: "Rule ID",
          field: "rule_id",
          editor: true,
          headerFilter: true
        },
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
          cellClick: (e, cell) => {
            if (confirm("Are you sure you want to delete this rule?")) {
              cell.getRow().delete();
              rulesRef
                .doc(cell.getData().id)
                .delete()
                .catch(e => console.error(e));
            }
          }
        }
      ]
    });

    $("#add-row-entities").click(() => {
      let createdAt = new Date().getTime();
      let entityRef = manifestRef.doc();
      entityRef
        .set({ createdAt })
        // .then(() => console.log("New empty entity persisted"))
        .catch(e => console.error(e));

      entitiesTable
        .addRow({ id: entityRef.id, createdAt })
        .then(row =>
          entitiesTable
            .scrollToRow(row)
            .then(() => row.getCell("entity").edit())
        )
        .catch(e => console.error(e));
    });

    $("#add-row-rules").click(() => {
      let createdAt = new Date().getTime();
      let newRuleRef = rulesRef.doc();
      newRuleRef
        .set({ createdAt })
        // .then(() => console.log("New empty rule persisted"))
        .catch(e => console.error(e));

      rulesTable
        .addRow({ id: newRuleRef.id, createdAt })
        .then(row =>
          rulesTable.scrollToRow(row).then(() => row.getCell("rule_id").edit())
        )
        .catch(e => console.error(e));
    });

    window.addEventListener(
      "resize",
      () => entitiesTable.redraw(true) && rulesTable.redraw(true)
    );

    return { entitiesTable, rulesTable };
  }
};
