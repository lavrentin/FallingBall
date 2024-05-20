var canvas = document.getElementById("myGame");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var gravity = 9.81;
var dampening = 0.9;
var balls = [];
var lastTime = 0;
var createBall = function (x, y, radius) {
    var velocityY = 0;
    var color = "hsl(".concat(Math.random() * 360, ", 100%, 50%)");
    var update = function (deltaTime) {
        velocityY += gravity * (deltaTime / 1000);
        y += velocityY;
        // Check for collision with the bottom of the canvas
        if (y + radius > canvas.height) {
            y = canvas.height - radius;
            velocityY *= -dampening;
            // Stop bouncing if the velocity is very low
            if (Math.abs(velocityY) < 0.1) {
                velocityY = 0;
            }
        }
    };
    var draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };
    return { update: update, draw: draw };
};
var spawnBall = function (x, y) {
    var radius = 20 + Math.random() * 30;
    var ball = createBall(x, y, radius);
    balls.push(ball);
};
var tick = function (currentTime) {
    var deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (ball) {
        ball.update(deltaTime);
        ball.draw(ctx);
    });
    requestAnimationFrame(tick);
};
canvas.addEventListener("click", function (event) {
    if (balls.length < 15) {
        spawnBall(event.clientX, event.clientY);
    }
});
requestAnimationFrame(tick);
