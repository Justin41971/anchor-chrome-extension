// keywords bang bang bang buzzwords
const checkoutKeywords = [
    "checkout",
    "cart",
    "payment",
    "bag",
    "basket"
];

const currentURL = window.location.href.toLowerCase();

const isCheckoutPage = checkoutKeywords.some(keyword =>
    currentURL.includes(keyword)
);

if (!isCheckoutPage) {
    console.log("Not a checkout page.");
} else {

    console.log("Checkout page detected.");

    // Prevent duplicate popups
    if (document.getElementById("anchor-panel")) {
        console.log("Anchor already loaded.");
    } else {

        fetch(chrome.runtime.getURL("content/panel.html"))
            .then(response => response.text())
            .then(html => {

                // wrapper
                const wrapper = document.createElement("div");
                wrapper.innerHTML = html;

                document.body.appendChild(wrapper);

                initializeAnchor();

            })
            .catch(error => {

                console.error("Failed to load panel:", error);

            });

    }

}



function initializeAnchor() {

    console.log("Initializing Anchor...");

    // Logo images
    const anchorLogo = document.getElementById("anchor-logo");
    const pauseLogo = document.getElementById("pause-logo");

    if (anchorLogo)
        anchorLogo.src = chrome.runtime.getURL("icons/icon16.png");

    if (pauseLogo)
        pauseLogo.src = chrome.runtime.getURL("icons/icon16.png");


    // Elements
    const panel = document.getElementById("anchor-panel");
    const pauseScreen = document.getElementById("pause-screen");

    const pauseButton = document.querySelector(".pause");
    const continueButton = document.querySelector(".continue");
    const closeButton = document.getElementById("close");


    // Close popup
    if (closeButton) {

        closeButton.addEventListener("click", () => {

            panel.remove();

            if (pauseScreen)
                pauseScreen.remove();

        });

    }


    // Continue shopping
    if (continueButton) {

        continueButton.addEventListener("click", () => {

            panel.remove();

            if (pauseScreen)
                pauseScreen.remove();

        });

    }


    // Pause purchase
    if (pauseButton) {

        pauseButton.addEventListener("click", () => {

            console.log("Purchase paused");

            chrome.storage.local.set({

                pausedUntil:
                    Date.now() + (24 * 60 * 60 * 1000)

            });

            panel.style.display = "none";

            if (pauseScreen)
                pauseScreen.classList.remove("hidden");


            // Wait before leaving page
            setTimeout(() => {

                // Try previous page first
                if (document.referrer) {

                    window.location.href = document.referrer;

                } else {

                    window.history.back();

                }

            }, 1500);

        });

    }

}