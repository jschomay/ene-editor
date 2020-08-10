window.ENE = window.ENE || {};
window.ENE.Editor = {
  init: user => {
    // hook up Elm Sytax validator
    var syntaxValidator = Elm.Main.init({
      node: document.createElement("div")
    });
    syntaxValidator.ports.reportErrors.subscribe(function([ref, errors]) {
      let [tableId, rowId, field] = ref.split("|");
      let table = tableId === "rules" ? rulesTable : entitiesTable;
      let targetCell = table
        .getRow(rowId)
        .getCell(field)
        .getElement();
      let errorEl = document.createElement("a");
      errorEl.className = "badge badge-danger text-white d-block float-right";
      errorEl.title = errors;
      errorEl.href = "javascript:void(0)";
      errorEl.innerHTML = "Parse errors!";
      targetCell.appendChild(errorEl);
    });

    const saveIndicatorEL = document.querySelector("#save-indicator");
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
      editor.style.height = "100%";
      editor.style.boxSizing = "border-box";

      //Set value of editor to the current value of the cell
      editor.value = cell.getValue() || "";

      //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
      onRendered(function() {
        ENE.Completion.addAutocomplete(editor, isRule);
        editor.style.height = "100%";
        if (isRule) {
          editor.style.minHeight = "7em";
          cell.getRow().normalizeHeight();
        }
        editor.focus();
      });

      function validate(value) {
        const validator = isRule
          ? syntaxValidator.ports.validateRuleRequests.send
          : syntaxValidator.ports.validateEntityRequests.send;

        let table = isRule ? "rules" : "manifest";
        let id =
          table +
          "|" +
          cell.getRow().getIndex() +
          "|" +
          cell.getColumn().getField();
        window.setTimeout(() => validator([id, value]), 0);
      }

      function successFunc() {
        validate(editor.value);
        success(editor.value);
        cell.getRow().normalizeHeight();
      }

      function cancelFunc() {
        validate(cell.getValue());
        cancel();
      }

      editor.addEventListener("blur", successFunc);
      editor.addEventListener("keydown", e => {
        // esc
        if (e.keyCode === 27) cancelFunc();
        // shift + enter
        if (e.keyCode === 13 && e.shiftKey) successFunc(editor.value);
        // shift + tab
        if (e.keyCode === 9 && e.shiftKey) cell.nav().left();
      });

      //return the editor element
      return editor;
    };

    var textAreaEditor = (cell, onRendered, success, cancel, editorParams) => {
      //cell - the cell component for the editable cell
      //onRendered - function to call when the editor has been rendered
      //success - function to call to pass the successfuly updated value to Tabulator
      //cancel - function to call to abort the edit and return to a normal cell
      //editorParams - params object passed into the editorParams column definition property

      //create and style editor
      var editor = document.createElement("textarea");

      //create and style input
      editor.style.padding = "3px";
      editor.style.width = "100%";
      editor.style.height = "100%";
      editor.style.boxSizing = "border-box";

      //Set value of editor to the current value of the cell
      editor.value = cell.getValue() || "";

      //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
      onRendered(function() {
        editor.style.height = "100%";
        editor.style.minHeight = "7em";
        cell.getRow().normalizeHeight();
        editor.focus();
      });

      //when the value has been set, trigger the cell to update
      function successFunc() {
        success(editor.value);
        cell.getRow().normalizeHeight();
      }

      editor.addEventListener("blur", successFunc);
      editor.addEventListener("keydown", e => {
        // esc
        if (e.keyCode === 27) cancel();
        // shift+enter
        if (e.keyCode === 13 && e.shiftKey) successFunc(editor.value);
        // shift + tab
        if (e.keyCode === 9 && e.shiftKey) cell.nav().left();
      });

      //return the editor element
      return editor;
    };

    const showSaving = () => {
      saveIndicatorEL.classList.add("show", "text-warning");
      saveIndicatorEL.innerHTML = "Saving...";
    };

    const showSaved = () => {
      saveIndicatorEL.classList.remove("text-warning");
      saveIndicatorEL.classList.add("text-info");
      saveIndicatorEL.innerHTML = "Saved";
      window.setTimeout(
        () => saveIndicatorEL.classList.remove("show", "text-info"),
        1000
      );
    };

    const onCellEdited = ref => cell => {
      showSaving();
      ref
        .doc(cell.getData().id)
        .update({ [cell.getField()]: cell.getValue() })
        .then(showSaved)
        .catch(e => console.error(e));
    };

    const onRowDelete = ref => (e, cell) => {
      if (confirm("Are you sure you want to delete this entity?")) {
        showSaving();
        cell.getRow().delete();
        ref
          .doc(cell.getData().id)
          .delete()
          .then(showSaved)
          .catch(e => console.error(e));
      }
    };

    const onRowAdd = (ref, table) => () => {
      showSaving();
      let createdAt = new Date().getTime();
      let entityRef = ref.doc();
      entityRef
        .set({ createdAt })
        .then(showSaved)
        .catch(e => console.error(e));

      table
        .addRow({ id: entityRef.id, createdAt })
        .then(row => {
          table.scrollToRow(row).then(() => row.getCells()[0].edit());
        })
        .catch(e => console.error(e));
    };

    // --- Tables ---

    var entitiesTable = new Tabulator("#manifest-table", {
      cellEdited: onCellEdited(manifestRef),
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
            if (cell.getOldValue() !== cell.getValue()) {
              window.ENE.Completion.removeEntity(cell.getOldValue());
              window.ENE.Completion.parseEntity(cell.getValue());
            }
          }
        },
        { title: "Name", field: "name", editor: true },
        {
          title: "Description",
          field: "description",
          editor: textAreaEditor,
          variableHeight: true,
          formatter: "textarea",
          width: "40%"
        },
        {
          formatter: "buttonCross",
          width: 10,
          align: "center",
          cellClick: (e, cell) => {
            window.ENE.Completion.removeEntity(
              cell
                .getRow()
                .getCell("entity")
                .getValue()
            );
            onRowDelete(manifestRef)(e, cell);
          }
        }
      ]
    });

    var rulesTable = new Tabulator("#rules-table", {
      cellEdited: onCellEdited(rulesRef),
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
          variableHeight: true,
          headerFilter: "input",
          cellEdited: cell => {
            if (cell.getOldValue() !== cell.getValue())
              window.ENE.Completion.parseRule(cell.getValue());
          }
        },
        {
          title: "Narrative",
          field: "narrative",
          editor: textAreaEditor,
          formatter: "textarea",
          variableHeight: true
        },
        {
          formatter: "buttonCross",
          width: "10px",
          align: "center",
          cellClick: onRowDelete(rulesRef)
        }
      ]
    });

    $("#add-row-entities").click(onRowAdd(manifestRef, entitiesTable));
    $("#add-row-rules").click(onRowAdd(rulesRef, rulesTable));

    window.addEventListener(
      "resize",
      () => entitiesTable.redraw(true) && rulesTable.redraw(true)
    );

    return { entitiesTable, rulesTable };
  }
};
