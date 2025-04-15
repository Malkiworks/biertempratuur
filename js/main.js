// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ===== Ensure page starts at the top =====
window.onload = function() {
    // Force scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Fix for browsers that might maintain scroll position
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
    
    // Clear any hash from the URL that might be causing scroll issues
    if (window.location.hash) {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
};

// ===== Preloader =====
window.addEventListener('load', () => {
    // Animate the temperature bar
    gsap.to('.temperature-level', {
        width: '100%',
        duration: 2.5,
        ease: 'power2.inOut',
        onComplete: () => {
            // Hide the loader
            gsap.to('.loader', {
                opacity: 0,
                visibility: 'hidden',
                duration: 0.8,
                ease: 'power3.inOut',
                onComplete: () => {
                    document.querySelector('.loader').style.display = 'none';
                    // Trigger entrance animations
                    startEntranceAnimations();
                    // Ensure we're at the top one more time after loader is gone
                    window.scrollTo(0, 0);
                }
            });
        }
    });
});

// ===== Navigation Effects =====
const nav = document.querySelector('.main-nav');

// Change nav background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', (e) => {
        // Only perform scroll for links that point to sections within the page
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Prevent default on dropdown toggle click
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===== Entrance Animations =====
function startEntranceAnimations() {
    // Animate main title with more offset to move it down 
    gsap.from('.main-title', {
        y: 150, // Increased offset for title to move it down more
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
    });
    
    // Animate subtitle with more delay and offset
    gsap.from('.subtitle', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.4, // Slight delay increase
        ease: 'power3.out'
    });
    
    // Animate scroll indicator
    gsap.from('.scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.7, // Increased delay
        ease: 'power3.out'
    });

    // Animate the product grid if it exists on page load
    if (document.querySelector('.product-grid')) {
        gsap.from('.product-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.5,
            clearProps: 'all' // This ensures all properties are cleared after animation
        });
    }
}

// ===== Scroll Animations =====

// Sun animation fade out on scroll
gsap.to('.sun-animation', {
    scrollTrigger: {
        trigger: '.hot-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    opacity: 0,
    scale: 0.5,
    y: -200
});

// Cloud parallax effects
gsap.to('.cloud-1', {
    scrollTrigger: {
        trigger: '.hot-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    x: -150,
    y: -50
});

gsap.to('.cloud-2', {
    scrollTrigger: {
        trigger: '.hot-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    x: 150,
    y: -70
});

gsap.to('.cloud-3', {
    scrollTrigger: {
        trigger: '.hot-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    x: -100,
    y: -30
});

// Background color transition - smoother transitions
gsap.to('body', {
    scrollTrigger: {
        trigger: '.hot-section',
        start: 'top top',
        end: 'bottom center',
        scrub: 1.5, // More gradual scrubbing
        ease: "power2.inOut" // Smoother easing
    },
    backgroundColor: 'var(--transition-color-1)',
    duration: 2 // Longer duration for smoother transition
});

gsap.to('body', {
    scrollTrigger: {
        trigger: '.transition-section',
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5, // More gradual scrubbing
        ease: "power2.inOut" // Smoother easing
    },
    backgroundColor: 'var(--cold-color-1)',
    duration: 2 // Longer duration for smoother transition
});

// Create water drop effects
function createWaterDrops() {
    const waterDropsContainer = document.querySelector('.water-drops');
    
    if (!waterDropsContainer) return;

    for (let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.className = 'water-drop';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 2 + 2}s`;
        drop.style.animationDelay = `${Math.random() * 3}s`;
        waterDropsContainer.appendChild(drop);
        
        // Set droplet styles
        drop.style.position = 'absolute';
        drop.style.width = `${Math.random() * 10 + 5}px`;
        drop.style.height = `${Math.random() * 15 + 10}px`;
        drop.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        drop.style.borderRadius = '0 50% 50% 50%';
        drop.style.transform = 'rotate(45deg)';
        drop.style.animation = `droplet ${drop.style.animationDuration} linear ${drop.style.animationDelay} infinite`;
    }
}

createWaterDrops();

// Create frost particles
function createFrostParticles() {
    const frostContainer = document.querySelector('.frost-particles');
    
    if (!frostContainer) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'frost-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        frostContainer.appendChild(particle);
        
        // Set particle styles
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 10 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.filter = 'blur(1px)';
        particle.style.animation = `frost ${particle.style.animationDuration} linear ${particle.style.animationDelay} infinite`;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
    }
}

createFrostParticles();

// Create snowflakes
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    
    if (!snowflakesContainer) return;

    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflakesContainer.appendChild(snowflake);
    }
}

createSnowflakes();

// Product Grid Animations
if (document.querySelector('.product-grid')) {
    // Animate product cards on hover
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
            });
        });
    });
    
    // Animate product cards on scroll - FIXED to prevent disappearing on slow scroll
    gsap.from('.product-card', {
        scrollTrigger: {
            trigger: '.product-grid',
            start: 'top bottom-=100',
            end: 'bottom bottom',
            toggleActions: 'play none none none', // This ensures the animation plays once and stays visible
            once: true // Ensures animation only happens once
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

// Helper function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Responsive adjustments
const handleResize = debounce(() => {
    // Reinitialize or adjust animations on window resize if needed
}, 100);

window.addEventListener('resize', handleResize);

// Initialize all animations and functionality
function initializeAllAnimations() {
    // Animate any section headings when they come into view
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top bottom-=100',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Animate section descriptions
    gsap.utils.toArray('.section-description').forEach(desc => {
        gsap.from(desc, {
            scrollTrigger: {
                trigger: desc,
                start: 'top bottom-=100',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
        });
    });
    
    // Animate quality feature cards
    gsap.utils.toArray('.quality-feature-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=50',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Animate process steps with stagger
    gsap.from('.process-step', {
        scrollTrigger: {
            trigger: '.process-steps',
            start: 'top bottom-=100',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Animate terms cards with stagger
    gsap.from('.terms-card', {
        scrollTrigger: {
            trigger: '.terms-content',
            start: 'top bottom-=100',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Animate privacy cards with stagger
    gsap.from('.privacy-card', {
        scrollTrigger: {
            trigger: '.privacy-content',
            start: 'top bottom-=100',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Animate contact form and info
    gsap.from('.contact-info-card', {
        scrollTrigger: {
            trigger: '.contact-page-grid',
            start: 'top bottom-=100',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form-card', {
        scrollTrigger: {
            trigger: '.contact-page-grid',
            start: 'top bottom-=100',
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Animate map markers with stagger
    gsap.from('.map-marker', {
        scrollTrigger: {
            trigger: '.map-container',
            start: 'top bottom-=100',
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
    
    // Animate guarantee badge with bounce
    gsap.from('.guarantee-badge', {
        scrollTrigger: {
            trigger: '.quality-guarantee',
            start: 'top bottom-=100',
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
    });

    // Animate the product grid if it exists
    if (document.querySelector('.product-grid')) {
        gsap.from('.product-card', {
            scrollTrigger: {
                trigger: '.product-grid',
                start: 'top bottom-=100',
                end: 'bottom bottom',
                toggleActions: 'play none none none',
                once: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAllAnimations();
    setupProductModal();
});

// Ensure all elements stay visible after any scroll animation
function ensureElementsVisibility() {
    // Fix for products potentially disappearing on slow scroll
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '1'; // Force opacity to 1
        card.style.transform = 'none'; // Reset any transforms
        card.style.visibility = 'visible'; // Ensure visibility
    });
}

// Add event listener for scroll end to ensure elements stay visible
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(ensureElementsVisibility, 100);
});

// Product Modal Setup
function setupProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.modal-close');
    
    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeProductModal();
        });
    }
    
    // Close modal when clicking outside the content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }
    
    // Close modal on ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeProductModal();
        }
    });
    
    // Setup quick view buttons
    document.querySelectorAll('.product-action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get product details from the card
            const card = btn.closest('.product-card');
            const image = card.querySelector('.product-image').src;
            const title = card.querySelector('.product-title').textContent;
            const description = card.querySelector('.product-description').textContent;
            const price = card.querySelector('.product-price').textContent;
            const tag = card.querySelector('.product-tag').textContent;
            
            // Populate modal with product details
            document.getElementById('modalProductImage').src = image;
            document.getElementById('modalProductImage').alt = title;
            document.getElementById('modalProductTitle').textContent = title;
            document.getElementById('modalProductPrice').textContent = price;
            document.getElementById('modalProductTag').textContent = tag;
            document.getElementById('modalProductDescription').textContent = description;
            
            // Open the modal
            openProductModal();
        });
    });
}

// Open product modal
function openProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }, 10);
    }
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300);
    }
}