const express = require('express');
const session = require("express-session");
const passport = require("./config/passport");
// const exphbs = require('express-handlebars');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
//const handlebars = require('express-handlebars');

// app.engine('handlebars', handlebars({ layoutsDir: __dirname + '/views' }));
// app.set('view engine', 'handlebars');
// app.get('/', (req, res) => {
//   //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
//   res.render('main', {layout : 'index'});
//   });


  //Sets our app to use the handlebars engine
// app.set('view engine', 'handlebars');
// //Sets handlebars configurations (we will go through them later on)
// app.engine('handlebars', handlebars({
// layoutsDir: __dirname + '/views/layouts',
// }));

// app.get('/', (req, res) => {
//   //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
//   res.render('main', {layout : 'index'});
//   });
  



// app.set('views', __dirname + '/views');

// Static directory
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));

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


db.sequelize.sync({ force: true }).then(() => {
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
