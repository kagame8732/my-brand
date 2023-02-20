//Blog menu
let blogCards = document.getElementById("blog-cards");
let blogMessages = JSON.parse(localStorage.getItem("blogInfo")) || [];
document.getElementById("blog-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let title = document.getElementById("blogTitle");
  let message = document.getElementById("blogMessage");
  let blogInfo = {
    image: imageUrl,
    title: title.value,
    message: message.value,
    index: blogMessages.length + 1,
  };
  blogMessages = [...blogMessages, blogInfo];
  localStorage.setItem("blogInfo", JSON.stringify(blogMessages));
  title.value = "";
  message.value = "";
});

const blogs = blogMessages
  .map((item) => {
    const blog = `
    <div class="blog-card" id="blog-card">
  <img src="${item.image}" alt="" class="imgPreview" />
   <h3 class="blog-list-title" id="list-heading">${item.title}</h3>
    <p class="blog-list-description" id="content">${item.message}</p>
    <div class="del-edit">
    <button onclick="deleteBlog(${item.index})" class="blog-delete">Delete</button>
    <button class="edit-btn">Edit</button>
    </div>
    </div>
    `;
    return blog;
  })
  .join("");

window.addEventListener("load", function () {
  blogCards.innerHTML = blogs;
});

const blogImage = document.getElementById("blogImage");
let imageUrl;
blogImage.addEventListener("change", function () {
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    imageUrl = fileReader.result;
  });
  fileReader.readAsDataURL(this.files[0]);
});

//Blog Delete

function deleteBlog(index) {
  blogMessages = blogMessages.filter((blog) => blog.index !== index);
  localStorage.setItem("blogInfo", JSON.stringify(blogMessages));
  blogCards.innerHTML = blogMessages
    .map((item) => {
      const blog = `
      <div class="blog-card" id="blog-card">
        <img src="${item.image}" alt="" class="imgPreview" />
        <h3 class="blog-list-title" id="list-heading">${item.title}</h3>
        <p class="blog-list-description" id="content">${item.message}</p>
        <div class="del-edit">
          <button onclick="deleteMessage(${item.index})" class="blog-delete">Delete</button>
          <button class="edit-btn">Edit</button>
        </div>
      </div>
      `;
      return blog;
    })
    .join("");
}

//Contact

// const url = "http://localhost:5000/api/contacts";
// fetch(url)
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Something went wrong");
//     }
//   })
//   .then((data) => {
//     const table = document.createElement("table");
//     table.style.width = "50%";
//     table.style.padding = "1rem";
//     table.style.borderCollapse = "collapse";
//     table.style.border = "1px solid black";
//     table.setAttribute("border", "1");

//     // create table header row
//     const headerRow = document.createElement("tr");
//     const nameHeader = document.createElement("th");
//     nameHeader.textContent = "Name";
//     const emailHeader = document.createElement("th");
//     emailHeader.textContent = "Email";
//     const messageHeader = document.createElement("th");
//     messageHeader.textContent = "Message";
//     headerRow.appendChild(nameHeader);
//     headerRow.appendChild(emailHeader);
//     headerRow.appendChild(messageHeader);
//     table.appendChild(headerRow);

//     data.forEach((item) => {
//       const bodyRow = document.createElement("tr");
//       const nameData = document.createElement("td");
//       nameData.textContent = item.name;
//       const emailData = document.createElement("td");
//       emailData.textContent = item.email;
//       const messageData = document.createElement("td");
//       messageData.textContent = item.message;
//       bodyRow.appendChild(nameData);
//       bodyRow.appendChild(emailData);
//       bodyRow.appendChild(messageData);
//       table.appendChild(bodyRow);
//     });

//     const tableContainer = document.getElementById("contactMessages");
//     tableContainer.appendChild(table);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
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

    // create table header row
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
        deleteContact(item.id);
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

function deleteContact(id) {
  const deleteUrl = `http://localhost:5000/api/contacts/${id}`;
  fetch(deleteUrl, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Contact with ID ${id} deleted successfully.`);
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Delete message

// function deleteMessage(index) {
//   contactMessages = contactMessages.filter((message) => {
//     message.index !== index;
//   });
//   localStorage.setItem("contactInfo", JSON.stringify(contactMessages));
//   messagesList.innerHTML = contactMessages.map((item) => {
//     const contacts = contactMessages
//       .map((item) => {
//         const contact = `
//    <table class="table">
//               <thead>
//               <th>No</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Message</th>
//               </thead>
//               <tbody>
//                 <tr>
//                  <td data-label="contact No">${item.index}</td>
//                   <td data-label="contact Name">${item.name}</td>
//                   <td data-label="contact Email">${item.email}</td>
//                   <td data-label="contact-message">${item.contactMessage}</td>
//                   </tr>
//                   </tbody>
//                   </table>
//                   <button class="contact-delete">Delete</button>
//                   </div>
//   `;
//         return contact;
//       })
//       .join("");
//   });
// }
