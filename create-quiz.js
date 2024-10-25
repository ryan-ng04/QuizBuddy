document.addEventListener("DOMContentLoaded", function () {
    // Elements for the steps
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const nextStep1 = document.getElementById("next-step-1");
    const confirmQuizBtn = document.getElementById("confirm-quiz");
    const addQuestionBtn = document.getElementById("add-question");
    const questionList = document.getElementById("question-list");
    const quizList = document.getElementById("quiz-list");

    const quizTitleInput = document.getElementById("quiz-title");
    const quizDescriptionInput = document.getElementById("quiz-description");

    let questions = [];

    // Ensure only Step 1 is visible initially
    step1.style.display = "block";
    step2.style.display = "none";

    // Move from Step 1 to Step 2
    nextStep1.addEventListener("click", function () {
        const quizTitle = quizTitleInput.value.trim();
        const quizDescription = quizDescriptionInput.value.trim();

        if (quizTitle && quizDescription) {
            // Hide Step 1 and show Step 2
            step1.style.display = "none";
            step2.style.display = "block";
        } else {
            alert("Please provide both a title and description for the quiz.");
        }
    });

    // Add a new question
    addQuestionBtn.addEventListener("click", function () {
        questions.push({ text: "", answers: [], correctAnswer: null });
        renderQuestions();
    });

    // Render questions
    function renderQuestions() {
        questionList.innerHTML = ""; // Clear existing questions
        questions.forEach((question, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question-item", "mb-3");
            questionDiv.innerHTML = `
                <h4>Question ${index + 1}</h4>
                <input type="text" class="form-control mb-2" placeholder="Enter question text" oninput="editQuestionText(${index}, this)">
                <div class="answers-list mb-2"></div>
                <button class="btn btn-secondary mb-2" onclick="addAnswer(${index})">Add Answer</button>
                <select class="form-control correct-answer-select mb-2" onchange="setCorrectAnswer(${index}, this)">
                    <option value="">Select Correct Answer</option>
                </select>
                <button class="btn btn-danger mt-2" onclick="deleteQuestion(${index})">Delete Question</button>
            `;
            questionList.appendChild(questionDiv);

            // Render existing answers for the question
            renderAnswers(index);
        });
    }

    // Function to edit question text
    window.editQuestionText = function (index, element) {
        questions[index].text = element.value.trim();
    };

    // Function to add an answer to a question
    window.addAnswer = function (questionIndex) {
        questions[questionIndex].answers.push("");
        renderAnswers(questionIndex);
    };

    // Function to render answers for a specific question
    function renderAnswers(questionIndex) {
        const questionDiv = questionList.children[questionIndex];
        const answersList = questionDiv.querySelector(".answers-list");
        const correctAnswerSelect = questionDiv.querySelector(".correct-answer-select");

        answersList.innerHTML = ""; // Clear current answers
        correctAnswerSelect.innerHTML = '<option value="">Select Correct Answer</option>'; // Reset dropdown

        questions[questionIndex].answers.forEach((answer, answerIndex) => {
            const answerDiv = document.createElement("div");
            answerDiv.classList.add("answer-item", "mb-2");
            answerDiv.innerHTML = `
                <input type="text" class="form-control" placeholder="Answer ${answerIndex + 1}" value="${answer}" oninput="editAnswerText(${questionIndex}, ${answerIndex}, this)">
                <button class="btn btn-danger btn-sm mt-1" onclick="deleteAnswer(${questionIndex}, ${answerIndex})">Delete</button>
            `;
            answersList.appendChild(answerDiv);

            // Add the answer to the correct answer dropdown
            const option = document.createElement("option");
            option.value = answerIndex;
            option.textContent = `Answer ${answerIndex + 1}`;
            correctAnswerSelect.appendChild(option);
        });
    }

    // Function to edit answer text
    window.editAnswerText = function (questionIndex, answerIndex, element) {
        questions[questionIndex].answers[answerIndex] = element.value.trim();
    };

    // Function to set the correct answer
    window.setCorrectAnswer = function (questionIndex, element) {
        questions[questionIndex].correctAnswer = element.value;
    };

    // Function to delete a question
    window.deleteQuestion = function (index) {
        questions.splice(index, 1);
        renderQuestions();
    };

    // Function to delete an answer
    window.deleteAnswer = function (questionIndex, answerIndex) {
        questions[questionIndex].answers.splice(answerIndex, 1);
        renderAnswers(questionIndex);
    };

    // Confirm and create the quiz
    confirmQuizBtn.addEventListener("click", function () {
        const quizTitle = quizTitleInput.value.trim();
        const quizDescription = quizDescriptionInput.value.trim();

        if (!quizTitle || !quizDescription) {
            alert("Please provide a title and description for the quiz.");
            return;
        }

        if (questions.some(q => !q.text || q.answers.length < 2 || q.correctAnswer === null)) {
            alert("Make sure all questions have text, at least two answers, and a correct answer.");
            return;
        }

        // Create the quiz object
        const newQuiz = { title: quizTitle, description: quizDescription, questions };
        let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizzes.push(newQuiz);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));

        alert("Quiz created successfully!");

        // Reset form and render the quiz list
        quizTitleInput.value = "";
        quizDescriptionInput.value = "";
        questions = [];
        renderQuestions();
        displayQuizzes();

        // Return to Step 1
        step2.style.display = "none";
        step1.style.display = "block";
    });

    // Function to display quizzes in the sidebar
    function displayQuizzes() {
        const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizList.innerHTML = "";

        quizzes.forEach((quiz, index) => {
            const quizCard = document.createElement("div");
            quizCard.classList.add("quiz-card");
            quizCard.innerHTML = `
                <h3 class="quiz-title">${quiz.title}</h3>
                <p class="quiz-description">${quiz.description}</p>
                <button class="btn btn-primary" onclick="viewQuiz(${index})">View Quiz</button>
            `;
            quizList.appendChild(quizCard);
        });
    }

    // Initial call to display quizzes on load
    displayQuizzes();
});
