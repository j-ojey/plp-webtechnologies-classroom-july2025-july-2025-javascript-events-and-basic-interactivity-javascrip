// script.js
// ===============================================
// Interactive Web Page with JavaScript
// Features: Theme Toggle, Counter, FAQ, Form Validation
// ===============================================

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // PART 1: Theme Toggle (Light/Dark Mode)
  // ===================================
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light";
  body.classList.add(currentTheme);

  themeToggleBtn.textContent = currentTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

  themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("light")) {
      body.classList.replace("light", "dark");
      themeToggleBtn.textContent = "☀️ Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.replace("dark", "light");
      themeToggleBtn.textContent = "🌙 Dark Mode";
      localStorage.setItem("theme", "light");
    }
  });

  // ===================================
  // PART 2: Counter Game
  // ===================================
  const counterDisplay = document.getElementById("counter");
  const incrementBtn = document.getElementById("increment-btn");
  const resetBtn = document.getElementById("reset-btn");
  let count = 0;

  incrementBtn.addEventListener("click", () => {
    count++;
    counterDisplay.textContent = count;
    // Add animation class
    counterDisplay.style.transform = "scale(1.3)";
    setTimeout(() => {
      counterDisplay.style.transform = "scale(1)";
    }, 150);
  });

  resetBtn.addEventListener("click", () => {
    count = 0;
    counterDisplay.textContent = count;
  });

  // ===================================
  // PART 3: Collapsible FAQ Section
  // ===================================
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isActive = answer.classList.contains("active");

      // Close all other answers
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        ans.classList.remove("active");
      });

      // Toggle current answer
      if (!isActive) {
        answer.classList.add("active");
      }
    });
  });

  // ===================================
  // PART 4: Custom Form Validation
  // ===================================
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const successMsg = document.getElementById("form-success");

  // Helper: Show error message
  function showError(input, message) {
    const errorSpan = input.parentElement.querySelector(".error-msg");
    errorSpan.textContent = message;
    input.style.borderColor = "#e91e63";
  }

  // Helper: Clear error
  function clearError(input) {
    const errorSpan = input.parentElement.querySelector(".error-msg");
    errorSpan.textContent = "";
    input.style.borderColor = "#ccc";
  }

  // Validate Name
  function validateName() {
    const name = nameInput.value.trim();
    if (name === "") {
      showError(nameInput, "Name is required.");
      return false;
    } else if (name.length < 2) {
      showError(nameInput, "Name must be at least 2 characters.");
      return false;
    }
    clearError(nameInput);
    return true;
  }

  // Validate Email
  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      showError(emailInput, "Email is required.");
      return false;
    } else if (!emailRegex.test(email)) {
      showError(emailInput, "Please enter a valid email address.");
      return false;
    }
    clearError(emailInput);
    return true;
  }

  // Validate Password
  function validatePassword() {
    const password = passwordInput.value;
    if (password === "") {
      showError(passwordInput, "Password is required.");
      return false;
    } else if (password.length < 8) {
      showError(passwordInput, "Password must be at least 8 characters.");
      return false;
    }
    clearError(passwordInput);
    return true;
  }

  // Validate Confirm Password
  function validateConfirmPassword() {
    const confirm = confirmPasswordInput.value;
    const password = passwordInput.value;
    if (confirm === "") {
      showError(confirmPasswordInput, "Please confirm your password.");
      return false;
    } else if (confirm !== password) {
      showError(confirmPasswordInput, "Passwords do not match.");
      return false;
    }
    clearError(confirmPasswordInput);
    return true;
  }

  // Real-time validation on input
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", validatePassword);
  confirmPasswordInput.addEventListener("input", validateConfirmPassword);

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default submission

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
      successMsg.textContent = `✅ Thank you, ${nameInput.value.trim()}! Form submitted successfully.`;
      successMsg.style.display = "block";
      form.reset();
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 5000);
    } else {
      successMsg.style.display = "none";
    }
  });
});
