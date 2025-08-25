import { getLocalStorage } from "./localStorage.js";

const result = document.getElementById("result");

const scores = getLocalStorage("scores", []);

const grtRankIcon = (rank) => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "";
  }
};

const scoreCard = () => {
  let html = "";
  if (!scores.length) {
    result.innerHTML = `
        <p class="text-gray-800 dark:text-gray-100 font-medium">There is no champ here</p>
    `;
    return;
  }
  scores.sort((a, b) => b.score - a.score);
  scores.forEach((element, index) => {
    html += `
        <div class="px-4 py-3 mb-2 w-100 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium shadow-sm hover:shadow-md transition flex items-center gap-2 justify-between">
            <div class="flex items-center">
                <span class="w-7 h-7 flex items-center justify-center rounded-sm bg-gray-300 dark:bg-gray-700">${
                  index + 1
                }</span>
                <span class="ml-2 text-xl">${element.name}</span>
                <span class="ml-2 text-xl">${grtRankIcon(index + 1)}</span>
            </div>
            <span class="w-7 h-7 font-bold flex items-center justify-center rounded-sm bg-gray-300 dark:bg-gray-700">${
              element.score
            }</span>
        </div>
    `;
  });
  result.innerHTML = html;
};

window.addEventListener("load", () => {
  scoreCard();
});
