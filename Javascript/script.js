// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Login Button
    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Redirecting to Login Page...");
            window.location.href = "login.html";
        });
    }

    // Sign In Button
    const signinBtn = document.getElementById("signinBtn");

    if (signinBtn) {
        signinBtn.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Redirecting to Sign In Page...");
            window.location.href = "signin.html";
        });
    }

    // Get Started Button
    const getStartedBtn = document.getElementById("getStartedBtn");

    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", function () {

            const email = document.getElementById("email").value.trim();

            if (email === "") {
                alert("Please enter your email address.");
                return;
            }

            // Simple email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Redirect to Home Page
            window.location.href = "main.html";
        });
    }

});