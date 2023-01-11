const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

let state = false;
function toggle(elementId, eye) {
  if (state) {
    document.getElementById(elementId).setAttribute("type", "password");
    document.getElementById(eye).style.color = "#207733";
    state = false;
  } else {
    document.getElementById(elementId).setAttribute("type", "text");
    document.getElementById(eye).style.color = "#000000";
    state = true;
  }
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});

function blogMenu() {
  let title = document.getElementById("blog-title").value;
  let snippet = document.getElementById("blog-snippet").value;
  let body = document.getElementById("message").value;
  console.log(title, snippet, body);
}
