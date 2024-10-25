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

    // Function to display quizzes in the sidebar
    function displayQuizzes() {
        const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

        // Clear existing quizzes
        quizList.innerHTML = `
            <li class="list-group-item bg-dark border-0">
                <a href="#" class="text-white" id="homeLink">Home</a>
            </li>
            <li class="list-group-item bg-dark border-0">
                <a href="#" class="text-white" id="topicsLink">Topics</a>
            </li>
            <li class="list-group-item bg-dark border-0">
                <a href="index.html" class="text-white">Quizzes</a>
            </li>
            <li class="list-group-item bg-dark border-0">
                <a href="create-quiz.html" class="text-white">Create Quiz</a>
            </li>
        `;

        // Add each quiz to the list
        quizzes.forEach((quiz, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "bg-dark", "border-0");
            listItem.innerHTML = `
                <a href="#" class="text-white">${quiz.title}</a>
                <button class="btn-delete" onclick="deleteQuiz(${index})" aria-label="Delete Quiz">&times;</button>
            `;
            quizList.appendChild(listItem);
        });
    }

    // Function to delete a quiz
    window.deleteQuiz = function (index) {
        let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizzes.splice(index, 1); // Remove the quiz at the specified index
        localStorage.setItem("quizzes", JSON.stringify(quizzes)); // Update local storage
        displayQuizzes(); // Refresh the list
    };

    // Add event listener for creating a quiz
    if (createQuizBtn) {
        createQuizBtn.addEventListener("click", createQuiz);
    }

    // Display quizzes on page load if quiz list exists
    if (quizList) {
        displayQuizzes();
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Function to display quizzes in the "My Quizzes" dropdown
    function displayMyQuizzes() {
        const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        const myQuizzesList = document.getElementById("my-quizzes-list");
        myQuizzesList.innerHTML = ""; // Clear any existing content

        if (quizzes.length === 0) {
            // If no quizzes are available, show a message
            const noQuizzesItem = document.createElement("li");
            noQuizzesItem.classList.add("dropdown-item");
            noQuizzesItem.textContent = "No quizzes available";
            myQuizzesList.appendChild(noQuizzesItem);
            return;
        }

        // Populate the dropdown with quizzes
        quizzes.forEach((quiz, index) => {
            const quizItem = document.createElement("li");
            quizItem.classList.add("dropdown-item");
            quizItem.textContent = quiz.title;
            quizItem.onclick = function () {
                viewQuiz(index);
            };
            myQuizzesList.appendChild(quizItem);
        });
    }

    // Function to view a specific quiz (placeholder implementation)
    function viewQuiz(index) {
        // Here, you can implement the logic to display the quiz content.
        // For example, you could redirect to a quiz detail page or display a modal.
        alert(`Viewing Quiz ${index + 1}`);
    }

    // Initial call to display quizzes in the "My Quizzes" dropdown
    displayMyQuizzes();
});
