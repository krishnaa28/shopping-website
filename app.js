// ===============================
// Furniture Shopping Website
// app.js
// ===============================

// Load data from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Save data
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Compare ids safely whether they were stored as a number or a string
// (this is what was breaking the Remove button before)
function sameId(a, b) {
    return String(a) === String(b);
}

// ===============================
// ADD TO CART
// ===============================
function addToCart(id, name, price, image) {

    let product = cart.find(item => sameId(item.id, id));

    if (product) {
        product.quantity++;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            quantity: 1
        });
    }

    saveCart();
    alert(name + " added to Cart!");

    displayCart();
}

// ===============================
// REMOVE FROM CART
// ===============================
function removeFromCart(id) {

    cart = cart.filter(item => !sameId(item.id, id));

    saveCart();

    displayCart();
}

// ===============================
// CHANGE QUANTITY
// ===============================
function increaseQty(id) {

    let product = cart.find(item => sameId(item.id, id));

    if (product) {
        product.quantity++;
    }

    saveCart();
    displayCart();
}

function decreaseQty(id) {

    let product = cart.find(item => sameId(item.id, id));

    if (product) {

        if (product.quantity > 1) {
            product.quantity--;
        } else {
            removeFromCart(id);
            return;
        }
    }

    saveCart();
    displayCart();
}

// ===============================
// DISPLAY CART
// ===============================
function displayCart() {

    let cartContainer = document.getElementById("cartItems");

    if (!cartContainer) return; // not on the cart page, nothing to do

    // the empty-cart message and the section that wraps cartItems
    // (id="empty" / id="cartSection" in cart.html)
    let emptyBox = document.getElementById("empty");
    let cartSection = document.getElementById("cartSection");

    if (cart.length === 0) {
        if (emptyBox) emptyBox.style.display = "";
        if (cartSection) cartSection.style.display = "none";
        cartContainer.innerHTML = "";
        let totalBoxEmpty = document.getElementById("totalPrice");
        if (totalBoxEmpty) totalBoxEmpty.innerHTML = "";
        return;
    }

    if (emptyBox) emptyBox.style.display = "none";
    if (cartSection) cartSection.style.display = "";

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `

        <div class="cart-card">

            <img src="${item.image}" width="120">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

            <button onclick="decreaseQty('${item.id}')">-</button>

            ${item.quantity}

            <button onclick="increaseQty('${item.id}')">+</button>

            <br><br>

            <button onclick="removeFromCart('${item.id}')">
            Remove
            </button>

        </div>

        <hr>

        `;
    });

    let totalBox = document.getElementById("totalPrice");

    if (totalBox)
        totalBox.innerHTML = "Total : ₹" + total;
}

// ===============================
// ADD TO WISHLIST
// ===============================
function addToWishlist(id, name, price, image) {

    let product = wishlist.find(item => sameId(item.id, id));

    if (!product) {

        wishlist.push({
            id,
            name,
            price,
            image
        });

        saveWishlist();

        alert(name + " added to Wishlist!");
    }
    else {
        alert("Already in Wishlist");
    }

    displayWishlist();
}

// ===============================
// REMOVE FROM WISHLIST
// ===============================
function removeFromWishlist(id) {

    wishlist = wishlist.filter(item => !sameId(item.id, id));

    saveWishlist();

    displayWishlist();
}

// ===============================
// MOVE ONE WISHLIST ITEM TO CART
// ===============================
function moveToCart(id) {

    let product = wishlist.find(item => sameId(item.id, id));

    if (product) {
        addToCart(product.id, product.name, product.price, product.image);
        removeFromWishlist(id);
    }
}

// ===============================
// MOVE EVERY WISHLIST ITEM TO CART
// ===============================
function moveAllToCart() {

    wishlist.forEach(item => {
        addToCart(item.id, item.name, item.price, item.image);
    });

    wishlist = [];
    saveWishlist();
    displayWishlist();
}

// ===============================
// DISPLAY WISHLIST
// ===============================
function displayWishlist() {

    let wishlistContainer = document.getElementById("wishlistItems");

    if (!wishlistContainer) return; // not on the wishlist page, nothing to do

    // the empty-wishlist message and the section that wraps
    // wishlistItems (id="empty" / id="wishlistSection" in wishlist.html)
    let emptyBox = document.getElementById("empty");
    let wishlistSection = document.getElementById("wishlistSection");
    let totalPriceEl = document.getElementById("totalPrice");
    let moveAllBtn = document.getElementById("moveAllBtn");

    if (wishlist.length === 0) {
        if (emptyBox) emptyBox.style.display = "";
        // hide the WHOLE section, not just clear its contents —
        // otherwise its padding leaves a dead gap on the page
        if (wishlistSection) wishlistSection.style.display = "none";
        wishlistContainer.innerHTML = "";
        if (totalPriceEl) totalPriceEl.innerHTML = "";
        if (moveAllBtn) moveAllBtn.style.display = "none";
        return;
    }

    if (emptyBox) emptyBox.style.display = "none";
    if (wishlistSection) wishlistSection.style.display = "";
    if (moveAllBtn) moveAllBtn.style.display = "";

    wishlistContainer.innerHTML = "";

    let total = 0;

    wishlist.forEach(item => {

        total += item.price;

        wishlistContainer.innerHTML += `

        <div class="wishlist-card">

            <img src="${item.image}" width="120">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

            <button onclick="moveToCart('${item.id}')">

            Move to Cart

            </button>

            <button onclick="removeFromWishlist('${item.id}')">

            Remove

            </button>

        </div>

        <hr>

        `;
    });

    if (totalPriceEl) totalPriceEl.innerHTML = "Total : ₹" + total;
}

// ===============================
// BUY SINGLE PRODUCT
// ===============================
function buyNow(id, name, price, image) {

    if (image) {
        addToCart(id, name, price, image);
    }

    alert(

        "Order Placed!\n\n" +

        "Product : " + name +

        "\nPrice : ₹" + price +

        "\n\nThank you for shopping."

    );
}

// ===============================
// BUY ALL PRODUCTS
// ===============================
function buyCart() {

    if (cart.length === 0) {

        alert("Your Cart is Empty!");

        return;
    }

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    alert(

        "Order Successful!\n\n" +

        "Total Amount : ₹" + total +

        "\n\nThank You."

    );

    cart = [];

    saveCart();

    displayCart();

}

// ===============================
// TOTAL ITEMS
// ===============================
function cartCount() {

    return cart.reduce((sum, item) => sum + item.quantity, 0);

}

// ===============================
// TAP-TO-OPEN MOBILE MENU
// (the menu only opens on :hover in the CSS, which doesn't work
// on touch screens, so this makes the hamburger button tappable)
// ===============================
function initMobileMenu() {

    let menu = document.getElementById("menu");
    if (!menu) return;

    let button = menu.querySelector("button");
    let submenu = document.getElementById("submenu");
    if (!button || !submenu) return;

    button.addEventListener("click", function (e) {
        e.stopPropagation();
        submenu.classList.toggle("show-mobile");
    });

    document.addEventListener("click", function (e) {
        if (!menu.contains(e.target)) {
            submenu.classList.remove("show-mobile");
        }
    });
}

// ===============================
// WIRE UP THE "MOVE ALL TO CART" BUTTON, IF IT EXISTS ON THIS PAGE
// ===============================
function initMoveAllButton() {
    let moveAllBtn = document.getElementById("moveAllBtn");
    if (moveAllBtn) {
        moveAllBtn.addEventListener("click", moveAllToCart);
    }
}

// ===============================
// BOOT
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    displayCart();
    displayWishlist();
    initMobileMenu();
    initMoveAllButton();
});
