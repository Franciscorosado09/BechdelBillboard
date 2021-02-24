const db = require('../models');

// Routes
module.exports = (app) => {

    //** Need to add details to query movie information into billboard post. **

    app.get('/api/billboard-posts', (req, res) => {
        const query = {};
        if (req.query.user_id) {
          query.UserId = req.query.user_id;
          query.MovieID = req.query.movie_id
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Billboard.findAll({
          where: query,
          include: [db.User],
        }).then((dbBillboard) => res.json(dbBillboard));
      });
    
      // Get route for retrieving a single post
      app.get('/api/billboard-posts/:id', (req, res) => {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Billboard.findOne({
          where: {
            id: req.params.id,
          },
          include: [db.User, db.Movies],
        }).then((dbBillboard) => res.json(dbBillboard));
      });
    
      // POST route for saving a new post
      //
      app.post('/api/billboard-posts', (req, res) => {
        db.Billboard.create(req.body.post).then((dbBillboard) => res.json(dbBillboard));
      });
    
      // DELETE route for deleting posts
      app.delete('/api/billboard-posts/:id', (req, res) => {
        db.Billboard.destroy({
          where: {
            id: req.params.id,
          },
        }).then((dbBillboard) => res.json(dbBillboard));
      });
    
      // PUT route for updating posts
      app.put('/api/billboard-posts/:id', (req, res) => {
        db.Billboard.update(req.body, {
          where: {
            id: req.body.id,
          },
        }).then((dbBillboard) => res.json(dbBillboard));
      });





};