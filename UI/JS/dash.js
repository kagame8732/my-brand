//Add Blog
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
  localStorage.setItem("blogInfo", JSON.stringify(blogMessages));
  title.value = "";
  message.value = "";
  comment.value = "";
});

const blogs = blogMessages.map((item) => {
  const blog = `
   <div class="blog-list-menu">
   <h3 class="blog-list-title" id="list-heading">${item.title}</h3>
    <h5 class="blog-list-description" id="list-description">${item.message}</h5>
    <p class="blog-list-comment" id="list-comment">${item.comment}</p>
   </div>`;

  return blog;
});

window.addEventListener("load", () => {
  blogCards.innerHTML = blogs;
});
