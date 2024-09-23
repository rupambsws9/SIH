const questions = {
  history: [
    {
      text: "Who was the first President of the United States?",
      options: [
        "Abraham Lincoln",
        "George Washington",
        "Thomas Jefferson",
        "John Adams",
      ],
      correctAnswer: 1,
      explanation:
        "George Washington served as the first President from 1789 to 1797.",
    },
    {
      text: "What year did the Titanic sink?",
      options: ["1912", "1914", "1905", "1920"],
      correctAnswer: 0,
      explanation:
        "The Titanic sank on April 15, 1912, during its maiden voyage.",
    },
    {
      text: "Who wrote the Declaration of Independence?",
      options: [
        "Benjamin Franklin",
        "Thomas Jefferson",
        "John Hancock",
        "George Washington",
      ],
      correctAnswer: 1,
      explanation:
        "Thomas Jefferson was the principal author of the Declaration of Independence.",
    },
    {
      text: "Which ancient civilization is known for its pyramids?",
      options: ["Roman", "Greek", "Mayan", "Egyptian"],
      correctAnswer: 3,
      explanation:
        "The ancient Egyptians are famous for building pyramids as tombs for their pharaohs.",
    },
    {
      text: "What was the main cause of World War I?",
      options: [
        "Economic depression",
        "Nationalism",
        "Colonial expansion",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation:
        "Nationalism, economic interests, and colonial rivalries contributed to the outbreak of World War I.",
    },
    {
      text: "Who was the first woman to fly solo across the Atlantic Ocean?",
      options: [
        "Amelia Earhart",
        "Bessie Coleman",
        "Harriet Quimby",
        "Marie Curie",
      ],
      correctAnswer: 0,
      explanation: "Amelia Earhart completed the solo flight in 1932.",
    },
    {
      text: "What was the name of the ship that carried the Pilgrims to America?",
      options: [
        "The Mayflower",
        "The Santa Maria",
        "The Endeavour",
        "The Beagle",
      ],
      correctAnswer: 0,
      explanation: "The Mayflower carried the Pilgrims to America in 1620.",
    },
    {
      text: "Which empire was known for its extensive road network?",
      options: [
        "The Roman Empire",
        "The Mongol Empire",
        "The Ottoman Empire",
        "The Persian Empire",
      ],
      correctAnswer: 0,
      explanation:
        "The Roman Empire was famous for its extensive and sophisticated road network.",
    },
    {
      text: "In what year did the Berlin Wall fall?",
      options: ["1987", "1989", "1991", "1993"],
      correctAnswer: 1,
      explanation:
        "The Berlin Wall fell on November 9, 1989, symbolizing the end of the Cold War.",
    },
    {
      text: "Who was the famous civil rights leader known for his 'I Have a Dream' speech?",
      options: [
        "Malcolm X",
        "Rosa Parks",
        "Martin Luther King Jr.",
        "Frederick Douglass",
      ],
      correctAnswer: 2,
      explanation:
        "Martin Luther King Jr. delivered his 'I Have a Dream' speech during the March on Washington in 1963.",
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
  timeRemaining = questions.history.length * 6 * 10; // Reset to 10 minutes
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
  const question = questions.history[index];
  const totalMarks = questions.history.length * 10; // 10 marks per question
  questionNumber.innerText = `Question ${index + 1} of ${
    questions.history.length
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
  const totalQuestions = questions.history.length;
  const totalTime = totalQuestions; // 1 minute per question
  const totalMarks = totalQuestions * 10; // 10 marks per question

  document.getElementById("total-questions").innerText = totalQuestions;
  document.getElementById("total-time").innerText = `${totalTime}:00`; // Display total time as minutes
  document.getElementById("total-marks").innerText = totalMarks;
}

function selectOption(questionIndex, optionIndex) {
  if (selectedOptions[questionIndex] !== undefined) return; // Prevent re-selection

  selectedOptions[questionIndex] = optionIndex;

  const question = questions.history[questionIndex];
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

  if (currentQuestionIndex < questions.history.length - 1) {
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

  const totalQuestions = questions.history.length;
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

  const totalMarks = questions.history.length * 10;
  const marksScored = correctAnswers * 10;
  const totalQuestions = questions.history.length; // Get total number of questions
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
