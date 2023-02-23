const MAX_WIDTH = 100;
const MAX_HEIGHT = 100;
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

let title = document.getElementById("blogTitle");
let description = document.getElementById("blogMessage");
let blogCards = document.getElementById("blog-cards");
document.getElementById("blog-form").addEventListener("submit", function (e) {
  e.preventDefault();
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
let blogIdInput = document.getElementById("blogId");
blogIdInput.value = blog._id;

let card;
document.addEventListener("DOMContentLoaded", function () {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:5000/api/blogs", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let blog of data) {
        card = document.createElement("div");
        card.classList.add("card");
        let image = document.createElement("img");
        image.src = blog.image;
        card.appendChild(image);

        let title = document.createElement("h2");
        title.textContent = blog.title;
        title.classList.add("blog-list-title");
        card.appendChild(title);

        let description = document.createElement("p");
        description.textContent = blog.description;
        description.classList.add("blog-description");
        card.appendChild(description);

        let btnContainer = document.createElement("div");
        btnContainer.classList.add("btnContainer");

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", () => {
          if (confirm("Are you sure you want to delete this blog post?")) {
            let requestOptions = {
              method: "DELETE",
              redirect: "follow",
            };

            fetch(`http://localhost:5000/api/blogs/${blog._id}`, requestOptions)
              .then((response) => {
                if (response.status === 204) {
                  console.log(blog);
                  location.reload();
                }
              })
              .catch((error) => console.log("error", error));
          }
        });

        let updateBtn = document.createElement("button");

        updateBtn.textContent = "Update";
        updateBtn.classList.add("updateBtn");
        updateBtn.addEventListener("click", () => {});

        btnContainer.appendChild(deleteBtn);
        btnContainer.appendChild(updateBtn);

        card.appendChild(btnContainer);
        blogCards.appendChild(card);
      }
    })
    .catch((error) => console.log("error", error));
});

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
  const confirmed = confirm("Are you sure you want to delete this contact?");
  if (!confirmed) {
    return;
  }

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
