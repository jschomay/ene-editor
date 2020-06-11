(() => {
  const $projects = $("#projects");
  const $projectDetails = $("#project-details");
  const $newProjectModal = $("#new-project-modal");

  $("#create-new-project").click(function() {
    $(this).attr("disabled", true);
    let originalButtonText = $(this).text();
    $(this).text("Creating...");
    let name = $projectDetails.find("#project-name").val() || "My project";
    let description = $projectDetails.find("#project-description").val();
    firebase
      .firestore()
      .collection("projects")
      .add({ name, description })
      .then(doc => {
        // window.location.href = `/edit?id=${doc.id}`;

        $projectDetails.find("#project-name").val("");
        $projectDetails.find("#project-description").val("");
        $(this).attr("disabled", false);
        $(this).text(originalButtonText);
        $newProjectModal.modal("hide");
        getProjects();
      })
      .catch(e => {
        console.error("Error creating project", e);
        alert("Error creating project, please refresh and try again.");
      });
  });

  getProjects();

  function getProjects() {
    firebase
      .firestore()
      .collection("projects")
      .get()
      .then(snapshot => {
        $projects.empty();
        snapshot.forEach(renderProject);
      });
  }

  function renderProjectItem({ name, description, id }) {
    return $(`<a href="edit.html?id=${id}" class="list-group-item list-group-item-action">
                <h5 class="mb-1">${name || "My project"}</h5>
                <p class="mb-1">${description || ""}</p>
              </a>`);
  }

  function renderProject(doc) {
    $projects.append(renderProjectItem({ ...doc.data(), id: doc.id }));
  }
})();
