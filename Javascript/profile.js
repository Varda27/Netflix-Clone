/* =========================================
   CURRENT PROFILE
========================================= */

let selectedProfileId = null;



/* =========================================
   GET PROFILES
========================================= */

function getProfiles() {

    return JSON.parse(
        localStorage.getItem(
            "netflixProfiles"
        )
    ) || [];

}



/* =========================================
   SAVE PROFILES
========================================= */

function saveProfiles(profiles) {

    localStorage.setItem(
        "netflixProfiles",
        JSON.stringify(profiles)
    );

}



/* =========================================
   DISPLAY PROFILES
========================================= */

function displayProfiles() {

    const container =
        document.getElementById(
            "profileSettings"
        );


    if (!container) {

        return;

    }


    const profiles =
        getProfiles();


    container.innerHTML = "";


    profiles.forEach(
        function(profile) {


            const row =
                document.createElement("div");


            row.className =
                "profile-setting-row";


            row.innerHTML = `

                <div class="profile-left">

                    <img
                        src="${profile.image}"
                        class="profile-small-image"
                        alt="${profile.name}"
                    >

                    <span>
                        ${profile.name}
                    </span>

                </div>


                <div class="profile-right">

                    <span class="profile-arrow">
                        ›
                    </span>

                </div>

            `;


            row.addEventListener(
                "click",
                function() {

                    openSettings(
                        profile.id
                    );

                }
            );


            container.appendChild(row);

        }
    );

}



/* =========================================
   OPEN SETTINGS
========================================= */

function openSettings(id) {


    const profiles =
        getProfiles();


    const profile =
        profiles.find(
            function(profile) {

                return profile.id === id;

            }
        );


    if (!profile) {

        return;

    }


    selectedProfileId =
        id;


    /* Image */

    document.getElementById(
        "settingsImage"
    ).src = profile.image;


    /* Name */

    document.getElementById(
        "settingsName"
    ).textContent =
        profile.name;


    /* Input */

    document.getElementById(
        "updateProfileName"
    ).value =
        profile.name;


    /* Clear image */

    document.getElementById(
        "updateProfileImage"
    ).value = "";


    /* =================================
       PERMANENT VARDA
    ================================= */

    const deleteButton =
        document.getElementById(
            "deleteButton"
        );


    if (
        profile.id === 1 ||
        profile.permanent === true
    ) {

        deleteButton.style.display =
            "none";

    }

    else {

        deleteButton.style.display =
            "block";

    }


    /* Show modal */

    document.getElementById(
        "settingsModal"
    ).style.display =
        "flex";

}



/* =========================================
   CLOSE SETTINGS
========================================= */

function closeSettings() {

    document.getElementById(
        "settingsModal"
    ).style.display =
        "none";


    selectedProfileId =
        null;

}



/* =========================================
   UPDATE PROFILE
========================================= */

function updateProfile() {


    if (
        selectedProfileId === null
    ) {

        return;

    }


    const profiles =
        getProfiles();


    const profile =
        profiles.find(
            function(profile) {

                return (
                    profile.id ===
                    selectedProfileId
                );

            }
        );


    if (!profile) {

        return;

    }


    const nameInput =
        document.getElementById(
            "updateProfileName"
        );


    const imageInput =
        document.getElementById(
            "updateProfileImage"
        );


    const newName =
        nameInput.value.trim();


    /* =================================
       CHECK NAME
    ================================= */

    if (newName === "") {

        alert(
            "Profile name cannot be empty."
        );

        return;

    }


    /* =================================
       CHECK DUPLICATE
    ================================= */

    const duplicate =
        profiles.some(
            function(item) {

                return (

                    item.id !==
                    selectedProfileId &&

                    item.name.toLowerCase() ===
                    newName.toLowerCase()

                );

            }
        );


    if (duplicate) {

        alert(
            "Another profile already has this name."
        );

        return;

    }


    /* =================================
       UPDATE NAME
    ================================= */

    profile.name =
        newName;



    /* =================================
       UPDATE IMAGE
    ================================= */

    if (
        imageInput.files &&
        imageInput.files.length > 0
    ) {


        const file =
            imageInput.files[0];


        const reader =
            new FileReader();


        reader.onload =
            function(event) {


                profile.image =
                    event.target.result;


                saveProfiles(
                    profiles
                );


                finishUpdate();

            };


        reader.readAsDataURL(file);

    }

    else {


        saveProfiles(
            profiles
        );


        finishUpdate();

    }

}



function finishUpdate() {

    const profiles =
        getProfiles();


    /*
       Find the updated profile
    */

    const updatedProfile =
        profiles.find(
            function(profile) {

                return (
                    profile.id ===
                    selectedProfileId
                );

            }
        );


    /*
       Check currently selected profile
    */

    const selected =
        JSON.parse(
            localStorage.getItem(
                "selectedProfile"
            )
        );


    /*
       If the edited profile is
       currently being used,
       update selectedProfile too.
    */

    if (
        selected &&
        selected.id === selectedProfileId &&
        updatedProfile
    ) {

        localStorage.setItem(
            "selectedProfile",
            JSON.stringify(
                updatedProfile
            )
        );

    }


    /*
       Close popup
    */

    closeSettings();


    /*
       Refresh profile list
    */

    displayProfiles();


    alert(
        "Profile updated successfully!"
    );

}



/* =========================================
   DELETE PROFILE
========================================= */

function deleteProfile() {


    if (
        selectedProfileId === null
    ) {

        return;

    }


    /* =================================
       Varda cannot be deleted
    ================================= */

    if (
        selectedProfileId === 1
    ) {

        alert(
            "The Varda profile cannot be deleted."
        );

        return;

    }


    const profiles =
        getProfiles();


    const profile =
        profiles.find(
            function(profile) {

                return (
                    profile.id ===
                    selectedProfileId
                );

            }
        );


    if (!profile) {

        return;

    }


    /* =================================
       CONFIRM
    ================================= */

    const confirmation =
        confirm(
            `Are you sure you want to delete "${profile.name}"?`
        );


    if (!confirmation) {

        return;

    }


    /* =================================
       DELETE
    ================================= */

    const updatedProfiles =
        profiles.filter(
            function(profile) {

                return (
                    profile.id !==
                    selectedProfileId
                );

            }
        );


    saveProfiles(
        updatedProfiles
    );


    /* =================================
       REMOVE SELECTED PROFILE
    ================================= */

    const selected =
        JSON.parse(
            localStorage.getItem(
                "selectedProfile"
            )
        );


    if (
        selected &&
        selected.id ===
        selectedProfileId
    ) {

        localStorage.removeItem(
            "selectedProfile"
        );

    }


    closeSettings();


    displayProfiles();


    alert(
        "Profile deleted successfully!"
    );

}



/* =========================================
   GO BACK TO MAIN
========================================= */

function goBack() {

    window.location.href =
        "main.html";

}



/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

window.addEventListener(
    "click",
    function(event) {


        const modal =
            document.getElementById(
                "settingsModal"
            );


        if (
            event.target === modal
        ) {

            closeSettings();

        }

    }
);



/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProfiles();

    }
);

saveProfiles(profiles);