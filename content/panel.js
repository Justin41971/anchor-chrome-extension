console.log("Anchor panel loaded");

document.getElementById("anchor-logo").src =
    chrome.runtime.getURL("icons/icon16.png");

document.getElementById("pause-logo").src =
    chrome.runtime.getURL("icons/icon16.png");

// Get buttons using your existing classes

const pauseButton = document.querySelector(".pause");

const continueButton = document.querySelector(".continue");

const closeButton = document.getElementById("close");


const anchorPanel = document.getElementById(
    "anchor-panel"
);

const pauseScreen = document.getElementById(
    "pause-screen"
);



// Pause for 24 hours

pauseButton.addEventListener(
    "click",
    () => {

        console.log("Purchase paused");


        // Hide Anchor popup

        anchorPanel.style.display = "none";


        // Show pause screen

        pauseScreen.classList.remove(
            "hidden"
        );


        // Store pause time

        chrome.storage.local.set({

            pausedUntil:
            Date.now() + 
            (24 * 60 * 60 * 1000)

        });


        // Go back after 1.5 seconds

        setTimeout(() => {

            if (document.referrer) {
                location.href = document.referrer;
            } else {
                history.back();
            }

        }, 1500);

    }
);



// Continue intentionally

continueButton.addEventListener(
    "click",
    () => {

        console.log(
            "Continuing purchase"
        );


        anchorPanel.remove();

    }
);



// X button closes popup

closeButton.addEventListener(
    "click",
    () => {

        anchorPanel.remove();

    }
);