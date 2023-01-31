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
