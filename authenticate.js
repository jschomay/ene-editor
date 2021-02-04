firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in, set up profile
    let userProfileEL = document.querySelector("#user-profile");
    if (userProfileEL) {
      let gravatar =
        "https://www.gravatar.com/avatar/" +
        md5(user.email.trim().toLowerCase()) +
        "?d=retro";

      userProfileEL.classList.remove("d-none");
      let img = userProfileEL.querySelector("img");
      img.src = gravatar;
      img.alt = "Signed in as " + user.displayName;
      img.title = "Signed in as " + user.displayName;
      let signOut = userProfileEL.querySelector("#sign-out");
      signOut.addEventListener("click", () => {
        window.signingOut = true;
        firebase
          .auth()
          .signOut()
          .then(
            () =>
              (window.location.href = location.href.slice(
                0,
                location.href.lastIndexOf("/") + 1
              ))
          );
      });
    }

    window.onAuth && window.onAuth(user);
  } else {
    window.onNoAuth
      ? window.onNoAuth()
      : (window.location.href = location.href.slice(
          0,
          location.href.lastIndexOf("/") + 1
        ));
  }
});
