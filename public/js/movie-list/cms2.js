// Helper functions to show/hide elements
const show = (el) => {
  el.style.display = 'block';
};

// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded! 🚀');

  // Get references to the body, title, form and user

  const titleInput = document.getElementById('title');
  const directorInput = document.getElementById('director');
  const yearInput = document.getElementById('year');
  const genreInput = document.getElementById('genre');
  const descriptionInput = document.getElementById('description');
  const cmsForm = document.getElementById('cms2');
  const userSelect = document.getElementById('user');



  // Get query parameter
  const url = window.location.search;
  let movieId;

  let updating = false;

  // Get movie data for editing/adding
  // const getmovieData = (id, type) => {
  //   const queryUrl =
  //     type === 'movie' ? `/api/movie-list${id}` : `/api/movie-list${title}`;

  //   fetch(queryUrl, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data) {
  //         console.log('Success in getting movie:', data);

  //         // Populate the form for editing
  //         titleInput.value = data.title;
  //         directorInput.value = data.director;
  //         yearInput.value = data.year;
  //         genreInput.value = data.genre;
  //         descriptionInput.value = data.description;

  //         movieId = data.title || data.director || data.year || data.genre || data.description

  //         // We are updating
  //         updating = true;
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // };

  // // If movie exists, grab the content of the movie
  // if (url.indexOf('?movie_id=') !== -1) {
  //   movieId = url.split('=')[1];
  //   getmovieData(movieId, 'movie');
  // }
  // // Otherwise if we have an user_id in our url, preset the user select box to be our user
  // else if (url.indexOf('?movie_id=') !== -1) {
  //   userId = url.split('=')[1];
  // }

  // Event handler for when the movie for is submitted
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Make sure the form isn't empty
    if (
      !titleInput.value.trim() ||
      !directorInput.value.trim() ||
      !yearInput.value.trim() ||
      !genreInput.value.trim() ||
      !descriptionInput.value.trim()
      // !userSelect.value
    ) {
      return;
    }

    // Object that will be sent to the db
    const newmovie = {
      title: titleInput.value.trim(),
      director: directorInput.value.trim(),
      year: yearInput.value.trim(),
      genre: genreInput.value.trim(),
      description: descriptionInput.value.trim(),

    };
    submitmovie(newmovie);

  };

  // Attach an event movieener to the form on submit
  cmsForm.addEventListener('submit', handleFormSubmit);

  // Submits new movie then redirects
  const submitmovie = (movie) => {
    fetch('/api/movie-add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),

    }).then((response) => response.json())
      .then((data) => {
        // window.location.href = '/movie-list';
        console.log('Success in submitting post:', data);
        console.log(JSON.stringify(movie))
      })
      .catch((err) => console.error(err));
  };

  // Render a movie of users or redirect if no users
  // const renderusermovie = (data) => {
  //   console.log('renderusermovie -> data', data);
  //   if (!data.length) {
  //     window.location.href = '/users';
  //   }
  //   if (document.querySelector('.hidden')) {
  //     show(document.querySelector('.hidden'));
  //   }

  //   const rowsToAdd = [];

  //   data.forEach((user) => rowsToAdd.push(createuserRow(user)));

  //   userSelect.innerHTML = '';
  //   console.log('renderusermovie -> rowsToAdd', rowsToAdd);
  //   console.log('userSelect', userSelect);

  //   rowsToAdd.forEach((row) => userSelect.append(row));
  //   userSelect.value = userId;
  // };

  // // Build user dropdown
  // const createuserRow = ({ id, name }) => {
  //   const movieOption = document.createElement('option');
  //   movieOption.value = id;
  //   movieOption.textContent = name;
  //   return movieOption;
  // };

  // A function to get users and then call the render function
  // const getusers = () => {
  //   fetch('api/users', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => renderusermovie(data))
  //     .catch((err) => console.error(err));
  // };

  // // Get the users, and their movies
  // getusers();

  // // Update a movie then redirect to blog
  // const updatemovie = (movie) => {
  //   fetch('/api/movies', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(movie),
  //   })
  //     .then(() => {
  //       window.location.href = '/blog';
  //     })
  //     .catch((err) => console.error(err));
  // };
});
