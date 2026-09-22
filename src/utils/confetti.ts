import confetti from 'canvas-confetti';

export function launchHeartConfetti(originX = 0.5, originY = 0.6) {
  // Burst with romantic colors: rose, gold, blush pink, coral, champagne
  const count = 45;
  const defaults = {
    origin: { x: originX, y: originY },
    colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#fcd34d', '#f43f5e', '#ffffff'],
    disableForReducedMotion: true,
  };

  confetti({
    ...defaults,
    particleCount: count,
    spread: 60,
    startVelocity: 35,
    scalar: 1.2,
    shapes: ['circle'],
  });

  confetti({
    ...defaults,
    particleCount: 25,
    spread: 100,
    startVelocity: 45,
    scalar: 1.6,
  });
}

export function launchBirthdayExplosion() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = window.setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // Since particles fall down, start a bit higher
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#fef08a', '#e879f9'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#fef08a', '#e879f9'],
    });
  }, 250);
}

export function launchSingleFirework(x: number, y: number) {
  confetti({
    particleCount: 80,
    spread: 360,
    startVelocity: 35,
    origin: { x, y },
    colors: ['#ff2a5f', '#ffd166', '#06d6a0', '#118ab2', '#f72585', '#ffffff'],
    scalar: 1.1,
    ticks: 80,
  });
}
