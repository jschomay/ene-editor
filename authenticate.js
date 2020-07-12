firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // TODO load profile
    window.onAuth && window.onAuth(user);
  } else {
    window.location.href = window.location.origin + "/sign-in.html";
  }
});
