// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Game Hub is ready!');

    // Add real-time search functionality
    addSearchFunctionality();

    // Add category filter functionality
    addCategoryFiltering();

    // Automatically update meta description based on game title
    updateMetaDescription();

    // Add dark mode toggle functionality
    initializeDarkMode();
});

/**
 * Add search functionality
 */
function addSearchFunctionality() {
    const searchBar = document.getElementById('search-bar');
    const gameGrid = document.querySelector('.game-grid');

    if (searchBar && gameGrid) {
        searchBar.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase();
            const gameCards = gameGrid.querySelectorAll('.game-card');
            let hasResults = false;

            gameCards.forEach((card) => {
                const title = card.querySelector('.game-title').textContent.toLowerCase();
                if (title.includes(searchText)) {
                    card.style.display = 'block';
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide "No Results Found" message
            toggleNoResultsMessage(hasResults, gameGrid);
        });
    }
}

/**
 * Show or hide the "No Results Found" message
 */
function toggleNoResultsMessage(hasResults, gameGrid) {
    const noResultsMessageId = 'no-results';
    let noResults = document.getElementById(noResultsMessageId);

    if (!hasResults) {
        if (!noResults) {
            noResults = document.createElement('p');
            noResults.id = noResultsMessageId;
            noResults.textContent = 'No games found.';
            noResults.style.color = 'red';
            noResults.style.textAlign = 'center';
            gameGrid.appendChild(noResults);
        }
    } else {
        if (noResults) {
            noResults.remove();
        }
    }
}

/**
 * Automatically update the meta description
 */
function updateMetaDescription() {
    const metaDescription = document.querySelector('meta[name="description"]');
    const gameTitleElement = document.querySelector('h1');
    if (metaDescription && gameTitleElement) {
        const gameTitle = gameTitleElement.innerText;
        metaDescription.content = `Play ${gameTitle} on Game Hub! Enjoy this exciting game and explore more.`;
    }
}

/**
 * Add dark mode toggle functionality
 */
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Persist Dark Mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

/**
 * Add category filtering functionality
 */
function addCategoryFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            gameCards.forEach((card) => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Highlight the active filter button
            filterButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

function makeFullscreen() {
    const iframe = document.querySelector('.game-section iframe');
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

function shareGame() {
    if (navigator.share) {
        navigator.share({
            title: document.title, // Use the current page title
            text: "Check out this amazing game on Game Hub!",
            url: window.location.href // Current page URL
        })
        .then(() => console.log('Game shared successfully'))
        .catch((error) => console.error('Error sharing the game:', error));
    } else {
        alert('Sharing is not supported in this browser.');
    }
}
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.style.left === '0px') {
        mobileMenu.style.left = '-100%'; // Close menu
    } else {
        mobileMenu.style.left = '0'; // Open menu
    }
}
