 let likeCount = 0;
        let dislikeCount = 0;
        let isLiked = false;
        let isDisliked = false;

       function loadGameAndRedirect(gameCard, mainPageUrl, gameUrl) {
    // Extract data from the game card
    const gameTitle = gameCard.getAttribute("data-title");
    const gameDescription = gameCard.getAttribute("data-description");
    const gameInstructions = gameCard.getAttribute("data-instructions");

    // Save the game data in localStorage
    localStorage.setItem("gameTitle", gameTitle);
    localStorage.setItem("gameDescription", gameDescription);
    localStorage.setItem("gameInstructions", gameInstructions);
    localStorage.setItem("gameUrl", gameUrl);

    // Redirect to the main page
    window.location.href = mainPageUrl;
}

// Load game based on URL when the page loads or reloads
window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const gameUrlFromQuery = params.get("game");

    // Check for game data in localStorage
    const gameTitle = localStorage.getItem("gameTitle");
    const gameDescription = localStorage.getItem("gameDescription");
    const gameInstructions = localStorage.getItem("gameInstructions");
    const gameUrl = localStorage.getItem("gameUrl");

    // If data exists in localStorage, use it to update the game info
    if (gameTitle && gameDescription && gameInstructions && gameUrl) {
        const iframe = document.querySelector("iframe");
        iframe.src = gameUrl;

        document.getElementById("game-title").innerHTML = `<h1>${gameTitle}</h1>`;
        document.getElementById("game-description").textContent = gameDescription;
        document.getElementById("game-instructions").textContent = gameInstructions;

        // Clear the localStorage data after use (optional)
        localStorage.removeItem("gameTitle");
        localStorage.removeItem("gameDescription");
        localStorage.removeItem("gameInstructions");
        localStorage.removeItem("gameUrl");
    } else if (gameUrlFromQuery) {
        // If URL query parameters exist, use them as fallback
        const iframe = document.querySelector("iframe");
        iframe.src = gameUrlFromQuery;

        const gameTitleElement = document.getElementById("game-title");
        gameTitleElement.textContent = "Game"; // Optional default name
    }
};



        function toggleLike() {
            const likeButton = document.getElementById("like-button");
            const dislikeButton = document.getElementById("dislike-button");
            if (isLiked) {
                likeButton.style.backgroundColor = '#333';
                likeCount--;
                isLiked = false;
            } else {
                likeButton.style.backgroundColor = '#00FF00';  // Green for like
                likeCount++;
                isLiked = true;
                if (isDisliked) {
                    dislikeButton.style.backgroundColor = '#333';  // Reset dislike
                    dislikeCount--;
                    isDisliked = false;
                }
            }
            updateButtonCounts();
        }

        function toggleDislike() {
            const likeButton = document.getElementById("like-button");
            const dislikeButton = document.getElementById("dislike-button");
            if (isDisliked) {
                dislikeButton.style.backgroundColor = '#333';
                dislikeCount--;
                isDisliked = false;
            } else {
                dislikeButton.style.backgroundColor = '#FF0000';  // Red for dislike
                dislikeCount++;
                isDisliked = true;
                if (isLiked) {
                    likeButton.style.backgroundColor = '#333';  // Reset like
                    likeCount--;
                    isLiked = false;
                }
            }
            updateButtonCounts();
        }

        function updateButtonCounts() {
            document.getElementById("like-count").textContent = likeCount;
            document.getElementById("dislike-count").textContent = dislikeCount;
        }

        function toggleFullscreen() {
            const iframe = document.querySelector("iframe");
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.mozRequestFullScreen) { // Firefox
                iframe.mozRequestFullScreen();
            } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
                iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) { // IE/Edge
                iframe.msRequestFullscreen();
            }
        }
// Dark Mode Toggle Function
function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.querySelector('.dark-mode-toggle');

    // Toggle dark mode class on body
    body.classList.toggle('dark-mode');

    // Update button icon dynamically
    darkModeToggle.textContent = body.classList.contains('dark-mode') ? "☀️" : "🌙"; // Sun/Moon toggle
}

// Initialize Dark Mode on Page Load
document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    // Set initial icon based on mode
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";

    // Add event listener to the button
    darkModeToggle.addEventListener('click', toggleDarkMode);
});

// Toggle Hamburger Menu
function toggleMenu() {
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.toggle('show');
}

// Search Bar Toggle
function toggleSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');

    // Toggle 'active' class
    overlay.classList.toggle('active');

    // Focus input field if active
    if (overlay.classList.contains('active')) {
        input.focus();
    } else {
        input.value = ''; // Clear input when closing
    }
}

// Event listener to close overlay when Escape is pressed
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('search-overlay');
        if (overlay.classList.contains('active')) {
            toggleSearchOverlay();
        }
    }
});
// download functionality 
function addToHomeScreen() {
    if ('beforeinstallprompt' in window) {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
            const deferredPrompt = e;

            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    } else {
        alert('Add to Home Screen is not supported in this browser.');
    }
}
// Add the new function to register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
            (registration) => {
                console.log('ServiceWorker registration successful: ', registration);
            },
            (error) => {
                console.log('ServiceWorker registration failed: ', error);
            }
        );
    });
}

// Modify or add the addToHomeScreen function if needed
function addToHomeScreen() {
    if ('beforeinstallprompt' in window) {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            const deferredPrompt = e;

            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    } else {
        alert('Add to Home Screen is not supported in this browser.');
    }
}

// Event listener for the download button
document.getElementById('download-button').addEventListener('click', addToHomeScreen);
