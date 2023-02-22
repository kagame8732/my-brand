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
// //Blog menu

// let blogMessages = JSON.parse(localStorage.getItem("blogInfo")) || [];
// let blogCards = document.getElementById("blog-cards");

// const blogList = blogMessages
//   .map((item) => {
//     const blog = `
//     <div class="blog-card" id="blog-card">
//   <img src="${item.image}" alt="" class="imgPreview" />
//    <h3 class="blog-list-title" id="list-heading">${item.title}</h3>
//     <p class="blog-list-description" id="content">${item.message}</p>
//     <button class="readMore-btn">Read me</button>
//     </div>
//     `;
//     return blog;
//   })
//   .join("");
// window.addEventListener("load", function () {
//   blogCards.innerHTML = blogList;
// });

//Other option
let blogMessages = JSON.parse(localStorage.getItem("blogInfo")) || [];
let blogCards = document.getElementById("blog-cards");

if (blogMessages) {
  blogMessages.forEach((blogMessage) => {
    0;
    blogCards.innerHTML += `
    <div class="blog-card" id="blog-card">
     <img src="${blogMessage.image}" alt="" class="imgPreview" />
   <h3 class="blog-list-title" id="list-heading">${blogMessage.title}</h3>
   <p class="blog-list-description" id="content">${blogMessage.message}</p>
   <a href="./readMe.html" class="read-more">Read more</a>
    </div>
    `;
  });
}
// Contact
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let contactMessage = document.getElementById("description");
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let messageError = document.getElementById("messageError");
    let submitMessage = document.getElementById("submitMessage");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let data = {
      name: name.value,
      email: email.value,
      message: contactMessage.value,
    };

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/contacts", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    submitMessage.textContent = "Thank you for contact us";
    form.reset();
  });

// Login
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let emailError = document.getElementById("loginError");
let passwordError = document.getElementById("passwordError");
let submitError = document.getElementById("submitError");
let form = document.querySelector("form");
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});

function validateMail() {
  // var loginEmail = document.getElementById("loginEmail").value;
  // if (loginEmail.length == 0) {
  //   emailError.innerHTML = "Email Required";
  //   return false;
  // }
  // if (!loginEmail.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{3,4}$/)) {
  //   emailError.innerHTML = "Invalid Email";
  //   return false;
  // }
}

function validatePassword() {
  var loginPassword = document.getElementById("loginPassword").value;
  if (loginPassword.length == 0) {
    passwordError.innerHTML = "Password required";
    return false;
  }
  if (loginPassword.length <= 6) {
    passwordError.innerHTML = "Must be 6 characters or more";
    return false;
  }
  passwordError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
}
function validateForm() {
  if (!validatePassword()) {
    submitError.innerHTML = "PLease fix above errors";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 2000);
    return false;
  } else {
    userLogin();
  }
}

const userLogin = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const data = {
    email: loginEmail.value,
    password: loginPassword.value,
  };
  const returnedData = await axios
    .post("http://localhost:5000/api/login", data)
    .then((result) => {
      localStorage.setItem("usertoken", JSON.stringify(result.data.token)),
        next(),
        form.reset();
    })
    .catch((error) => {
      return error.response.data.message;
    });
  submitError.innerHTML = `${returnedData}`;
};

let next = () => {
  window.location.href = "./dashboard.html";
};

//Signup

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("signup-email");
  let password = document.getElementById("signup-password");
  let submitMessage = document.getElementById("submitMessages");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var data = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  fetch("http://localhost:5000/api/signup", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  submitMessage.textContent = "User registered successful";
  document.getElementById("signup-form").reset();
});
