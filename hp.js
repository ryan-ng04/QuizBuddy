//handles username in the corner
var usernameInput = document.getElementById("username");
var saveButton = document.getElementById("saveButton");
var greetingDisplay = document.getElementById("greetingDisplay");
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




//sidebar
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.body.classList.toggle('sidebar-open');
});
//btn to go to index.html
document.querySelector('.btn').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'index.html';
});