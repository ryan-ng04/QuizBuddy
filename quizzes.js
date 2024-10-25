document.addEventListener("DOMContentLoaded", function () {
    // Elements for quiz creation
    const createQuizBtn = document.getElementById("create-quiz-btn");
    const quizTitleInput = document.getElementById("quiz-title");
    const quizDescriptionInput = document.getElementById("quiz-description");
    const quizList = document.getElementById("quiz-list");

    // Function to create a new quiz
    function createQuiz() {
        const title = quizTitleInput.value.trim();
        const description = quizDescriptionInput.value.trim();

        if (title && description) {
            const newQuiz = { title, description };
            let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
            quizzes.push(newQuiz);
            localStorage.setItem("quizzes", JSON.stringify(quizzes));

            quizTitleInput.value = "";
            quizDescriptionInput.value = "";
            alert("Quiz created successfully!");

            // Refresh the list after adding a new quiz
            displayQuizzes();
        } else {
            alert("Please provide a title and description for the quiz.");
        }
    }

    // Function to display quizzes in the "Create Quiz" page
    function displayQuizzes() {
        const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

        // Clear existing quizzes
        quizList.innerHTML = "";

        // Add each quiz to the list
        quizzes.forEach((quiz, index) => {
            const quizCard = document.createElement("div");
            quizCard.classList.add("quiz-card");
            quizCard.innerHTML = `
                <h3 class="quiz-title" contenteditable="true" onblur="editQuizTitle(${index}, this)">${quiz.title}</h3>
                <p class="quiz-description" contenteditable="true" onblur="editQuizDescription(${index}, this)">${quiz.description}</p>
                <button class="edit-quiz-btn" onclick="editQuiz(${index})">Edit</button>
                <button class="delete-quiz-btn" onclick="deleteQuiz(${index})">Delete</button>
            `;
            quizList.appendChild(quizCard);
        });
    }

    // Function to delete a quiz
    window.deleteQuiz = function (index) {
        let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizzes.splice(index, 1);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));
        displayQuizzes();
    };

    // Function to edit quiz title
    window.editQuizTitle = function (index, element) {
        let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizzes[index].title = element.innerText.trim();
        localStorage.setItem("quizzes", JSON.stringify(quizzes));
    };

    // Function to edit quiz description
    window.editQuizDescription = function (index, element) {
        let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizzes[index].description = element.innerText.trim();
        localStorage.setItem("quizzes", JSON.stringify(quizzes));
    };

    // Add event listener for creating a quiz
    if (createQuizBtn) {
        createQuizBtn.addEventListener("click", createQuiz);
    }

    // Display quizzes on page load
    if (quizList) {
        displayQuizzes();
    }
});
