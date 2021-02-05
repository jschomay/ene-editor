window.ENE = window.ENE || {};
window.ENE.Projects = {
  startGuestAuthFlow: () => {
    $("#new-project").off("click");
    $("#create-new-project").attr("disabled", true);
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        $("#create-new-project").attr("disabled", false);
      })
      .catch((e) => {
        console.error("Error signing user in anonymously", e);
      });
  },
  init: (user) => {
    if (user.isAnonymous) {
      $(".signed-in-as-guest").removeClass("d-none");
    }
    $(".signed-out").addClass("d-none");
    $(".signed-in").removeClass("d-none");
    $("#loading").addClass("d-none");

    const $projects = $("#projects");
    const $projectDetails = $("#project-details");
    const $newProjectModal = $("#new-project-modal");

    // fetch projects
    let ownerQuery = firebase
      .firestore()
      .collection("projects")
      .where("owner", "==", user.uid)
      .get();
    let collaboratorQuery = user.email
      ? firebase
          .firestore()
          .collection("projects")
          .where("collaborators", "array-contains", user.email)
          .get()
      : Promise.resolve([]);

    let projectLoadQueries = [ownerQuery, collaboratorQuery];

    Promise.all(projectLoadQueries)
      .then(([ownerSnapshot, collaboratorSnapshot]) => {
        $projects.empty();
        ownerSnapshot.forEach(renderProject);
        collaboratorSnapshot.forEach(renderProject);
      })
      .catch((e) => {
        console.error("Error loading projects", e);
      });

    $("#create-new-project").click(function () {
      $(this).attr("disabled", true);
      let originalButtonText = $(this).text();
      $(this).text("Creating...");
      let name = $projectDetails.find("#project-name").val() || "My project";
      let description = $projectDetails.find("#project-description").val();
      firebase
        .firestore()
        .collection("projects")
        .add({
          name,
          description,
          public: false,
          owner: user.uid,
          collaborators: []
        })
        .then((doc) => {
          // need to empty out form or browser remembers it
          $projectDetails.find("#project-name").val("");
          $projectDetails.find("#project-description").val("");
          $(this).attr("disabled", false);
          $(this).text(originalButtonText);
          $newProjectModal.modal("hide");
          window.location.href =
            location.href.slice(0, location.href.lastIndexOf("/") + 1) +
            `edit.html?id=${doc.id}`;
        })
        .catch((e) => {
          console.error("Error creating project", e);
          alert("Error creating project, please refresh and try again.");
        });
    });

    function renderProjectItem({ name, description, id }) {
      return $(`<a href="edit.html?id=${id}" class="list-group-item list-group-item-action">
                <h5 class="mb-1">${name || "My project"}</h5>
                <p class="mb-1">${description || ""}</p>
              </a>`);
    }

    function renderProject(doc) {
      $projects.append(renderProjectItem({ ...doc.data(), id: doc.id }));
    }
  }
};
