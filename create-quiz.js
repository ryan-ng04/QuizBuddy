document.addEventListener("DOMContentLoaded", function () {
    // Elements for step transitions
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const step3 = document.getElementById("step-3");
    const nextStep1 = document.getElementById("next-step-1");
    const nextStep2 = document.getElementById("next-step-2");
    const confirmQuizBtn = document.getElementById("confirm-quiz");

    const quizTitleInput = document.getElementById("quiz-title");
    const quizDescriptionInput = document.getElementById("quiz-description");
    const numberOfQuestionsInput = document.getElementById("number-of-questions");
    const questionList = document.getElementById("question-list");
    const quizList = document.getElementById("quiz-list");

    let questions = [];
    let quizTitle = "";
    let quizDescription = "";

    // Step 1: Move to Step 2
    nextStep1.addEventListener("click", function () {
        quizTitle = quizTitleInput.value.trim();
        quizDescription = quizDescriptionInput.value.trim();

        if (quizTitle && quizDescription) {
            step1.style.display = "none";
            step2.style.display = "block";
        } else {
            alert("Please provide both a title and description for the quiz.");
        }
    });

    // Step 2: Move to Step 3
    nextStep2.addEventListener("click", function () {
        const numQuestions = parseInt(numberOfQuestionsInput.value);

        if (numQuestions > 0) {
            questions = Array.from({ length: numQuestions }, () => ({ text: "", answers: [], correctAnswer: null }));
            renderQuestions();
            step2.style.display = "none";
            step3.style.display = "block";
        } else {
            alert("Please enter a valid number of questions.");
        }
    });

    // Render the question fields for Step 3
    function renderQuestions() {
        questionList.innerHTML = "";
        questions.forEach((question, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question-item", "mb-3");
            questionDiv.innerHTML = `
                <h4>Question ${index + 1}</h4>
                <input type="text" class="form-control mb-2" placeholder="Enter question text" oninput="editQuestionText(${index}, this)">
                <div class="answers-list"></div>
                <button class="btn btn-secondary mb-2" onclick="addAnswer(${index})">Add Answer</button>
                <select class="form-control correct-answer-select" onchange="setCorrectAnswer(${index}, this)">
                    <option value="">Select Correct Answer</option>
                </select>
            `;
            questionList.appendChild(questionDiv);
        });
    }

    // Function to edit question text
    window.editQuestionText = function (index, element) {
        questions[index].text = element.value.trim();
    };

    // Function to add an answer to a question
    window.addAnswer = function (questionIndex) {
        const answerIndex = questions[questionIndex].answers.length;
        questions[questionIndex].answers.push("");

        const answerDiv = document.createElement("div");
        answerDiv.classList.add("answer-item", "mb-2");
        answerDiv.innerHTML = `
            <input type="text" class="form-control" placeholder="Answer ${answerIndex + 1}" oninput="editAnswerText(${questionIndex}, ${answerIndex}, this)">
        `;

        const answersList = questionList.children[questionIndex].querySelector(".answers-list");
        answersList.appendChild(answerDiv);

        // Add option to the correct answer dropdown
        const correctAnswerSelect = questionList.children[questionIndex].querySelector(".correct-answer-select");
        const option = document.createElement("option");
        option.value = answerIndex;
        option.textContent = `Answer ${answerIndex + 1}`;
        correctAnswerSelect.appendChild(option);
    };

    // Function to edit answer text
    window.editAnswerText = function (questionIndex, answerIndex, element) {
        questions[questionIndex].answers[answerIndex] = element.value.trim();
    };

    // Function to set the correct answer
    window.setCorrectAnswer = function (questionIndex, element) {
        questions[questionIndex].correctAnswer = element.value;
    };

    // Confirm the quiz creation
    confirmQuizBtn.addEventListener("click", function () {
        if (questions.some(q => !q.text || q.answers.length < 2 || q.correctAnswer === null)) {
            alert("Make sure all questions have text, at least two answers, and a correct answer.");
            return;
        }

        const newQuiz = { title: quizTitle, description: quizDescription, questions };
        let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizzes.push(newQuiz);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));

        quizTitleInput.value = "";
        quizDescriptionInput.value = "";
        numberOfQuestionsInput.value = "";
        questions = [];
        questionList.innerHTML = "";
        step3.style.display = "none";
        step1.style.display = "block";
        alert("Quiz created successfully!");

        displayQuizzes();
    });

    // Function to display quizzes
    function displayQuizzes() {
        const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizList.innerHTML = "";

        quizzes.forEach((quiz, index) => {
            const quizCard = document.createElement("div");
            quizCard.classList.add("quiz-card");
            quizCard.innerHTML = `
                <h3 class="quiz-title">${quiz.title}</h3>
                <p class="quiz-description">${quiz.description}</p>
                <button class="edit-quiz-btn" onclick="editQuiz(${index})">Edit</button>
                <button class="delete-quiz-btn" onclick="deleteQuiz(${index})">Delete</button>
            `;
            quizList.appendChild(quizCard);
        });
    }

    // Initialize
    displayQuizzes();
});
