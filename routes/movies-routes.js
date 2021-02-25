const db = require('../models');

// Routes
module.exports = (app) => {

  app.get('/api/movie-list', (req, res) => {
    db.Movies.findAll({}).then((dbMovies) => res.json(dbMovies));
  });


  app.post('/api/movie-list', (req, res) => {
    db.Movies.create({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
      description: req.body.description,
      image: req.body.image,
      
      // rating: req.body.rating,
    })
      .then((dbMovies) => res.send(dbMovies))
      .catch((err) => res.json(err));

  
  });


  app.delete('/api/movie-list/:id', (req, res) => {

    db.Movies.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbMovies) => res.json(dbMovies));
  });


  app.put('/api/movie-list/:id', (req, res) => {
    db.Movies.update(
      {
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        genre: req.body.genre,
        description: req.body.description,
        image: req.body.image,
        //rating: req.body.rating,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then((dbMovies) => res.json(dbMovies))
      .catch((err) => res.json(err));
  });
};
