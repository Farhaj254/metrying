let likeCount = 0;
let dislikeCount = 0;
let isLiked = false;
let isDisliked = false;

// Function to load a game into the iframe and update the URL
function loadGame(gameTitle, gameUrl) {
    const iframe = document.querySelector("iframe");
    const gameTitleElement = document.getElementById("game-title");

    // Update iframe source and game title
    gameTitleElement.textContent = gameTitle;
    iframe.src = gameUrl;

    // Update the URL in the browser without reloading the page
    window.history.pushState(null, "", `?game=${gameUrl}`);
}

// Like button functionality
function toggleLike() {
    const likeButton = document.getElementById("like-button");
    const dislikeButton = document.getElementById("dislike-button");
    if (isLiked) {
        likeButton.style.backgroundColor = '#333';
        likeCount--;
        isLiked = false;
    } else {
        likeButton.style.backgroundColor = '#00FF00';
        likeCount++;
        isLiked = true;
        if (isDisliked) {
            dislikeButton.style.backgroundColor = '#333';
            dislikeCount--;
            isDisliked = false;
        }
    }
    updateButtonCounts();
}

// Count update function
function updateButtonCounts() {
    document.getElementById("like-count").textContent = likeCount;
    document.getElementById("dislike-count").textContent = dislikeCount;
}

// Fullscreen toggle
function toggleFullscreen() {
    const iframe = document.querySelector("iframe");
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    }
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
}
