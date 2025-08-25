import { getLocalStorage, setLocalStorage } from "./localStorage.js";

const levelButtons = document.querySelectorAll(".levelButton");

getLocalStorage("level", "medium");

const levelHandler = (event) => {
  const level = event.currentTarget.dataset.level;
  switch (level) {
    case "easy":
      setLocalStorage("level", level);
      break;
    case "medium":
      setLocalStorage("level", level);
      break;
    default:
      setLocalStorage("level", level);
      break;
  }
  location.href = "/";
};

levelButtons.forEach((button) => {
  button.addEventListener("click", levelHandler);
});
