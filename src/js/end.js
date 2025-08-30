import { getLocalStorage, setLocalStorage } from "./localStorage.js";

const userScore = document.getElementById("userScore");
const userName = document.getElementById("userName");
const saveUserName = document.getElementById("saveUserName");
const warning = document.getElementById("warning");

const getUserScore = () => {
  const score = getLocalStorage("score", 0);
  userScore.textContent = score;
};

const addHandler = () => {
  const name = userName.value;
  if (!name) {
    warning.classList.remove("hidden");
    return;
  }
  warning.classList.add("hidden");

  const scores = getLocalStorage("scores", []);
  const score = getLocalStorage("score", 0);
  scores.push({
    name,
    score,
  });
  setLocalStorage("scores", scores);

  location.href = "/";
};

window.addEventListener("load", () => {
  getUserScore();
  saveUserName.addEventListener("click", addHandler);
});
