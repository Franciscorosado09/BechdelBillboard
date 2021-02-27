// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded! 🚀');

  const movieContainer = document.querySelector('.movies-container');

  // Variable to hold our movies
  let movie;
 
  // user
  const getmovies = () => {
    // userId = user || '';
    // if (userId) {
    //   userId = `/?user_id=${userId}`;
    // 
    

    fetch(`/api/movie-list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        //const movies
 
        movies = data;
        console.log('Success in getting movies:', data);
        if (!data || !data.length) {
          displayEmpty();
        } else {
          initializeRows(movies);
          
        }
      })
      .catch((error) => console.error('Error:', error));
      
  };



  // Get a movie movie from a specific user
  // const url = window.location.search;
  // let userId;
  // if (url.indexOf('?user_id=') !== -1) {
  //   userId = url.split('=')[1];
  //   getmovies(userId);
  // } else {
  //   getmovies();
  // }

  // Front end call to DELETE a movie
  // const deletemovie = (id) => {
  //   fetch(`/api/movies/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(getmovies());
  // };
  getmovies()
  // Create HTML rows for the movie container
  const initializeRows = () => {

    
    movieContainer.innerHTML = '';
    const moviesToAdd = [];
    console.log("-------------------------------")
    console.log(movies)
    console.log("-------------------------------")


    movies.forEach((movie) => moviesToAdd.push(createNewRow(movie)));
    moviesToAdd.forEach((movie) => movieContainer.append(movie));
    console.log(moviesToAdd)
  };

  const createNewRow = (movie) => {
    console.log('createNewRow -> movie', movie);


    const newmovieCard = document.createElement('div');
    newmovieCard.classList.add('card');


    const newmovieCardHeading = document.createElement('div');
    newmovieCardHeading.classList.add('card-header');
    

  

    const newmovieTitle = document.createElement('h3');
    const newmovieYear = document.createElement('h3');
    const newmovieGenre = document.createElement('p');



   
    const newmovieuser = document.createElement('h3');

    newmovieuser.textContent = `Directed by: ${movie.director}`;
    newmovieuser.style.float = 'right';
    newmovieuser.style.marginTop = '-10px';

    const newmovieCardDescription = document.createElement('div');

    newmovieCardDescription.classList.add('card-body');

    const newmovieDescription = document.createElement('p');

    // Creating the document Elements so we need to list all movie info
    newmovieTitle.textContent = `${movie.title} `;
  
    newmovieYear.textContent = `${movie.year}`;
    newmovieGenre.textContent = `${movie.genre}`;
    newmovieDescription.textContent = `${movie.description}`;
   

    newmovieCardHeading.append(newmovieTitle);
    newmovieCardHeading.append(newmovieuser);
    newmovieCardDescription.append(newmovieYear);
    newmovieCardDescription.append(newmovieGenre);
    newmovieCardDescription.append(newmovieDescription);

    newmovieCard.append(newmovieCardHeading);
    newmovieCard.append(newmovieCardDescription);
    newmovieCard.setAttribute('data-movie', JSON.stringify(movies));

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
  // const handlemovieDelete = (e) => {
  //   const currentmovie = JSON.parse(
  //     e.target.parentElement.parentElement.dataset.movie
  //   );

  //   deletemovie(currentmovie.id);
  // };

  // // Handle when we click the edit movie button
  // const handlemovieEdit = (e) => {
  //   const currentmovie = JSON.parse(
  //     e.target.parentElement.parentElement.dataset.movie
  //   );

  //   window.location.href = `/cms2?movie_id=${currentmovie.id}`;
  // };

  
});

getmovies()