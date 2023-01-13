//Responsiveness
const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});
//Active navbar

var btnContainer = document.getElementById("navbar");
var btns = btnContainer.getElementsByClassName("menus");

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active");
    this.className += "active";
  });
}

//Password visible and invisible
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
//Blog menu

// Contact
let sendBtn = document.getElementById("submit");
let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
sendBtn.addEventListener("click", (e) => {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let message = document.getElementById("messages");
  name = name.value;
  email = email.value;
  message = message.value;
  localStorage.setItem("Name", name);
  localStorage.setItem("Email", email);
  localStorage.setItem("Message", message);
});

// Login

//Dropdown

// const dropdowns = document.querySelector(".dropdown");

// dropdowns.forEach((dropdown) => {
//   const select = dropdown.querySelector(".select");
//   const caret = dropdown.querySelector(".caret");
//   const menu = dropdown.querySelector(".menu");
//   const options = dropdown.querySelector(".menu li");
//   const selected = dropdown.querySelector(".selected");

//   select.addEventListener("click", () => {
//     select.classList.toggle("select-clicked");
//     caret.classList.toggle("caret-rotate");
//     menu.classList.toggle("menu-open");
//   });

//   options.forEach((option) => {
//     option.addEventListener("click", () => {
//       select.innerText = option.innerText;
//       select.classList.remove("select-clicked");
//       caret.classList.remove("caret-rotate");
//       menu.classList.remove("menu-open");
//       options.forEach((option) => {
//         option.classList.remove("active");
//       });
//       option.classList.add("active");
//     });
//   });
// });
