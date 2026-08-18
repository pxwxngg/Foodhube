// =========================
// LOAD CART
// =========================

let cart =
    JSON.parse(
        localStorage.getItem("foodhubeCart")
    ) || [];


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );

    const emptyCart =
        document.getElementById(
            "emptyCart"
        );

    const summary =
        document.getElementById(
            "cartSummary"
        );


    container.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        emptyCart.style.display =
            "block";

        summary.style.display =
            "none";

        return;

    }


    emptyCart.style.display =
        "none";

    summary.style.display =
        "block";


    // Total

    let total = 0;


    // Display items

    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        const div =
            document.createElement(
                "div"
            );


        div.className =
            "cart-item";


        div.innerHTML = `

            <img
                src="./img/${item.image}"
                alt="${item.name}"
            >

            <div class="cart-info">

                <h3>
                    ${item.name}
                </h3>

                <p class="cart-price">
                    ₹${item.price}
                </p>

            </div>


            <div class="quantity">

                <button
                    onclick="decreaseQuantity(${item.id})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})">
                    +
                </button>

            </div>


            <button
                class="remove-btn"
                onclick="removeItem(${item.id})">

                Remove

            </button>

        `;


        container.appendChild(div);

    });


    document.getElementById(
        "cartTotal"
    ).textContent =
        total;

}


// =========================
// INCREASE
// =========================

function increaseQuantity(id) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (item) {

        item.quantity++;

    }


    saveCart();

}


// =========================
// DECREASE
// =========================

function decreaseQuantity(id) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (item) {

        item.quantity--;

    }


    // Remove if quantity reaches 0

    cart =
        cart.filter(
            item => item.quantity > 0
        );


    saveCart();

}


// =========================
// REMOVE ITEM
// =========================

function removeItem(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(

        "foodhubeCart",

        JSON.stringify(cart)

    );


    displayCart();

}


// =========================
// CHECKOUT
// =========================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    window.location.href =
        "checkout.html";

}


// =========================
// START
// =========================

displayCart();