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
  let titleId;
  let directorId;
  let yearID;
  let genreID;
  let descriptionID;
  let updating = false;

  // Get movie data for editing/adding
  const getmovieData = (id, type) => {
    const queryUrl =
      type === 'movie' ? `/api/movies/` : `/api/movies/${id}`;

    fetch(queryUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log('Success in getting movie:', data);

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

  // If movie exists, grab the content of the movie
  if (url.indexOf('?movie_id=') !== -1) {
    movieId = url.split('=')[1];
    getmovieData(movieId, 'movie');
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our user
  else if (url.indexOf('?user_id=') !== -1) {
    userId = url.split('=')[1];
  }

  // Event handler for when the movie for is submitted
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
    const newmovie = {
      title: titleInput.value.trim(),
      body: bodyInput.value.trim(),
      userId: userSelect.value,
    };

    // Update a movie if flag is true, otherwise submit a new one
    if (updating) {
      newmovie.id = movieId;
      updatemovie(newmovie);
    } else {
      submitmovie(newmovie);
    }
  };

  // Attach an event movieener to the form on submit
  cmsForm.addEventListener('submit', handleFormSubmit);

  // Submits new movie then redirects
  const submitmovie = (movie) => {
    fetch('/api/movies', {
      method: 'movie',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
      .then(() => {
        window.location.href = '/blog';
      })
      .catch((err) => console.error(err));
  };

  // Render a movie of users or redirect if no users
  const renderusermovie = (data) => {
    console.log('renderusermovie -> data', data);
    if (!data.length) {
      window.location.href = '/users';
    }
    if (document.querySelector('.hidden')) {
      show(document.querySelector('.hidden'));
    }

    const rowsToAdd = [];

    data.forEach((user) => rowsToAdd.push(createuserRow(user)));

    userSelect.innerHTML = '';
    console.log('renderusermovie -> rowsToAdd', rowsToAdd);
    console.log('userSelect', userSelect);

    rowsToAdd.forEach((row) => userSelect.append(row));
    userSelect.value = userId;
  };

  // Build user dropdown
  const createuserRow = ({ id, name }) => {
    const movieOption = document.createElement('option');
    movieOption.value = id;
    movieOption.textContent = name;
    return movieOption;
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
      .then((data) => renderusermovie(data))
      .catch((err) => console.error(err));
  };

  // Get the users, and their movies
  getusers();

  // Update a movie then redirect to blog
  const updatemovie = (movie) => {
    fetch('/api/movies', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
      .then(() => {
        window.location.href = '/blog';
      })
      .catch((err) => console.error(err));
  };
});
