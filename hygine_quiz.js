const questions = {
  hygiene: [
    {
      text: "When should you wash your hands?",
      options: [
        "Before eating",
        "After using the restroom",
        "After sneezing or coughing",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation: "You should wash your hands in all of these situations.",
    },
    {
      text: "How long should you wash your hands for to ensure they are clean?",
      options: ["5 seconds", "10 seconds", "20 seconds", "1 minute"],
      correctAnswer: 2,
      explanation:
        "It is recommended to wash your hands for at least 20 seconds to remove germs effectively.",
    },
    {
      text: "Which of these is important for good dental hygiene?",
      options: [
        "Brushing your teeth twice a day",
        "Eating candy frequently",
        "Not brushing your teeth at all",
        "Only brushing your teeth once a week",
      ],
      correctAnswer: 0,
      explanation:
        "Brushing your teeth twice a day helps prevent cavities and keeps your mouth healthy.",
    },
    {
      text: "What should you do after sneezing or coughing into your hands?",
      options: [
        "Ignore it and carry on",
        "Shake hands with someone",
        "Wash your hands or use hand sanitizer",
        "Touch your face",
      ],
      correctAnswer: 2,
      explanation:
        "Always wash your hands or use hand sanitizer after sneezing or coughing into them to avoid spreading germs.",
    },
    {
      text: "What is the best way to cover your mouth when you cough or sneeze?",
      options: [
        "With your hands",
        "With your elbow or a tissue",
        "Without covering it",
        "By turning away",
      ],
      correctAnswer: 1,
      explanation:
        "Using your elbow or a tissue to cover your mouth helps prevent the spread of germs.",
    },
    {
      text: "Why is it important to keep your nails clean?",
      options: [
        "To look nice",
        "To prevent germs from spreading",
        "To grow them longer",
        "No reason",
      ],
      correctAnswer: 1,
      explanation:
        "Keeping your nails clean prevents the accumulation of dirt and bacteria, reducing the spread of germs.",
    },
    {
      text: "How often should you change your clothes, especially after sweating?",
      options: [
        "Once a week",
        "After every workout or heavy sweating",
        "Only when they smell",
        "Every day",
      ],
      correctAnswer: 1,
      explanation:
        "Changing clothes after sweating helps to maintain good hygiene and prevent skin infections.",
    },
    {
      text: "What should you use to clean your ears?",
      options: [
        "A cotton swab",
        "Your finger",
        "Nothing, let them clean themselves",
        "A pencil",
      ],
      correctAnswer: 2,
      explanation:
        "The ears are self-cleaning, and using objects like cotton swabs can push wax deeper or cause injury.",
    },
    {
      text: "How often should you take a shower or bath to maintain personal hygiene?",
      options: [
        "Once a month",
        "Every day or every other day",
        "Once a week",
        "Only when you feel dirty",
      ],
      correctAnswer: 1,
      explanation:
        "Showering daily or every other day is recommended to remove dirt, sweat, and germs from the skin.",
    },
    {
      text: "What is the best way to prevent bad body odor?",
      options: [
        "Washing regularly and using deodorant",
        "Ignoring it",
        "Wearing lots of perfume",
        "Washing only when it smells bad",
      ],
      correctAnswer: 0,
      explanation:
        "Regular washing and using deodorant helps to prevent bad body odor by keeping your skin clean and fresh.",
    },
  ],
};

let currentQuestionIndex = 0;
let selectedOptions = [];
let correctAnswers = 0;
let timerInterval;
let timeRemaining = 600; // 10 minutes

const quizIntro = document.getElementById("quiz-intro");
const quizContent = document.getElementById("quiz-content");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const timerDisplay = document.getElementById("time-remaining");
const finalReport = document.getElementById("final-report");
const resultDiv = document.getElementById("result");
const gradeDiv = document.getElementById("grade");
const retryBtn = document.getElementById("retry-btn");
const passMessage = document.getElementById("pass-message");

document.addEventListener("DOMContentLoaded", () => {
  updateQuizDetails(); // Call this when the page first loads
});

document.getElementById("start-btn").addEventListener("click", () => {
  quizIntro.style.display = "none";
  quizContent.style.display = "block";
  startTimer();
  loadQuestion(currentQuestionIndex);
});

retryBtn.addEventListener("click", () => {
  resetQuiz();
  quizIntro.style.display = "block";
  finalReport.style.display = "none";
  updateQuizDetails(); // Call again to reset quiz details
});

function startTimer() {
  timeRemaining = questions.hygiene.length * 6 * 10; // Reset to 10 minutes
  timerDisplay.innerText = formatTime(timeRemaining);

  timerInterval = setInterval(() => {
    timeRemaining--;
    timerDisplay.innerText = formatTime(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      showFinalReport();
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  return `${minutes}:${
    secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining
  }`;
}

function loadQuestion(index) {
  const question = questions.hygiene[index];
  const totalMarks = questions.hygiene.length * 10; // 10 marks per question
  questionNumber.innerText = `Question ${index + 1} of ${
    questions.hygiene.length
  } - Marks: ${correctAnswers * 10} / ${totalMarks}`;
  questionText.innerText = question.text;
  optionsContainer.innerHTML = "";

  question.options.forEach((option, i) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.innerText = option;
    optionElement.addEventListener("click", () => selectOption(index, i));
    if (selectedOptions[index] === i) {
      optionElement.classList.add("selected");
    }
    optionsContainer.appendChild(optionElement);
  });

  toggleNavigationButtons(index);
}

function updateQuizDetails() {
  const totalQuestions = questions.hygiene.length;
  const totalTime = totalQuestions; // 1 minute per question
  const totalMarks = totalQuestions * 10; // 10 marks per question

  document.getElementById("total-questions").innerText = totalQuestions;
  document.getElementById("total-time").innerText = `${totalTime}:00`; // Display total time as minutes
  document.getElementById("total-marks").innerText = totalMarks;
}

function selectOption(questionIndex, optionIndex) {
  if (selectedOptions[questionIndex] !== undefined) return; // Prevent re-selection

  selectedOptions[questionIndex] = optionIndex;

  const question = questions.hygiene[questionIndex];
  const selectedOptionElement = optionsContainer.children[optionIndex];
  const correctOptionElement =
    optionsContainer.children[question.correctAnswer];

  if (optionIndex === question.correctAnswer) {
    selectedOptionElement.classList.add("correct-answer");
    correctAnswers++;
  } else {
    selectedOptionElement.classList.add("incorrect-answer");
    correctOptionElement.classList.add("correct-answer");
  }

  const explanationDiv = document.createElement("div");
  explanationDiv.classList.add("explanation");
  explanationDiv.innerText = `Explanation: ${question.explanation}`;
  document.querySelector(".quiz-container").appendChild(explanationDiv);

  Array.from(optionsContainer.children).forEach((option) => {
    option.style.pointerEvents = "none";
  });

  nextBtn.disabled = false;
}

function toggleNavigationButtons(index) {
  prevBtn.disabled = index === 0;
  nextBtn.disabled = selectedOptions[index] === undefined;
}

nextBtn.addEventListener("click", () => {
  // Remove the explanation before loading the next question
  const explanationDiv = document.querySelector(".explanation");
  if (explanationDiv) {
    explanationDiv.remove();
  }

  if (currentQuestionIndex < questions.hygiene.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  } else {
    clearInterval(timerInterval);
    showFinalReport();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
});

function showFinalReport() {
  quizContent.style.display = "none";
  finalReport.style.display = "block";

  const totalQuestions = questions.hygiene.length;
  const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  resultDiv.innerText = `You answered ${correctAnswers} out of ${totalQuestions} questions correctly.`;
  gradeDiv.innerText = `Your score: ${percentage}%`;

  // Check if the user passed or failed
  if (percentage >= 80) {
    passMessage.style.display = "block";
    passMessage.innerText = "Congratulations! You passed!";
    setTimeout(() => {
      window.location.href = "home.html";
    }, 5000);
  } else {
    passMessage.style.display = "none"; // Hide pass message
    retryBtn.style.display = "block"; // Show retry button
  }
}

function resetQuiz() {
  currentQuestionIndex = 0;
  selectedOptions = [];
  correctAnswers = 0;
  clearInterval(timerInterval);
  startTimer(); // Reset and start the timer again
  updateQuizDetails(); // Ensure quiz details are updated
}

function showFinalReport() {
  clearInterval(timerInterval);
  quizContent.style.display = "none";
  finalReport.style.display = "block";

  const totalMarks = questions.hygiene.length * 10;
  const marksScored = correctAnswers * 10;
  const totalQuestions = questions.hygiene.length; // Get total number of questions
  resultDiv.innerText = `You answered ${correctAnswers} out of ${totalQuestions} questions correctly.`;
  const percentage = (marksScored / totalMarks) * 100;

  gradeDiv.innerText = `Your score: ${percentage}%`;

  if (percentage >= 80) {
    passMessage.style.display = "block"; // Show the pass message
    passMessage.innerText = "Congratulations! You passed!";
    document.getElementById("counter-container").style.display = "block"; // Show the counter container

    let counter = 0;
    const totalCount = 10; // Adjust this value as needed for the counter

    const interval = setInterval(() => {
      counter++;
      document.getElementById("counter").innerText = counter;

      if (counter >= totalCount) {
        clearInterval(interval);
        // Automatically redirect to home.html after 5 seconds
        setTimeout(() => {
          window.location.href = "home.html";
        }, 1000); // 5000 milliseconds = 5 seconds
      }
    }, 50); // Adjust the interval timing as needed for the desired speed
  } else {
    passMessage.style.display = "none"; // Hide pass message
    retryBtn.style.display = "block"; // Show retry button
  }
}
