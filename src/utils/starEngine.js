// Utility to generate stars and spawn shooting stars without React interference

const NUM_STARS = 250;
const MIN_TWINKLE_DURATION = 2;
const MAX_TWINKLE_DURATION = 6;

// Generate stars with spacing rules
export function generateStars(container) {
  if (!container) return;
  container.innerHTML = "";

  const stars = [];
  const width = window.innerWidth;
  const height = window.innerHeight;

  const checkOverlap = (x, y, existing, minDist = 25) =>
    existing.some((s) => Math.hypot(s.x - x, s.y - y) < minDist);

  for (let i = 0; i < NUM_STARS; i++) {
    let x, y, attempts = 0;

    do {
      x = Math.random() * width;
      y = Math.random() * height;
      attempts += 1;
      if (attempts > 50) break;
    } while (checkOverlap(x, y, stars));

    const size = Math.random() * 2 + 1;
    const duration =
      MIN_TWINKLE_DURATION +
      Math.random() * (MAX_TWINKLE_DURATION - MIN_TWINKLE_DURATION);
    const delay = Math.random() * 5;

    const star = document.createElement("div");
    star.className = "star";
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.setProperty("--twinkle-duration", `${duration}s`);
    star.style.setProperty("--twinkle-delay", `${delay}s`);

    if (Math.random() > 0.8) star.style.animation = "none";

    container.appendChild(star);
    stars.push({ x, y });
  }
}

// Shooting star creator
export function spawnShootingStar(container) {
  if (!container) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = Math.random() * width * 0.8;
  const y = Math.random() * height * 0.5;

  const shooting = document.createElement("div");
  shooting.className = "shooting-star";
  shooting.style.left = `${x}px`;
  shooting.style.top = `${y}px`;
  shooting.style.setProperty(
    "--shoot-speed",
    `${1.2 + Math.random() * 0.6}s`
  );

  container.appendChild(shooting);

  shooting.addEventListener("animationend", () => {
    shooting.remove();
  });
}
