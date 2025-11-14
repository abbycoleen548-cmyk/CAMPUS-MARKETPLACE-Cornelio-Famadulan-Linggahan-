// Wait until the page fully loads
document.addEventListener("DOMContentLoaded", () => {

  // --- CATEGORY FILTER ---
  const categories = document.querySelectorAll(".cat");
  const posts = document.querySelectorAll(".post");

  categories.forEach(category => {
    category.addEventListener("click", () => {
      const selectedCategory = category.innerText.trim();
      alert(`You selected the "${selectedCategory}" category! (Feature coming soon)`);

      // Example filtering logic (for future use)
      posts.forEach(post => {
        // This part can later be improved when you tag posts by category
        post.style.display = "block";
      });
    });
  });

  // --- Orde Button ---
  const orderButtons = document.querySelectorAll(".btn-order");
  orderButtons.forEach(button => {
    button.addEventListener("click", () => {
      const postTitle = button.closest(".post").querySelector("h3").innerText;
      alert(`🛒 You placed an order for "${postTitle}"!`);
    });
  });

  // --- MESSAGE BUTTONS ---
  const msgButtons = document.querySelectorAll(".btn-msg");
  msgButtons.forEach(button => {
    button.addEventListener("click", () => {
      const seller = button.closest(".post").querySelector(".seller").innerText;
      alert(`💬 Starting chat with ${seller}`);
    });
  });

  // --- NAVBAR ACTIVE LINK HIGHLIGHT ---
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });


  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
      nav.style.background = "rgba(45,108,223,1)";
    } else {
      nav.style.background = "rgba(45,108,223,0.9)";
    }
  });

});
