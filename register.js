const registerForm = document.getElementById("registerForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");


registerForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    // Name validation
    if (name.value.trim() === "") {

        alert("Please enter your name");
        return;

    }


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


    // Phone validation
    if (phone.value.trim() === "") {

        alert("Please enter your phone number");
        return;

    }


    if (!/^[0-9]{10}$/.test(phone.value.trim())) {

        alert("Please enter a valid 10-digit phone number");
        return;

    }


    // Password validation
    if (password.value === "") {

        alert("Please enter your password");
        return;

    }


    // Confirm password
    if (confirmPassword.value !== password.value) {

        alert("Passwords do not match");
        return;

    }


    // Send data to Java server
    try {

        const data = new URLSearchParams();

        data.append("name", name.value.trim());
        data.append("email", email.value.trim());
        data.append("phone", phone.value.trim());
        data.append("password", password.value);


        const response = await fetch(
            "https://delirium-purple-badly.ngrok-free.dev/register",
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

            alert(result);

            registerForm.reset();

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