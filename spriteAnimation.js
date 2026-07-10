/* ========== CANVAS SETUP ========== */
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = canvas.width = 510;
const height = canvas.height = 700;
// canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";

/* ========== GAME VARIABLES ========== */
let keys = {
  right: false,
  left: false,
};
let inGame_spriteVelocityX = 0;

let gameStarted = false;
let gameOver = false;
let isJumping = false;
let isFalling = false;
let velocity = 20;
let gravity = 0.98;
let currentState = "breathe";
let previousState = currentState;
let frameIndex = 0;
let count = 0;

let backgroundX = 0;
let frontgroundX = 0;

/* ========== CONSTANTS ========== */
const maxObstacleHeight = 0;
const minObstacleHeight = 300;
const maxObstacleVelocityX = 11;
const minObstacleVelocityX = 7;
const original_velocity = 20;
const original_gravity = 0.98;
const offset = 7;
let xPosOnCanvas = 100;
let yPosOnCanvas = 490;

const startScreen_backgroundSpeed = 0.5;
const startScreen_foregroundSpeed = 1;
let inGame_backgroundSpeed = 1;
let inGame_foregroundSpeed = 8;
const obstacleWidth = 40;
const obstacleHeight = 40;
const inGame_spriteStartingVelocityX = 0;
const inGame_spriteAccelerationX = 3;
let obstacleVelocityY = 0;
let obstacleVelocityX = Math.random() * (maxObstacleVelocityX - minObstacleVelocityX + 1) + minObstacleVelocityX;
let obstacleX = width;
let obstacleY = Math.random() * (minObstacleHeight - maxObstacleHeight + 1) + maxObstacleHeight;

let treeX = width + 200;
let treeY = 500;
let treeActive = false;
let treeSpawnTimer = 0;
const treeWidth = 85;
const treeHeight = 130;
const treeVelocityX = 10;
const treeMinSpawnDelay = 150;
const treeMaxSpawnDelay = 250;

let scale = 1.2;

/* ========== SPRITE STATES ========== */
const states = {
  breathe: {start: 0, end: 4, spriteWidth: 104, spriteHeight: 142, ySprite: 0, count: 15, scale: 0.5},
  attack: {start: 0, end: 6, spriteWidth: 182, spriteHeight: 124, ySprite: 154, count: 7, scale: scale * 1.1},
  walk: {start: 0, end: 7, spriteWidth: 93, spriteHeight: 139, ySprite: 310, count: 5, scale: scale},
  run_right: {start: 0, end: 7, spriteWidth: 57, spriteHeight: 82, ySprite: 454, count: 5, scale: scale * 1.5},
  run_left: {start: 0, end: 7, spriteWidth: 57, spriteHeight: 82, ySprite: 454, count: 10, scale: scale * 1.5},
  jump: {start: 0, end: 7, spriteWidth: 57, spriteHeight: 82, ySprite: 454, count: 1000, scale: scale * 1.5}
};

/* ========== LOAD IMAGES ========== */
const spriteSheet = new Image();
spriteSheet.src = "images/spriteSheet.png";

const backgroundImage = new Image();
backgroundImage.src = "images/backGround.png";

const frontgroundImage = new Image();
frontgroundImage.src = "images/foreGround.png";

const obstacleImage = new Image();
obstacleImage.src = "images/snowballObstacle.png";

const playButtonImage = new Image();
playButtonImage.src = "images/playButton.png";

const christmasTreeImage = new Image();
christmasTreeImage.src = "images/christmasTree.png";

/* ========== FUNCTIONS ========== */

function startgame() {
  backgroundSpeed = startScreen_backgroundSpeed;
  frontgroundSpeed = startScreen_foregroundSpeed;

  // Blur background
  context.save();
  context.filter = 'blur(6px)';

  backgroundX -= backgroundSpeed;
  frontgroundX -= frontgroundSpeed;

  if (backgroundX <= -width) backgroundX = 0;
  if (frontgroundX <= -width) frontgroundX = 0;

  context.drawImage(backgroundImage, backgroundX, 0, width + 20, 625);
  context.drawImage(backgroundImage, backgroundX + width, 0, width + 20, 625);
  context.drawImage(frontgroundImage, frontgroundX, 600, width + 20, 100);
  context.drawImage(frontgroundImage, frontgroundX + width, 600, width + 20, 100);

  context.restore();

  // Draw sprite
  currentState = "breathe";
  const state = states[currentState];
  const xSprite = frameIndex * state.spriteWidth;
  context.drawImage(
    spriteSheet,
    xSprite, state.ySprite, state.spriteWidth, state.spriteHeight,
    230, 400,
    state.spriteWidth * state.scale, state.spriteHeight * state.scale
  );

  // Draw play button
  window.buttonXPosition = (width - 130)/2
  window.buttonYPosition = (height - 230)/2

  context.drawImage(playButtonImage, buttonXPosition, buttonYPosition, 130, 130);
  count++;
  if (count > state.count) {
    frameIndex++;
    count = 0;
  }
  if (frameIndex > state.end) frameIndex = state.start;

  isJumping = false;
  isFalling = false;
}

function movingBackgroundInfinitely() {
  if (keys.right) {
    inGame_backgroundSpeed = 1;
    inGame_foregroundSpeed = 11;
    backgroundX -= inGame_backgroundSpeed;
    frontgroundX -= inGame_foregroundSpeed;

    if (backgroundX <= -width) backgroundX = 0;
    if (frontgroundX <= -width) frontgroundX = 0;

    context.drawImage(backgroundImage, backgroundX, 0, width + 2, 625);
    context.drawImage(backgroundImage, backgroundX + width, 0, width + 2, 625);
    context.drawImage(frontgroundImage, frontgroundX, 600, width + 2, 100);
    context.drawImage(frontgroundImage, frontgroundX + width, 600, width + 2, 100);
  }
  else if (keys.left) {
    inGame_backgroundSpeed = 1;
    inGame_foregroundSpeed = 9;
    backgroundX -= inGame_backgroundSpeed;
    frontgroundX -= inGame_foregroundSpeed;

    if (backgroundX <= -width) backgroundX = 0;
    if (frontgroundX <= -width) frontgroundX = 0;

    context.drawImage(backgroundImage, backgroundX, 0, width + 2, 625);
    context.drawImage(backgroundImage, backgroundX + width, 0, width + 2, 625);
    context.drawImage(frontgroundImage, frontgroundX, 600, width + 2, 100);
    context.drawImage(frontgroundImage, frontgroundX + width, 600, width + 2, 100);
  }
  else {
    inGame_backgroundSpeed = 1;
    inGame_foregroundSpeed = 10;
    backgroundX -= inGame_backgroundSpeed;
    frontgroundX -= inGame_foregroundSpeed;

    if (backgroundX <= -width) backgroundX = 0;
    if (frontgroundX <= -width) frontgroundX = 0;

    context.drawImage(backgroundImage, backgroundX, 0, width + 2, 625);
    context.drawImage(backgroundImage, backgroundX + width, 0, width + 2, 625);
    context.drawImage(frontgroundImage, frontgroundX, 600, width + 2, 100);
    context.drawImage(frontgroundImage, frontgroundX + width, 600, width + 2, 100);
  }
}

function inGameCreatingAndMovingSprite() {
  const state = states[currentState];
  const xSprite = frameIndex * state.spriteWidth;

  // Apply rightward movement if key is held
  if (keys.right) {
    if (xPosOnCanvas < (width - 57)) {
      inGame_spriteVelocityX += inGame_spriteAccelerationX * 0.1;
      xPosOnCanvas += inGame_spriteVelocityX;
    }
    else {
      endgame()
    }
  } 
  else if (keys.left) {
    if (xPosOnCanvas > -20) {
      inGame_spriteVelocityX -= inGame_spriteAccelerationX * 0.15;
      xPosOnCanvas += inGame_spriteVelocityX;
    }
    else {
      endgame()
    }
  }
  else {
    inGame_spriteVelocityX *= 0.9; //friction
  }

  context.drawImage(
    spriteSheet,
    xSprite, state.ySprite, state.spriteWidth, state.spriteHeight,
    xPosOnCanvas, yPosOnCanvas,
    state.spriteWidth * state.scale, state.spriteHeight * state.scale
  );

  count++;
  if (count > state.count) {
    frameIndex++;
    count = 0;
  }
  if (frameIndex > state.end) frameIndex = state.start;
}


function inGameCreatingAndMovingObstacle() {
  obstacleX -= obstacleVelocityX;
  obstacleY += obstacleVelocityY;
  obstacleVelocityY += gravity/4;

  // Reset obstacle when it leaves the screen
  if (obstacleX + obstacleWidth < 0 || obstacleY > 600) {
    obstacleX = width + Math.random() * 200;
    obstacleY = Math.random() * (minObstacleHeight - maxObstacleHeight + 1) + maxObstacleHeight;
    obstacleVelocityY = 0;
  }

  context.drawImage(obstacleImage, obstacleX, obstacleY, obstacleWidth, obstacleHeight);
}

function inGameCreatingAndMovingTree() {
  if (!treeActive) {
    if (treeSpawnTimer > 0) {
      treeSpawnTimer--;
      return;
    }

    treeActive = true;
    treeX = width + 40 + Math.random() * 80;
    return;
  }

  treeX -= treeVelocityX;

  if (treeX + treeWidth < 0) {
    treeActive = false;
    treeSpawnTimer = Math.floor(Math.random() * (treeMaxSpawnDelay - treeMinSpawnDelay + 1)) + treeMinSpawnDelay;
    return;
  }

  context.drawImage(christmasTreeImage, treeX, treeY, treeWidth, treeHeight);
}

function inGameSpriteJump() {
  if (isJumping && !isFalling && velocity > 0) {
    velocity -= gravity;
    yPosOnCanvas -= velocity;
  } else if (velocity <= 0 && isJumping) {
    isFalling = true;
    isJumping = false;
  }

  if (isFalling && yPosOnCanvas < 490) {
    velocity += gravity;
    yPosOnCanvas += velocity;
  } else if (isFalling && yPosOnCanvas >= 490) {
    yPosOnCanvas = 490;
    velocity = 15;
    isFalling = false;
    currentState = "run_right";
  }
}

function inGameCheckingForCollision() {
  const characterRight = xPosOnCanvas + states[currentState].spriteWidth * states[currentState].scale;
  const characterBottom = yPosOnCanvas + states[currentState].spriteHeight * states[currentState].scale;

  if (
    characterRight > obstacleX + offset &&
    xPosOnCanvas < obstacleX &&
    characterBottom > obstacleY + offset &&
    yPosOnCanvas < obstacleY + obstacleHeight
  ) {
    endgame();
  }

  if (treeActive) {
    const feetLeft = xPosOnCanvas + 24;
    const feetRight = characterRight - 24;
    const feetTop = characterBottom - 24;
    const feetBottom = characterBottom - 4;
    const headLeft = xPosOnCanvas + 28;
    const headRight = characterRight - 28;
    const headTop = yPosOnCanvas + 8;
    const headBottom = yPosOnCanvas + 38;

    if (
      feetRight > treeX + 12 &&
      feetLeft < treeX + treeWidth - 14 &&
      feetBottom > treeY + 10 &&
      feetTop < treeY + treeHeight - 12
    ) {
      endgame();
    }

    if (
      headRight > treeX + 12 &&
      headLeft < treeX + treeWidth - 14 &&
      headBottom > treeY + 10 &&
      headTop < treeY + treeHeight - 12
    ) {
      endgame();
    }
  }
}

function animate() {
  context.filter = 'none';  

  if (!gameOver) {
    frontgroundSpeed = inGame_foregroundSpeed;
    movingBackgroundInfinitely();
    inGameCreatingAndMovingSprite();
    inGameCreatingAndMovingObstacle();
    inGameCreatingAndMovingTree();
    inGameSpriteJump();
    inGameCheckingForCollision();
  } else {
    // Freeze the last frame by redrawing current positions without updates
    context.drawImage(backgroundImage, backgroundX, 0, width + 2, 625);
    context.drawImage(backgroundImage, backgroundX + width, 0, width + 2, 625);
    context.drawImage(frontgroundImage, frontgroundX, 600, width + 2, 100);
    context.drawImage(frontgroundImage, frontgroundX + width, 600, width + 2, 100);

    const state = states[currentState];
    const xSprite = frameIndex * state.spriteWidth;
    context.drawImage(
      spriteSheet,
      xSprite, state.ySprite, state.spriteWidth, state.spriteHeight,
      xPosOnCanvas, yPosOnCanvas,
      state.spriteWidth * state.scale, state.spriteHeight * state.scale
    );
    context.drawImage(obstacleImage, obstacleX, obstacleY, obstacleWidth, obstacleHeight);
    if (treeActive) {
      context.drawImage(christmasTreeImage, treeX, treeY, treeWidth, treeHeight);
    }
  }
}


function frame() {
  context.clearRect(0, 0, width, height);

  if (!gameStarted) {
    startgame();
  } else {
    animate();
  }
  requestAnimationFrame(frame);
}


function resetGame() {
  gameStarted = false;
  gameOver = false;
  isJumping = false;
  isFalling = false;
  currentState = "run_right";
  previousState = currentState;
  frameIndex = states[currentState].start;
  count = 0;
  yPosOnCanvas = 490;
  obstacleX = width;
  obstacleY = Math.random() * (minObstacleHeight - maxObstacleHeight + 1) + maxObstacleHeight;
  obstacleVelocityY = 0;
  treeX = width + 200;
  treeY = 500;
  treeActive = false;
  treeSpawnTimer = 0;
  velocity = original_velocity;
  gravity = original_gravity;
  xPosOnCanvas = 100;
  backgroundSpeed = startScreen_backgroundSpeed;
  frontgroundSpeed = startScreen_foregroundSpeed;
  obstacleVelocityX = Math.random() * (maxObstacleVelocityX - minObstacleVelocityX + 1) + minObstacleVelocityX;;
}


function endgame() {
  gameOver = true;

  setTimeout(() => {
    resetGame();
  }, 400);
}

/* ========== GAME LOOP ========== */
frame();

/* ========== EVENT LISTENERS ========== */
document.addEventListener("keydown", function (event) {
  if ((event.key === "w" || event.key === "ArrowUp") && !isJumping && !isFalling) {
    isJumping = true;
    currentState = "jump";
  }
  if (event.key === "ArrowRight") {
    keys.right = true;
  }
  if (event.key === "ArrowLeft") {
    keys.left = true;
  }
});

document.addEventListener("keyup", function (event) {
if (event.key === "ArrowRight") {
    keys.right = false;
    inGame_spriteVelocityX = 0;
  }
  if (event.key === "ArrowLeft") {
    keys.left = false;
    inGame_spriteVelocityX = 0;
  }
});


canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Circle button center and radius
  const buttonRadius = 65;
  const buttonX = buttonXPosition + buttonRadius;
  const buttonY = buttonYPosition + buttonRadius;

  // Calculate distance between mouse and button center
  const dx = mouseX - buttonX;
  const dy = mouseY - buttonY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= buttonRadius) {
    gameStarted = true;
    currentState = "run_right";
  }
});