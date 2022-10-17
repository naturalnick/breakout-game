
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.clientHeight - 20;
let dx = 2;
let dy = -2;

const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
      } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }
    
    x += dx;
    y += dy;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "0095DD";
    ctx.fill();
    ctx.closePath();
}

const interval = setInterval(draw, 15);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }
  