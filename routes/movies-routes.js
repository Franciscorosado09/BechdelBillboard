const db = require('../models');
const passport = require('../config/passport')
const isAuthenticated = require ('../config/middleware/isAuthenticated')
// Routes
module.exports = (app) => {

  app.get('/movie-list', isAuthenticated, (req, res) => {
    if (req.user) {
      res.redirect("/login");
    } 
    db.Movies.findAll({}).then((dbMovies) => res.json(dbMovies));
  });

  app.get('/api/movie-list', isAuthenticated, (req, res) => {
    db.Movies.findAll({}).then((dbMovies) => res.json(dbMovies));
  });

  // app.get('/api/movie-list', (req, res) => {
  //   db.Movies.findAll({
  //     limit: 15,
  //     offset: 0,
  //     where: {}, // conditions
  //   })
  //   .then((dbMovies) => res.json(dbMovies));
  // });
  

  // var upload = multer({ storage: storage }).single('myFile');
  // app.post('/dashboard/myFile', function (req, res) {
  //   upload(req, res, function (err) {
  //     //console.log("owen",req.file,err);
  //     if (err)
  //       return res.end("error uploading file");
  //     res.end("file is uploaded");
  //   });
  // });

  app.get('/api/movie-list/:searchString', (req, res) => {
    db.Movies.findAll({
      where:{

      title: req.params.searchString

      }
    })
    .then((dbMovies) => res.json(dbMovies));

  });
  

  app.post('/api/movie-add', (req, res) => {
    console.log(req.body)
    db.Movies.create({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
      description: req.body.description,
      image: req.body.image,
      // favorites: req.body.favorites,

      // rating: req.body.rating,
    })
      .then((dbMovies) => res.json(dbMovies))
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
        favorites: req.body.favorites,
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
