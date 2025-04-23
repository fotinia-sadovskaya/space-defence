import { debugMode } from "./utils/debug.js";
import {
  getStore,
  buyUpgrade,
  toggleSound,
  isMuted,
  addCoins,
  isUpgradeOwned,
} from "./utils/store.js";

import { showToast } from "./utils/notify.js";
import { playSound } from "./utils/sound.js";

// 🎯 Оновлення магазину (монети + статус кнопок)
export function updateStoreUI() {
  const coinsSpan = document.getElementById("storeCoins");
  if (coinsSpan) {
    coinsSpan.textContent = getStore().coins;
  }

  // Позначаємо куплені апгрейди
  const buttons = document.querySelectorAll(".store__btn");
  buttons.forEach((btn) => {
    const upgrade = btn.dataset.upgrade;
    if (upgrade && localStorage.getItem(`upgrade_${upgrade}`)) {
      btn.classList.add("store__btn--owned");
      btn.disabled = true;
    }
  });
}

// 🎮 Оновлення HUD (поточна зброя, очки, рекорд)
export function updateHUD({
  weapon = "Звичайна",
  score = 0,
  highscore = 0,
} = {}) {
  const weaponSpan = document.getElementById("weaponType");
  const scoreSpan = document.getElementById("score");
  const highscoreSpan = document.getElementById("highscore");

  if (weaponSpan) weaponSpan.textContent = weapon;
  if (scoreSpan) scoreSpan.textContent = score;
  if (highscoreSpan) highscoreSpan.textContent = highscore;

  if (debugMode)
    console.log(`🔁 HUD: ${weapon} | Очки: ${score} | Рекорд: ${highscore}`);
}

// ⛔🔧 Закриття магазину ✖
// 🛠 Глобальні функції для HTMX
window.closeStore = function () {
  const store = document.getElementById("store");
  if (store) store.remove(); // або store.style.display = "none";
};

// 👇 Купівля апгрейду
window.buyUpgrade = function (name) {
  buyUpgrade(name);
  showToast(`✅ Куплено: ${name}`);
  playSound("buy");
  updateStoreUI();
  //  console.log(`✅ Куплено: ${name}`);
};

// 🔊 Перемикання звуку
window.toggleSound = function () {
  toggleSound(); // оновлює store
  const isMuted = getStore().mute;

  if (!isMuted) playSound("toggle"); // тільки коли звук увімкнено

  const icon = isMuted ? "🔇" : "🔊";
  showToast(`${icon} Звук: ${isMuted ? "вимкнено" : "увімкнено"}`);
};

// 🎧 Вимкнення звуку при завантаженні сторінки
const audioElement = document.getElementById("audioElement");
if (audioElement && isMuted()) {
  audioElement.volume = 0;
}
