/* =========================================
   GET SELECTED PROFILE
========================================= */

function loadSelectedProfile() {

    const profiles =
        JSON.parse(
            localStorage.getItem("netflixProfiles")
        ) || [];


    /* Get selected profile ID */

    let selectedId =
        localStorage.getItem(
            "selectedProfileId"
        );


    /* Convert to number */

    selectedId =
        Number(selectedId);


    /* Find selected profile */

    let selectedProfile =
        profiles.find(
            function(profile) {

                return profile.id === selectedId;

            }
        );


    /* =====================================
       IF NO PROFILE IS SELECTED
       USE VARDA
    ===================================== */

    if (!selectedProfile) {

        selectedProfile =
            profiles.find(
                function(profile) {

                    return profile.id === 1;

                }
            );

    }


    /* =====================================
       STILL NO PROFILE?
    ===================================== */

    if (!selectedProfile) {

        console.log(
            "No profile found in localStorage."
        );

        return;

    }


    console.log(
        "Selected Profile:",
        selectedProfile
    );


    /* =====================================
       GET IMAGE
    ===================================== */

    const profileImage =
        document.getElementById(
            "currentProfileImage"
        );


    if (profileImage) {

        profileImage.src =
            selectedProfile.image;

        profileImage.alt =
            selectedProfile.name;

    }


    /* =====================================
       GET NAME
    ===================================== */

    const profileName =
        document.getElementById(
            "currentProfileName"
        );


    if (profileName) {

        profileName.textContent =
            selectedProfile.name;

    }


    /* =====================================
       ALSO UPDATE CLASS-BASED ELEMENTS
    ===================================== */

    const images =
        document.querySelectorAll(
            ".current-profile-image"
        );


    images.forEach(
        function(image) {

            image.src =
                selectedProfile.image;

            image.alt =
                selectedProfile.name;

        }
    );


    const names =
        document.querySelectorAll(
            ".current-profile-name"
        );


    names.forEach(
        function(name) {

            name.textContent =
                selectedProfile.name;

        }
    );


    /* =====================================
       SAVE CURRENT PROFILE
    ===================================== */

    localStorage.setItem(
        "selectedProfile",
        JSON.stringify(selectedProfile)
    );

}


/* =========================================
   LOAD PROFILE
========================================= */

loadSelectedProfile();