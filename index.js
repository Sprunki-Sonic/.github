// index.js

// Basic game setup
const game = {
    score: 0,
    level: 1,
    isPlaying: false,
};

// Key bindings for rhythm controls
const controls = {
    up: false,
    down: false,
    left: false,
    right: false,
};

// Initialize the game
function startGame() {
    game.isPlaying = true;
    game.score = 0;
    game.level = 1;
    document.getElementById("score").innerText = `Score: ${game.score}`;
    document.getElementById("level").innerText = `Level: ${game.level}`;
    console.log("Game started!");
    nextBeat();
}

// Function to simulate rhythm pattern
function nextBeat() {
    if (!game.isPlaying) return;

    const directions = ["up", "down", "left", "right"];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    highlightDirection(randomDirection);

    // Check if player pressed the correct key
    setTimeout(() => {
        if (controls[randomDirection]) {
            updateScore();
        } else {
            endGame();
        }
        resetControls();
        nextBeat();
    }, 1000);
}

// Highlight a direction to press
function highlightDirection(direction) {
    const element = document.getElementById(direction);
    element.classList.add("highlight");
    setTimeout(() => element.classList.remove("highlight"), 500);
}

// Update the player's score
function updateScore() {
    game.score += 10;
    document.getElementById("score").innerText = `Score: ${game.score}`;
}

// End the game
function endGame() {
    game.isPlaying = false;
    alert(`Game Over! Your final score is ${game.score}`);
    console.log("Game ended.");
}

// Reset key presses
function resetControls() {
    controls.up = false;
    controls.down = false;
    controls.left = false;
    controls.right = false;
}

// Handle key down events
document.addEventListener("keydown", (event) => {
    if (!game.isPlaying) return;

    switch (event.key) {
        case "ArrowUp":
            controls.up = true;
            break;
        case "ArrowDown":
            controls.down = true;
            break;
        case "ArrowLeft":
            controls.left = true;
            break;
        case "ArrowRight":
            controls.right = true;
            break;
    }
});

// Start button event listener
document.getElementById("startButton").addEventListener("click", startGame);
