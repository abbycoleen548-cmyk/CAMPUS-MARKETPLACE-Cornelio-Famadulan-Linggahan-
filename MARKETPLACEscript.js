// 🔥 IMPORTANT – THIS WAS MISSING
const authModal = document.getElementById("auth-modal");

// AUTH + POPUP + DATABASE LOGIN/SIGNUP — SAME AS BEFORE
const mainContent = document.getElementById("main-content");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const toggleAuth = document.getElementById("toggle-auth");
const usernameDisplay = document.querySelector(".username");
const popup = document.getElementById("popup-success");
const popupText = document.getElementById("popup-text");
const popupClose = document.getElementById("popup-close");
const logoutBtn = document.getElementById("logout-btn");

let Cart = [];
let notifications = 0; // 🔔 DITO TINATAGO NOTIFICATIONS


function addToCart(product) {
  cart.push(product);
  updateCart();

  // 🔔 ADD NOTIFICATION SA BELL ICON
  notifications++;
  updateNotification();

  showPopup("✔ Added to Cart!");
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.querySelector(".cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = cart
    .map(item => `<p>${item.title} - ${item.price}</p>`)
    .join("");

  cartCount.textContent = cart.length;

  const total = cart.reduce((sum, item) => 
    sum + parseInt(item.price.replace("₱", "")), 0);
  cartTotal.textContent = `Total: ₱${total}`;
}


function updateNotification() {
  const notif = document.querySelector(".notif");
  notif.textContent = notifications;  // DISPLAY NUMBER
}


document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    showPopup("⚠️ Your cart is empty!");
    return;
  }

  // Add orders to order history
  orders.push(...cart);

  cart = []; 
  updateCart();

  showPopup("✔ Order placed! You have new notifications!");
});



// ORDERS STORAGE
let orders = []; 

// POPUP MESSAGE FUNCTION
function showPopup(message) {
  popupText.textContent = message;
  popup.style.display = "flex";
}
popupClose.addEventListener("click", () => popup.style.display = "none");

// TOGGLE LOGIN / SIGNUP
toggleAuth.addEventListener("click", () => {
  const isLoginVisible = loginForm.style.display !== "none";
  loginForm.style.display = isLoginVisible ? "none" : "flex";
  signupForm.style.display = isLoginVisible ? "flex" : "none";
  toggleAuth.textContent = isLoginVisible ? "Switch to Login" : "Switch to Sign Up";
});

// LOGIN FUNCTION (FIXED)
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("login-email").value;
  let pass = document.getElementById("login-pass").value;

  if (email === "test@gmail.com" && pass === "1234") {
    usernameDisplay.textContent = "👋 Hello, Student";
    authModal.style.display = "none";
    mainContent.style.display = "block";

    renderProducts(products);
    renderExtraSections();
    loginForm.reset();

    // 🔵 ANNOUNCEMENT
    const announcementModal = document.getElementById("announcement-modal");
    const closeAnnouncement = document.getElementById("close-announcement");
    usernameDisplay.addEventListener("click", () => {
      announcementModal.style.display = "flex";
    });
    closeAnnouncement.addEventListener("click", () => {
      announcementModal.style.display = "none";
    });

    // 📦 ORDERS
    const ordersBtn = document.getElementById("orders-btn");
    const ordersModal = document.getElementById("orders-modal");
    const ordersList = document.getElementById("orders-list");
    const closeOrders = document.getElementById("close-orders");

    ordersBtn.addEventListener("click", () => {
      if (orders.length === 0) {
        ordersList.innerHTML = "<p>No orders yet.</p>";
      } else {
        ordersList.innerHTML = orders.map(item => `<p>✔ ${item.title} - ${item.price}</p>`).join("");
      }
      ordersModal.style.display = "flex";
    });

    closeOrders.addEventListener("click", () => {
      ordersModal.style.display = "none";
    });

    return;
  }
});

// ---------------------------------------------
// PRODUCTS DATA (FRONTEND ONLY)
// ---------------------------------------------
let products = [
  { title: 'Scientific Calculator', price: '₱450', img: 'images/calculator.jpg', category: "gadgets", desc: "Essential for Math and Engineering courses." },
  { title: 'Laptop Backpack', price: '₱900', img: 'images/backpack.jpg', category: "gadgets", desc: "Fits laptop + notebooks with water resistance." },
  { title: 'English Book', price: '₱150', img: 'images/book.jpg', category: "books", desc: "For English subjects and speech classes." },
  { title: 'Chicken Sandwich', price: '₱55', img: 'images/sandwich.jpg', category: "food", desc: "Budget-friendly lunch for students." },

  // 📚 NEW SCHOOL SUPPLIES
  { title: 'Notebook (100 pages)', price: '₱40', img: 'images/notebook.jpg', category: "books", desc: "Perfect for lectures & note-taking." },
  { title: 'Ballpen Set (3pcs)', price: '₱25', img: 'images/ballpen.jpg', category: "books", desc: "Black • Blue • Red ballpens." },
  { title: 'Highlighter Set', price: '₱70', img: 'images/highlighter.jpg', category: "books", desc: "For reading & reviewing exams." },

  // 🏐 PE TOOLS
  { title: 'Volleyball Ball', price: '₱650', img: 'images/volleyball.jpg', category: "uniform", desc: "Good for PE and varsity training." },
  { title: 'Arnis Stick (Pair)', price: '₱300', img: 'images/arnis.jpg', category: "uniform", desc: "Standard size for school PE." },
  { title: 'PE T-Shirt', price: '₱250', img: 'images/pe-shirt.jpg', category: "uniform", desc: "Official PE uniform shirt." }
];


let cart = [];
let currentFilter = "all";

function renderProducts(list) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  list.forEach((p, index) => {
    grid.innerHTML += cardTemplate(p, index);
  });
}

function renderExtraSections() {
  const featured = products.slice(0, 2);
  const suggested = products.slice(1, 3);
  const newest   = products.slice(-2);

  document.getElementById("featured-products").innerHTML =
    featured.map((p, i) => cardTemplate(p, i)).join("");
  document.getElementById("suggested-products").innerHTML =
    suggested.map((p, i) => cardTemplate(p, i)).join("");
  document.getElementById("new-products").innerHTML =
    newest.map((p, i) => cardTemplate(p, i)).join("");
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("addbtn")) {
    let index = e.target.getAttribute("data-index");
    addToCart(products[index]);
  }
});

function addToCart(product) {
  cart.push(product);
  updateCart();
  showPopup("✔ Added to Cart!");
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    showPopup("⚠️ Your cart is empty!");
    return;
  }
  orders.push(...cart);
  cart = [];
  updateCart();
  showPopup("✔ Order placed!");
});

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.querySelector(".cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = cart.map(item => `<p>${item.title} - ${item.price}</p>`).join("");
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace("₱","")), 0);
  cartTotal.textContent = `Total: ₱${total}`;
}

function cardTemplate(p, i) {
  return `
    <div class="card">
      <img src="${p.img}">
      <h4>${p.title}</h4>
      <p>${p.price}</p>
      <button class="addbtn" data-index="${i}">Add to Cart</button>
    </div>
  `;
}


// ===============================
// 🔍 SEARCH FUNCTIONALITY
// ===============================
document.getElementById("search-action").addEventListener("click", () => {
  const query = document.getElementById("main-search").value.toLowerCase();
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

// ===============================
// 📌 CATEGORY FILTER
// ===============================
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    if (category === "all") {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered);
    }
  });
});

// ===============================
// ➕ ADD NEW PRODUCT FUNCTION
// ===============================
document.getElementById("open-add-product").addEventListener("click", () => {
  document.getElementById("add-product-modal").style.display = "flex";
});

document.getElementById("cancel-add").addEventListener("click", () => {
  document.getElementById("add-product-modal").style.display = "none";
});

document.getElementById("save-product").addEventListener("click", () => {
  const title = document.getElementById("new-title").value;
  const price = document.getElementById("new-price").value;
  const img = document.getElementById("new-img").value;
  const category = document.getElementById("new-category").value;

  if (title && price && img) {
    products.push({ title, price: `₱${price}`, img, category });
    renderProducts(products);
    document.getElementById("add-product-modal").style.display = "none";
    showPopup("✔ New product added!");
  } else {
    showPopup("⚠️ Please fill out all fields!");
  }
});

// ===============================
// 🚪 LOGOUT FUNCTION
// ===============================
logoutBtn.addEventListener("click", () => {
  mainContent.style.display = "none";
  authModal.style.display = "flex";
  loginForm.reset();
});

// ===============================
// 🔔 NOTIFICATION AFTER ORDER
// ===============================
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    showPopup("⚠️ Your cart is empty!");
    return;
  }
  orders.push(...cart);
  cart = [];
  updateCart();

  notifications++;
  updateNotification();

  showPopup("✔ Order placed! Check your orders.");
});
