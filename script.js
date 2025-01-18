let likeCount = 0;
let dislikeCount = 0;
let isLiked = false;
let isDisliked = false;

// Function to load game information and update the portal
function loadGameInfo(gameCard, gameUrl) {
    const gameTitle = gameCard.getAttribute("data-title");
    const gameDescription = gameCard.getAttribute("data-description");
    const gameInstructions = gameCard.getAttribute("data-instructions");

    // Update the game title in <h1>
    document.getElementById("game-title").innerHTML = `<h1>${gameTitle}</h1>`;

    // Update the description and instructions
    document.getElementById("game-description").textContent = gameDescription;
    document.getElementById("game-instructions").textContent = gameInstructions;

    // Update the iframe source
    const iframe = document.querySelector("iframe");
    iframe.src = gameUrl;

    // Update the browser title
    document.title = `${gameTitle} | Game Website`;

    // Update the URL without reloading the page
    window.history.pushState(null, "", `?game=${encodeURIComponent(gameUrl)}&title=${encodeURIComponent(gameTitle)}`);
}

// Load game based on URL when the page loads or reloads
window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const gameUrlFromQuery = params.get("game");
    const gameTitleFromQuery = params.get("title");

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

        // Update the browser title
        document.title = `${gameTitle} | Game Website`;

        // Clear the localStorage data after use (optional)
        localStorage.removeItem("gameTitle");
        localStorage.removeItem("gameDescription");
        localStorage.removeItem("gameInstructions");
        localStorage.removeItem("gameUrl");
    } else if (gameUrlFromQuery && gameTitleFromQuery) {
        // If URL query parameters exist, use them as fallback
        const iframe = document.querySelector("iframe");
        iframe.src = gameUrlFromQuery;

        const gameTitleElement = document.getElementById("game-title");
        gameTitleElement.innerHTML = `<h1>${gameTitleFromQuery}</h1>`;

        // Update the browser title
        document.title = `${gameTitleFromQuery} | Game Website`;

        // Optional: Set placeholder for description and instructions
        document.getElementById("game-description").textContent = "Description not available.";
        document.getElementById("game-instructions").textContent = "Instructions not available.";
    }
}

// Like/Dislike Functions
function toggleLike() {
    const likeButton = document.getElementById("like-button");
    const dislikeButton = document.getElementById("dislike-button");
    if (isLiked) {
        likeButton.style.backgroundColor = '#333';
        likeCount--;
        isLiked = false;
    } else {
        likeButton.style.backgroundColor = '#00FF00'; // Green for like
        likeCount++;
        isLiked = true;
        if (isDisliked) {
            dislikeButton.style.backgroundColor = '#333'; // Reset dislike
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
        dislikeButton.style.backgroundColor = '#FF0000'; // Red for dislike
        dislikeCount++;
        isDisliked = true;
        if (isLiked) {
            likeButton.style.backgroundColor = '#333'; // Reset like
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

// Fullscreen Toggle
function toggleFullscreen() {
    const iframe = document.querySelector("iframe");
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    body.classList.toggle('dark-mode');
    darkModeToggle.textContent = body.classList.contains('dark-mode') ? "☀️" : "🌙";
}

// Initialize Dark Mode on Page Load
document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
    darkModeToggle.addEventListener('click', toggleDarkMode);
});

// Hamburger Menu Toggle
function toggleMenu() {
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.toggle('show');
}

// Search Bar Toggle
function toggleSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    overlay.classList.toggle('active');
    if (overlay.classList.contains('active')) {
        input.focus();
    } else {
        input.value = '';
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('search-overlay');
        if (overlay.classList.contains('active')) {
            toggleSearchOverlay();
        }
    }
});

// Download Functionality
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

// Register Service Worker
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

// Add Event Listener for Download Button
document.getElementById('download-button').addEventListener('click', addToHomeScreen);
