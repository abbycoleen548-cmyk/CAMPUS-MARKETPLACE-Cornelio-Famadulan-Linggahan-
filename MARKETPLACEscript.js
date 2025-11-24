// GET ELEMENTS
const authModal = document.getElementById("auth-modal");
const mainContent = document.getElementById("main-content");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const toggleAuth = document.getElementById("toggle-auth");
const usernameDisplay = document.querySelector(".username");
const popup = document.getElementById("popup-success");
const popupText = document.getElementById("popup-text");
const popupClose = document.getElementById("popup-close");

// TOGGLE LOGIN / SIGN UP
toggleAuth.addEventListener("click", () => {
  const isLoginVisible = loginForm.style.display !== "none";

  loginForm.style.display = isLoginVisible ? "none" : "flex";
  signupForm.style.display = isLoginVisible ? "flex" : "none";
  toggleAuth.innerText = isLoginVisible ? "Switch to Login" : "Switch to Sign Up";
});

// SHOW POPUP MESSAGE
function showPopup(message) {
  popupText.textContent = message;
  popup.style.display = "flex";
}
popupClose.addEventListener("click", () => {
  popup.style.display = "none";
});

// SIGNUP
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const pass = document.getElementById("signup-pass").value;

  localStorage.setItem("user", JSON.stringify({ name, email, pass }));
  signupForm.reset();
  showPopup("Account created! Please login.");
  toggleAuth.click();  // switch to login
});

// LOGIN
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.pass === pass) {
    authModal.style.display = "none";
    mainContent.style.display = "block";
    usernameDisplay.textContent = `👋 Hello, ${user.name}`;
  } else {
    showPopup("❌ Wrong Email or Password!");
  }
});

// LOGOUT
document.getElementById("logout-btn").addEventListener("click", () => {
  authModal.style.display = "flex";
  mainContent.style.display = "none";

// SIGNUP
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const pass = document.getElementById("signup-pass").value;

  let formData = new FormData();
  formData.append("full_name", name);
  formData.append("email", email);
  formData.append("password", pass);

  fetch("signup.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    if (data === "success") {
      showPopup("Account Created! Please Login.");
      toggleAuth.click();
    } else {
      showPopup("❌ Email already exists.");
    }
  });
});

// LOGIN
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;

  let formData = new FormData();
  formData.append("email", email);
  formData.append("password", pass);

  fetch("login.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    if (data.startsWith("success")) {
      let user = data.split("|")[1];
      usernameDisplay.textContent = `👋 Hello, ${user}`;
      authModal.style.display = "none";
      mainContent.style.display = "block";
    } else if (data === "wrong_pass") {
      showPopup("❌ Wrong Password!");
    } else {
      showPopup("❌ No Account Found!");
    }
  });
});


});
