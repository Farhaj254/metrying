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

       // Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
}
// Hamburger Menu Toggle
// Toggle Hamburger Menu Visibility
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');

    // Toggle 'show' class for visibility
    navMenu.classList.toggle('show');

    // Close other menus when toggling
    const searchBar = document.getElementById('search-bar');
    const searchContainer = document.querySelector('.search-container');

    if (navMenu.classList.contains('show')) {
        searchBar.style.display = 'none'; // Hide search bar
        searchContainer.classList.remove('active'); // Remove search container active state
    }
}


function toggleSearchBar() {
    const searchBar = document.getElementById('search-bar');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Mobile: Toggle visibility
        searchBar.classList.toggle('active'); 
        if (searchBar.classList.contains('active')) {
            searchBar.focus(); // Focus on input
        }
    } else {
        // Desktop: Always visible
        searchBar.style.display = 'block';
    }
}



