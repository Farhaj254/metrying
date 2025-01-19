// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Game Hub is ready!');

    // Populate the game grid dynamically
    populateGames();

    // Add real-time search functionality
    addSearchFunctionality();

    // Automatically update meta description based on game title
    updateMetaDescription();
});

/**
 * Game data
 */
const games = [
    { title: "Angry Birds", thumbnail: "images/angry-birds-thumbnail.jpg", link: "game/angry-birds.html" },
    { title: "Candy Crush", thumbnail: "images/candy-crush-thumbnail.jpg", link: "game/candy-crush.html" },
    // Add more games here
];

/**
 * Populate the game grid dynamically
 */
function populateGames() {
    const gameGrid = document.querySelector('.game-grid');
    if (gameGrid) {
        games.forEach((game) => {
            const gameCard = document.createElement('a');
            gameCard.href = game.link;
            gameCard.classList.add('game-card');

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

    // Check if the grid exists
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

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Persist Dark Mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}


document.addEventListener('DOMContentLoaded', () => {
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
        });
    });
});
