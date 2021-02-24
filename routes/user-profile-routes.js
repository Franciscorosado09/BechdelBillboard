// Dependencies

// Requiring our models
const db = require('../models');

///<-- add 1 

// Routes
module.exports = (app) => {
  app.get('/api/profile', (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.User.findAll({
      where: query,
      include: [db.Billboard],
    }).then((dbUser) => res.json(dbUser));
  });

  // Get route for retrieving a single Login
  app.get('/api/profile/:id', (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.User.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Movies],
    }).then((dbLogin) => res.json(dbLogin));
  });

  // POST route for saving a new Login
  app.post('/api/login', (req, res) => {
    db.Login.create(req.body).then((dbUser) => res.json(dbUser));
  });

  // DELETE route for deleting Login
  app.delete('/api/login/:id', (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbUser) => res.json(dbUser));
  });

  // PUT route for updating Login
  app.put('/api/login', (req, res) => {
    db.User.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((dbUser) => res.json(dbUser));
  });
};
