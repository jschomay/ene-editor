window.ENE = window.ENE || {};
window.ENE.Projects = {
  init: user => {
    const $projects = $("#projects");
    const $projectDetails = $("#project-details");
    const $newProjectModal = $("#new-project-modal");

    // fetch projects
    firebase
      .firestore()
      .collection("projects")
      .where("owner", "==", user.uid)
      .get()
      .then(snapshot => {
        $projects.empty();
        snapshot.forEach(renderProject);
      })
      .catch(e => {
        console.error(e);
      });

    $("#create-new-project").click(function() {
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
        .then(doc => {
          // need to empty out form or browser remembers it
          $projectDetails.find("#project-name").val("");
          $projectDetails.find("#project-description").val("");
          $(this).attr("disabled", false);
          $(this).text(originalButtonText);
          $newProjectModal.modal("hide");

          window.location.href = `/edit.html?id=${doc.id}`;
        })
        .catch(e => {
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
