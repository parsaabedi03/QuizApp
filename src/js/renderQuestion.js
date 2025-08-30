import updatedQuestions from "./formatQuestions.js";

const loader = document.getElementById("loader");
const content = document.querySelector(".content");
const warning = document.querySelector(".warning");
const raload = document.getElementById("raload");

const questionNumber = document.getElementById("questionNumber");
const userScore = document.getElementById("userScore");
const question = document.querySelector(".content .question");
const answerButtons = document.querySelectorAll(".answerButton");
const feedback = document.querySelector(".feedback");
const nextButtonDiv = document.querySelector(".nextButtonDiv");
const nextQuestionButton = document.getElementById("nextButton");
const finishButtonDiv = document.querySelector(".finishButtonDiv");
const finishQuestionButton = document.getElementById("finishButton");

const allQuestions = [];
let questionIndex = 0;
let score = 0;

const correctAnswerStyle = [
  "bg-green-100",
  "border-green-500",
  "text-green-700",
  "dark:bg-green-900/50",
  "dark:text-green-400",
];
const wrongAnswerStyle = [
  "bg-red-100",
  "border-red-500",
  "text-red-700",
  "dark:bg-red-900/50",
  "dark:text-red-400",
];

const renderQuestons = async () => {
  const questions = await updatedQuestions();
  renderLoader(questions);
  allQuestions.push(...questions);

  show(allQuestions);
};

const show = (data) => {
  const quiz = data[questionIndex];

  question.textContent = quiz.question;
  quiz.answers.forEach((answer, index) => {
    answerButtons[index].textContent = answer;
  });
  checkAnswer(quiz.correct_answer);
};

const checkAnswer = (correct_answer) => {
  answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      feedback.classList.remove("hidden");

      if (questionIndex < 9) {
        nextButtonDiv.classList.remove("hidden");
        nextButtonDiv.classList.add("flex");
      } else {
        finishButtonDiv.classList.remove("hidden");
        finishButtonDiv.classList.add("flex");
      }

      if (button.textContent === correct_answer) {
        feedback.innerHTML = `<p class="flex items-center gap-2 text-lg font-medium mt-4 p-3 rounded-xl border transition-all bg-green-100 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg> 
        Great! That's the right answer.
        </p>`;
        button.classList.add(...correctAnswerStyle);
        score += 10;
        userScore.textContent = score;
      } else {
        feedback.innerHTML = `<p class="flex items-center gap-2 text-lg font-medium mt-4 p-3 rounded-xl border transition-all bg-red-100 border-red-500 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        Oops! The correct answer is ${correct_answer}.
        </p>`;
        button.classList.add(...wrongAnswerStyle);
        answerButtons.forEach(
          (btn) =>
            btn.textContent === correct_answer &&
            btn.classList.add(...correctAnswerStyle)
        );
      }
      answerButtons.forEach((btn) => (btn.disabled = true));
    });
  });
};

const renderLoader = (questions) => {
  if (questions.length > 0) {
    loader.classList.add("hidden");
    content.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
    warning.classList.remove("hidden");
  }
};

const nextQuestionHanddler = () => {
  questionIndex += 1;
  show(allQuestions);

  answerButtons.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove(...correctAnswerStyle);
    btn.classList.remove(...wrongAnswerStyle);
  });
  feedback.classList.add("hidden");
  nextButtonDiv.classList.add("hidden");
  nextButtonDiv.classList.remove("flex");
  questionNumber.textContent = `${questionIndex + 1}`;
};
const finishQuizHandler = () => (location.href = "../../pages/end.html");
const reloadHandler = () => location.reload();

window.addEventListener("load", () => {
  renderQuestons();
  raload.addEventListener("click", reloadHandler);
  nextQuestionButton.addEventListener("click", nextQuestionHanddler);
  finishQuestionButton.addEventListener("click", finishQuizHandler);
});
