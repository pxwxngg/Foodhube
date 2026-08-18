console.log("LOGIN JS LOADED");

const loginForm = document.getElementById("loginForm");

console.log("Form:", loginForm);

const email = document.getElementById("email");
const password = document.getElementById("password");

console.log("Email:", email);
console.log("Password:", password);


loginForm.addEventListener("submit", async function(event) {

    console.log("LOGIN BUTTON CLICKED");

    event.preventDefault();


    // Email validation
    if (email.value.trim() === "") {

        alert("Please enter your email");
        return;

    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        alert("Please enter a valid email");
        return;

    }


    // Password validation
    if (password.value === "") {

        alert("Please enter your password");
        return;

    }


    // Prepare login data
    const data = new URLSearchParams();

    data.append("email", email.value.trim());
    data.append("password", password.value);


    try {

        const response = await fetch(
            "https://delirium-purple-badly.ngrok-free.dev/foods",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body: data
            }
        );


        const result = await response.text();


        if (response.ok) {

             localStorage.setItem("loggedInName", result);

             alert("Login successful!");
            // We'll redirect after login later
             window.location.href = "index.html";

        } else {

            alert(result);

        }


    } catch (error) {

        console.error(error);

        alert(
            "Cannot connect to Java server. " +
            "Make sure FoodhubeServer is running."
        );

    }

});