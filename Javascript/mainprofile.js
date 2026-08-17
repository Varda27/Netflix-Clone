/* =========================================
   MAIN PROFILE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadProfile();

});


/* =========================================
   LOAD SELECTED PROFILE
========================================= */

function loadProfile() {

    const savedProfile =
        localStorage.getItem("selectedProfile");


    if (!savedProfile) {

        console.log("No profile selected.");

        return;

    }


    const profile =
        JSON.parse(savedProfile);



    /* =========================================
       CREATE / GET JOIN DATE
    ========================================= */

    let startDate;


    if (profile.subscriptionStart) {

        startDate =
            new Date(profile.subscriptionStart);

    }

    else if (profile.joinDate) {

        startDate =
            new Date(profile.joinDate);

    }

    else {

        startDate = new Date();

        profile.subscriptionStart =
            startDate.toISOString();

    }



    /* =========================================
       CHECK VALID DATE
    ========================================= */

    if (isNaN(startDate.getTime())) {

        startDate = new Date();

        profile.subscriptionStart =
            startDate.toISOString();

    }



    /* =========================================
       FORMAT JOIN DATE
    ========================================= */

    const formattedJoinDate =
        startDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );



    /* =========================================
       FORMAT JOIN TIME
    ========================================= */

    const formattedJoinTime =
        startDate.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }
        );



    /* =========================================
       NEXT BILLING DATE
       ONE MONTH AFTER JOINING
    ========================================= */

    const nextBillingDate =
        new Date(startDate);


    nextBillingDate.setMonth(
        nextBillingDate.getMonth() + 1
    );


    const formattedNextBilling =
        nextBillingDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );



    /* =========================================
       PROFILE IMAGE
    ========================================= */

    const profileImage =
        document.getElementById(
            "currentProfileImage"
        );


    if (
        profileImage &&
        profile.image
    ) {

        profileImage.src =
            profile.image;

    }



    /* =========================================
       PROFILE NAME
    ========================================= */

    const profileName =
        document.getElementById(
            "profileName"
        );


    const detailProfileName =
        document.getElementById(
            "detailProfileName"
        );


    const name =
        profile.name || "Profile Name";


    if (profileName) {

        profileName.textContent =
            name;

    }


    if (detailProfileName) {

        detailProfileName.textContent =
            name;

    }



    /* =========================================
       PROFILE ID
    ========================================= */

    const profileId =
        document.getElementById(
            "profileId"
        );


    if (profileId) {

        profileId.textContent =
            profile.id || "1";

    }



    /* =========================================
       DATE JOINED
    ========================================= */

    const joinDate =
        document.getElementById(
            "joinDate"
        );


    if (joinDate) {

        joinDate.textContent =
            formattedJoinDate;

    }



    /* =========================================
       TIME JOINED
    ========================================= */

    const joinTime =
        document.getElementById(
            "joinTime"
        );


    if (joinTime) {

        joinTime.textContent =
            formattedJoinTime;

    }



    /* =========================================
       SUBSCRIPTION PLAN
    ========================================= */

    const subscriptionPlan =
        document.getElementById(
            "subscriptionPlan"
        );


    if (subscriptionPlan) {

        subscriptionPlan.textContent =
            profile.subscription ||
            "Standard";

    }



    /* =========================================
       SUBSCRIPTION STARTED
    ========================================= */

    const subscriptionStart =
        document.getElementById(
            "subscriptionStart"
        );


    if (subscriptionStart) {

        subscriptionStart.textContent =
            formattedJoinDate;

    }



    /* =========================================
       NEXT BILLING DATE
    ========================================= */

    const nextBilling =
        document.getElementById(
            "nextBilling"
        );


    if (nextBilling) {

        nextBilling.textContent =
            formattedNextBilling;

    }



    /* =========================================
       ACCOUNT STATUS
    ========================================= */

    const accountStatus =
        document.getElementById(
            "accountStatus"
        );


    const status =
        profile.status || "Active";


    if (accountStatus) {

        accountStatus.textContent =
            status;

    }



    /* =========================================
       PROFILE STATUS
    ========================================= */

    const profileStatus =
        document.getElementById(
            "profileStatus"
        );


    if (profileStatus) {

        profileStatus.textContent =
            status;

    }



    /* =========================================
       MEMBER SINCE
    ========================================= */

    const memberSince =
        document.getElementById(
            "memberSince"
        );


    if (memberSince) {

        memberSince.textContent =
            formattedJoinDate;

    }



    /* =========================================
       SAVE GENERATED DETAILS
    ========================================= */

    profile.joinDate =
        formattedJoinDate;


    profile.joinTime =
        formattedJoinTime;


    profile.nextBilling =
        formattedNextBilling;


    profile.subscriptionStart =
        profile.subscriptionStart ||
        startDate.toISOString();


    profile.status =
        profile.status || "Active";


    profile.subscription =
        profile.subscription ||
        "Standard";


    /* Save selected profile */

    localStorage.setItem(
        "selectedProfile",
        JSON.stringify(profile)
    );

}



/* =========================================
   BACK TO HOME
========================================= */

function goBack() {

    window.location.href =
        "home.html";

}



/* =========================================
   EDIT PROFILE
========================================= */

function editProfile() {

    alert(
        "Edit Profile feature coming soon!"
    );

}