document.getElementById("login-btn-auth").addEventListener("click", () => {
  document.getElementById("auth-form").classList.remove("hidden");
  document.getElementById("auth-title").textContent = "Login";
});

document.getElementById("signup-btn-auth").addEventListener("click", () => {
  document.getElementById("auth-form").classList.remove("hidden");
  document.getElementById("auth-title").textContent = "Sign Up";
  document.getElementById("toggle-link").textContent = "Login";
});

// TOGGLE LOGIN <-> SIGNUP
document.getElementById("toggle-link").addEventListener("click", () => {
  const title = document.getElementById("auth-title").textContent;
  document.getElementById("auth-title").textContent =
    title === "Login" ? "Sign Up" : "Login";
});

// SUBMIT LOGIN FORM -> SHOW WEBSITE
document.getElementById("auth-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("auth-screen").style.display = "none";
  document.getElementById("main-website").classList.remove("hidden");
});
