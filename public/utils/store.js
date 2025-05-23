// public/store.js — керування сховищем гри (localStorage), відповідає за:
//🎯 Покупки в магазині
//🔇 Налаштування звуку
//💾 Збереження стану гравця
import { debugMode } from "./debug.js";

const defaultState = {
  weapons: ["basic"],
  coins: 0,
  mute: false,
};

export function getStore() {
  return JSON.parse(localStorage.getItem("store")) || defaultState;
}

export function saveStore(state) {
  localStorage.setItem("store", JSON.stringify(state));
}

// 🎯 Купівля оновлення
export function buyUpgrade(upgradeName) {
  const store = getStore();
  if (!store.weapons.includes(upgradeName)) {
    store.weapons.push(upgradeName);
    saveStore(store);
    if (debugMode) console.log("🛒 Куплено:", upgradeName);
  }
}

// 💸 Додавання монет
export function addCoins(amount) {
  const store = getStore();
  store.coins += amount;
  saveStore(store);
  if (debugMode) console.log("💰 Додано монет:", amount);
}

// 🔇 Звук вкл/викл
export function toggleSound() {
  const store = getStore();
  store.mute = !store.mute;
  saveStore(store);
  if (debugMode) console.log("🔊 Звук:", store.mute ? "вимкнено" : "увімкнено");
}

export function isMuted() {
  return getStore().mute;
}

// 💾 Збереження стану гравця
export function isUpgradeOwned(name) {
  return getStore().weapons.includes(name);
}
