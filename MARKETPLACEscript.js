// PRODUCTS
const products = [
  {title:'Scientific Calculator',price:'₱450',img:'https://images.pexels.com/photos/414579/pexels-photo-414579.jpeg'},
  {title:'Laptop Backpack',price:'₱900',img:'https://images.pexels.com/photos/374748/pexels-photo-374748.jpeg'},
  {title:'Wireless Earbuds',price:'₱799',img:'https://images.pexels.com/photos/7156889/pexels-photo-7156889.jpeg'},
  {title:'Notebook Set (5 pcs)',price:'₱120',img:'https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg'},
  {title:'iPad for Study',price:'₱14,990',img:'https://images.pexels.com/photos/3990842/pexels-photo-3990842.jpeg'},
  {title:'Dorm Lamp',price:'₱350',img:'https://images.pexels.com/photos/269235/pexels-photo-269235.jpeg'},
  {title:'Reusable Water Bottle',price:'₱180',img:'https://images.pexels.com/photos/1661438/pexels-photo-1661438.jpeg'},
  {title:'Second-Hand Books',price:'₱200',img:'https://images.pexels.com/photos/1029774/pexels-photo-1029774.jpeg'}
];


const grid = document.getElementById('product-grid');
const authModal = document.getElementById('auth-modal');
const mainContent = document.getElementById('main-content');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleAuth = document.getElementById('toggle-auth');
const usernameDisplay = document.querySelector('.username');

// --------------------- RENDER PRODUCTS ---------------------
function renderProducts(productsList) {
  grid.innerHTML = '';
  productsList.forEach(p => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <img src="${p.img}">
      <h4>${p.title}</h4>
      <div class='price'>${p.price}</div>
      <button class='addbtn'>Add to cart</button>
    `;
    grid.appendChild(el);
  });
}
renderProducts(products);

// --------------------- TOGGLE LOGIN / SIGNUP ---------------------
toggleAuth.addEventListener('click', () => {
  if (loginForm.style.display !== 'none') {
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
    toggleAuth.innerText = 'Switch to Login';
  } else {
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
    toggleAuth.innerText = 'Switch to Sign Up';
  }
});

// --------------------- SIGNUP ---------------------
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const pass = document.getElementById('signup-pass').value;

  localStorage.setItem('user', JSON.stringify({name, email, pass}));
  alert('Account created! Now login.');
  signupForm.reset();
  toggleAuth.click(); // back to login
});

// --------------------- LOGIN ---------------------
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-pass').value;
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.email === email && user.pass === pass) {
    authModal.style.display = 'none';
    mainContent.style.display = 'block';
    usernameDisplay.textContent = `👋 Hello, ${user.name}`;
  } else {
    alert('Wrong email or password!');
  }
});

// --------------------- LOGOUT ---------------------
document.getElementById('logout-btn').addEventListener('click', () => {
  mainContent.style.display = 'none';
  authModal.style.display = 'flex';
});
