/* =========================================
   HOME PAGE INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Movie cards / posters click to play
    const movieImages = document.querySelectorAll(".movie-row img");
    movieImages.forEach(function (img) {
        img.style.cursor = "pointer";
        img.addEventListener("click", function () {
            window.location.href = "play.html";
        });
    });

    // Info button click
    const infoButton = document.querySelector(".buttons .info");
    if (infoButton) {
        infoButton.addEventListener("click", function () {
            window.location.href = "play.html";
        });
    }

});
