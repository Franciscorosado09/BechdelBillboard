// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded! 🚀');

  // Get references to the post, title, form and user
  const postInput = document.getElementById('post');
  const titleInput = document.getElementById('title');
  const cmsForm = document.getElementById('cms');
  const userSelect = document.getElementById('user');
  const imageAdd = document.getElementById('image');
  // Get query parameter
  const url = window.location.search;
  let billboardId;
  let userId;
  let updating = false;

  

  // Get billboard data for editing/adding
  const getbillboardData = (id, type) => {
    console.log("I'm inside getBillboard")
    const queryUrl =
      type === 'billboard' ? `/api/billboard/${id}`: 
       `/api/user_data/${id}`;

    fetch(queryUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log('Success in getting billboard:', data);
          //data.userId = users.email
          // Populate the form for editing
          titleInput.value = data.title;
          postInput.value = data.post;
          imageAdd.value = data.image
          userSelect.value = data.userId;
         


          console.log(data.userId)
          updating = true;

        }
      })
      .catch((err) => console.error(err));

      
  };
 
  
  // If billboard exists, grab the content of the billboard
  if (url.indexOf('?billboard_id=') !== 0) {
    console.log('grabbing edit')
    billboardId = url.split('=')[1];
    getbillboardData(billboardId, 'billboard');
    console.log(billboardId)
  } else {
    console.log('no post to edit.')
  }
  // // // Otherwise if we have an user_id in our url, preset the user select box to be our user
  // else if (url.indexOf('?user_id=') !== -1) {
  //   userId = url.split('=')[1];
  // }
  //getbillboardData(billboardId, 'billboard')

  // Event handler for when the billboard for is submitted
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Make sure the form isn't empty
    if (
      !titleInput.value.trim() ||
      !postInput.value.trim() ||
      !imageAdd.value.trim()||
      !userSelect.value
    ) {
      return;
    }

    // Object that will be sent to the db
    const newbillboard = {
      title: titleInput.value.trim(),
      post: postInput.value.trim(),
      image: imageAdd.value.trim(),
      userId: userSelect.value,
    };
    
    //submitbillboard(newbillboard);

    // Update a billboard if flag is true, otherwise submit a new one
    if (updating) {
      newbillboard.id = billboardId;
      updatebillboard(newbillboard);
    } else {
      //newbillboard.id = billboardId;
      submitbillboard(newbillboard);
    }
  };

  // Attach an event listener to the form on submit
  cmsForm.addEventListener('submit', handleFormSubmit);

  // Submits new billboard then redirects
  const submitbillboard = (billboard) => {
    fetch('/api/billboard-add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(billboard),

    }).then((response) => response.json())
      .then((data) => {
        window.location.href = '/billboard.html';
        console.log(data)
        console.log('Success in submitting post:', data);
        console.log(JSON.stringify(billboard))
        console.log(userId)

      })
      // console.log(billboard)
      

      .catch((err) => console.error(err));
  };

  // Render a list of users or redirect if no users

    const renderUser = (users) => {
      console.log("Hello")
      console.log('createNewRow -> user', users)
      const email = document.getElementById('user');
      
      email.textContent = `${users.email}`
      userId = users.id
      userSelect.value = userId
      console.log(userId)
      console.log(userSelect.value)
    }

    
  // const renderuserList = (data) => {
  //   console.log('renderuserList -> data', data);
  //   if (!data.length) {
  //     window.location.href = '/users';
  //   }
  //   if (document.querySelector('.hidden')) {
  //     show(document.querySelector('.hidden'));
  //   }

  //   const rowsToAdd = [];

  //   data.forEach((user) => rowsToAdd.push(createuserRow(user)));

  //   userSelect.innerHTML = '';
  //   console.log('renderuserList -> rowsToAdd', rowsToAdd);
  //   console.log('userSelect', userSelect);

  //   rowsToAdd.forEach((row) => userSelect.append(row));
  //   userSelect.value = userId;
  // };

  // Build user dropdown
  // const createuserRow = ({ id, email }) => {
  //   const listOption = document.createElement('option');
  //   listOption.value = id;
  //   listOption.textContent = email;
  //   return listOption;
  // };

  // A function to get users and then call the render function
  const getusers = () => {
    
    fetch('api/user_data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //  body: JSON.stringify(billboard)
    })
      .then((response) => response.json())
      .then((data) => {
        users = data
        // users = {
        //   id: data.id,
        //   email: data.email
        // }
        console.log('Success in getting user information:', data);
        renderUser(users)

      })
      .catch((err) => console.error(err));
      
     
  };

  // // Get the users, and their billboards
  getusers();

  // Update a billboard then redirect to billboard
  const updatebillboard = (billboard) => {
    console.log('Inside Update')
    fetch(`/api/billboard-add/:id`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(billboard),
    })
      .then(() => {
        console.log("Success in Put!")
       window.location.href = '/billboard.html';
      })
      .catch((err) => console.error(err));
  };

 
  
});


