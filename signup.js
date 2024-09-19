document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting by default

  // Get the password value from the input field
  const password = document.getElementById("passwordField").value;

  // Check if the password is '1234'
  if (password === "1234") {
    // Redirect to the next page
    window.location.href = "nextpage.html"; // Change "nextpage.html" to your desired page
  } else {
    // If password is incorrect, alert the user
    alert("Incorrect password. Please try again.");
  }
});

document.getElementById("signup").addEventListener("click", function () {
  window.location.href = "home.html";
});
