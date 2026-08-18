/* =========================================
   GET SELECTED PROFILE
========================================= */

function loadSelectedProfile() {

    let profiles =
        JSON.parse(
            localStorage.getItem("netflixProfiles")
        ) || [];

    // Fallback default profiles if none initialized yet
    if (profiles.length === 0) {
        profiles = [
            { id: 1, name: "Varda", image: "../Images/cat.jpg", permanent: true },
            { id: 2, name: "Reena", image: "../Images/Dino.png", permanent: false },
            { id: 3, name: "Seema", image: "../Images/mini.jpg", permanent: false },
            { id: 4, name: "Children", image: "../Images/kids.jpg", permanent: false }
        ];
        localStorage.setItem("netflixProfiles", JSON.stringify(profiles));
    }

    /* Get selected profile ID */
    let selectedId = localStorage.getItem("selectedProfileId");
    selectedId = Number(selectedId);

    /* Find selected profile */
    let selectedProfile = profiles.find(function(profile) {
        return profile.id === selectedId;
    });

    /* =====================================
       IF NO PROFILE IS SELECTED
       USE VARDA (id: 1)
    ===================================== */
    if (!selectedProfile) {
        selectedProfile = profiles.find(function(profile) {
            return profile.id === 1;
        }) || profiles[0];
    }

    if (!selectedProfile) {
        console.log("No profile found.");
        return;
    }

    /* =====================================
       GET IMAGE
    ===================================== */
    const profileImage = document.getElementById("currentProfileImage");
    if (profileImage) {
        profileImage.src = selectedProfile.image;
        profileImage.alt = selectedProfile.name;
    }

    /* =====================================
       GET NAME
    ===================================== */
    const profileName = document.getElementById("currentProfileName");
    if (profileName) {
        profileName.textContent = selectedProfile.name;
    }

    /* =====================================
       ALSO UPDATE CLASS-BASED ELEMENTS
    ===================================== */
    const images = document.querySelectorAll(".current-profile-image");
    images.forEach(function(image) {
        image.src = selectedProfile.image;
        image.alt = selectedProfile.name;
    });

    const names = document.querySelectorAll(".current-profile-name");
    names.forEach(function(name) {
        name.textContent = selectedProfile.name;
    });

    /* =====================================
       SAVE CURRENT PROFILE
    ===================================== */
    localStorage.setItem(
        "selectedProfile",
        JSON.stringify(selectedProfile)
    );
}

/* =========================================
   LOAD PROFILE ON DOM READY & IMMEDIATE
========================================= */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadSelectedProfile);
} else {
    loadSelectedProfile();
}