$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      console.log("Hi here!");
      const alertContainer = document.createElement('div')
      alertContainer.textContent = '<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>Enter a valid email address</div>'
      const addContainer = document.getElementById('alertcontainer')
      addContainer.setAttribute('style', 'visibility: visible')
      addContainer.append(alertContainer)
      console.log(alertContainer)
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {

          window.location.replace("/userProfile.html");
      
        
        
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});
