// Toggle Mobile Menu
function toggleMenu() {
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.toggle('show');
}

// Toggle Search Bar
function toggleSearchBar() {
    const searchContainer = document.querySelector('.search-container');
    searchContainer.classList.toggle('active');
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
}

// Game Loader
function loadGame(gameTitle, gameUrl) {
    const iframe = document.querySelector("iframe");
    const gameTitleElement = document.getElementById("game-title");

    // Update iframe and game title
    gameTitleElement.textContent = gameTitle;
    iframe.src = gameUrl;

    // Update URL without reload
    window.history.pushState(null, "", `?game=${encodeURIComponent(gameUrl)}`);
}

// Load Game from URL
window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const gameUrl = params.get("game");

    if (gameUrl) {
        const iframe = document.querySelector("iframe");
        iframe.src = gameUrl;

        const gameTitleElement = document.getElementById("game-title");
        gameTitleElement.textContent = "Game"; // Default title
    }
};

// Like and Dislike Counters
let likeCount = 0;
let dislikeCount = 0;
let isLiked = false;
let isDisliked = false;

function toggleLike() {
    const likeButton = document.getElementById("like-button");
    const dislikeButton = document.getElementById("dislike-button");

    if (isLiked) {
        likeCount--;
        isLiked = false;
    } else {
        likeCount++;
        isLiked = true;

        if (isDisliked) {
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
        dislikeCount--;
        isDisliked = false;
    } else {
        dislikeCount++;
        isDisliked = true;

        if (isLiked) {
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
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    }
}
