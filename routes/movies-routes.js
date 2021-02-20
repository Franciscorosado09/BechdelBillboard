const db = require('../models');

// Routes
module.exports = (app) => {

  app.get('/api/movies', (req, res) => {
    db.Movies.findAll({}).then((dbMovies) => res.json(dbMovies));
  });


  app.post('/api/movies', (req, res) => {
    db.Movies.create({
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      genre: req.body.description,
      rating: req.body.rating,
    })
      .then((dbMovies) => res.json(dbMovies))
      .catch((err) => res.json(err));
  });


  app.delete('/api/movies/:id', (req, res) => {

    db.Movies.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbMovies) => res.json(dbMovies));
  });


  app.put('/api/movies/:id', (req, res) => {
    db.Movies.update(
      {
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        genre: req.body.description,
        rating: req.body.rating,
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
