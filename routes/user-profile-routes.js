// Dependencies

// Requiring our models
const db = require('../models');
const passport = require('../config/passport')
const isAuthenticated = require ('../config/middleware/isAuthenticated')


// Routes
module.exports = (app) => {
  app.get('/api/profile', isAuthenticated,(req, res) => {  
    const query = {};
    query.id = req.user.id
    // if (req.user_id) {
    //   UserId = req.user_id;
    // }
    // Here we add an "include" property to our options in our findAll query


    db.User.findAll({
      where: query,
      include: [{model: db.Billboard}],
    }).then((dbUser) => res.json(dbUser));
  });

  // Get route for retrieving a single Login
  app.get('/api/profile/:id', (req, res) => {
    // Here we add an "include" property to our options in our findOne query

    db.User.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Movies],
    }).then((dbLogin) => res.json(dbLogin));
  });

  // POST route for saving a new Login
  app.post("/api/login", passport.authenticate("local"), (req, res) => { 
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
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

///////////////////// -- 

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
app.post("/api/signup", (req, res) => { 
  db.User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// Route for logging user out
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
app.get("/api/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      id: req.user.id,
      email: req.user.email,
    });
  }
});

};
