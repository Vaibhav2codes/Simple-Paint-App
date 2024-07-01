const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');
let circles = [];
let isDrawing = false;
let startX, startY;

canvas.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        isDrawing = true;
        startX = e.offsetX;
        startY = e.offsetY;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAllCircles();
        const radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fill();
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (isDrawing) {
        const radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
        if (radius > 0) {
            circles.push({
                x: startX,
                y: startY,
                radius: radius,
                color: getRandomColor()
            });
        }
        isDrawing = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAllCircles();
    }
});

canvas.addEventListener('click', (e) => {
    if (!isDrawing) {
        const hit = circles.some(circle => isInsideCircle(e.offsetX, e.offsetY, circle));
        message.textContent = hit ? 'Hit' : 'Miss';
    }
});

canvas.addEventListener('dblclick', (e) => {
    circles = circles.filter(circle => !isInsideCircle(e.offsetX, e.offsetY, circle));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAllCircles();
});

resetButton.addEventListener('click', () => {
    circles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function drawAllCircles() {
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
    });
}

function isInsideCircle(x, y, circle) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
