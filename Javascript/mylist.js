/* =========================================
   MY LIST INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const playButtons = document.querySelectorAll(".movie-card button");

    playButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            const movieCard = button.closest(".movie-card");
            const movieTitle = movieCard ? movieCard.querySelector("h3") : null;
            const titleText = movieTitle ? movieTitle.textContent : "Movie";

            console.log("Playing:", titleText);

            // Redirect to play page
            window.location.href = "play.html";
        });
    });
});
