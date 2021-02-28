// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded! 🚀');

    const userContainer = document.querySelector('.user-container');
   
    let user;
    
  //fetch user email for profile card.
    const getUserDetails = () => {

      fetch(`/api/user_data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          users = data;
          console.log('Success in getting user information:', data);
          addEmail(users)

        })
        .catch((error) => console.error('Error:', error));
    };
  
    getUserDetails()

    const addEmail = (users) => {
        console.log("Hello")
        console.log('createNewRow -> user', users)
        const email = document.getElementById('email');

        email.textContent = `Email: ${users.email}`

    }

    // const getUserPosts = () => {

    //     fetch(`/api/user_data`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         users = data;
    //         console.log('Success in getting user information:', data);
    //         addEmail(users)
  
    //       })
    //       .catch((error) => console.error('Error:', error));
    //   };

    // getUserPosts();
  
  });
  