const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;

canvas.width = w;
canvas.height = h;
canvas.style.position = "fixed";
canvas.style.inset = "0";
canvas.style.zIndex = "0";
canvas.style.pointerEvents = "none";

const stars = [];
const starCount = 140;

for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.8 + 0.3,
    a: Math.random() * 0.8 + 0.2,
    s: Math.random() * 0.2 + 0.05
  });
}

let mouseX = w / 2;
let mouseY = h / 2;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});

function drawBackground() {
  const gradient = ctx.createRadialGradient(
    w / 2,
    h / 2,
    0,
    w / 2,
    h / 2,
    Math.max(w, h) * 0.7
  );

  gradient.addColorStop(0, "#0b1020");
  gradient.addColorStop(0.5, "#05070f");
  gradient.addColorStop(1, "#000000");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
}

function drawStars() {
  const offsetX = (mouseX - w / 2) * 0.01;
  const offsetY = (mouseY - h / 2) * 0.01;

  for (const star of stars) {
    star.a += (Math.random() - 0.5) * 0.02;
    if (star.a < 0.15) star.a = 0.15;
    if (star.a > 1) star.a = 1;

    ctx.beginPath();
    ctx.arc(
      star.x + offsetX * star.s * 10,
      star.y + offsetY * star.s * 10,
      star.r,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = `rgba(255,255,255,${star.a})`;
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  drawBackground();
  drawStars();
  requestAnimationFrame(animate);
}

animate();