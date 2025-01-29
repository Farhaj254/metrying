// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Game Hub is ready!");

    // Add dark mode toggle functionality
    initializeDarkMode();

    // Add category filter functionality
    addCategoryFiltering();
});

// Open Search Section
function openSearchSection() {
    const searchSection = document.getElementById("search-section");
    searchSection.style.display = "block"; // Show search overlay
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

// Close Search Section
function closeSearchSection() {
    const searchSection = document.getElementById("search-section");
    searchSection.style.display = "none"; // Hide search overlay
    document.body.style.overflow = "auto"; // Restore background scroll
}

// Filter Games in Overlay (Real-Time Search)
function filterGamesOverlay() {
    const searchBar = document.getElementById("overlay-search-bar");
    const searchText = searchBar.value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-grid .game-card");
    const searchResultsGrid = document.getElementById("search-results-grid");

    searchResultsGrid.innerHTML = ""; // Clear previous results

    let hasResults = false;

    gameCards.forEach((card) => {
        const title = card.querySelector(".game-title").textContent.toLowerCase();
        if (title.includes(searchText)) {
            const clonedCard = card.cloneNode(true); // Clone the matching game card
            searchResultsGrid.appendChild(clonedCard);
            hasResults = true;
        }
    });

    // Show "No Results Found" message if no matches
    if (!hasResults) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.id = "no-results";
        noResultsMessage.textContent = "No games found.";
        noResultsMessage.style.textAlign = "center";
        noResultsMessage.style.color = "red";
        searchResultsGrid.appendChild(noResultsMessage);
    }
}


// Dark Mode Toggle
function initializeDarkMode() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark-mode")
        );
    });

    // Persist Dark Mode
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

// Add Category Filtering
function addCategoryFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const gameCards = document.querySelectorAll(".game-grid .game-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            gameCards.forEach((card) => {
                const cardCategories = card.dataset.category.split(" ");
                if (category === "all" || cardCategories.includes(category)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });

            // Highlight active button
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
}
// scroll continuity 

document.addEventListener("DOMContentLoaded", () => {
    const scrollingContainer = document.querySelector(".scrolling-container");
    const cards = [...document.querySelectorAll(".scrolling-game-card")];

    const cardWidth = cards[0].offsetWidth; // Width of a single card
    const gap = 30; // Gap between cards
    const totalWidth = (cardWidth + gap) * cards.length; // Total width of all cards with gaps

    let speed = 2; // Adjust scrolling speed
    let isPaused = false; // Flag to track pause state
    let isDragging = false;
    let startX, scrollLeft;

    function loop() {
        if (!isPaused && !isDragging) {  // Only move when not paused or dragging
            cards.forEach((card) => {
                const currentLeft = parseFloat(card.style.left || card.offsetLeft);
                const newLeft = currentLeft - speed;

                // If the card moves completely out of view on the left, reposition it to the right side
                if (newLeft + cardWidth < 0) {
                    card.style.left = `${currentLeft + totalWidth}px`;
                } else {
                    card.style.left = `${newLeft}px`;
                }
            });
        }

        requestAnimationFrame(loop);
    }

    // Initialize card positions
    let initialLeft = 0;
    cards.forEach((card) => {
        card.style.position = "absolute";
        card.style.left = `${initialLeft}px`;
        initialLeft += cardWidth + gap; // Increment by card width + gap
    });

    // Start the animation loop (Only for desktop users)
    if (!("ontouchstart" in window)) {
        loop();
    }

    // Stop scrolling when hovering over a game card (for desktop)
    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            isPaused = true; // Stop movement when hovering over a card
        });

        card.addEventListener("mouseleave", () => {
            isPaused = false; // Resume movement when leaving the card
        });
    });

    // Enable touch-based scrolling for mobile users
    scrollingContainer.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - scrollingContainer.offsetLeft;
        scrollLeft = scrollingContainer.scrollLeft;
    });

    scrollingContainer.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - scrollingContainer.offsetLeft;
        const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
        scrollingContainer.scrollLeft = scrollLeft - walk;
    });

    scrollingContainer.addEventListener("touchend", () => {
        isDragging = false;
    });

    // Enable click-and-drag scrolling for desktop users
    let isMouseDown = false;
    scrollingContainer.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        scrollingContainer.classList.add("dragging");
        startX = e.pageX - scrollingContainer.offsetLeft;
        scrollLeft = scrollingContainer.scrollLeft;
    });

    scrollingContainer.addEventListener("mousemove", (e) => {
        if (!isMouseDown) return;
        const x = e.pageX - scrollingContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollingContainer.scrollLeft = scrollLeft - walk;
    });

    scrollingContainer.addEventListener("mouseup", () => {
        isMouseDown = false;
        scrollingContainer.classList.remove("dragging");
    });

    scrollingContainer.addEventListener("mouseleave", () => {
        isMouseDown = false;
    });
});


//scroll pause function
