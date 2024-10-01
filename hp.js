document.getElementById('sidebarToggle').addEventListener('click', function() {
    document.body.classList.toggle('sidebar-open');
});
document.querySelector('.btn').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'index.html';
});