firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    window.onAuth && window.onAuth(user);
    if (user.isAnonymous) return;

    // Non-anonymous user is signed in, set up profile
    let userProfileEL = document.querySelector("#user-profile");
    if (userProfileEL) {
      let gravatar =
        "https://www.gravatar.com/avatar/" +
        md5(user.email.trim().toLowerCase()) +
        "?d=retro";

      userProfileEL.classList.remove("d-none");
      let img = userProfileEL.querySelector("img");
      img.src = gravatar;
      img.alt = "Signed in as " + user.email;
      img.title = "Signed in as " + user.email;
      let signOut = userProfileEL.querySelector("#sign-out");
      signOut.addEventListener("click", () => {
        window.signingOut = true;
        firebase
          .auth()
          .signOut()
          .then(
            () =>
              (window.location.href =
                location.href.slice(0, location.href.lastIndexOf("/") + 1) +
                "index.html")
          );
      });
    }
  } else {
    window.onNoAuth
      ? window.onNoAuth()
      : (window.location.href =
          location.href.slice(0, location.href.lastIndexOf("/") + 1) +
          "index.html");
  }
});
