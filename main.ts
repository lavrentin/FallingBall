const canvas = document.getElementById("myGame") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity: number = 9.81;
const dampening: number = 0.9;
const balls: ReturnType<typeof createBall>[] = [];
let lastTime: number = 0;

const createBall = (x: number, y: number, radius: number) => {
  let velocityY = 0;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

  const update = (deltaTime: number) => {
    velocityY += gravity * (deltaTime / 1000);
    y += velocityY;

    // Check for collision with the bottom of the display

    if (y + radius > canvas.height) {
      y = canvas.height - radius;
      velocityY *= -dampening;

      // If the ball's fall decreases, it will stop
      if (Math.abs(velocityY) < 0.1) {
        velocityY = 0;
      }
    }
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  };

  return { update, draw };
};

const spawnBall = (x: number, y: number) => {
  const radius = 20 + Math.random() * 30;
  const ball = createBall(x, y, radius);
  balls.push(ball);
};

const tick = (currentTime: number) => {
  const deltaTime: number = currentTime - lastTime;
  lastTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.update(deltaTime);
    ball.draw(ctx);
  });

  requestAnimationFrame(tick);
};

// Create a ball

canvas.addEventListener("click", (event: MouseEvent) => {
  if (balls.length < 15) {
    spawnBall(event.clientX, event.clientY);
  }
});

requestAnimationFrame(tick);
