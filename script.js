
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


const questions = [
    {
        question: "What is my favorite programming language?",
        answers: [
            { text: "Python", correct: false},
            { text: "Java", correct: true},
            { text: "JavaScript", correct: false},
            { text: "C", correct: false},
        ]
    },
    {
        question: "What is my favorite food?",
        answers: [
            { text: "Chicken Rice", correct:  true},
            { text: "Schwarmas", correct: false},
            { text: "Noodles", correct: false},
            { text: "Soup", correct: false},
        ]
    },
    {
        question: "How old am I",
        answers: [
            { text: "19", correct:  true},
            { text: "21", correct: false},
            { text: "17", correct: false},
            { text: "20", correct: false},
        ]
    },
    {
        question: "When is my birthday ?",
        answers: [
            { text: "March 27", correct:  false},
            { text: "April 27", correct: false},
            { text: "March 24", correct: true},
            { text: "February 29", correct: false},
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You got ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();