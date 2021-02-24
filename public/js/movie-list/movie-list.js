// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded! 🚀');
  
    const movieContainer = document.querySelector('.movie-container');
  
    // Variable to hold our movies
    let movies;
  
    const getmovies = (user) => {
      userId = user || '';
      if (userId) {
        userId = `/?user_id=${userId}`;
      }
  
      fetch(`/api/movies${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          movies = data;
          console.log('Success in getting movies:', data);
          if (!data || !data.length) {
            displayEmpty(user);
          } else {
            initializeRows();
          }
        })
        .catch((error) => console.error('Error:', error));
    };
  
    // Get a movie movie from a specific user
    const url = window.location.search;
    let userId;
    if (url.indexOf('?user_id=') !== -1) {
      userId = url.split('=')[1];
      getmovies(userId);
    } else {
      getmovies();
    }
  
    // Front end call to DELETE a movie
    const deletemovie = (id) => {
      fetch(`/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(getmovies());
    };
  
    // Create HTML rows for the movie container
    const initializeRows = () => {
      movieContainer.innerHTML = '';
      const moviesToAdd = [];
  
      movies.forEach((movie) => moviesToAdd.push(createNewRow(movie)));
      moviesToAdd.forEach((movie) => movieContainer.append(movie));
    };
  
    const createNewRow = (movie) => {
      console.log('createNewRow -> movie', movie);
  
      const formattedDate = new Date(movie.createdAt).toLocaleDateString();
  
      const newmovieCard = document.createElement('div');
      newmovieCard.classmovie.add('card');
  
      const newmovieCardHeading = document.createElement('div');
      newmovieCardHeading.classmovie.add('card-header');
  
      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'x';
      deleteBtn.classmovie.add('delete', 'btn', 'btn-danger');
      deleteBtn.addEventListener('click', handlemovieDelete);
  
      // Edit button
      const editButton = document.createElement('button');
      editButton.textContent = 'EDIT';
      editButton.classmovie.add('edit', 'btn', 'btn-info');
      editButton.addEventListener('click', handlemovieEdit);
  
      const newmovieTitle = document.createElement('h2');
      const newmovieDate = document.createElement('small');
      const newmovieuser = document.createElement('h5');
  
      newmovieuser.textContent = `Written by: ${movie.user.name}`;
      newmovieuser.style.float = 'right';
      newmovieuser.style.color = 'blue';
      newmovieuser.style.marginTop = '-10px';
  
      const newmovieCardBody = document.createElement('div');
      newmovieCardBody.classmovie.add('card-body');
  
      const newmovieBody = document.createElement('p');
      newmovieTitle.textContent = `${movie.title} `;
      newmovieBody.textContent = movie.body;
      newmovieDate.textContent = ` (${formattedDate})`;
      newmovieTitle.append(newmovieDate);
      newmovieCardHeading.append(deleteBtn);
      newmovieCardHeading.append(editButton);
      newmovieCardHeading.append(newmovieTitle);
      newmovieCardHeading.append(newmovieuser);
      newmovieCardBody.append(newmovieBody);
      newmovieCard.append(newmovieCardHeading);
      newmovieCard.append(newmovieCardBody);
      newmovieCard.setAttribute('data-movie', JSON.stringify(movie));
  
      console.log('createNewRow -> newmovieCard', newmovieCard);
      return newmovieCard;
    };
  
    // Helper function to display something when there are no movies
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
      messageH2.innerHTML = `No movies yet${partial}, navigate <a href='/cms${query}'>here</a> in order to get started.`;
      movieContainer.append(messageH2);
    };
  
    // Handle when we click the delete movie button
    const handlemovieDelete = (e) => {
      const currentmovie = JSON.parse(
        e.target.parentElement.parentElement.dataset.movie
      );
  
      deletemovie(currentmovie.id);
    };
  
    // Handle when we click the edit movie button
    const handlemovieEdit = (e) => {
      const currentmovie = JSON.parse(
        e.target.parentElement.parentElement.dataset.movie
      );
  
      window.location.href = `/cms?movie_id=${currentmovie.id}`;
    };
  });
  