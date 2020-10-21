window.ENE = window.ENE || {};
window.ENE.Preivew = {
  init: (user) => {
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
      .then((doc) => {
        let name = doc.data().name;
        $("#project-title").text(`Preview "${name}"`);
        document.title += ` - preview "${name}"`;
      })
      .catch((e) => {
        console.error(e);
        window.location.href = window.location.origin + "/projects.html";
      });

    // start up elm app
    var app = Elm.Preview.init({
      node: document.getElementById("game")
    });

    // fetch and import manifest data
    manifestRef.onSnapshot(
      (snapshop) => {
        // TODO check if change type is "remove" and respond accordingly
        // for now this just sends any new/changed docs
        app.ports.addEntities.send(
          snapshop
            .docChanges()
            .map((c) => c.doc.data())
            .filter(({ entity }) => !!entity)
        );
      },
      (e) => console.error(e)
    );

    // fetch and import rules data
    rulesRef.onSnapshot(
      (snapshop) => {
        // TODO check if change type is "remove" and respond accordingly
        // for now this just sends any new/changed docs
        app.ports.addRules.send(
          snapshop
            .docChanges()
            .map((c) => c.doc.data())
            .filter(({ rule_id }) => !!rule_id)
        );
      },
      (e) => console.error(e)
    );
  }
};
