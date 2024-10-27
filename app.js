const canva = document.getElementById("gameSnake");
const context = canva.getContext("2d");

let box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};
let direction = "RIGHT";
let score = 0;
let game;

document.addEventListener("keydown", changeDirection);

let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let upBtn = document.querySelector(".up");
let downBtn = document.querySelector(".down");
leftBtn.addEventListener("click", () => changeDirection({ keyCode: 37 }));
upBtn.addEventListener("click", () => changeDirection({ keyCode: 38 }));
downBtn.addEventListener("click", () => changeDirection({ keyCode: 40 }));
rightBtn.addEventListener("click", () => changeDirection({ keyCode: 39 }));

function changeDirection(event) {
  if (event.keyCode === 37 && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.keyCode === 38 && direction !== "DOWN") {
    direction = "UP";
  } else if (event.keyCode === 39 && direction !== "LEFT") {
    direction = "RIGHT";
  } else if (event.keyCode === 40 && direction !== "UP") {
    direction = "DOWN";
  }
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = i === 0 ? "#ffb600" : "#f4d489";
    context.fillRect(snake[i].x, snake[i].y, box, box);
    context.strokeStyle = "#f4d489";
    context.strokeRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "#fff";
  context.fillRect(food.x, food.y, box, box);
}

function updateGame() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= 20 * box ||
    snakeY >= 20 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);

    alert("GamerOver");
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  return array.some((segment) => head.x === segment.x && head.y === segment.y);
}

function draw() {
  context.clearRect(0, 0, canva.width, canva.height);
  drawSnake();
  drawFood();
  updateGame();
  context.fillStyle = "#fff";
  context.font = "bold 2rem Montserrat";
  context.fillText("Score: " + score, box, box);
}

function startGame() {
  game = setInterval(draw, 200);
}

let restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", restart);
function restart() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = "RIGHT";
  score = 0;

  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
  };

  clearInterval(game);
  startGame();
}

startGame();
