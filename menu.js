// =========================
// STORE ALL FOODS
// =========================

let allFoods = [];


// =========================
// FAVORITES
// =========================

let favorites =
    JSON.parse(
        localStorage.getItem(
            "foodhubeFavorites"
        )
    ) || [];


// =========================
// HTML ELEMENTS
// =========================

const foodContainer =
    document.getElementById(
        "foodContainer"
    );

const loading =
    document.getElementById(
        "loading"
    );

const error =
    document.getElementById(
        "error"
    );

const noFood =
    document.getElementById(
        "noFood"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );


// =========================
// GET FOOD FROM JAVA SERVER
// =========================

fetch(
    "http://localhost:8080/foods"
)

.then(response => {

    if (!response.ok) {

        throw new Error(
            "Unable to load foods"
        );

    }

    return response.json();

})

.then(foods => {

    allFoods = foods;

    loading.style.display =
        "none";

    displayFoods(allFoods);

})

.catch(err => {

    loading.style.display =
        "none";

    error.textContent =
        "Failed to load foods. Please start the Foodhube server.";

    console.error(err);

});


// =========================
// DISPLAY FOODS
// =========================

function displayFoods(foods) {

    foodContainer.innerHTML = "";


    if (foods.length === 0) {

        noFood.style.display =
            "block";

        return;

    }


    noFood.style.display =
        "none";


    foods.forEach(food => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "food-card";


        card.innerHTML = `

            <img
                src="./img/${food.image}"
                alt="${food.name}"
                 onerror="this.onerror=null; this.src='./img/food-default.jpg';"
            >

            <div class="food-info">

                <h3>
                    ${food.name}
                </h3>

                <span class="food-category">
                    ${food.category}
                </span>

                <p class="description">
                    ${food.description}
                </p>

                <p class="price">
                    ₹${food.price}
                </p>

                <div class="food-actions">

                    <button
                        class="favorite-btn"
                        onclick="toggleFavorite(${food.id})"
                        id="favorite-${food.id}">
                        ♡
                    </button>

                    <button
                        class="add-btn"
                        onclick="addToCart(${food.id})">
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        foodContainer.appendChild(
            card
        );

    });


    updateFavoriteButtons();

}


// =========================
// CATEGORY FILTER
// =========================

function filterFood(
    category,
    button
) {

    searchInput.value = "";


    document
        .querySelectorAll(
            ".category-btn"
        )
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    button.classList.add(
        "active"
    );


    if (category === "All") {

        displayFoods(
            allFoods
        );

        return;

    }


    const filteredFoods =
        allFoods.filter(
            food =>
                food.category ===
                category
        );


    displayFoods(
        filteredFoods
    );

}


// =========================
// SEARCH FOOD
// =========================

function searchFood() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    document
        .querySelectorAll(
            ".category-btn"
        )
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    if (searchText === "") {

        document
            .querySelector(
                ".category-btn"
            )
            .classList.add(
                "active"
            );


        displayFoods(
            allFoods
        );

        return;

    }


    const filteredFoods =
        allFoods.filter(
            food =>

                food.name
                    .toLowerCase()
                    .includes(
                        searchText
                    )

                ||

                food.description
                    .toLowerCase()
                    .includes(
                        searchText
                    )

                ||

                food.category
                    .toLowerCase()
                    .includes(
                        searchText
                    )
        );


    displayFoods(
        filteredFoods
    );

}


// =========================
// FAVORITE
// =========================

function toggleFavorite(id) {

    if (
        favorites.includes(id)
    ) {

        favorites =
            favorites.filter(
                favoriteId =>
                    favoriteId !== id
            );

    } else {

        favorites.push(id);

    }


    localStorage.setItem(
        "foodhubeFavorites",
        JSON.stringify(
            favorites
        )
    );


    updateFavoriteButtons();

}


// =========================
// UPDATE HEART BUTTONS
// =========================

function updateFavoriteButtons() {

    document
        .querySelectorAll(
            ".favorite-btn"
        )
        .forEach(btn => {

            btn.innerHTML = "♡";

            btn.classList.remove(
                "active"
            );

        });


    favorites.forEach(id => {

        const button =
            document.getElementById(
                "favorite-" + id
            );


        if (button) {

            button.innerHTML =
                "♥";

            button.classList.add(
                "active"
            );

        }

    });

}


// =========================
// ADD TO CART
// =========================

function addToCart(id) {

    const food = allFoods.find(
        food => food.id === id
    );

    if (!food) {
        return;
    }

    let cart =
        JSON.parse(
            localStorage.getItem("foodhubeCart")
        ) || [];

    const existingItem =
        cart.find(
            item => item.id === id
        );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: food.id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1

        });

    }

    localStorage.setItem(
        "foodhubeCart",
        JSON.stringify(cart)
    );

    alert(
        food.name + " added to cart! 🛒"
    );
}