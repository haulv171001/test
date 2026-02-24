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

  // ===== HIỆU ỨNG CHỮ CHẠY =====
  // Các biến có thể tùy chỉnh
  const textConfig = {
    text: 'ĐỊT MẸ MÀY', // Nội dung text
    speed: 3, // Tốc độ chạy (pixel/frame)
    fontSize: 48, // Kích thước font
    fontFamily: 'Arial, sans-serif', // Font chữ
    fontColor: '#FFD700', // Màu chữ (vàng)
    fontWeight: 'bold', // In đậm
    shadowColor: '#000000', // Màu bóng
    shadowBlur: 10, // Mức độ mờ bóng
    shadowOffsetX: 2, // Độ lệch X bóng
    shadowOffsetY: 2, // Độ lệch Y bóng
    opacity: 0.9, // Độ trong suốt (0-1)
    startX: W, // Vị trí bắt đầu X
    positionY: H / 2, // Vị trí Y (giữa màn hình)
    direction: -1 // Hướng: -1 = trái, 1 = phải
  };

  let textX = textConfig.startX;

  function drawScrollingText() {
    // Cập nhật vị trí text
    textX += textConfig.speed * textConfig.direction;

    // Tính độ rộng text để biết khi nào reset
    ctx.font = `${textConfig.fontWeight} ${textConfig.fontSize}px ${textConfig.fontFamily}`;
    const textWidth = ctx.measureText(textConfig.text).width;

    // Reset vị trí khi text chạy ra khỏi màn hình
    if (textConfig.direction === -1 && textX < -textWidth) {
      textX = W;
    } else if (textConfig.direction === 1 && textX > W) {
      textX = -textWidth;
    }

    // Vẽ bóng chữ
    ctx.shadowColor = textConfig.shadowColor;
    ctx.shadowBlur = textConfig.shadowBlur;
    ctx.shadowOffsetX = textConfig.shadowOffsetX;
    ctx.shadowOffsetY = textConfig.shadowOffsetY;

    // Vẽ text với độ trong suốt
    ctx.globalAlpha = textConfig.opacity;
    ctx.fillStyle = textConfig.fontColor;
    ctx.font = `${textConfig.fontWeight} ${textConfig.fontSize}px ${textConfig.fontFamily}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(textConfig.text, textX, textConfig.positionY);

    // Reset trạng thái canvas
    ctx.globalAlpha = 1;
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  function loop() {
    if (running) {
      ctx.clearRect(0, 0, W, H);
      flakes.forEach((f) => {
        f.update();
        f.draw();
      });
      drawScrollingText(); // Vẽ chữ chạy
    }
    requestAnimationFrame(loop);
  }
  img.onload = loop;
  const audio = new Audio('audio.mp3');
  audio.loop = true;
  audio.volume = 1.0;

  const modal = document.getElementById('enterModal');

  const start = async () => {
  try {
    await audio.play();
    modal.style.display = 'none';
    modal.removeEventListener('click', start);
    modal.removeEventListener('touchstart', start);
  } catch (e) {
    console.log(e);
  }
};

  modal.addEventListener('click', start);
  modal.addEventListener('touchstart', start);
  // style
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9997;
})();
