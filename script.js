// The code given below is for one object refactor the code it for using the JSON Data.
let postsData = [
  {
    id: 1,
    author: "John",
    content: "Hello, Instagram!",
    likes: 10,
    comments: ["Great post!", "Nice photo!"],
    image: "https://files.codingninjas.in/image2-28694.jpg",
  },
  {
    id: 2,
    author: "Jane",
    content: "This is a great post!",
    likes: 15,
    comments: [],
    image: "https://files.codingninjas.in/oip-28704.jpg",
  },
  {
    id: 3,
    author: "Alice",
    content: "Another post",
    likes: 8,
    comments: [],
    image: "https://files.codingninjas.in/th-2-28706.jpg",
  },
  {
    id: 4,
    author: "Bob",
    content: "Check out this photo!",
    likes: 20,
    comments: [],
    image: "https://files.codingninjas.in/image1-28708.jpg",
  },
];

// Create a new Set and store it in a varibale name "likedPosts" to keep track of post IDs that have been liked
let likedPosts = new Set();
// This ensures that each post can be liked only once, and allows for quick lookup of liked posts


function renderPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  postsData.forEach((post) => {

    const postElement = document.createElement("div");
    postElement.classList.add("post");

    const authorElement = document.createElement("h3");
    authorElement.textContent = post.author;

    const contentElement = document.createElement("p");
    contentElement.textContent = post.content;

    const imageElement = document.createElement("img");
    imageElement.src = post.image;
    imageElement.alt = "Post Image";

    const likeButton = document.createElement("button");
    likeButton.textContent = `Like`;
    likeButton.classList.add("like-button");

    if (likedPosts.has(post.id)) {
      likeButton.style.backgroundColor = "red";
      likeButton.disabled = true;
    }

    likeButton.addEventListener("click", () => {
      if (!likedPosts.has(post.id)) {
        likePost(post.id);
        likeButton.style.backgroundColor = "red";
        likedPosts.add(post.id);
        likeButton.disabled = true;
      }
    });;

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Write a comment...";

    const commentButton = document.createElement("button");
    commentButton.textContent = "Comment";
    commentButton.classList.add("comment-button");
    // Update the addComment function to take the current post's id and the comment input value as arguments
    commentButton.addEventListener(
      "click",
      () => {
        addComment(commentInput.value, post.id);
        commentInput.value = "";
      },
      { once: true }
    );

    const postFooter = document.createElement("div");
    postFooter.classList.add("post-footer");
    // Update the text content to reflect the current post's likes and comments using the loop parameter
    postFooter.textContent = `Likes: ${post.likes}   Comments: ${post.comments.length}`;

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");
    commentsContainer.style.display = "none";

    post.comments.forEach((comment) => {
      const commentElement = document.createElement("p");
      commentElement.textContent = comment;
      commentsContainer.appendChild(commentElement);
    });

    postElement.appendChild(authorElement);

    postElement.appendChild(imageElement);
    postElement.appendChild(contentElement);
    postElement.appendChild(likeButton);
    postElement.appendChild(commentInput);
    postElement.appendChild(commentButton);
    postElement.appendChild(postFooter);
    postElement.appendChild(commentsContainer);

    postFooter.addEventListener("click", () => {
      if (commentsContainer.style.display === "none") {
        commentsContainer.style.display = "block";
      } else {
        commentsContainer.style.display = "none";
      }
    });

    postsContainer.appendChild(postElement);
  })


}

// Function to handle post liking
function likePost(id) {
  const post = postsData.find(post => post.id === id);

  if (post) {
    post.likes++;
    renderPosts();
  } else {
    console.error("Post not found")
  }

}

// Function to handle adding a comment
function addComment(comment, id) {
  const post = postsData.find(post => post.id === id);
  if (post) {
    if (comment.trim() !== "") {
      post.comments.push(comment);
      renderPosts();
    } else {
      console.error("Comment not found!");
    }
  } else {
    console.log("Post not found!");

  }

}

renderPosts();
