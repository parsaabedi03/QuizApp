import { getLocalStorage, setLocalStorage } from "./localStorage.js";

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
getLocalStorage("theme", "light");

const lightBtn = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
    Light
    `;
const darkBtn = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
    Dark
    `;

window.addEventListener("load", () => {
  if (
    getLocalStorage("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    html.classList.add("dark");
    themeToggle.innerHTML = lightBtn;
  } else {
    html.classList.remove("dark");
    themeToggle.innerHTML = darkBtn;
  }
});

themeToggle.addEventListener("click", () => {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    themeToggle.innerHTML = darkBtn;
    setLocalStorage("theme", "light");
  } else {
    html.classList.add("dark");
    themeToggle.innerHTML = lightBtn;
    setLocalStorage("theme", "dark");
  }
});
