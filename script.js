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
