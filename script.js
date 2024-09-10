//Create the event Listener for the buttons.
let post1 =
  { id: 1, author: 'John', content: 'My first Post!', likes: 10, comments: ['Great post!', 'Nice photo!'], image: 'https://files.codingninjas.in/image2-28694.jpg' };

function renderPosts() {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';


  const postElement = document.createElement('div');
  postElement.classList.add('post');

  const authorElement = document.createElement('h3');
  authorElement.textContent = post1.author;

  const contentElement = document.createElement('p');
  contentElement.textContent = post1.content;

  const imageElement = document.createElement('img');
  imageElement.src = post1.image;
  imageElement.alt = 'Post Image';

  const likeButton = document.createElement('button');
  likeButton.textContent = `Like`;
  likeButton.classList.add('like-button');
  //Add eventListerner here to update the likes.

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Write a comment...';

  const commentButton = document.createElement('button');
  commentButton.textContent = 'Comment';
  commentButton.classList.add('comment-button')
  //Create eventListener here for the comment button


  const postFooter = document.createElement('div');
  postFooter.classList.add('post-footer');
  postFooter.textContent = `Likes: ${post1.likes}   Comments: ${post1.comments.length}`;

  const commentsContainer = document.createElement('div');
  commentsContainer.classList.add('comments-container');
  commentsContainer.style.display = 'none';

  function renderComments() {
    commentsContainer.innerHTML = "";
    post1.comments.forEach((comment) => {
      let commentElement = document.createElement('p');
      commentElement.textContent = comment;
      commentsContainer.appendChild(commentElement);
    });
  }

  postElement.appendChild(authorElement);
  postElement.appendChild(imageElement);
  postElement.appendChild(contentElement);
  postElement.appendChild(likeButton);
  postElement.appendChild(commentInput);
  postElement.appendChild(commentButton);
  postElement.appendChild(postFooter);
  postElement.appendChild(commentsContainer);



  postsContainer.appendChild(postElement);
  postFooter.addEventListener('click', () => {
    commentsContainer.style.display = commentsContainer.style.display === 'none' ? 'block' : 'none';
  });

  let clickCount = 0
  likeButton.addEventListener("click", () => {
    clickCount += 1
    if (clickCount <= 1) {
      likePost(1)
    }
  })

  commentButton.addEventListener("click", () => {
    let commentContent = commentInput.value;
    if (commentContent.trim() !== "") {
      addComment(1, commentContent)
      renderComments();
      commentInput.value = "";
    }
  })
}

const likePost = (id) => {
  if (post1.id === id) {
    post1.likes += 1;
    const postFooter = document.querySelector('.post-footer');
    postFooter.textContent = `Likes: ${post1.likes}   Comments: ${post1.comments.length}`;
    let likeButton = document.querySelector(".like-button");
    likeButton.style.backgroundColor = "red";
  }

};

const addComment = (id, comment) => {
  if (post1.id === id) {
    post1.comments.push(comment);
    const postFooter = document.querySelector('.post-footer');
    postFooter.textContent = `Likes: ${post1.likes}   Comments: ${post1.comments.length}`;
  }
}

renderPosts();    