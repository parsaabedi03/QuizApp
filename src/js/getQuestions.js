import { getLocalStorage } from "./localStorage.js";

const difficultyLevel = getLocalStorage("level", "medium");
const baseUrl = "https://opentdb.com/api.php";

async function getQuestions() {
  try {
    const response = await fetch(
      `${baseUrl}?amount=10&difficulty=${difficultyLevel}&type=multiple`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return { results: [] };
  }
}

export default getQuestions;
