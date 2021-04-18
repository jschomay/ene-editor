// This script can be included in custom games to enable live game data updates.
// This file encapsulates all firebase concerns.

const fetchFirebase = new Promise((resolve, reject) => {
  const script = document.createElement("script");
  document.body.appendChild(script);
  script.onload = resolve;
  script.onerror = reject;
  script.async = true;
  script.src = "https://www.gstatic.com/firebasejs/7.15.0/firebase.js";
});

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDQfqo0Lt4spcyNcW_lzLOSgrFmgZm1PNw",
  authDomain: "ene-editor.firebaseapp.com",
  databaseURL: "https://ene-editor.firebaseio.com",
  projectId: "ene-editor",
  storageBucket: "ene-editor.appspot.com",
  messagingSenderId: "842435219703",
  appId: "1:842435219703:web:a2027ebb0f0fd052a003f2",
  measurementId: "G-66NEJ8LKGJ"
};

// Given a project id, this will connect to that project via firebase and call the
// provided callbacks when any new entity or rule data arrives.
// This requires the project to allow public reads, as it does not authenticate.
function connectLiveGameData(projectId, onEntitiesData, onRulesData) {
  fetchFirebase.then(() => {
    // Initialize Firebase (global var comes from firebase.js)
    firebase.initializeApp(firebaseConfig);
    const projectRef = firebase
      .firestore()
      .collection("projects")
      .doc(projectId);

    const manifestRef = projectRef.collection("manifest");
    const rulesRef = projectRef.collection("rules");

    // fetch and import manifest data
    manifestRef.onSnapshot(
      (snapshot) => {
        // TODO check if change type is "remove" and respond accordingly
        // for now this just sends any new/changed docs
        onEntitiesData(
          snapshot
            .docChanges()
            .map((c) => c.doc.data())
            .filter(({ entity }) => !!entity)
        );
      },
      (e) => {
        if (e.code === "permission-denied") {
          alert(
            "Permission denined when fetching game data, make sure you called connectLiveGameData with the correct project id, and that you enabled public reads in your project"
          );
        }
        console.error(e);
      }
    );

    // fetch and import rules data
    rulesRef.onSnapshot(
      (snapshot) => {
        // TODO check if change type is "remove" and respond accordingly
        // for now this just sends any new/changed docs
        onRulesData(
          snapshot
            .docChanges()
            .map((c) => c.doc.data())
            .filter(({ rule_id }) => !!rule_id)
        );
      },
      (e) => console.error(e)
    );
  });
}
