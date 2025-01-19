document.addEventListener('DOMContentLoaded', () => {
    console.log('Game Hub is ready!');
    // Add future scripts here
});
const games = [
    { title: "Angry Birds", thumbnail: "images/angry-birds-thumbnail.jpg", link: "angry-birds.html" },
    { title: "Candy Crush", thumbnail: "images/candy-crush-thumbnail.jpg", link: "candy-crush.html" },
    // Add more games here
];

document.addEventListener('DOMContentLoaded', () => {
    const gameGrid = document.querySelector('.game-grid');

    if (gameGrid) {
        games.forEach(game => {
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
});
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const metaDescription = document.querySelector('meta[name="description"]');
        const gameTitle = document.querySelector('h1').innerText;

        if (metaDescription) {
            metaDescription.content = `Play ${gameTitle} on Game Hub! Enjoy this exciting game and explore more.`;
        }
    });
</script>

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const gameGrid = document.getElementById('game-grid');
    const gameCards = document.querySelectorAll('.game-card');

    searchBar.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();

        gameCards.forEach((card) => {
            const title = card.querySelector('.game-title').textContent.toLowerCase();
            if (title.includes(searchText)) {
                card.style.display = 'block'; // Show matching cards
            } else {
                card.style.display = 'none'; // Hide non-matching cards
            }
        });
    });
});

searchBar.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();

    gameCards.forEach((card) => {
        const titleElement = card.querySelector('.game-title');
        const titleText = titleElement.textContent;

        if (titleText.toLowerCase().includes(searchText)) {
            card.style.display = 'block';

            // Highlight matching text
            const regex = new RegExp(`(${searchText})`, 'gi');
            titleElement.innerHTML = titleText.replace(regex, '<span class="highlight">$1</span>');
        } else {
            card.style.display = 'none';
        }

        searchBar.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
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

    // Show/hide "No Results Found"
    const noResults = document.getElementById('no-results');
    if (!hasResults) {
        if (!noResults) {
            const message = document.createElement('p');
            message.id = 'no-results';
            message.textContent = 'No games found.';
            gameGrid.appendChild(message);
        }
    } else {
        if (noResults) {
            noResults.remove();
        }
    }
});

    });
});
