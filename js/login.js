const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const continueBtn = document.getElementById("continueBtn");
const btnLabel = document.getElementById("btnLabel");
const btnSpinner = document.getElementById("btnSpinner");
const eyeToggle = document.getElementById("eyeToggle");
const remember = document.getElementById("remember");
const googleBtn = document.getElementById("googleBtn");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Check if email is valid by using regex
function isEmailValid(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Show error under a specific field
function showFieldError(field, message) {
  if (field === "email") {
    emailError.textContent = message;
    emailError.classList.add("show");
    emailInput.classList.add("error");
  }
  if (field === "password") {
    passwordError.textContent = message;
    passwordError.classList.add("show");
    passInput.classList.add("error");
  }
}

//  Hide error under a specific field
function hideFieldError(field) {
  if (field === "email") {
    emailError.classList.remove("show");
    emailError.textContent = "";
    emailInput.classList.remove("error");
  }
  if (field === "password") {
    passwordError.classList.remove("show");
    passwordError.textContent = "";
    passInput.classList.remove("error");
  }
}

function hideAllErrors() {
  hideFieldError("email");
  hideFieldError("password");
}

// Shows error under the right field
// Returns true if everything is valid
function validate(email, password) {
  let valid = true;

  if (!email) {
    showFieldError("email", "Please enter your email address.");
    valid = false;
  } else if (!isEmailValid(email)) {
    showFieldError("email", "Please enter a valid email address.");
    valid = false;
  }

  if (!password) {
    showFieldError("password", "Please enter your password.");
    valid = false;
  } else if (password.length < 6) {
    showFieldError("password", "Password must be at least 6 characters.");
    valid = false;
  }

  return valid;
}

function setLoading(isLoading) {
  continueBtn.disabled = isLoading;
  continueBtn.classList.toggle("loading", isLoading);
}

eyeToggle.addEventListener("click", () => {
  const isHidden = passInput.type === "password";
  passInput.type = isHidden ? "text" : "password";
  eyeToggle.classList.toggle("visible", isHidden);
});

//Clear email error as user types in email field
emailInput.addEventListener("input", () => {
  hideFieldError("email");
});

// Clear password error as user types in password field
passInput.addEventListener("input", () => {
  hideFieldError("password");
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  hideAllErrors();

  const email = emailInput.value.trim();
  const password = passInput.value;

  const isValid = validate(email, password);
  if (!isValid) return;
});
