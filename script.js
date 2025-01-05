 let likeCount = 0;
        let dislikeCount = 0;
        let isLiked = false;
        let isDisliked = false;

        function loadGame(gameTitle, gameUrl) {
    const iframe = document.querySelector("iframe");
    const gameTitleElement = document.getElementById("game-title");

    // Update the iframe source and title
    gameTitleElement.textContent = gameTitle;
    iframe.src = gameUrl;

    // Update the URL without reloading the page
    window.history.pushState(null, "", `?game=${encodeURIComponent(gameUrl)}`);
}

// Load game based on URL when the page loads or reloads
window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const gameUrl = params.get("game");

    if (gameUrl) {
        const iframe = document.querySelector("iframe");
        iframe.src = gameUrl;

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
 function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            document.querySelector('header').classList.toggle('dark-mode');
        }
 // Hamburger Menu Toggle
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show'); // Toggle the 'show' class
}



// Search Bar Toggle
function toggleSearchBar() {
    const searchContainer = document.querySelector('.search-container');
    const searchBar = document.getElementById('search-bar');

    // Toggle 'active' class to show or hide the search bar
    searchContainer.classList.toggle('active');

    // Focus on the search bar when it's visible
    if (searchContainer.classList.contains('active')) {
        searchBar.style.display = 'block'; // Show search bar
        searchBar.focus();
    } else {
        searchBar.style.display = 'none'; // Hide search bar
    }
}


