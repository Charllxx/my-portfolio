/**
 * roblox.js - Portfolio JavaScript for Oluwole Charles Peter
 * 
 * Features:
 * - Scroll-triggered animations
 * - Image modal viewer with navigation
 * - Smooth scrolling
 * - Mobile-friendly design
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== IMAGE DATA ====================
  const portfolioImages = [
    { 
      src: 'ui img 2.jpeg', 
      title: 'Fitness Tracker App',
      description: 'Fitness tracking application showing daily progress, workout statistics, and trending workouts.',
      tags: ['UI Design', 'Fitness', 'Mobile']
    },
    { 
      src: 'ui img 3.png', 
      title: 'Task Management Dashboard',
      description: 'Complete UI collection for a task management system including dashboard, task creation, and transaction history.',
      tags: ['Dashboard', 'Task Management', 'UI Kit']
    },
    { 
      src: 'https://via.placeholder.com/800x450/1e293b/ccd6f6?text=E-commerce+UI', 
      title: 'E-commerce Platform',
      description: 'Modern e-commerce platform with product listings, cart functionality, and checkout process.',
      tags: ['E-commerce', 'Product UI', 'Checkout']
    }
  ];

  // ==================== ANIMATION SYSTEM ====================
  const initAnimations = () => {
    // Add animation classes
    document.querySelector('.hero-content')?.classList.add('animate-on-scroll', 'fade-left');
    document.querySelector('.hero-image')?.classList.add('animate-on-scroll', 'fade-right');
    
    // Animate project cards with staggered delays
    document.querySelectorAll('.project-card').forEach((card, index) => {
      card.classList.add('animate-on-scroll', 'fade-up');
      card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  };

  // ==================== MODAL SYSTEM ====================
  let currentImageIndex = 0;

  const openModal = (src, title) => {
    currentImageIndex = portfolioImages.findIndex(img => img.src === src);
    updateModal();
    document.getElementById('imageModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    document.getElementById('imageModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  const prevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
    updateModal();
  };

  const nextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
    updateModal();
  };

  const updateModal = () => {
    const image = portfolioImages[currentImageIndex];
    const imgElement = document.getElementById('modalImage');
    
    // Fallback if image fails to load
    imgElement.onerror = () => {
      imgElement.src = 'https://via.placeholder.com/800x450/ff0000/ffffff?text=Image+Not+Found';
    };
    
    imgElement.src = image.src;
    imgElement.alt = image.title;
    document.getElementById('modalTitle').textContent = image.title;
    document.getElementById('imageCounter').textContent = 
      `${currentImageIndex + 1}/${portfolioImages.length}: ${image.description}`;
    
    // Update tags
    const tagsContainer = document.getElementById('modalTags');
    if (tagsContainer) {
      tagsContainer.innerHTML = image.tags.map(tag => 
        `<span class="bg-gray-700 text-yellow-400 px-3 py-1 rounded-full text-sm">${tag}</span>`
      ).join('');
    }
  };

  // ==================== SMOOTH SCROLLING ====================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ==================== EVENT LISTENERS ====================
  const setupEventListeners = () => {
    // Modal close on outside click
    document.getElementById('imageModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('imageModal').classList.contains('hidden')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
    });
  };

  // ==================== INITIALIZATION ====================
  const init = () => {
    initAnimations();
    initSmoothScroll();
    setupEventListeners();
  };

  // Initialize everything
  init();

  // Expose modal functions to global scope
  window.portfolio = {
    openModal,
    closeModal,
    prevImage,
    nextImage
  };
});