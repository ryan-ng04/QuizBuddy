//handles username in the corner
var usernameInput = document.getElementById("username");
var saveButton = document.getElementById("saveButton");
var greetingDisplay = document.getElementById("greetingDisplay");
// Elements for quiz creation
const createQuizBtn = document.getElementById("create-quiz-btn");
const quizTitleInput = document.getElementById("quiz-title");
const quizDescriptionInput = document.getElementById("quiz-description");

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

        // Optionally, redirect to the homepage after creation
        window.location.href = "homepage.html";
    } else {
        alert("Please provide a title and description for the quiz.");
    }
}

// Event listener for creating a quiz if the button exists on the page
if (createQuizBtn) {
    createQuizBtn.addEventListener("click", createQuiz);
}

// Function to display quizzes on the homepage
function displayQuizzes() {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const quizList = document.querySelector(".offcanvas-body ul");
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

    quizzes.forEach((quiz, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "bg-dark", "border-0");
        listItem.innerHTML = `<a href="#" class="text-white">${quiz.title}</a>`;
        quizList.appendChild(listItem);
    });
}

// Load quizzes on the homepage
if (window.location.pathname.includes("homepage.html")) {
    window.onload = displayQuizzes;
}


//button code
saveButton.addEventListener('click', function () {
    var username = usernameInput.value;
    
    if (username) {
        var greetingMessage = (`Hello Welcome ${username}!`);
        greetingDisplay.innerHTML = greetingMessage;
        usernameInput.hidden = true;
        saveButton.hidden = true;
    }
});

//greeting message
saveButton.addEventListener('click', function () {
    var username = usernameInput.value;

    if (username) {
        var greetingMessage = `Hello, Welcome ${username}!`;
        greetingDisplay.innerHTML = greetingMessage;
        greetingDisplay.classList.add('fade-in');
        usernameInput.style.transition = 'opacity 0.5s';
        usernameInput.style.opacity = 0;
        saveButton.style.transition = 'opacity 0.5s';
        saveButton.style.opacity = 0;
        setTimeout(() => {
            usernameInput.hidden = true;
            saveButton.hidden = true;
        }, 500); // Wait for the transition to complete before hiding
    }
});


//sidebar
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.body.classList.toggle('sidebar-open');
});
//btn to go to index.html
document.querySelector('.btn').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'index.html';
});