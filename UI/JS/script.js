//Responsiveness
const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});
//Active navbar

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
// document.getElementById("add-item").addEventListener("click", function () {
//   localStorage.setItem(
//     "name",
//     JSON.stringify({ name: "Kagame", food: "Cheese" })
//   );
//   updateUI();
// });

const blogForm = document.getElementById("blogForm");
const blogKey = "blogFormData";
let blogData = JSON.parse(localStorage.getItem(blogKey)) || [];
console.log(blogData);
blogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const blogFormValues = {
    title: blogForm.blogTitle.value,
    description: blogForm.blogMessage.value,
  };
  blogData.push(blogFormValues);
  localStorage.setItem(blogKey, JSON.stringify(blogData));
  alert("Blog added successfull");
  blogForm.blogImage.value = "";
  blogForm.blogTitle.value = "";
  blogForm.blogMessage.value = "";
});
function updateUI() {
  let values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }
  document.getElementById("list-heading").textContent = values;
}

// Blog image
document.querySelector("#blogImage").addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    localStorage.setItem("Image", reader.result);
  });
  reader.readAsDataURL(this.files[0]);
});
document.addEventListener("DOMContentLoaded", () => {
  const recentImageDataUrl = localStorage.getItem("Image");
  if (recentImageDataUrl) {
    document
      .querySelector("#imgPreview")
      .setAttribute("src", recentImageDataUrl);
  }
});
// Contact
const form = document.getElementById("myForm");
const contactKey = "ContactFormData";
let contactData = JSON.parse(localStorage.getItem(contactKey)) || [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const contactFormValues = {
    name: form.name.value,
    email: form.email.value,
    messages: form.description.value,
  };
  contactData.push(contactFormValues);
  localStorage.setItem(contactKey, JSON.stringify(contactData));
  alert("Added successfull");
  form.name.value = "";
  form.email.value = "";
  form.description.value = "";
});
// Login
const loginForm = document.getElementById("loginForm");
const loginKey = "loginFormData";
let loginData = JSON.parse(localStorage.getItem(loginKey)) || [];
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginFormValues = {
    email: loginForm.loginEmail.value,
    password: loginForm.loginPassword.value,
  };
  loginData.push(loginFormValues);
  localStorage.setItem(loginKey, JSON.stringify(loginData));
  loginForm.loginEmail.value = "";
  loginForm.loginPassword.value = "";
});
