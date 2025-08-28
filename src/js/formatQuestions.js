import getQuestions from "./getQuestions.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function decodeHtml(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

const updatedQuestions = async () => {
  try {
    const json = await getQuestions();
    const questions = json.results || [];

    return questions.map((data) => {
      const { correct_answer, incorrect_answers, question } = data;
      return {
        question: decodeHtml(question),
        correct_answer: decodeHtml(correct_answer),
        answers: shuffleArray([correct_answer, ...incorrect_answers]).map(
          decodeHtml
        ),
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default updatedQuestions;
