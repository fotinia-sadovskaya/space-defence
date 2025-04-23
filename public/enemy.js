import { debugMode } from "./utils/debug.js";

export default class Enemy {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.width = 50;
    this.height = 50;
    this.x = x;
    this.y = y;
    this.speed = 2; // Швидкість падіння ворога

    this.image = new Image();
    this.image.src = "assets/images/enemy.png"; // Шлях до спрайта ворога
    this.image.onload = () => {
      if (debugMode) console.log("👾 Ворог завантажився успішно!");
    };

    this.image.onerror = () => {
      if (debugMode) console.error("❌ Помилка завантаження enemy.png!");
    };

    // Додано обробник помилки для зображення ворога
  }

  resize() {
    this.width = this.canvas.width * 0.06;
    this.height = this.canvas.height * 0.08;
  }

  move() {
    this.y += this.speed; // Ворог рухається вниз
  }

  draw() {
    if (debugMode) console.log("🎨 Малюємо ворога на позиції:", this.x, this.y);
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  explode() {
    this.image.src = "assets/images/explosion.png"; // Міняємо картинку на вибух
    this.width = 50;
    this.height = 50;

    setTimeout(() => {
      this.remove = true;
    }, 300);
  }
}
