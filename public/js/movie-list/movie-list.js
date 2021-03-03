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
    // }


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
        console.log(data)
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


  /// Search Shown//-YJK
  const initializeSearch = () => {
    const searches = [];
    console.log("-------------------------------")
    console.log(movies)
    console.log("-------------------------------")


    movies.forEach((movie) => searches.push(createNewRow(movie)));
    searches.forEach((movie) => movieContainer.prepend(movie));
    console.log(searches)
  }

///TESTING-YJK


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

    console.log(movie.image)


    const newmovieTitle = document.createElement('h3');
    const newmovieYear = document.createElement('h3');
    const newmovieGenre = document.createElement('p');
    const newmovieImage = document.createElement('img');

    const imageText = document.createTextNode('This is linked.')
    // console.log(imageText)
    // newmovieImage.append(`${movie.image}`)
    // newmovieImage.href(`${movie.image}`)
    // document.body.prepend(newmovieImage)

    const newmovieuser = document.createElement('h3');

    newmovieuser.textContent = `Directed by: ${movie.director}`;
    newmovieuser.style.float = 'right';
    newmovieuser.style.marginTop = '-10px';

    const newmovieCardDescription = document.createElement('div');

    newmovieCardDescription.classList.add('card-body');

    const newmovieDescription = document.createElement('p');

    // Creating the document Elements so we need to list all movie info

    newmovieTitle.textContent = `${movie.title} `;
    // newmovieImage.append(`${movie.image}`)
    // newmovieImage.href(`${movie.image}`)
    newmovieYear.textContent = `${movie.year}`;
    newmovieGenre.textContent = `${movie.genre}`;
    newmovieDescription.textContent = `${movie.description}`;
    // newmovieImage.textContent = `${movie.image}`;
    // newmovieImage.set
    newmovieImage.src = `${movie.image}`
    newmovieImage.innerHTML = `${movie.image}`
    console.log(newmovieImage)
    console.log(movie.image)


    newmovieCardHeading.append(newmovieImage);
    newmovieCardHeading.append(newmovieTitle);
    newmovieCardHeading.append(newmovieImage);
    newmovieCardDescription.append(newmovieuser);
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


  //~!!!!!!YOUNG JI initializeSearch(data); BUILD FUNCTION.
  // const initializeSearch = () => {
  //   const moviesToAdd = [];
  //   console.log("-------------------------------")
  //   console.log(data)
  //   console.log("-------------------------------")


  //   movies.forEach((data) => moviesToAdd.push(createNewRow(data)));
  //   moviesToAdd.forEach((data) => movieContainer.append(data));
  //   console.log(moviesToAdd)
  // }

  // const charactersList = document.getElementById('charactersList');
 const showmessge = () => {
  movieContainer.innerHTML = '';
    const messageH2 = document.createElement('h2');
    messageH2.style.textAlign = 'center';
    messageH2.style.marginTop = '50px';
    messageH2.innerHTML = 'Nothing Found';
    movieContainer.append(messageH2);
  }
  
  const hidemessge = () => {
    movieContainer.innerHTML = '';
      const messageH2 = document.createElement('h2');
      messageH2.style.textAlign = 'center';
      messageH2.style.marginTop = '50px';
      messageH2.innerHTML = '';
      movieContainer.append(messageH2);
    }

  const searchBar = document.getElementById('searchBar');
  let searchString = [];


  searchBar.addEventListener("keyup", e => {
    const searchString = e.target.value;
    fetch(`/api/movie-list/${searchString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        movies = data
        console.log('Success in searching movies:', data);
        if (!data || !data.length) {
          showmessge()
        } else {
        hidemessge()
        initializeSearch(movies);
        }
      })
      .catch((error) => console.error('Error:', error));
  })



});


//////////////////////



  // const pages = [6000]/60

  // const createNewPages = (movie) => {
  //   const pagination = document.querySelector(".pagination");
  //   const page= document.createElement("li")
  //   const pageNumber= document.createElement ("a")
  //   pageNumber.classList("page-link")
  //   pageNumber.textContent= `${count}`
  //   page.append(pageNumber)
  //   pagination.innerHTML= ' '

  // }

  // for (let index = 0; index < 100; index++) {
  //   const count = index;

  //   if(count < 1) {
  //   var divCreate = `
  //   <div id = ${count}>
  //   <a href="#" data-value="1-60">1</a>
  //   <a href="#">2</a>
  //   <a href="#">3</a>
  //   <a href="#">4</a>
  //   <a href="#">5</a>
  //   <a href="#">6</a>
  //   <a href="#">7</a>
  //   <a href="#">8</a>
  //   </div>`
  // }
  // else {
  //   var divCreate = `
  //   <div id = ${count} style ="display:none">
  //   <a href="#">1</a>
  //   <a href="#">2</a>
  //   <a href="#">3</a>
  //   <a href="#">4</a>
  //   <a href="#">5</a>
  //   <a href="#">6</a>
  //   <a href="#">7</a>
  //   <a href="#">8</a>
  //   </div>`
  // }

  // }


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

  // const filteredCharacters = hpCharacters.filter((character) => {
  //   return (
  //     character.name.toLowerCase().includes(searchString) ||
  //     character.house.toLowerCase().includes(searchString)
  //   );
  // }),
  // displayCharacters(filteredCharacters);


  // const loadCharacters = async () => {
  //     try {
  //         const res = await fetch('https://hp-api.herokuapp.com/api/characters');
  //         hpCharacters = await res.json();
  //         displayCharacters(hpCharacters);
  //     } catch (err) {
  //         console.error(err);
  //     }
  // };





  // const charactersList = document.getElementById('charactersList');
  //   const searchBar = document.getElementById('searchBar');
  //   let searchString = [];


  //   searchBar.addEventListener('keyup', (e) => {
  //     fetch(`/api/movie-list/${searchString}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         //const movies
  //         movies = data;
  //         console.log(data)
  //         console.log('Success in getting movies:', data);
  //         if (!data || !data.length) {
  //           displayEmpty();
  //         } else {
  //           initializeRows(movies);

  //         }
  //       })
  //       .catch((error) => console.error('Error:', error));
  //   })

  // });

  //getmovies()

  // const list_element = document.getElementById("moviesListed");
  // const pagination_element =document.getElementById("pagination");

  // let current_page = 1;
  // let rows = 10;

  // displayList = (items,wrapper,rows_per_page,page) => {
  //   wrapper.innerHTML = "";
  // 	page--;

  // 	let start = rows_per_page * page;
  // 	let end = start + rows_per_page;
  // 	let paginatedItems = items.slice(start, end);

  // 	for (let i = 0; i < paginatedItems.length; i++) {
  // 		let item = paginatedItems[i];

  // 		let item_element = document.createElement('div');
  // 		item_element.classList.add('item');
  // 		item_element.innerText = item;

  // 		wrapper.appendChild(item_element);
  // 	}
  // }

  // setupPagination = (items, wrapper, rows_per_page) => {
  //   wrapper.innerHTML = "";

  // 	let page_count = Math.ceil(items.length / rows_per_page);
  // 	for (let i = 1; i < page_count + 1; i++) {
  // 		let btn = PaginationButton(i, items);
  // 		wrapper.appendChild(btn);
  // 	}

  // }

  // PaginationButton = (page,items) => {

  //   let button = document.createElement('button');
  // 	button.innerText = page;

  // 	if (current_page == page) button.classList.add('active');

  // 	button.addEventListener('click', function () {
  // 		current_page = page;
  // 		displayList(items, list_element, rows, current_page);

  // 		let current_btn = document.querySelector('.pagenumbers button.active');
  // 		current_btn.classList.remove('active');

  // 		button.classList.add('active');
  // 	});

  // 	return button;
  // }
  // displayList(newmovieCard, list_element, rows, current_page);
  // setupPagination(newmovieCard, pagination_element, rows);



  // const charactersList = document.getElementById('charactersList');
  // const searchBar = document.getElementById('searchBar');
  // let hpCharacters = [];

  // searchBar.addEventListener('keyup', (e) => {
  //   const searchString = () => {
  //     fetch(`/api/movie-list`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //const movies

  //       movies = data;
  //       console.log(data)
  //       console.log('Success in getting movies:', data);
  //       if (!data || !data.length) {
  //         displayEmpty();
  //       } else {
  //         initializeRows(movies);

  //       }
  //     })
  //     .catch((error) => console.error('Error:', error));
  //   }
  // const searchString = e.target.value.toLowerCase();


  // const filteredCharacters = hpCharacters.filter((character) => {
  //     return (
  //         character.name.toLowerCase().includes(searchString) ||
  //         character.house.toLowerCase().includes(searchString)
  //     );
  // });
  // displayCharacters(filteredCharacters);

  // const loadCharacters = async () => {
  //     try {
  //         const res = await fetch('https://hp-api.herokuapp.com/api/characters');
  //         hpCharacters = await res.json();
  //         displayCharacters(hpCharacters);
  //     } catch (err) {
  //         console.error(err);
  //     }
  // };

  // const displayCharacters = (characters) => {
  //     const htmlString = characters
  //         .map((character) => {
  //             return `
  //             <li class="character">
  //                 <h2>${character.name}</h2>
  //                 <p>House: ${character.house}</p>
  //                 <img src="${character.image}"></img>
  //             </li>
  //         `;
  //         })
  //         .join('');
  //     charactersList.innerHTML = htmlString;
  // };

  // loadCharacters();



