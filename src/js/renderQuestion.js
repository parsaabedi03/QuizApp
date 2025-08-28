import updatedQuestions from "./formatQuestions.js";

const loader = document.getElementById("loader");
const content = document.querySelector(".content");
const warning = document.querySelector(".warning");
const raload = document.getElementById("raload");

let questionIndex = 0;
let score = 0;

const renderQuestons = async () => {
  const questions = await updatedQuestions();
  console.log(questions);

  if (questions.length > 0) {
    loader.classList.add("hidden");
    content.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
    warning.classList.remove("hidden");
  }
};

const reloadHandler = () => location.reload();

window.addEventListener("load", () => {
  renderQuestons();
  raload.addEventListener("click", reloadHandler);
});
