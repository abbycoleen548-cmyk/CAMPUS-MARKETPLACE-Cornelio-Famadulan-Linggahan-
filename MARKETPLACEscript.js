// Wait until the page fully loads
document.addEventListener("DOMContentLoaded", () => {

  /* ===================== AUTHENTICATION SCREEN ===================== */
  const authScreen = document.getElementById('auth-screen');
  const mainWebsite = document.getElementById('main-website');
  const loginBtnAuth = document.getElementById('login-btn-auth');
  const signupBtnAuth = document.getElementById('signup-btn-auth');
  const authForm = document.getElementById('auth-form');
  const authTitle = document.getElementById('auth-title');
  const toggleLink = document.getElementById('toggle-link');

  let isLogin = true;

  function showForm() {
    authForm.classList.remove('hidden');
    loginBtnAuth.classList.add('hidden');
    signupBtnAuth.classList.add('hidden');
    authTitle.textContent = isLogin ? "Login" : "Sign Up";
    toggleLink.textContent = isLogin ? "Sign Up" : "Login";
  }

  loginBtnAuth.addEventListener('click', () => {
    isLogin = true;
    showForm();
  });

  signupBtnAuth.addEventListener('click', () => {
    isLogin = false;
    showForm();
  });

  toggleLink.addEventListener('click', () => {
    isLogin = !isLogin;
    authTitle.textContent = isLogin ? "Login" : "Sign Up";
    toggleLink.textContent = isLogin ? "Sign Up" : "Login";
  });

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if(username && password) {
      alert(isLogin ? `Logged in as ${username}` : `Account created for ${username}`);
      authScreen.classList.add('hidden');
      mainWebsite.classList.remove('hidden');
    } else {
      alert('Please fill in all fields!');
    }
  });

  /* ===================== MAIN WEBSITE CODE ===================== */
  const feed = document.getElementById('home');
  const searchBar = document.getElementById('search-bar');
  const searchBtn = document.getElementById('search-btn');
  const modal = document.getElementById('item-modal');
  const receiptModal = document.getElementById('receipt-modal');
  const closeBtns = document.querySelectorAll('.close');
  const categories = document.querySelectorAll('.cat');
  const navLinks = document.querySelectorAll('nav ul li a');
  const loginBtn = document.getElementById('login-btn');
  const notifications = document.getElementById('notifications');

  // Sample posts data
  const postsData = [
    {
      title: "Calculus Textbook",
      seller: "Maria Santos",
      avatar: "https://via.placeholder.com/30?text=M",
      price: "₱350",
      image: "https://via.placeholder.com/600x300?text=Calculus+Book",
      caption: "Selling because I finished my math courses and need space in my backpack!",
      timestamp: "2 hours ago",
      category: "Books",
      likes: 12,
      description: "Second-hand, good condition. Perfect for Math subjects. Includes notes inside."
    },
    {
      title: "Used Laptop",
      seller: "Juan Dela Cruz",
      avatar: "https://via.placeholder.com/30?text=J",
      price: "₱15,000",
      image: "https://via.placeholder.com/600x300?text=Laptop",
      caption: "Upgraded to a newer model, so selling this reliable one for online classes.",
      timestamp: "1 day ago",
      category: "Electronics",
      likes: 25,
      description: "Good for online classes and projects. Battery lasts 4 hours."
    },
    {
      title: "Basketball",
      seller: "Ana Reyes",
      avatar: "https://via.placeholder.com/30?text=A",
      price: "₱500",
      image: "https://via.placeholder.com/600x300?text=Basketball",
      caption: "Moving dorms and can't take it with me—great for campus games!",
      timestamp: "3 hours ago",
      category: "Sports Items",
      likes: 8,
      description: "Slightly used but in excellent condition. Official size."
    },
    {
      title: "School Uniform",
      seller: "Carlos Lopez",
      avatar: "https://via.placeholder.com/30?text=C",
      price: "₱200",
      image: "https://via.placeholder.com/600x300?text=Uniform",
      caption: "Outgrew it after graduation—still looks new!",
      timestamp: "5 hours ago",
      category: "Uniforms",
      likes: 5,
      description: "Clean and pressed. Size M."
    },
    {
      title: "Notebooks Pack",
      seller: "Liza Gomez",
      avatar: "https://via.placeholder.com/30?text=L",
      price: "₱150",
      image: "https://via.placeholder.com/600x300?text=Notebooks",
      caption: "Bought too many for the semester—selling extras.",
      timestamp: "1 hour ago",
      category: "School Supplies",
      likes: 3,
      description: "10 notebooks, lined and spiral-bound."
    }
  ];

  let currentPosts = [...postsData]; // For filtering/search
  let loadedPosts = 0; // For infinite scroll

  // Load initial posts
  loadPosts(currentPosts.slice(0, 5)); // Load first 5
  loadedPosts = 5;

  function loadPosts(data) {
    data.forEach(post => {
      const postEl = document.createElement('div');
      postEl.className = 'post';
      postEl.dataset.category = post.category;
      postEl.innerHTML = `
        <div class="seller">
          <img src="${post.avatar}" alt="${post.seller}">
          <span>${post.seller}</span>
        </div>
        <p class="timestamp">${post.timestamp}</p>
        <h3>${post.title}</h3>
        <img src="${post.image}" alt="${post.title}">
        <p class="price">${post.price}</p>
        <p class="caption">${post.caption}</p>
        <div class="actions">
          <button class="btn btn-like">👍 Like (${post.likes})</button>
          <button class="btn btn-comment">💬 Comment</button>
          <button class="btn btn-share">🔗 Share</button>
          <button class="btn btn-cart">🛒 Add to Cart</button>
          <button class="btn btn-order">Place Order</button>
          <button class="btn btn-msg">Message Seller</button>
        </div>
      `;
      feed.appendChild(postEl);

      // Open item modal on click (except buttons)
      postEl.addEventListener('click', e => {
        if (!e.target.classList.contains('btn')) openItemModal(post);
      });

      // Button events
      postEl.querySelector('.btn-like').addEventListener('click', e => {
        e.stopPropagation();
        post.likes++;
        e.target.textContent = `👍 Like (${post.likes})`;
        alert('Liked!');
      });

      postEl.querySelector('.btn-comment').addEventListener('click', e => {
        e.stopPropagation();
        const comment = prompt('Add a comment:');
        if(comment) alert(`Comment added: "${comment}"`);
      });

      postEl.querySelector('.btn-share').addEventListener('click', e => {
        e.stopPropagation();
        alert('Shared on social media!');
      });

      postEl.querySelector('.btn-cart').addEventListener('click', e => {
        e.stopPropagation();
        alert(`Added "${post.title}" to cart!`);
      });

      postEl.querySelector('.btn-order').addEventListener('click', e => {
        e.stopPropagation();
        openReceiptModal(post);
      });

      postEl.querySelector('.btn-msg').addEventListener('click', e => {
        e.stopPropagation();
        alert(`Messaging ${post.seller}...`);
      });
    });
  }

  function openItemModal(post) {
    const details = document.getElementById('item-details');
    details.innerHTML = `
      <h2>${post.title}</h2>
      <img src="${post.image}" alt="${post.title}">
      <p><strong>Price:</strong> ${post.price}</p>
      <p><strong>Seller:</strong> ${post.seller}</p>
      <p><strong>Description:</strong> ${post.description}</p>
      <p><strong>Caption:</strong> ${post.caption}</p>
      <button class="btn btn-order">Buy Now</button>
    `;
    modal.style.display = 'flex';

    details.querySelector('.btn-order').addEventListener('click', () => {
      modal.style.display = 'none';
      openReceiptModal(post);
    });
  }

  function openReceiptModal(post) {
    const details = document.getElementById('receipt-details');
    details.innerHTML = `
      <p><strong>Item:</strong> ${post.title}</p>
      <p><strong>Price:</strong> ${post.price}</p>
      <p><strong>Seller:</strong> ${post.seller}</p>
      <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
      <p>Thank you for your purchase! Receipt sent to your email.</p>
    `;
    receiptModal.style.display = 'flex';
  }

  // Close modals
  closeBtns.forEach(btn => btn.addEventListener('click', () => {
    modal.style.display = 'none';
    receiptModal.style.display = 'none';
  }));

  // Search
  searchBtn.addEventListener('click', () => {
    const query = searchBar.value.toLowerCase();
    const filtered = postsData.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.seller.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    );
    feed.innerHTML = '';
    loadPosts(filtered);
  });

  // Category filter
  categories.forEach(cat => {
    cat.addEventListener('click', () => {
      const category = cat.dataset.category;
      const filtered = postsData.filter(post => post.category === category);
      feed.innerHTML = '';
      loadPosts(filtered);
      alert(`Filtered to "${category}" category!`);
    });
  });

  // Navbar active link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Login & notifications buttons
  loginBtn.addEventListener('click', () => alert('Login/Signup modal would open here!'));
  notifications.addEventListener('click', () => alert('You have 3 new notifications!'));

  // Infinite scroll
  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
      if (loadedPosts < currentPosts.length) {
        loadPosts(currentPosts.slice(loadedPosts, loadedPosts + 5));
        loadedPosts += 5;
      }
    }

    // Navbar background change
    const nav = document.querySelector('nav');
    nav.style.background = window.scrollY > 50 ? "rgba(45,108,223,1)" : "rgba(45,108,223,0.9)";
  });

});
