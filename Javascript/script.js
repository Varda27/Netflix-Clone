// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Helper to determine relative path
    const inHtmlFolder = window.location.pathname.includes("/html/");
    const basePath = inHtmlFolder ? "" : "html/";

    // Login Button
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function (event) {
            // Allow natural <a> navigation or redirect
            window.location.href = basePath + "login.html";
        });
    }

    // Sign Up Button
    const signupBtn = document.getElementById("signupBtn");
    if (signupBtn) {
        signupBtn.addEventListener("click", function (event) {
            window.location.href = basePath + "signup.html";
        });
    }

    // Sign In Button fallback (if present anywhere)
    const signinBtn = document.getElementById("signinBtn");
    if (signinBtn) {
        signinBtn.addEventListener("click", function (event) {
            window.location.href = basePath + "login.html";
        });
    }

    // Get Started Button
    const getStartedBtn = document.getElementById("getStartedBtn");
    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", function (event) {
            event.preventDefault();
            const emailInput = document.getElementById("email");
            const email = emailInput ? emailInput.value.trim() : "";

            if (email === "") {
                alert("Please enter your email address to get started.");
                if (emailInput) emailInput.focus();
                return;
            }

            // Email validation regex
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                if (emailInput) emailInput.focus();
                return;
            }

            // Store email for signup/login prefill
            localStorage.setItem("userEmail", email);
            localStorage.setItem("loginEmail", email);

            // Redirect to Profile selection or Signup
            window.location.href = basePath + "main.html";
        });
    }

});