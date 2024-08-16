const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;  // Narrower canvas width
canvas.height = 600;  // Increased canvas height

let spaceship = new Image();
spaceship.src = './src/assets/jet.png';

let monster = new Image();
monster.src = './src/assets/monster.png';

let spaceshipX = canvas.width / 2 - 25;
const spaceshipY = canvas.height - 60;
const spaceshipSpeed = 30;  // Further increased speed for the spaceship

let bullets = [];
let monsters = [];
let gameRunning = false;
let monsterHitFlash = false;

// Start Game Button
document.getElementById('startGameBtn').addEventListener('click', function () {
    document.getElementById('startGameBtn').style.display = 'none';
    canvas.style.display = 'block';
    gameRunning = true;
    startAutomaticShooting();  // Start automatic shooting
    gameLoop();
});

// Function for automatic shooting
function startAutomaticShooting() {
    setInterval(() => {
        if (gameRunning) {
            bullets.push({ x: spaceshipX + 22, y: spaceshipY });
        }
    }, 300);  // Adjust the shooting interval (milliseconds) as needed
}

// Listen for keyboard input
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' && spaceshipX > 0) {
        spaceshipX -= spaceshipSpeed;
    } else if (e.key === 'ArrowRight' && spaceshipX < canvas.width - 50) {
        spaceshipX += spaceshipSpeed;
    }
});

// Game loop
function gameLoop() {
    if (gameRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw spaceship
        ctx.drawImage(spaceship, spaceshipX, spaceshipY, 50, 50);

        // Draw bullets
        for (let i = 0; i < bullets.length; i++) {
            ctx.fillStyle = 'white';
            ctx.fillRect(bullets[i].x, bullets[i].y, 2, 10);
            bullets[i].y -= 5;

            // Remove bullet if it goes off-screen
            if (bullets[i].y < 0) {
                bullets.splice(i, 1);
                i--;
            }
        }

        // Spawn monsters
        if (Math.random() < 0.02) {
            monsters.push({ x: Math.random() * (canvas.width - 50), y: 0, hit: false });
        }

        // Draw monsters
        for (let i = 0; i < monsters.length; i++) {
            if (monsters[i].hit) {
                // Flash effect when monster is hit
                if (monsterHitFlash) {
                    ctx.drawImage(monster, monsters[i].x, monsters[i].y, 50, 50);
                }
                monsterHitFlash = !monsterHitFlash;
                setTimeout(() => monsters.splice(i, 1), 100);  // Remove the specific monster after a short delay
            } else {
                ctx.drawImage(monster, monsters[i].x, monsters[i].y, 50, 50);
                monsters[i].y += 0.5;  // Further reduced monster speed
            }

            // Check for collisions with bullets
            for (let j = 0; j < bullets.length; j++) {
                if (
                    bullets[j].x > monsters[i].x &&
                    bullets[j].x < monsters[i].x + 50 &&
                    bullets[j].y > monsters[i].y &&
                    bullets[j].y < monsters[i].y + 50
                ) {
                    monsters[i].hit = true;  // Mark only the specific monster as hit
                    bullets.splice(j, 1);
                    break;
                }
            }

            // End game if a monster reaches the bottom
            if (monsters[i] && monsters[i].y > canvas.height - 50) {
                gameRunning = false;
                alert('Game Over! Refresh to play again.');
                break;
            }
        }

        requestAnimationFrame(gameLoop);
    }
}
