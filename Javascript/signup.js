/* =========================================
   SIGNUP FORM
========================================= */

const signupForm =
    document.getElementById(
        "signupForm"
    );


/* =========================================
   CREATE ACCOUNT
========================================= */

signupForm.addEventListener(
    "submit",
    function(event) {


        /*
           Stop normal form submission
        */

        event.preventDefault();



        /* =================================
           GET VALUES
        ================================= */

        const fullName =
            document.getElementById(
                "fullName"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const password =
            document.getElementById(
                "password"
            ).value;


        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            ).value;


        const message =
            document.getElementById(
                "signupMessage"
            );



        /* =================================
           CHECK NAME
        ================================= */

        if (fullName === "") {

            message.textContent =
                "Please enter your full name.";

            return;

        }



        /* =================================
           CHECK EMAIL
        ================================= */

        if (email === "") {

            message.textContent =
                "Please enter your email address.";

            return;

        }



        /* =================================
           CHECK PASSWORD
        ================================= */

        if (password === "") {

            message.textContent =
                "Please create a password.";

            return;

        }



        /* =================================
           CHECK PASSWORD LENGTH
        ================================= */

        if (password.length < 6) {

            message.textContent =
                "Password must be at least 6 characters.";

            return;

        }



        /* =================================
           CHECK PASSWORD MATCH
        ================================= */

        if (
            password !==
            confirmPassword
        ) {

            message.textContent =
                "Passwords do not match.";

            return;

        }



        /* =================================
           SAVE ACCOUNT
        ================================= */

        const account = {

            fullName: fullName,

            email: email,

            password: password,

            createdAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "netflixAccount",
            JSON.stringify(account)
        );



        /* =================================
           LOGIN STATUS
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
           REDIRECT TO MAIN
        ================================= */

        window.location.href =
            "main.html";

    }
);