const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

let state = false;
function toggle() {
  if (state) {
    document.getElementById("password").setAttribute("type", "password");
    document.getElementById("eye").style.color = "#207733";
    state = false;
  } else {
    document.getElementById("password").setAttribute("type", "text");
    document.getElementById("eye").style.color = "#000000";
    state = true;
  }
}
