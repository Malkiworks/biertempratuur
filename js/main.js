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

// ===== Custom Cursor =====
const cursor = document.querySelector('.custom-cursor');
const cursorTrailer = document.querySelector('.cursor-trailer');

document.addEventListener('mousemove', (e) => {
    // Main cursor follows mouse instantly
    gsap.to(cursor, {
        left: e.clientX,
        top: e.clientY,
        duration: 0,
    });
    
    // Trailer follows with delay
    gsap.to(cursorTrailer, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Custom cursor interactions
const interactiveElements = document.querySelectorAll('a, button, .product-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorTrailer.classList.add('trailer-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorTrailer.classList.remove('trailer-hover');
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
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
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

// Enhanced Beer jug frost effect with rotation
const beerJugTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.transition-section',
        start: 'top center',
        end: 'center center',
        scrub: true
    }
});

beerJugTimeline
    .to('.beer-bottle-container', {
        rotateY: 15,
        rotateX: 5,
        scale: 1.05,
        duration: 1,
        ease: 'power2.inOut'
    })
    .to('.bottle-frost-overlay', {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
    }, "-=0.5") // Start slightly before the rotation finishes
    .to('.beer-bottle', {
        filter: 'brightness(1.2) saturate(0.8)',
        duration: 1
    }, "-=0.8");

// Make beer jug return to normal when scrolling back up - with smoother transition
gsap.timeline({
    scrollTrigger: {
        trigger: '.transition-section',
        start: 'top bottom',
        end: 'top center',
        scrub: 1.2, // Smoother scrubbing
        ease: 'power2.inOut'
    }
}).to('.beer-bottle-container', {
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    duration: 1.5, // Increased duration for smoother transition
    ease: 'power2.inOut'
});

// Create frost particles
function createFrostParticles() {
    const frostContainer = document.querySelector('.frost-particles');
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'frost-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        frostContainer.appendChild(particle);
        
        // Set particle styles
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 8 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.filter = 'blur(1px)';
        
        // Animate particle
        gsap.from(particle, {
            scale: 0,
            opacity: 0,
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.transition-section',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });
    }
}

createFrostParticles();

// Create snowflakes
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflakesContainer.appendChild(snowflake);
    }
}

createSnowflakes();

// ===== Products Animations =====

// Add horizontal scroll effect to products when scrolling vertically
function setupProductsScrollEffect() {
    const productsContainer = document.querySelector('.products-container');
    if (!productsContainer) return null;
    
    // Create a very subtle horizontal container shift
    const containerScrollTrigger = ScrollTrigger.create({
        trigger: '.cold-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.to('.products-container', {
            x: function() {
                // Use a small offset on mobile, larger on desktop
                return window.innerWidth < 768 ? -20 : -50;
            }
        })
    });
    
    // Create staggered rollover effect for products
    const productItems = gsap.utils.toArray('.product-item');
    const productTriggers = [];
    
    productItems.forEach((item, i) => {
        // Calculate row and column position for 3x2 grid
        const row = Math.floor(i / 3);
        const col = i % 3;
        
        // Items move horizontally in a sequence with a slight rotation
        const itemTrigger = ScrollTrigger.create({
            trigger: '.cold-section',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
            animation: gsap.to(item, {
                x: function() {
                    // More movement for items on the sides
                    const baseOffset = window.innerWidth < 768 ? 30 : 80;
                    return baseOffset * (col - 1); // -baseOffset, 0, or +baseOffset
                },
                rotation: function() {
                    // Slight rotation based on column position
                    return (col - 1) * 2; // -2°, 0°, or +2°
                },
                scale: function() {
                    // Middle column items slightly larger
                    return col === 1 ? 1.05 : 1;
                },
                ease: "power1.inOut",
                delay: (row * 0.1) + (col * 0.05) // Staggered timing
            })
        });
        
        productTriggers.push(itemTrigger);
    });
    
    // Return an object with methods to kill all triggers
    return {
        kill: function() {
            if (containerScrollTrigger) containerScrollTrigger.kill();
            productTriggers.forEach(trigger => {
                if (trigger) trigger.kill();
            });
        }
    };
}

// Product carousel setup
function setupProductCarousel() {
    const container = document.querySelector('.products-container');
    const products = document.querySelectorAll('.product-item');
    const productCount = products.length;
    
    // Set container height based on tallest product
    const maxHeight = Math.max(...Array.from(products).map(p => p.offsetHeight));
    container.style.height = `${maxHeight}px`;
    
    // Initialize state
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let autoScrolling = true;
    let autoScrollInterval = null;
    
    // Set initial positions
    products.forEach((product, index) => {
        gsap.set(product, {
            position: 'absolute',
            left: '50%',
            xPercent: -50,
            opacity: 0,
            scale: 0.8,
            zIndex: 0,
            display: 'block'
        });
    });
    
    // Set initial visible product
    gsap.set(products[0], {
        opacity: 1,
        scale: 1,
        zIndex: 2
    });
    
    // Add drag functionality
    function handleMouseDown(e) {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        stopAutoScroll();
    }
    
    function handleTouchStart(e) {
        isDragging = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    }
    
    function handleMouseUp() {
        isDragging = false;
        if (autoScrolling) {
            startAutoScroll();
        }
    }
    
    // Auto-scroll functionality
    function startAutoScroll() {
        if (autoScrollInterval) return;
        
        autoScrollInterval = setInterval(() => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            if (container.scrollLeft >= maxScroll - 1) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft += 2;
            }
        }, 20);
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }
    
    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('mouseleave', handleMouseUp);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
    
    // Add play/pause button
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    controls.innerHTML = `
        <button class="carousel-control" onclick="toggleAutoScroll()">
            ${autoScrolling ? 'Pause' : 'Play'}
        </button>
    `;
    container.parentNode.insertBefore(controls, container);
    
    // Start auto-scrolling
    if (autoScrolling) {
        startAutoScroll();
    }
    
    // Cleanup function
    return {
        kill: () => {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('mouseleave', handleMouseUp);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
            stopAutoScroll();
            controls.remove();
        }
    };
}

// Global function to toggle auto-scroll
window.toggleAutoScroll = function() {
    const container = document.querySelector('.products-container');
    const button = container.parentNode.querySelector('.carousel-control');
    const isAutoScrolling = button.textContent === 'Pause';
    
    if (isAutoScrolling) {
        stopAutoScroll();
        button.textContent = 'Play';
    } else {
        startAutoScroll();
        button.textContent = 'Pause';
    }
};

// Make sure products are visible on page load
document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.querySelectorAll('.product-item');
    
    if (productItems.length) {
        let productScrollEffect;
        let productCarousel;
        
        // Setup initial animations based on viewport width
        function initProductAnimations() {
            // Clear existing animations if they exist
            if (productScrollEffect) {
                productScrollEffect.kill();
                productScrollEffect = null;
            }
            
            if (productCarousel) {
                // Remove carousel progress indicators
                const progressContainer = document.querySelector('.carousel-progress');
                if (progressContainer) {
                    progressContainer.remove();
                }
                
                // Reset product container and items
                const productsContainer = document.querySelector('.products-container');
                gsap.set(productsContainer, {
                    display: '',
                    position: '',
                    height: '',
                    margin: '',
                    overflow: ''
                });
                
                // Reset product items
                productItems.forEach(item => {
                    gsap.set(item, {
                        position: '',
                        top: '',
                        left: '',
                        xPercent: 0,
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        width: '',
                        maxWidth: '',
                        margin: '',
                        zIndex: ''
                    });
                });
                
                productCarousel.kill();
                productCarousel = null;
            }
            
            // Setup the carousel effect for both mobile and desktop
            productItems.forEach(item => {
                item.style.visibility = 'visible';
            });
            
            // Setup the carousel effect
            productCarousel = setupProductCarousel();
        }
        
        // Initialize animations
        initProductAnimations();
        
        // Handle window resize events
        let resizeTimeout;
        window.addEventListener('resize', function() {
            // Debounce resize events
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                initProductAnimations();
            }, 250);
        });
        
        // Add hover effects
        productItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 15px 30px rgba(100, 200, 255, 0.3)',
                    duration: 0.3
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    duration: 0.3
                });
            });
        });
    }
});

// CTA button animation
gsap.from('.cta-container', {
    scrollTrigger: {
        trigger: '.cta-container',
        start: 'top 80%',
        toggleActions: 'play none none none' // Only play forward, never reverse
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
});

// ===== Parallax Effects =====
gsap.to('.parallax-bg', {
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: -100,
    ease: 'none'
}); 