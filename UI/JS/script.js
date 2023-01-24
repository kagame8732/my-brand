//Responsiveness
const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

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
let blogCards = document.getElementById("blog-cards");
let blogMessages = JSON.parse(localStorage.getItem("blogInfo")) || [];
document.getElementById("blog-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let title = document.getElementById("blogTitle");
  let message = document.getElementById("blogMessage");
  let comment = document.getElementById("blogComment");

  let blogInfo = {
    title: title.value,
    message: message.value,
    comment: comment.value,
    index: blogMessages.length + 1,
  };
  blogMessages = [...blogMessages, blogInfo];
  if (blogMessages) {
    localStorage.setItem("blogInfo", JSON.stringify(blogMessages));
    alert("Blog added successfull");
  } else {
    alert("Please add all info");
  }
  title.value = "";
  message.value = "";
  comment.value = "";
});

const blogs = blogMessages.map((item) => {
  const blog = `

   <h3 class="blog-list-title" id="list-heading">${item.title}</h3>
    <h5 class="blog-list-description" id="list-description">${item.message}</h5>
    <p class="blog-list-comment" id="list-comment">${item.comment}</p>
   `;

  return blog;
});
window.addEventListener("load", () => {
  blogCards.innerHTML = blogs;
});

// Blog image
// const blodImage = document.querySelector("#blogImage");
// let imageUrl;
// blodImage.addEventListener("change", function () {
//   const fileReader = new FileReader();
//   fileReader.addEventListener("load", () => {
//     imageUrl = fileReader.result;
//   });
//   fileReader.readAsDataURL(this.files[0]);
// });

// function createBlog(e) {
//   e.preventDefault();
//   const blogName = document.querySelector("#blogTitle");
//   const blogDescription = document.querySelector("#blogMessage");
//   const createBlogForm = document.querySelector("#blog-form");
//   const nameError = createBlogForm.getElementsByClassName("blogNameError");
//   const descriptionError = createBlogForm.querySelector(".descriptionError");
//   const imageError = createBlogForm.querySelector(".imageError");
//   const blogSubmitted = createBlogForm.querySelector(".blog-submitted");

//   const blogs = {
//     image: imageUrl,
//     name: blogName.value,
//     description: blogDescription.value,
//     index: blogs.length + 1,
//   };
//   var y = blogs.image;
//   if (y == "") {
//     imageError.innerHTML = "blogs image is required";
//     return false;
//   }

//   let x = blogs.name;
//   var nameRegex = /^[^\s]+( [^\s]+)+$/;
//   if (!x.match(nameRegex)) {
//     nameError[0].innerHTML = "blogs title should be separeted by single space";
//     return false;
//   }

//   var z = blogs.description;
//   if (z.length <= 20) {
//     descriptionError.innerHTML =
//       "blogs description should be more than 20 letters";
//     return false;
//   }

//   blodImage.value = "";
//   blogName.value = "";
//   blogDescription.value = "";
//   imageError.innerHTML = "";
//   nameError[0].innerHTML = "";
//   descriptionError.innerHTML = "";
//   blogs = [...blogs, blogs];
//   localStorage.setItem("blogs", JSON.stringify(blogs));

//   blogSubmitted.innerHTML = "blogs submitted successfully";
//   return false;
// }
// Contact
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let contactMessage = document.getElementById("description");
    let contactMessages = JSON.parse(localStorage.getItem("contactInfo")) || [];

    let message = {
      name: name.value,
      email: email.value,
      contactMessage: contactMessage.value,
      index: contactMessages.length + 1,
    };
    contactMessages = [...contactMessages, message];
    localStorage.setItem("contactInfo", JSON.stringify(contactMessages));
    alert("Message sent");
    name.value = "";
    email.value = "";
    contactMessage.value = "";
  });

// Login
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("login-email");
  let password = document.getElementById("loginPassword");
  let users = JSON.parse(localStorage.getItem("userInfo")) || [];

  let userInfo = {
    email: email.value,
    password: password.value,
    index: users.length + 1,
  };
  users = [...users, userInfo];
  localStorage.setItem("userInfo", JSON.stringify(users));
  email.value = "";
  password.value = "";
  window.location.href = "./dashboard.html";
});

//Signup

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let signupEmail = document.getElementById("signup-email");
  let signupPassword = document.getElementById("signup-password");
  let signupUsers = JSON.parse(localStorage.getItem("signupInfo")) || [];

  let signupInfo = {
    firstName: firstName.value,
    lastName: lastName.value,
    signupEmail: signupEmail.value,
    signupPassword: signupPassword.value,
    index: signupUsers.length + 1,
  };
  signupUsers = [...signupUsers, signupInfo];
  localStorage.setItem("signupInfo", JSON.stringify(signupUsers));
  alert("User created");
  firstName.value = "";
  lastName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
});
