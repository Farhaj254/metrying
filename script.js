let likeCount = 0;
let dislikeCount = 0;
let isLiked = false;
let isDisliked = false;

function loadGame(gameTitle, gameUrl) {
    const iframe = document.querySelector("iframe");
    const gameTitleElement = document.getElementById("game-title");
    gameTitleElement.textContent = gameTitle;
    iframe.src = gameUrl;
}

function toggleLike() {
    const likeButton = document.getElementById("like-button");
    if (isLiked) {
        likeButton.style.backgroundColor = '';
        likeCount--;
        isLiked = false;
    } else {
        likeButton.style.backgroundColor = '#00FF00';
        likeCount++;
        isLiked = true;
    }
    updateCounts();
}

function toggleDislike() {
    const dislikeButton = document.getElementById("dislike-button");
    if (isDisliked) {
        dislikeButton.style.backgroundColor = '';
        dislikeCount--;
        isDisliked = false;
    } else {
        dislikeButton.style.backgroundColor = '#FF0000';
        dislikeCount++;
        isDisliked = true;
    }
    updateCounts();
}

function updateCounts() {
    document.getElementById("like-count").textContent = likeCount;
    document.getElementById("dislike-count").textContent = dislikeCount;
}

function toggleFullscreen() {
    const iframe = document.querySelector("iframe");
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
