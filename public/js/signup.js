document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const username = document.querySelector("input[type='text']");
    const email = document.querySelector("input[type='email']");
    const password = document.querySelector("input[type='password']");
    const confirmPassword = document.querySelectorAll("input[type='password']")[1];
    const termsCheckbox = document.getElementById("terms");
    
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let valid = true;
      
      // Reset previous errors
      document.querySelectorAll(".error-message").forEach(el => el.remove());
      
      // Username validation
      if (username.value.trim() === "") {
        showError(username, "Username is required.");
        valid = false;
      }
      
      // Email validation
      if (!validateEmail(email.value)) {
        showError(email, "Enter a valid email address.");
        valid = false;
      }
      
      // Password validation
      if (password.value.length < 8) {
        showError(password, "Password must be at least 8 characters long.");
        valid = false;
      }
      
      // Confirm password validation
      if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "Passwords do not match.");
        valid = false;
      }
      
      // Terms and conditions validation
      if (!termsCheckbox.checked) {
        showError(termsCheckbox, "You must agree to the Terms of Service.");
        valid = false;
      }
      
      if (valid) {
        alert("Signup successful!"); // Replace with actual form submission logic
        form.submit();
      }
    });
    
    function showError(input, message) {
      const error = document.createElement("div");
      error.classList.add("error-message");
      error.style.color = "red";
      error.style.fontSize = "12px";
      error.textContent = message;
      input.closest(".form-group").appendChild(error);
    }
    
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });
  