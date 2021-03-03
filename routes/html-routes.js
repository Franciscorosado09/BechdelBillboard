// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/userProfile");
    }
    res.sendFile(path.join(__dirname, "../public/userProfile.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/userProfile");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/userProfile", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/userProfile.html"));
  });

  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/userProfile");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/userProfile");
    } 
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/userProfile", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/userProfile.html"));
  });


  app.get("/movie-list", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/movie-list");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });


  app.get("/movie-add", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/movie-add");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/billboard", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/billboard");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/billboard-add", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/billboard-add");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // app.get("/billboard-add", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/billboard-add.html"));
  // });

  // app.get("/billboard", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/billboard.html"));
  // });

  // app.get("/movie-list", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/movie-list.html"));
  // });

  // app.get("/billboard", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/billboard.html"));
  // });
};
