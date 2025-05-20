// darkModeToggle.js

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  // Optional: save user preference in localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.removeItem("darkMode");
  }
}

// On page load, check if user previously enabled dark mode
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
});
