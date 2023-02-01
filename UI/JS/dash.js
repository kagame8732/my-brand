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
    <button onclick="readMore()" class="readMore-btn">Read me</button>
    <div class="del-edit">
    <button onclick="deleteMessage()" class="delete-btn">Delete</button>
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
//Delete

// const deleteMessage = (index) => {
//   const allMessagess = JSON.parse(localStorage.getItem("blogInfo"));
//   const newMessages = allMessagess.filter((message, i) => i != index);
//   localStorage.setItem("blogInfo", JSON.stringify(newMessages));
// };

//Contact
let contactMessages = JSON.parse(localStorage.getItem("contactInfo")) || [];
let messagesList = document.getElementById("contactMessages");

const contacts = contactMessages
  .map((item) => {
    const contact = `
   <table class="table">
              <thead>
              <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </thead>
              <tbody>
                <tr>
                 <td data-label="contact No">${item.index}</td>
                  <td data-label="contact Name">${item.name}</td>
                  <td data-label="contact Email">${item.email}</td>
                  <td data-label="contact-message">${item.contactMessage}</td>
                  </tr>
                  </tbody>
                  </table>                
                  <button class="contact-delete">Delete</button>
                  </div>
  `;
    return contact;
  })
  .join("");

window.addEventListener("load", function () {
  messagesList.innerHTML = contacts;
});
