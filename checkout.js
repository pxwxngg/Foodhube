// =========================
// LOAD CART
// =========================

let cart =
    JSON.parse(
        localStorage.getItem("foodhubeCart")
    ) || [];


// =========================
// DISPLAY ORDER
// =========================

function displayOrder() {

    const orderItems =
        document.getElementById("orderItems");

    const orderTotal =
        document.getElementById("orderTotal");

    orderItems.innerHTML = "";


    // Check empty cart

    if (cart.length === 0) {

        orderItems.innerHTML = `
            <p>
                Your cart is empty.
            </p>

            <br>

            <a href="menu.html">
                Go to Menu
            </a>
        `;

        return;
    }


    let total = 0;


    // Display cart items

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const div =
            document.createElement("div");

        div.className =
            "order-item";


        div.innerHTML = `

            <div>

                <div class="order-item-name">
                    ${item.name}
                </div>

                <small>
                    Quantity: ${item.quantity}
                </small>

            </div>

            <div class="order-item-price">
                ₹${itemTotal}
            </div>

        `;


        orderItems.appendChild(div);

    });


    orderTotal.textContent = total;

}


// =========================
// PLACE ORDER
// =========================

document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            // =========================
            // CHECK CART
            // =========================

            if (cart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;
            }


            // =========================
            // GET CUSTOMER DETAILS
            // =========================

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const city =
                document
                    .getElementById("city")
                    .value
                    .trim();


            // =========================
            // CHECK DETAILS
            // =========================

            if (
                !name ||
                !phone ||
                !address ||
                !city
            ) {

                alert(
                    "Please fill all details."
                );

                return;
            }


            // =========================
            // PAYMENT METHOD
            // =========================

            const paymentRadio =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            if (!paymentRadio) {

                alert(
                    "Please select payment method."
                );

                return;
            }


            const paymentMethod =
                paymentRadio.value;


            // =========================
            // CALCULATE TOTAL
            // =========================

            let total = 0;


            cart.forEach(item => {

                total +=
                    item.price *
                    item.quantity;

            });


            // =========================
            // CONVERT CART TO JSON
            // =========================

            const cartItems =
                JSON.stringify(
                    cart
                );


            // =========================
            // CREATE FORM DATA
            // =========================

            const formData =
                new URLSearchParams();


            formData.append(
                "customerName",
                name
            );


            formData.append(
                "phone",
                phone
            );


            formData.append(
                "address",
                address
            );


            formData.append(
                "city",
                city
            );


            formData.append(
                "paymentMethod",
                paymentMethod
            );


            formData.append(
                "totalAmount",
                total
            );

            formData.append(
              "cartItems",
             JSON.stringify(cart)
            );


            // SEND CART ITEMS

            formData.append(
                "cartItems",
                cartItems
            );


            // =========================
            // DEBUG
            // =========================

            console.log(
                "Sending order to Java:"
            );

            console.log(
                "Customer:",
                name
            );

            console.log(
                "Phone:",
                phone
            );

            console.log(
                "Address:",
                address
            );

            console.log(
                "City:",
                city
            );

            console.log(
                "Payment:",
                paymentMethod
            );

            console.log(
                "Total:",
                total
            );

            console.log(
                "Cart Items:",
                cart
            );


            // =========================
            // SEND ORDER TO JAVA
            // =========================

            try {

                const response =
                    await fetch(
                        "https://delirium-purple-badly.ngrok-free.dev/foods",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded"
                            },

                            body:
                                formData.toString()
                        }
                    );


                const result =
                    await response.text();


                console.log(
                    "Java server response:",
                    result
                );


                // =========================
                // SUCCESS
                // =========================

                if (response.ok) {

                    // Clear cart

                    localStorage.removeItem(
                        "foodhubeCart"
                    );


                    alert(
                        "Order placed successfully! 🎉"
                    );


                    // Go to orders

                    window.location.href =
                        "orders.html";

                }

                else {

                    alert(
                        "Order failed: " +
                        result
                    );

                }

            }

            catch (error) {

                console.error(
                    "Order Error:",
                    error
                );


                alert(
                    "Unable to connect to Foodhube server."
                );

            }

        }
    );


// =========================
// START
// =========================

displayOrder();