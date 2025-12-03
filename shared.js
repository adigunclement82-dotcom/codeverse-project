/* ==========================================
   SHARED JAVASCRIPT - All Pages
   ========================================== */

// ==========================================
// DARK MODE TOGGLE
// ==========================================
function initializeDarkMode() {
  const themeToggle = document.querySelector('.theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check localStorage for saved preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
  
  // Theme toggle button click
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      }
    });
  }
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all sections with fade-in or slide-up classes
  document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    observer.observe(el);
  });
}

// ==========================================
// RESERVATION MODAL FUNCTIONALITY
// ==========================================
function initializeReservationModal() {
  const reservationButtons = document.querySelectorAll('.navbutton, .reserve-btn, .reservation-btn');
  let modalOpen = false;
  
  reservationButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Create modal if it doesn't exist
      if (!document.querySelector('.reservation-modal')) {
        createReservationModal();
      }
      
      const modal = document.querySelector('.reservation-modal');
      
      if (!modalOpen) {
        // Open modal
        modal.classList.remove('hide');
        modal.style.display = 'flex';
        modalOpen = true;
      } else {
        // Close modal
        modal.classList.add('hide');
        setTimeout(() => {
          modal.style.display = 'none';
          modalOpen = false;
        }, 2500);
      }
    });
  });
  
  // Close button in modal
  document.addEventListener('click', function(e) {
    const modal = document.querySelector('.reservation-modal');
    if (e.target.classList.contains('modal-close') || 
        (e.target === modal && e.target.classList.contains('reservation-modal'))) {
      if (modal) {
        modal.classList.add('hide');
        setTimeout(() => {
          modal.style.display = 'none';
          modalOpen = false;
        }, 2500);
      }
    }
  });
}

// Create reservation modal HTML
function createReservationModal() {
  const modal = document.createElement('div');
  modal.className = 'reservation-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">✕</button>
      <h2>Make a Reservation</h2>
      <p>We look forward to serving you at our restaurant. Please fill in your details to book a table.</p>
      <form>
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Your Email" required>
        <input type="date" required>
        <input type="time" required>
        <select required>
          <option value="">Number of Guests</option>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5+ Guests</option>
        </select>
        <button type="submit" style="margin-top: 20px;">Book Now</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
}

// ==========================================
// HAMBURGER MENU FUNCTIONALITY
// ==========================================
function initializeHamburgerMenu() {
  const hamburgerButtons = document.querySelectorAll('.menu-icon, .hamburger');
  
  hamburgerButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      // Navigate to Navigation Page
      window.location.href = '../Navigation Page/index.html';
    });
  });
}

// ==========================================
// TEXT HOVER EFFECTS (Optional Enhancement)
// ==========================================
function initializeTextHoverEffects() {
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
  
  textElements.forEach(el => {
    el.style.cursor = 'default';
  });
}

// ==========================================
// INITIALIZATION ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  initializeDarkMode();
  initializeScrollAnimations();
  initializeReservationModal();
  initializeHamburgerMenu();
  initializeTextHoverEffects();
  
  // Add fade-in/slide-up animations to sections if not already present
  addAnimationsToSections();
});

// Auto-add animations to major sections
function addAnimationsToSections() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (!section.classList.contains('fade-in') && !section.classList.contains('slide-up')) {
      section.classList.add('slide-up');
    }
  });
}

// Re-initialize animations on window resize
window.addEventListener('resize', function() {
  initializeScrollAnimations();
});
