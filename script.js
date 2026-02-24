(function () {
  const canvas = document.getElementById('hoaMaiCanvas'),
    ctx = canvas.getContext('2d');
  let W,
    H,
    running = true,
    flakes = [],
    numFlakes = 40,
    img = new Image();

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
  img.src =
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBEjChbLNaCPV-SyCPKH_F9WAZA_CgJZTt93dYgQLoAEjlAIQ6wANnI950Y8rHirYCfcL8sXm8dfr92iWdskY1UPFIBF30x0zEhgzxj45lwibWeWLBY7AgG0WjQGQm7SgH8UBDVcUvXUQ/s1600/hoamai.png';
  class Flake {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * -H;
      this.size = 15 + Math.random() * 10;
      this.speed = 0.5 + Math.random() * 1.5;
      this.swing = Math.random() * 2 * Math.PI;
      this.swingSpeed = 0.01 + Math.random() * 0.02;
    }
    update() {
      this.y += this.speed;
      this.swing += this.swingSpeed;
      this.x += Math.sin(this.swing) * 0.5;
      if (this.y > H + this.size) this.reset();
    }
    draw() {
      ctx.drawImage(img, this.x, this.y, this.size, this.size);
    }
  }
  for (let i = 0; i < numFlakes; i++) flakes.push(new Flake());

  function loop() {
    if (running) {
      ctx.clearRect(0, 0, W, H);
      flakes.forEach((f) => {
        f.update();
        f.draw();
      });
    }
    requestAnimationFrame(loop);
  }
  img.onload = loop;
  // style
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9997;
})();
