const questions = {
  goodManners: [
    {
      text: "What is the polite way to ask for something?",
      options: [
        "Give it to me",
        "I want this now",
        "Please may I have it?",
        "You must give it to me",
      ],
      correctAnswer: 2,
      explanation:
        "Saying 'Please may I have it?' is the polite way to ask for something.",
    },
    {
      text: "What should you do when someone gives you a gift?",
      options: [
        "Say nothing",
        "Immediately ask for more",
        "Say 'Thank you'",
        "Ignore the gift",
      ],
      correctAnswer: 2,
      explanation: "It's polite to say 'Thank you' when receiving a gift.",
    },
    {
      text: "What is a good way to greet someone?",
      options: [
        "Ignore them",
        "Smile and say 'Hello'",
        "Stare silently",
        "Walk away",
      ],
      correctAnswer: 1,
      explanation:
        "Smiling and saying 'Hello' is a polite way to greet someone.",
    },
    {
      text: "How should you behave at the dining table?",
      options: [
        "Talk with your mouth full",
        "Chew quietly and use utensils properly",
        "Put elbows on the table",
        "Play with food",
      ],
      correctAnswer: 1,
      explanation:
        "Good table manners include chewing quietly and using utensils properly.",
    },
    {
      text: "What is a respectful way to listen when someone is speaking?",
      options: [
        "Interrupt them",
        "Talk over them",
        "Pay attention and make eye contact",
        "Ignore them",
      ],
      correctAnswer: 2,
      explanation:
        "Paying attention and making eye contact shows respect when listening.",
    },
    {
      text: "What should you say if you accidentally bump into someone?",
      options: [
        "Say nothing",
        "Run away",
        "Say 'Excuse me' or 'I'm sorry'",
        "Blame them",
      ],
      correctAnswer: 2,
      explanation:
        "Saying 'Excuse me' or 'I'm sorry' is the polite response when bumping into someone.",
    },
    {
      text: "What should you do when entering a room where others are speaking?",
      options: [
        "Yell loudly",
        "Politely wait for a pause and say 'Excuse me'",
        "Interrupt immediately",
        "Ignore them and walk in",
      ],
      correctAnswer: 1,
      explanation:
        "Waiting for a pause and saying 'Excuse me' is the polite way to enter a room.",
    },
    {
      text: "How should you treat someone who is different from you?",
      options: [
        "Ignore them",
        "Respect and be kind to them",
        "Make fun of them",
        "Tell them to change",
      ],
      correctAnswer: 1,
      explanation:
        "Good manners involve respecting and being kind to everyone, regardless of differences.",
    },
    {
      text: "What is the appropriate way to respond when someone says 'Thank you'?",
      options: [
        "Say 'No problem'",
        "Say 'You're welcome'",
        "Ignore them",
        "Say 'Don't mention it'",
      ],
      correctAnswer: 1,
      explanation:
        "Saying 'You're welcome' is a polite response to 'Thank you'.",
    },
    {
      text: "When should you say 'Excuse me'?",
      options: [
        "When you want attention",
        "When you're leaving a conversation",
        "When you need to pass someone",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation: "Saying 'Excuse me' is polite in all these situations.",
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
  timeRemaining = questions.goodManners.length * 6 * 10; // Reset to 10 minutes
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
  const question = questions.goodManners[index];
  const totalMarks = questions.goodManners.length * 10; // 10 marks per question
  questionNumber.innerText = `Question ${index + 1} of ${
    questions.goodManners.length
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
  const totalQuestions = questions.goodManners.length;
  const totalTime = totalQuestions; // 1 minute per question
  const totalMarks = totalQuestions * 10; // 10 marks per question

  document.getElementById("total-questions").innerText = totalQuestions;
  document.getElementById("total-time").innerText = `${totalTime}:00`; // Display total time as minutes
  document.getElementById("total-marks").innerText = totalMarks;
}

function selectOption(questionIndex, optionIndex) {
  if (selectedOptions[questionIndex] !== undefined) return; // Prevent re-selection

  selectedOptions[questionIndex] = optionIndex;

  const question = questions.goodManners[questionIndex];
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

  if (currentQuestionIndex < questions.goodManners.length - 1) {
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

  const totalQuestions = questions.goodManners.length;
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

  const totalMarks = questions.goodManners.length * 10;
  const marksScored = correctAnswers * 10;
  const totalQuestions = questions.goodManners.length; // Get total number of questions
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
