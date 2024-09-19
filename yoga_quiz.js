const questions = {
  yoga: [
    {
      text: "What is the primary purpose of yoga?",
      options: [
        "To improve physical health",
        "To achieve mental peace",
        "To enhance spiritual growth",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation:
        "Yoga aims to achieve physical, mental, and spiritual well-being.",
    },
    {
      text: "Which of the following is a fundamental principle of yoga?",
      options: [
        "Non-violence",
        "Competitive spirit",
        "Overindulgence",
        "Materialism",
      ],
      correctAnswer: 0,
      explanation:
        "Non-violence, or Ahimsa, is one of the fundamental principles of yoga.",
    },
    {
      text: "What does 'Asana' refer to in yoga?",
      options: [
        "Breathing techniques",
        "Meditation practice",
        "Physical postures",
        "Dietary practices",
      ],
      correctAnswer: 2,
      explanation: "'Asana' refers to the physical postures practiced in yoga.",
    },
    {
      text: "Which yoga practice focuses on the breath?",
      options: ["Pranayama", "Vinyasa", "Hatha", "Kundalini"],
      correctAnswer: 0,
      explanation:
        "Pranayama is the practice of controlling the breath in yoga.",
    },
    {
      text: "What is the meaning of 'Dhyana' in yoga?",
      options: [
        "Meditation",
        "Physical postures",
        "Breath control",
        "Moral conduct",
      ],
      correctAnswer: 0,
      explanation: "'Dhyana' refers to meditation in yoga.",
    },
    {
      text: "What is 'Pratyahara' in yoga?",
      options: [
        "Withdrawal of senses",
        "Physical postures",
        "Breathing techniques",
        "Mental concentration",
      ],
      correctAnswer: 0,
      explanation:
        "Pratyahara is the withdrawal of the senses in yoga practice.",
    },
    {
      text: "Which yoga limb focuses on ethical principles?",
      options: ["Yamas", "Pranayama", "Asana", "Samadhi"],
      correctAnswer: 0,
      explanation: "Yamas are the ethical principles guiding one's actions.",
    },
    {
      text: "What does 'Samadhi' refer to in yoga?",
      options: [
        "State of deep meditation",
        "Physical exercises",
        "Breathing control",
        "Mindfulness",
      ],
      correctAnswer: 0,
      explanation: "Samadhi is a state of deep meditation and union in yoga.",
    },
    {
      text: "What is the Sanskrit word for controlled breathing in yoga?",
      options: ["Pranayama", "Asana", "Dharana", "Dhyana"],
      correctAnswer: 0,
      explanation: "Pranayama is the practice of controlled breathing in yoga.",
    },
    {
      text: "What is 'Surya Namaskar' also known as?",
      options: [
        "Sun Salutation",
        "Moon Salutation",
        "Warrior Pose",
        "Lotus Pose",
      ],
      correctAnswer: 0,
      explanation: "Surya Namaskar is also known as Sun Salutation.",
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
  timeRemaining = questions.yoga.length * 6 * 10; // Reset to 10 minutes
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
  const question = questions.yoga[index];
  const totalMarks = questions.yoga.length * 10; // 10 marks per question
  questionNumber.innerText = `Question ${index + 1} of ${
    questions.yoga.length
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
  const totalQuestions = questions.yoga.length;
  const totalTime = totalQuestions; // 1 minute per question
  const totalMarks = totalQuestions * 10; // 10 marks per question

  document.getElementById("total-questions").innerText = totalQuestions;
  document.getElementById("total-time").innerText = `${totalTime}:00`; // Display total time as minutes
  document.getElementById("total-marks").innerText = totalMarks;
}

function selectOption(questionIndex, optionIndex) {
  if (selectedOptions[questionIndex] !== undefined) return; // Prevent re-selection

  selectedOptions[questionIndex] = optionIndex;

  const question = questions.yoga[questionIndex];
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

  if (currentQuestionIndex < questions.yoga.length - 1) {
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

  const totalQuestions = questions.yoga.length;
  const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  resultDiv.innerText = `You answered ${correctAnswers} out of ${totalQuestions} questions correctly.`;
  gradeDiv.innerText = `Your score: ${percentage}%`;

  // Check if the user passed or failed
  if (percentage >= 80) {
    passMessage.style.display = "block"; // Show "You are passed"
    retryBtn.style.display = "none"; // Hide retry button
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
