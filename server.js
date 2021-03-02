const express = require('express');
const session = require("express-session");
const passport = require("./config/passport");


//const exphbs = require('express-handlebars');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Static directory
app.use(express.static('public'));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
//app.set('view engine', 'handlebars');

// Routes
require('./routes/billboard-routes.js')(app);
// require('./routes/html-routes.js')(app)
require('./routes/movies-routes.js')(app)
require('./routes/user-profile-routes.js')(app)


db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});

//for passport - to be added later and remove above port code.
// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });
