const userName = localStorage.getItem("loggedInName");

if (!userName) {

    window.location.href = "login.html";

} else {

    const userWelcome = document.getElementById("userWelcome");

    const firstName = userName.split(" ")[0];

    userWelcome.textContent = "Welcome, " + firstName + " 👋";
}


// Logout

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function() {

    localStorage.removeItem("loggedInName");

    window.location.href = "login.html";

});
function addFeaturedToCart(id, name, price, image) {

    let cart =
        JSON.parse(
            localStorage.getItem("foodhubeCart")
        ) || [];

    const existingItem =
        cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    localStorage.setItem(
        "foodhubeCart",
        JSON.stringify(cart)
    );

    window.location.href = "cart.html";
}