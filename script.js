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
 * Game data
 */
const games = [
    { title: "Angry Birds", thumbnail: "images/angry-birds-thumbnail.jpg", link: "game/angry-birds.html", category: "action" },
    { title: "Candy Crush", thumbnail: "images/candy-crush-thumbnail.jpg", link: "game/candy-crush.html", category: "puzzle" },
    // Add more games here
];

/**
 * Check if the current page is the index page
 */
function isIndexPage() {
    return document.body.classList.contains('index-page');
}

/**
 * Populate the game grid dynamically (for game pages)
 */
function populateGames() {
    const gameGrid = document.querySelector('.game-grid');
    if (gameGrid) {
        games.forEach((game) => {
            const gameCard = document.createElement('a');
            gameCard.href = game.link;
            gameCard.classList.add('game-card');
            gameCard.setAttribute('data-category', game.category);

            gameCard.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <div class="game-title">${game.title}</div>
            `;

            gameGrid.appendChild(gameCard);
        });
    }
}

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
