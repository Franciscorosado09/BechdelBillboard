// Helper functions to show/hide elements
const show = (el) => {
  el.style.display = 'block';
};

// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded! 🚀');

  // Get references to the body, title, form and user
  const bodyInput = document.getElementById('body');
  const titleInput = document.getElementById('title');
  const cmsForm = document.getElementById('cms');
  const userSelect = document.getElementById('user');

  // Get query parameter
  const url = window.location.search;
  let postId;
  let userId;
  let updating = false;

  // Get post data for editing/adding
  const getPostData = (id, type) => {
    const queryUrl =
      type === 'post' ? `/api/posts/${id}` : `/api/users/${id}`;

    fetch(queryUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log('Success in getting post:', data);

          // Populate the form for editing
          titleInput.value = data.title;
          bodyInput.value = data.body;
          userId = data.userId || data.id;

          // We are updating
          updating = true;
        }
      })
      .catch((err) => console.error(err));
  };

  // If post exists, grab the content of the post
  if (url.indexOf('?post_id=') !== -1) {
    postId = url.split('=')[1];
    getPostData(postId, 'post');
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our user
  else if (url.indexOf('?user_id=') !== -1) {
    userId = url.split('=')[1];
  }

  // Event handler for when the post for is submitted
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Make sure the form isn't empty
    if (
      !titleInput.value.trim() ||
      !bodyInput.value.trim() ||
      !userSelect.value
    ) {
      return;
    }

    // Object that will be sent to the db
    const newPost = {
      title: titleInput.value.trim(),
      body: bodyInput.value.trim(),
      userId: userSelect.value,
    };

    // Update a post if flag is true, otherwise submit a new one
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }
  };

  // Attach an event listener to the form on submit
  cmsForm.addEventListener('submit', handleFormSubmit);

  // Submits new post then redirects
  const submitPost = (post) => {
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then(() => {
        window.location.href = '/billboard';
      })
      .catch((err) => console.error(err));
  };

  // Render a list of users or redirect if no users
  const renderuserList = (data) => {
    console.log('renderuserList -> data', data);
    if (!data.length) {
      window.location.href = '/users';
    }
    if (document.querySelector('.hidden')) {
      show(document.querySelector('.hidden'));
    }

    const rowsToAdd = [];

    data.forEach((user) => rowsToAdd.push(createuserRow(user)));

    userSelect.innerHTML = '';
    console.log('renderuserList -> rowsToAdd', rowsToAdd);
    console.log('userSelect', userSelect);

    rowsToAdd.forEach((row) => userSelect.append(row));
    userSelect.value = userId;
  };

  // Build user dropdown
  const createuserRow = ({ id, name }) => {
    const listOption = document.createElement('option');
    listOption.value = id;
    listOption.textContent = name;
    return listOption;
  };

  // A function to get users and then call the render function
  const getusers = () => {
    fetch('api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => renderuserList(data))
      .catch((err) => console.error(err));
  };

  // Get the users, and their posts
  getusers();

  // Update a post then redirect to billboard
  const updatePost = (post) => {
    fetch('/api/posts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then(() => {
        window.location.href = '/billboard';
      })
      .catch((err) => console.error(err));
  };
});
