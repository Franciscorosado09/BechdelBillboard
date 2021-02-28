// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded! 🚀');
  
    // const nameInput = document.getElementById('user-name');
    // const userList = document.querySelector('tbody');
  
    // Create an user
    const insertuser = (userData) => {
      fetch('/api/userProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(getusers)
        .catch((err) => console.error(err));
    };
  
    // Handle when the user form is submitted
    const handleuserFormSubmit = (e) => {
      e.preventDefault();
  
      if (!nameInput.value.trim()) {
        alert('Please provide an user name');
        return;
      }
  
      insertuser({
        name: nameInput.value.trim(),
      });
    };
  
      document
      .getElementById('user-form')
      .addEventListener('submit', handleuserFormSubmit);
  
    // Event handler for the delete user button
    // const handleDeleteButtonPress = (e) => {
    //   const { id } = e.target.parentElement.parentElement;
    //   fetch(`/api/userProfile/${id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }).then(getusers);
    // };
  
    // Create list row for users
    const createuserRow = (userData) => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-user', JSON.stringify(userData));
  
      // Set each user's ID on the element itself
      tr.id = userData.id;
  
      const td = document.createElement('td');
      td.textContent = userData.name;
      tr.appendChild(td);
  
      // Element to show how many posts
      const lengthTd = document.createElement('td');
      if (userData.Posts) {
        lengthTd.textContent = userData.Posts.length;
      } else {
        lengthTd.textContent = '0';
      }
      tr.appendChild(lengthTd);
  
      // "Go to posts" link
      const postsLink = document.createElement('td');
      postsLink.innerHTML = `<td><a href='/billboard?user_id=${userData.id}'>Go to Posts</a></td>`;
      tr.appendChild(postsLink);
  
      // "Create a post" link
      const createLink = document.createElement('td');
      createLink.innerHTML = `<td><a href='/cms?user_id=${userData.id}'>Create a Post</a></td>`;
      tr.appendChild(createLink);
  
      // "Delete user" link
      const deleteLink = document.createElement('td');
      deleteLink.innerHTML = `<td><a style='cursor:pointer;color:red' class='delete-user'>Delete user</a></td>`;
      deleteLink.addEventListener('click', handleDeleteButtonPress);
      tr.appendChild(deleteLink);
  
      // Return the table row
      return tr;
    };
  
    // Helper function to render content when there are no users
    const renderEmpty = () => {
      const alertDiv = document.createElement('div');
      alertDiv.classList.add('alert', 'alert-danger');
      alertDiv.textContent = 'Must have at least one user to post';
      alertDiv.id = 'removeMe';
      alertDiv.style.marginRight = '5px';
      return alertDiv;
    };
  
    const renderuserList = (rows) => {
      userList.innerHTML = '';
  
      if (rows.length) {
        if (document.getElementById('removeMe')) {
          document.getElementById('removeMe').remove();
        }
        rows.forEach((row) => userList.append(row));
      } else {
        document.querySelector('.user-container').appendChild(renderEmpty());
      }
    };
  
    // Grab all the users
    const getusers = () => {
      console.log('Get users is getting called');
      fetch(`/api/userProfile/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('Success in getting users:', users);
          const rowsToAdd = [];
          for (let i = 0; i < data.length; i++) {
            rowsToAdd.push(createuserRow(data[i]));
          }
          renderuserList(rowsToAdd);
          nameInput.value = '';
        })
        .catch((error) => console.error('Error:', error));
    };
  
    // Get the list of users
    getusers();
  });
  