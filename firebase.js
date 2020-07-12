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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Analytics
// firebase.analytics();
//
let statusEl = document.querySelector("#cloud-status");
if (statusEl) {
  statusEl.classList.remove("text-warning");
  statusEl.classList.add("text-success");
  statusEl.textContent =
    "Connected to cloud - " + firebase.app().options.projectId;
}
