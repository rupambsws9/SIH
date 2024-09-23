const loginBtn = document.getElementById("login-btn");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");

// Define the correct password
const correctPassword = "1234";

loginBtn.addEventListener("click", function () {
  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  // Basic validation: check if inputs are empty
  if (!usernameInput || !passwordInput) {
    showErrorMessage("Please fill in both fields.");
    return;
  }

  // Check if password is correct
  if (passwordInput === correctPassword) {
    // Hide error message and show success message
    hideErrorMessage();
    showSuccessMessage("Login successful! Redirecting...");

    // Store username and login status in localStorage
    localStorage.setItem("username", usernameInput);
    localStorage.setItem("loggedIn", "true"); // Set login flag

    // Simulate redirection after 2 seconds
    setTimeout(function () {
      window.location.href = "home.html"; // Redirect to home page
    }, 2000);
  } else {
    showErrorMessage("Invalid password. Please try again.");
    hideSuccessMessage();
  }
});

// Helper functions for showing and hiding messages
function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideErrorMessage() {
  errorMessage.style.display = "none";
}

function showSuccessMessage(message) {
  successMessage.textContent = message;
  successMessage.style.display = "block";
}

function hideSuccessMessage() {
  successMessage.style.display = "none";
}
