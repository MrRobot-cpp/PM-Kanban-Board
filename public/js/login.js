document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    
    form.addEventListener('submit', function(event) {
      let valid = true;
      
      // Clear previous error messages
      clearErrors();
      
      // Validate email
      if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address.');
        valid = false;
      }
      
      // Validate password
      if (passwordInput.value.trim() === '') {
        showError(passwordInput, 'Password cannot be empty.');
        valid = false;
      }
      
      if (!valid) {
        event.preventDefault();
      }
    });
    
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
    
    function showError(input, message) {
      const formGroup = input.parentElement;
      const error = document.createElement('div');
      error.className = 'error-message';
      error.style.color = 'red';
      error.style.fontSize = '12px';
      error.innerText = message;
      formGroup.appendChild(error);
    }
    
    function clearErrors() {
      const errors = document.querySelectorAll('.error-message');
      errors.forEach(function(error) {
        error.remove();
      });
    }
  });
  