document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Add animation classes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        // Skip hero section
        if (index === 0) return;
        
        section.classList.add('animate-on-scroll');
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Alternate animation directions
        if (index % 2 === 0) {
            section.style.transform = 'translateX(50px)';
        } else {
            section.style.transform = 'translateX(-50px)';
        }
    });

    // Hero section animation
    const hero = document.querySelector('section:first-of-type');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        hero.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 300);
    }

    // Project card animations
    const projectCards = document.querySelectorAll('[id="uiux"] .bg-gray-800, [id="roblox"] .bg-gray-800, [id="web"] .bg-gray-800');
    projectCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    });

    // About section image animation
    const aboutImage = document.querySelector('#about img');
    if (aboutImage) {
        aboutImage.classList.add('animate-on-scroll');
        aboutImage.style.opacity = '0';
        aboutImage.style.transform = 'scale(0.9)';
        aboutImage.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    }

    // About section text animation
    const aboutText = document.querySelector('#about > div > div:last-child');
    if (aboutText) {
        aboutText.classList.add('animate-on-scroll');
        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateY(20px)';
        aboutText.style.transition = 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s';
    }

    // Handle scroll animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial trigger
    animateOnScroll();
    
    // Add 'animate' class to elements in view on load
    setTimeout(animateOnScroll, 500);
    
    // Animate elements when they become visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0) translateY(0) scale(1)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

