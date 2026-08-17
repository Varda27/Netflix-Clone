/* =========================================
   LOGIN FORM
========================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener(
    "submit",
    function(event) {


        /*
           Prevent normal form submission.
        */

        event.preventDefault();



        /* =================================
           GET VALUES
        ================================= */

        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const password =
            document.getElementById(
                "password"
            ).value.trim();


        const rememberMe =
            document.getElementById(
                "rememberMe"
            ).checked;


        const message =
            document.getElementById(
                "loginMessage"
            );



        /* =================================
           CHECK EMAIL
        ================================= */

        if (email === "") {

            message.textContent =
                "Please enter your email or mobile number.";

            return;

        }



        /* =================================
           CHECK PASSWORD
        ================================= */

        if (password === "") {

            message.textContent =
                "Please enter your password.";

            return;

        }



        /* =================================
           SAVE LOGIN INFORMATION
        ================================= */

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        localStorage.setItem(
            "loginEmail",
            email
        );



        /* =================================
           REMEMBER ME
        ================================= */

        if (rememberMe) {

            localStorage.setItem(
                "rememberMe",
                "true"
            );

        }

        else {

            localStorage.removeItem(
                "rememberMe"
            );

        }



        /* =================================
           REDIRECT TO MAIN
        ================================= */

        window.location.href =
            "main.html";

    }
);