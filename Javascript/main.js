/* =========================================
   PERMANENT PROFILE
========================================= */

const permanentProfile = {
    id: 1,
    name: "Varda",
    image: "../Images/cat.jpg",
    permanent: true
};


/* =========================================
   DEFAULT PROFILES
========================================= */

const defaultProfiles = [
    {
        id: 2,
        name: "Reena",
        image: "../Images/Dino.png",
        permanent: false
    },

    {
        id: 3,
        name: "Seema",
        image: "../Images/mini.jpg",
        permanent: false
    },

    {
        id: 4,
        name: "Children",
        image: "../Images/kids.jpg",
        permanent: false
    }
];


/* =========================================
   GET PROFILES
========================================= */

function getProfiles() {

    let profiles =
        JSON.parse(
            localStorage.getItem("netflixProfiles")
        );

    if (!profiles) {

        profiles = [
            permanentProfile,
            ...defaultProfiles
        ];

        saveProfiles(profiles);
    }

    /* Always make sure Varda exists */

    const vardaExists =
        profiles.some(function(profile) {

            return profile.id === 1;

        });


    if (!vardaExists) {

        profiles.unshift(
            permanentProfile
        );

        saveProfiles(profiles);
    }

    return profiles;
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
            "profilesContainer"
        );

    if (!container) {
        return;
    }

    const profiles =
        getProfiles();

    container.innerHTML = "";


    /* =================================
       PROFILE CARDS
    ================================= */

    profiles.forEach(function(profile) {

        const profileBox =
            document.createElement("div");

        profileBox.className =
            "profile";


        /* Permanent profile */

        if (
            profile.permanent === true ||
            profile.id === 1
        ) {

            profileBox.innerHTML = `

                <div class="profile-image-wrapper">

                    <img
                        src="${profile.image}"
                        alt="${profile.name}"
                        class="profile-image"
                    >

                </div>

                <p>${profile.name}</p>
            `;

        }

        /* Normal profile */

        else {

            profileBox.innerHTML = `

                <div class="profile-image-wrapper">

                    <img
                        src="${profile.image}"
                        alt="${profile.name}"
                        class="profile-image"
                    >

                    <button
                        class="delete-profile-btn"
                        title="Delete Profile">

                        ×

                    </button>

                </div>

                <p>${profile.name}</p>
            `;

        }


        /* =================================
           SELECT PROFILE
        ================================= */

        const profileImage =
            profileBox.querySelector(
                ".profile-image"
            );


        profileImage.addEventListener(
            "click",
            function() {

                selectProfile(profile);

            }
        );


        /* =================================
           DELETE PROFILE
        ================================= */

        if (
            profile.id !== 1 &&
            profile.permanent !== true
        ) {

            const deleteButton =
                profileBox.querySelector(
                    ".delete-profile-btn"
                );


            deleteButton.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    deleteProfile(
                        profile.id
                    );

                }
            );

        }


        container.appendChild(
            profileBox
        );

    });


    /* =================================
       ADD PROFILE
    ================================= */

    const addProfile =
        document.createElement("div");

    addProfile.className =
        "profile add-profile";


    addProfile.innerHTML = `

        <div class="add-circle">
            +
        </div>

        <p>Add Profile</p>

    `;


    addProfile.addEventListener(
        "click",
        function() {

            openAddProfile();

        }
    );


    container.appendChild(
        addProfile
    );

}


/* =========================================
   SELECT PROFILE
========================================= */

function selectProfile(profile) {

    console.log(
        "Profile selected:",
        profile
    );


    /* Save selected profile ID */

    localStorage.setItem(
        "selectedProfileId",
        profile.id
    );


    /* Save complete profile */

    localStorage.setItem(
        "selectedProfile",
        JSON.stringify(profile)
    );


    /* Go to Home */

    window.location.href =
        "home.html";
}


/* =========================================
   DELETE PROFILE
========================================= */

function deleteProfile(profileId) {

    /* Varda cannot be deleted */

    if (profileId === 1) {

        alert(
            "The Varda profile cannot be deleted."
        );

        return;
    }


    const profiles =
        getProfiles();


    const profile =
        profiles.find(function(item) {

            return item.id === profileId;

        });


    if (!profile) {
        return;
    }


    const confirmation =
        confirm(
            `Are you sure you want to delete "${profile.name}"?`
        );


    if (!confirmation) {
        return;
    }


    const updatedProfiles =
        profiles.filter(function(item) {

            return item.id !== profileId;

        });


    saveProfiles(
        updatedProfiles
    );


    /* If deleted profile was active */

    const selectedId =
        Number(
            localStorage.getItem(
                "selectedProfileId"
            )
        );


    if (selectedId === profileId) {

        localStorage.setItem(
            "selectedProfileId",
            "1"
        );


        const varda =
            updatedProfiles.find(
                function(item) {

                    return item.id === 1;

                }
            );


        localStorage.setItem(
            "selectedProfile",
            JSON.stringify(varda)
        );

    }


    displayProfiles();
}


/* =========================================
   OPEN PROFILE SETTINGS
========================================= */

function openProfileSettings() {

    window.location.href =
        "profile.html";

}


/* =========================================
   OPEN ADD PROFILE
========================================= */

function openAddProfile() {

    const modal =
        document.getElementById(
            "addProfileModal"
        );

    if (modal) {

        modal.style.display =
            "flex";

    }

}


/* =========================================
   CLOSE ADD PROFILE
========================================= */

function closeAddProfile() {

    const modal =
        document.getElementById(
            "addProfileModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }


    const nameInput =
        document.getElementById(
            "newProfileName"
        );


    const imageInput =
        document.getElementById(
            "newProfileImage"
        );


    const preview =
        document.getElementById(
            "profilePreview"
        );


    if (nameInput) {
        nameInput.value = "";
    }


    if (imageInput) {
        imageInput.value = "";
    }


    if (preview) {

        preview.src = "";

        preview.style.display =
            "none";

    }

}


/* =========================================
   CREATE PROFILE
========================================= */

function createNewProfile() {

    const nameInput =
        document.getElementById(
            "newProfileName"
        );


    const imageInput =
        document.getElementById(
            "newProfileImage"
        );


    const name =
        nameInput.value.trim();


    if (name === "") {

        alert(
            "Please enter a profile name."
        );

        return;
    }


    if (
        imageInput.files.length === 0
    ) {

        alert(
            "Please select a profile image."
        );

        return;
    }


    const profiles =
        getProfiles();


    /* Check duplicate */

    const duplicate =
        profiles.some(function(profile) {

            return (
                profile.name.toLowerCase() ===
                name.toLowerCase()
            );

        });


    if (duplicate) {

        alert(
            "A profile with this name already exists."
        );

        return;
    }


    const file =
        imageInput.files[0];


    const reader =
        new FileReader();


    reader.onload =
        function(event) {

            const newProfile = {

                id: Date.now(),

                name: name,

                image:
                    event.target.result,

                permanent: false

            };


            profiles.push(
                newProfile
            );


            saveProfiles(
                profiles
            );


            closeAddProfile();


            displayProfiles();


            alert(
                `"${name}" profile created successfully!`
            );

        };


    reader.readAsDataURL(file);
}


/* =========================================
   IMAGE PREVIEW
========================================= */

function setupImagePreview() {

    const imageInput =
        document.getElementById(
            "newProfileImage"
        );


    const preview =
        document.getElementById(
            "profilePreview"
        );


    if (
        !imageInput ||
        !preview
    ) {

        return;
    }


    imageInput.addEventListener(
        "change",
        function() {

            const file =
                this.files[0];


            if (!file) {

                preview.style.display =
                    "none";

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function(event) {

                    preview.src =
                        event.target.result;

                    preview.style.display =
                        "block";

                };


            reader.readAsDataURL(file);

        }
    );
}


/* =========================================
   INITIALIZE MAIN PAGE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProfiles();

        setupImagePreview();


        const closeButton =
            document.getElementById(
                "closeAddProfile"
            );


        const cancelButton =
            document.getElementById(
                "cancelAddProfile"
            );


        const createButton =
            document.getElementById(
                "createProfileButton"
            );


        const modal =
            document.getElementById(
                "addProfileModal"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeAddProfile
            );

        }


        if (cancelButton) {

            cancelButton.addEventListener(
                "click",
                closeAddProfile
            );

        }


        if (createButton) {

            createButton.addEventListener(
                "click",
                createNewProfile
            );

        }


        if (modal) {

            modal.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target === modal
                    ) {

                        closeAddProfile();

                    }

                }
            );

        }

    }
);