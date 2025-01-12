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
    const gameTitle = params.get("title");

    if (gameUrl) {
        const iframe = document.querySelector("iframe");
        iframe.src = gameUrl;

        const gameTitleElement = document.getElementById("game-title");
        gameTitleElement.textContent = gameTitle || "Playing Game";
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
document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.querySelector('.search-icon');
    const closeSearchButton = document.getElementById('close-search');

    // Attach event listeners
    searchIcon.addEventListener('click', toggleSearchOverlay);
    closeSearchButton.addEventListener('click', toggleSearchOverlay);
});


// Search functionality
function searchGames() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-card");
    const noResults = document.getElementById("no-results");
    let hasResults = false;

    gameCards.forEach(card => {
        const title = card.getAttribute("data-title").toLowerCase();
        if (title.includes(searchInput)) {
            card.style.display = "block"; // Show matching games
            hasResults = true;
        } else {
            card.style.display = "none"; // Hide non-matching games
        }
    });

    // Display or hide the "No Results" message
    noResults.style.display = hasResults ? "none" : "block";
}
let debounceTimer;
function debounceSearch(callback, delay) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
}
document.getElementById("search-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchGames();
    }
});

 console.log("Search Input:", searchInput);
console.log("Game Cards Found:", gameCards.length);

});
