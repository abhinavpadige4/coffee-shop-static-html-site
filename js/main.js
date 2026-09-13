/* Coffee Shop Website JavaScript */
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      // Change icon (hamburger to X)
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      }
    });
  });
  
  // Form Validation and Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      // Validate name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
      } else {
        clearError(nameInput);
      }
      
      // Validate email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email');
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(emailInput);
      }
      
      // Validate message
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter your message');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
      } else {
        clearError(messageInput);
      }
      
      // If form is valid, simulate submission
      if (isValid) {
        submitForm();
      }
    });
  }
  
  // Helper functions for form validation
  function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    
    // Remove existing error message if any
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('small');
    errorElement.className = 'error-message';
    errorElement.style.color = '#ff6b6b';
    errorElement.style.fontSize = '0.875rem';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
    
    input.style.borderColor = '#ff6b6b';
  }
  
  function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
    
    input.style.borderColor = '';
  }
  
  function submitForm() {
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
      // Show success message
      const formContainer = document.querySelector('.contact-form');
      formContainer.innerHTML = `
        <div class="success-message">
          <h3>Thank you!</h3>
          <p>Your message has been sent successfully. We'll get back to you soon!</p>
        </div>
      `;
      
      // Reset button after delay
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  }
  
  // Scroll Animation for Sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);
  
  // Observe all sections for fade-in animation
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
  
  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function updateActiveNavLink() {
    let scrollPosition = window.scrollY + 100; // Offset for header
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  // Call once on load to set initial active link
  updateActiveNavLink();
  
  // Lazy Loading Images (if using loading="lazy" isn't sufficient)
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Add keyboard navigation enhancement
  document.addEventListener('keydown', function(e) {
    // Trap focus in modal-like elements if we had any
    // For now, just ensure skip link works
    if (e.key === 'Tab') {
      const skipLink = document.querySelector('.skip-link');
      if (skipLink && document.activeElement === skipLink) {
        e.preventDefault();
        // Focus goes to first focusable element after skip link
        const focusableElements = document.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="email"], input[type="tel"], input[type="url"], select');
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }
  });
  
  // Add aria-current to nav links based on URL hash
  function updateNavAriaCurrent() {
    const hash = window.location.hash;
    navLinks.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
  
  // Update on load and hash change
  window.addEventListener('load', updateNavAriaCurrent);
  window.addEventListener('hashchange', updateNavAriaCurrent);
});