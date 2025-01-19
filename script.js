// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Fullscreen Toggle for Game
function toggleFullscreen() {
    const iframe = document.querySelector("iframe");
    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.mozRequestFullScreen) iframe.mozRequestFullScreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
}

// Like/Dislike Functionality
let likeCount = 0, dislikeCount = 0;
function toggleLike() {
    const likeButton = document.getElementById("like-button");
    const dislikeButton = document.getElementById("dislike-button");
    if (likeButton.classList.contains("active")) {
        likeButton.classList.remove("active");
        likeCount--;
    } else {
        likeButton.classList.add("active");
        likeCount++;
        dislikeButton.classList.remove("active");
        dislikeCount = Math.max(0, dislikeCount - 1);
    }
    updateCounts();
}
function toggleDislike() {
    const dislikeButton = document.getElementById("dislike-button");
    const likeButton = document.getElementById("like-button");
    if (dislikeButton.classList.contains("active")) {
        dislikeButton.classList.remove("active");
        dislikeCount--;
    } else {
        dislikeButton.classList.add("active");
        dislikeCount++;
        likeButton.classList.remove("active");
        likeCount = Math.max(0, likeCount - 1);
    }
    updateCounts();
}
function updateCounts() {
    document.getElementById("like-count").textContent = likeCount;
    document.getElementById("dislike-count").textContent = dislikeCount;
}
