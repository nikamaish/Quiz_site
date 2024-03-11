const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the capital of India",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
 
  
];

let currentQuestion = 0;
let score = 0;

let timer;//
let timeLeft = 60;

function startTimer() {
  let startTime;

  function updateTimer(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsedMilliseconds = timestamp - startTime;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const remainingSeconds = Math.max(0, timeLeft - elapsedSeconds);

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

    document.getElementById("timer").textContent = `Time Left: ${formattedTime}`;

    if (remainingSeconds === 0) {
      showResult();
    } else {
      requestAnimationFrame(updateTimer);
    }
  }

  requestAnimationFrame(updateTimer);
}

function padZero(value) {
  return value < 10 ? `0${value}` : value;
}

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  const currentQuizData = quizData[currentQuestion];

  questionElement.textContent = currentQuizData.question;
  optionsElement.innerHTML = "";

  currentQuizData.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.textContent = option;

    optionElement.onclick = () => selectOption(index);

    optionsElement.appendChild(optionElement);
  });

  updateQuestionIndicators();
}

function selectOption(index) {
  const options = document.querySelectorAll(".option");
  const errorMessageElement = document.getElementById("error-message");

  options.forEach((option, i) => {
    option.classList.remove("selected");

    if (i === index) {
      option.classList.add("selected");

      if (errorMessageElement) {
        errorMessageElement.textContent = "";
      }
    }
  });
}

function nextQuestion() {
  const selectedOption = document.querySelector(".option.selected");
  const errorMessageElement = document.getElementById("error-message");

  if (selectedOption) {
    const selectedAnswer = selectedOption.textContent;
    const currentQuizData = quizData[currentQuestion];

    if (selectedAnswer === currentQuizData.correctAnswer) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  } else {
    if (errorMessageElement) {
      errorMessageElement.textContent = "Please select an option";
    }
  }
}

function showResult() {
  const quizContainer = document.getElementById("quiz-container");

  quizContainer.innerHTML =
    `<h2 style="color: green; margin-bottom:50px; margin-top:50px">Test submitted Successfully 🎉</h2>` +
    `<h3 style="color: blue;">Your Score is ${score} out of ${quizData.length}</h3>`;
    quizContainer.style.height= "50vh";
    quizContainer.style.width= "30rem";
}

let video = document.getElementById("videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
else {
  console.log('getUserMedia not supported on your browser!');
}

startTimer();
loadQuestion();
startCamera();


// Add these functions to your script.js file

function updateQuestionIndicators() {
  const quizProgress = document.getElementById("quiz-progress");
  quizProgress.innerHTML = ""; // Clear existing indicators

  quizData.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = "question-indicator";
    indicator.textContent = index + 1; // Display question number

    if (index < currentQuestion) {
      indicator.classList.add("attempted");
    }
    quizProgress.appendChild(indicator);

    // if (index < quizData.length - 1) {
    //   const spacing = document.createElement("div");
    //   spacing.className = "indicator-spacing";
    //   quizProgress.appendChild(spacing);
    // }
  });
}

function nextQuestion() {
  const selectedOption = document.querySelector(".option.selected");
  const errorMessageElement = document.getElementById("error-message");

  if (selectedOption) {
    const selectedAnswer = selectedOption.textContent;
    const currentQuizData = quizData[currentQuestion];

    if (selectedAnswer === currentQuizData.correctAnswer) {
      score++;
    }

    currentQuestion++;
    updateQuestionIndicators();

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  } else {
    if (errorMessageElement) {
      errorMessageElement.textContent = "Please select an option";
    }
  }
}
