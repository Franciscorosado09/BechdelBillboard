// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded! 🚀');
  
    const movieContainer = document.querySelector('.movie-container');
  
    // Variable to hold our posts
    let posts;
  
    const getPosts = (user) => {
      userId = user || '';
      if (userId) {
        userId = `/?user_id=${userId}`;
      }
  
      fetch(`/api/posts${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          posts = data;
          console.log('Success in getting posts:', data);
          if (!data || !data.length) {
            displayEmpty(user);
          } else {
            initializeRows();
          }
        })
        .catch((error) => console.error('Error:', error));
    };
  
    // Get a movie post from a specific user
    const url = window.location.search;
    let userId;
    if (url.indexOf('?user_id=') !== -1) {
      userId = url.split('=')[1];
      getPosts(userId);
    } else {
      getPosts();
    }
  
    // Front end call to DELETE a post
    const deletePost = (id) => {
      fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(getPosts());
    };
  
    // Create HTML rows for the movie container
    const initializeRows = () => {
      movieContainer.innerHTML = '';
      const postsToAdd = [];
  
      posts.forEach((post) => postsToAdd.push(createNewRow(post)));
      postsToAdd.forEach((post) => movieContainer.append(post));
    };
  
    const createNewRow = (post) => {
      console.log('createNewRow -> post', post);
  
      const formattedDate = new Date(post.createdAt).toLocaleDateString();
  
      const newPostCard = document.createElement('div');
      newPostCard.classmovie.add('card');
  
      const newPostCardHeading = document.createElement('div');
      newPostCardHeading.classmovie.add('card-header');
  
      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'x';
      deleteBtn.classmovie.add('delete', 'btn', 'btn-danger');
      deleteBtn.addEventListener('click', handlePostDelete);
  
      // Edit button
      const editButton = document.createElement('button');
      editButton.textContent = 'EDIT';
      editButton.classmovie.add('edit', 'btn', 'btn-info');
      editButton.addEventListener('click', handlePostEdit);
  
      const newPostTitle = document.createElement('h2');
      const newPostDate = document.createElement('small');
      const newPostuser = document.createElement('h5');
  
      newPostuser.textContent = `Written by: ${post.user.name}`;
      newPostuser.style.float = 'right';
      newPostuser.style.color = 'blue';
      newPostuser.style.marginTop = '-10px';
  
      const newPostCardBody = document.createElement('div');
      newPostCardBody.classmovie.add('card-body');
  
      const newPostBody = document.createElement('p');
      newPostTitle.textContent = `${post.title} `;
      newPostBody.textContent = post.body;
      newPostDate.textContent = ` (${formattedDate})`;
      newPostTitle.append(newPostDate);
      newPostCardHeading.append(deleteBtn);
      newPostCardHeading.append(editButton);
      newPostCardHeading.append(newPostTitle);
      newPostCardHeading.append(newPostuser);
      newPostCardBody.append(newPostBody);
      newPostCard.append(newPostCardHeading);
      newPostCard.append(newPostCardBody);
      newPostCard.setAttribute('data-post', JSON.stringify(post));
  
      console.log('createNewRow -> newPostCard', newPostCard);
      return newPostCard;
    };
  
    // Helper function to display something when there are no posts
    const displayEmpty = (id) => {
      const query = window.location.search;
      let partial = '';
      if (id) {
        partial = ` for user #${id}`;
      }
  
      movieContainer.innerHTML = '';
      const messageH2 = document.createElement('h2');
      messageH2.style.textAlign = 'center';
      messageH2.style.marginTop = '50px';
      messageH2.innerHTML = `No posts yet${partial}, navigate <a href='/cms${query}'>here</a> in order to get started.`;
      movieContainer.append(messageH2);
    };
  
    // Handle when we click the delete post button
    const handlePostDelete = (e) => {
      const currentPost = JSON.parse(
        e.target.parentElement.parentElement.dataset.post
      );
  
      deletePost(currentPost.id);
    };
  
    // Handle when we click the edit post button
    const handlePostEdit = (e) => {
      const currentPost = JSON.parse(
        e.target.parentElement.parentElement.dataset.post
      );
  
      window.location.href = `/cms?post_id=${currentPost.id}`;
    };
  });
  