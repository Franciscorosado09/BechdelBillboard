// Dependencies

// Requiring our models
const db = require('../models');

///<-- add 1 

// Routes
module.exports = (app) => {
  app.get('/api/login', (req, res) => {
    const query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Login.findAll({
      where: query,
      include: [db.Author],
    }).then((dbLogin) => res.json(dbLogin));
  });

  // Get route for retrieving a single Login
  app.get('/api/login/:id', (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Login.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Author],
    }).then((dbLogin) => res.json(dbLogin));
  });

  // POST route for saving a new Login
  app.post('/api/login', (req, res) => {
    db.Login.create(req.body).then((dbLogin) => res.json(dbLogin));
  });

  // DELETE route for deleting Login
  app.delete('/api/login/:id', (req, res) => {
    db.Login.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbLogin) => res.json(dbLogin));
  });

  // PUT route for updating Login
  app.put('/api/login', (req, res) => {
    db.Login.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((dbLogin) => res.json(dbLogin));
  });
};
