// Login form elements
const loginOpnBtn = document.querySelector("#button-openform");
const loginBox = document.querySelector(".container-login");
const signupOpnBtn = document.querySelector(".button-login-signup");
const signupBox = document.querySelector(".container-signup");
const closebtn = document.querySelector(".closeButton");
const closebtnSignUp = document.querySelector(".closeButtonSignup");
const forgetPWLin = document.querySelector(".forgetPWLink");
const forgetP = document.querySelector(".forgetPW");
const closeButtonForgetP = document.querySelector(".closeButtonForgetPW");

// Toggle Login Form
loginOpnBtn.addEventListener("click", function () {
  loginBox.classList.toggle("show");
  signupBox.classList.remove("show");
  forgetP.classList.remove("show");
});

// Toggle Signup Form
signupOpnBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  signupBox.classList.toggle("show");
  loginBox.classList.remove("show");
  forgetP.classList.remove("show");
});

// Toggle Forgot Password Form
forgetPWLin.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  forgetP.classList.toggle("show");
  loginBox.classList.remove("show");
  signupBox.classList.remove("show");
});

// Close Forgot Password Form
closeButtonForgetP.addEventListener("click", function () {
  forgetP.classList.remove("show");
});

// Handle Login Form Submission
document
  .querySelector(".container-login form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    const password = document.querySelector("#login-password").value;

    if (password === "1234") {
      alert("Login successful!");
      window.location.href = "home.html"; // Redirect to another page
    } else {
      alert("Invalid password");
    }
  });

// Add highlight effect on input focus
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.classList.add("highlight");
  });

  input.addEventListener("blur", function () {
    this.classList.remove("highlight");
  });
});
document.getElementById("signup").addEventListener("click", function () {
  window.location.href = "signup.html";
});
