const gameContainer = document.getElementById('game-container');
const boxes = [];
let playerX = 0;
let playerY = 0;
let isGameOver = false;

// Rasgele bir kutu oluştur
function createBox(className) {
    const box = document.createElement('div');
    box.className = 'box ' + className;
    const x = Math.floor(Math.random() * (gameContainer.clientWidth - 30));
    const y = Math.floor(Math.random() * (gameContainer.clientHeight - 30));
    box.style.left = x + 'px';
    box.style.top = y + 'px';
    gameContainer.appendChild(box);
    boxes.push(box);
}

// Kutuları temizle
function clearBoxes() {
    for (const box of boxes) {
        gameContainer.removeChild(box);
    }
    boxes.length = 0;
}

// Oyunu başlat
function startGame() {
    playerX = 0;
    playerY = 0;
    document.getElementById('player').style.left = playerX + 'px';
    document.getElementById('player').style.top = playerY + 'px';
    clearBoxes();
    isGameOver = false;

    for (let i = 0; i < 10; i++) {
        createBox('red-box');
    }

    // Kazanma hedefini en uzak yere yerleştir
    const goalX = gameContainer.clientWidth - 30;
    const goalY = gameContainer.clientHeight - 30;
    document.getElementById('goal').style.left = goalX + 'px';
    document.getElementById('goal').style.top = goalY + 'px';

    gameContainer.addEventListener('click', () => {
        if (isGameOver) {
            clearBoxes();
            startGame();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!isGameOver) {
            if (event.key === 'ArrowRight' && playerX < gameContainer.clientWidth - 30) {
                playerX += 10;
            } else if (event.key === 'ArrowLeft' && playerX > 0) {
                playerX -= 10;
            } else if (event.key === 'ArrowDown' && playerY < gameContainer.clientHeight - 30) {
                playerY += 10;
            } else if (event.key === 'ArrowUp' && playerY > 0) {
                playerY -= 10;
            }

            // Oyuncu hareketini gameContainer içinde sınırla
            playerX = Math.max(0, Math.min(gameContainer.clientWidth - 30, playerX));
            playerY = Math.max(0, Math.min(gameContainer.clientHeight - 30, playerY));

            document.getElementById('player').style.left = playerX + 'px';
            document.getElementById('player').style.top = playerY + 'px';

            // Oyuncunun engel kutulara çarpıp çarpmadığını kontrol et
            for (const box of boxes) {
                if (isCollision(document.getElementById('player'), box)) {
                    isGameOver = true;
                    alert('Kaybettiniz!');
                    break;
                }
            }

            // Oyuncu hedefe ulaştı mı?
            if (isCollision(document.getElementById('player'), document.getElementById('goal'))) {
                isGameOver = true;
                alert('Kazandınız!');
            }
        }
    });
}

// İki elementin çarpışıp çarpmadığını kontrol eden fonksiyon
function isCollision(player, box) {
    const playerRect = player.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();
    return (
        playerRect.left < boxRect.right &&
        playerRect.right > boxRect.left &&
        playerRect.top < boxRect.bottom &&
        playerRect.bottom > boxRect.top
    );
}

// Oyuna başla
startGame();
