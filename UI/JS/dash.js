//Blog menu
// const blogImage = document.getElementById("blogImage");
// let imageUrl;
// blogImage.addEventListener("change", function () {
//   const fileReader = new FileReader();
//   fileReader.addEventListener("load", () => {
//     imageUrl = fileReader.result;
//   });
//   fileReader.readAsDataURL(this.files[0]);
// });

// let blogCards = document.getElementById("blog-cards");
// document.getElementById("blog-form").addEventListener("submit", function (e) {
//   e.preventDefault();
//   let title = document.getElementById("blogTitle");
//   let description = document.getElementById("blogMessage");
//   let blogSubmit = document.getElementById("blogSubmit");

//   let myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   let data = {
//     image: imageUrl,
//     title: title.value,
//     description: description.value,
//   };

//   let requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: JSON.stringify(data),
//     redirect: "follow",
//   };

//   fetch("http://localhost:5000/api/blogs", requestOptions)
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
//   blogSubmit.textContent = "Blog added well";
//   document.getElementById("blog-form").reset();
// });

// //Get Blog
// document.addEventListener("DOMContentLoaded", function () {
//   var requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };
//   fetch("http://localhost:5000/api/blogs")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       for (let blog of data) {
//         let card = document.createElement("div");
//         card.classList.add("card");
//         let image = document.createElement("img");
//         image.src = blog.image;
//         card.appendChild(image);

//         let title = document.createElement("h2");
//         title.textContent = blog.title;
//         card.appendChild(title);

//         let description = document.createElement("p");
//         description.textContent = blog.description;
//         card.appendChild(description);

//         blogCards.appendChild(card);
//       }
//     })
//     .catch((error) => console.log("error", error));
// });

const MAX_WIDTH = 300;
const MAX_HEIGHT = 300;

const blogImage = document.getElementById("blogImage");
let imageUrl;

blogImage.addEventListener("change", function () {
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    resizeImage(fileReader.result, MAX_WIDTH, MAX_HEIGHT, (resizedImage) => {
      imageUrl = resizedImage;
    });
  });
  fileReader.readAsDataURL(this.files[0]);
});

function resizeImage(imageUrl, maxWidth, maxHeight, callback) {
  const img = new Image();
  img.src = imageUrl;
  img.onload = function () {
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    const resizedImageUrl = canvas.toDataURL("image/jpeg", 0.7);
    callback(resizedImageUrl);
  };
}

let blogCards = document.getElementById("blog-cards");

document.getElementById("blog-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let title = document.getElementById("blogTitle");
  let description = document.getElementById("blogMessage");
  let blogSubmit = document.getElementById("blogSubmit");

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let data = {
    image: imageUrl,
    title: title.value,
    description: description.value,
  };

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  fetch("http://localhost:5000/api/blogs", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  blogSubmit.textContent = "Blog added well";
  document.getElementById("blog-form").reset();
});

//Get Blog
document.addEventListener("DOMContentLoaded", function () {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch("http://localhost:5000/api/blogs")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let blog of data) {
        let card = document.createElement("div");
        card.classList.add("card");
        let image = document.createElement("img");
        image.src = blog.image;
        card.appendChild(image);

        let title = document.createElement("h2");
        title.textContent = blog.title;
        card.appendChild(title);

        let description = document.createElement("p");
        description.textContent = blog.descripti;
        card.appendChild(description);

        // Create an "Update" button for each blog post
        let updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.addEventListener("click", () => {
          // Handle the click event for the "Update" button
          console.log(`Update button clicked for blog post ID ${blog._id}`);
        });
        card.appendChild(updateBtn);

        blogCards.appendChild(card);
      }
    })
    .catch((error) => console.log("error", error));
});

// const blogs = blogMessages
//   .map((item) => {
//     const blog = `
//     <div class="blog-card" id="blog-card">
//   <img src="${item.image}" alt="" class="imgPreview" />
//    <h3 class="blog-list-title" id="list-heading">${item.title}</h3>
//     <p class="blog-list-description" id="content">${item.message}</p>
//     <div class="del-edit">
//     <button onclick="deleteBlog(${item.index})" class="blog-delete">Delete</button>
//     <button class="edit-btn">Edit</button>
//     </div>
//     </div>
//     `;
//     return blog;
//   })
//   .join("");

// window.addEventListener("load", function () {
//   blogCards.innerHTML = blogs;
// });

//Blog Delete

// function deleteBlog(index) {
//   blogMessages = blogMessages.filter((blog) => blog.index !== index);
//   localStorage.setItem("blogInfo", JSON.stringify(blogMessages));
//   blogCards.innerHTML = blogMessages
//     .map((item) => {
//       const blog = `
//       <div class="blog-card" id="blog-card">
//         <img src="${item.image}" alt="" class="imgPreview" />
//         <h3 class="blog-list-title" id="list-heading">${item.title}</h3>
//         <p class="blog-list-description" id="content">${item.message}</p>
//         <div class="del-edit">
//           <button onclick="deleteMessage(${item.index})" class="blog-delete">Delete</button>
//           <button class="edit-btn">Edit</button>
//         </div>
//       </div>
//       `;
//       return blog;
//     })
//     .join("");
// }

//Contact
const url = "http://localhost:5000/api/contacts";
fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong");
    }
  })
  .then((data) => {
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.padding = "1rem";
    table.style.borderCollapse = "collapse";
    table.style.border = "1px solid black";
    table.setAttribute("border", "1");

    const headerRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    const emailHeader = document.createElement("th");
    emailHeader.textContent = "Email";
    const messageHeader = document.createElement("th");
    messageHeader.textContent = "Message";
    const actionHeader = document.createElement("th");
    actionHeader.textContent = "Action";
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(emailHeader);
    headerRow.appendChild(messageHeader);
    headerRow.appendChild(actionHeader);
    table.appendChild(headerRow);

    data.forEach((item) => {
      const bodyRow = document.createElement("tr");
      const nameData = document.createElement("td");
      nameData.textContent = item.name;
      const emailData = document.createElement("td");
      emailData.textContent = item.email;
      const messageData = document.createElement("td");
      messageData.textContent = item.message;
      const actionData = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        deleteContact(item._id);
        bodyRow.remove();
      });
      actionData.appendChild(deleteButton);
      bodyRow.appendChild(nameData);
      bodyRow.appendChild(emailData);
      bodyRow.appendChild(messageData);
      bodyRow.appendChild(actionData);
      table.appendChild(bodyRow);
    });
    const tableContainer = document.getElementById("contactMessages");
    tableContainer.appendChild(table);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const deleteContact = async (id) => {
  const getToken = JSON.parse(localStorage.getItem("usertoken"));
  const settings = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
    body: {},
  };
  try {
    const deleteBlog = await fetch(
      `http://localhost:5000/api/contacts/${id}`,
      settings
    );
    const data = await deleteContact.json();
    console.log(data);
    getBlog();
    window.location.reload();
  } catch (error) {
    console.error("Error deleting blog", error);
  }
};
