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
    var app = Elm.Preview.init({
      node: document.getElementById("game")
    });
  }
};
