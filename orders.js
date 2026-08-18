// =========================
// LOAD ORDERS
// =========================

async function loadOrders() {

    const ordersContainer =
        document.getElementById("ordersContainer");

    const noOrders =
        document.getElementById("noOrders");


    ordersContainer.innerHTML = "";

    noOrders.style.display = "none";


    try {

        // =========================
        // GET ORDERS FROM JAVA
        // =========================

        const response =
            await fetch(
                "https://delirium-purple-badly.ngrok-free.dev/foods"
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );

        }


        // =========================
        // CONVERT TO JSON
        // =========================

        const orders =
            await response.json();


        console.log(
            "Orders received:",
            orders
        );


        // =========================
        // NO ORDERS
        // =========================

        if (
            !Array.isArray(orders) ||
            orders.length === 0
        ) {

            noOrders.style.display =
                "block";

            return;
        }


        // =========================
        // DISPLAY ORDERS
        // =========================

        orders.forEach(order => {

            const orderCard =
                document.createElement("div");


            orderCard.className =
                "order-card";


            // =========================
            // ITEMS HTML
            // =========================

            let itemsHTML = "";


            if (
                Array.isArray(order.items) &&
                order.items.length > 0
            ) {

                order.items.forEach(item => {

                    const itemTotal =
                        item.price *
                        item.quantity;


                    itemsHTML += `

                        <div class="order-food-item">

                            <div>

                                <strong>
                                    ${item.foodName}
                                </strong>

                                <br>

                                <small>
                                    Quantity:
                                    ${item.quantity}
                                </small>

                            </div>


                            <div>

                                ₹${itemTotal}

                            </div>

                        </div>

                    `;

                });

            } else {

                itemsHTML = `
                    <p>No food items found.</p>
                `;

            }


            // =========================
            // ORDER CARD
            // =========================

            orderCard.innerHTML = `

                <div class="order-header">

                    <h2>
                        📦 Order #${order.orderId}
                    </h2>

                    <span>
                        ${order.orderDate}
                    </span>

                </div>


                <hr>


                <div class="order-details">

                    <p>
                        <strong>Customer:</strong>
                        ${order.customerName}
                    </p>


                    <p>
                        <strong>Phone:</strong>
                        ${order.phone}
                    </p>


                    <p>
                        <strong>Address:</strong>
                        ${order.address}
                    </p>


                    <p>
                        <strong>City:</strong>
                        ${order.city}
                    </p>


                    <p>
                        <strong>Payment:</strong>
                        ${order.paymentMethod}
                    </p>


                    <h3>
                        🍽️ Ordered Items
                    </h3>


                    <div class="order-food-list">

                        ${itemsHTML}

                    </div>


                    <div class="order-total">

                        <strong>
                            Total:
                        </strong>

                        ₹${order.totalAmount}

                    </div>

                </div>

            `;


            ordersContainer.appendChild(
                orderCard
            );

        });


    } catch (error) {

        console.error(
            "Error loading orders:",
            error
        );


        ordersContainer.innerHTML = `

            <div class="order-error">

                <h2>
                    Unable to load orders
                </h2>

                <p>
                    Make sure Foodhube Server
                    is running on port 8080.
                </p>


                <button
                    onclick="loadOrders()">

                    Try Again

                </button>

            </div>

        `;

    }

}


// =========================
// PAGE LOAD
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadOrders();

    }
);