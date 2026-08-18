const loginBtn = document.getElementById("loginBtn");

const loginPanel = document.getElementById("loginPanel");

const closeLogin = document.getElementById("closeLogin");


loginBtn.addEventListener("click", function(event) {

    event.preventDefault();

    loginPanel.classList.add("active");

});


closeLogin.addEventListener("click", function() {

    loginPanel.classList.remove("active");

});