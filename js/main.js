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
    if (!container) return null;
    
    // Add wrapper for gradients if it doesn't exist
    let wrapper = container.parentElement;
    if (!wrapper.classList.contains('products-wrapper')) {
        wrapper = document.createElement('div');
        wrapper.className = 'products-wrapper';
        container.parentNode.insertBefore(wrapper, container);
        wrapper.appendChild(container);
        
        // Add gradient overlays
        const rightGradient = document.createElement('div');
        rightGradient.className = 'scroll-gradient-right';
        wrapper.appendChild(rightGradient);
        
        const leftGradient = document.createElement('div');
        leftGradient.className = 'scroll-gradient-left';
        wrapper.appendChild(leftGradient);
    }
    
    // Initialize state
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let autoScrollInterval = null;
    let autoScrolling = true;
    
    // Set cursor style
    container.style.cursor = 'grab';
    
    // Mouse/touch down event handler
    function handleMouseDown(e) {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
        
        // Stop auto-scrolling temporarily
        stopAutoScroll();
        
        // Change cursor style
        container.style.cursor = 'grabbing';
    }
    
    // Touch start event handler
    function handleTouchStart(e) {
        isDragging = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        
        // Stop auto-scrolling temporarily
        stopAutoScroll();
    }
    
    // Mouse/touch move event handler
    function handleMouseMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        container.scrollLeft = scrollLeft - walk;
        
        // Show/hide left gradient based on scroll position
        const leftGradient = wrapper.querySelector('.scroll-gradient-left');
        if (leftGradient) {
            leftGradient.style.opacity = container.scrollLeft > 20 ? 1 : 0;
        }
    }
    
    // Touch move event handler
    function handleTouchMove(e) {
        if (!isDragging) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        container.scrollLeft = scrollLeft - walk;
        
        // Show/hide left gradient based on scroll position
        const leftGradient = wrapper.querySelector('.scroll-gradient-left');
        if (leftGradient) {
            leftGradient.style.opacity = container.scrollLeft > 20 ? 1 : 0;
        }
    }
    
    // Stop dragging
    function handleMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        container.style.cursor = 'grab';
        
        // Resume auto-scrolling if it was enabled
        if (autoScrolling) {
            setTimeout(() => {
                startAutoScroll();
            }, 1000); // Small delay before resuming
        }
    }
    
    // Handle automatic scrolling
    function startAutoScroll() {
        if (autoScrollInterval) return;
        
        autoScrollInterval = setInterval(() => {
            if (container) {
                const maxScroll = container.scrollWidth - container.clientWidth;
                
                if (container.scrollLeft >= maxScroll - 1) {
                    // Smoothly reset to beginning when reaching the end
                    const originalScrollBehavior = container.style.scrollBehavior;
                    container.style.scrollBehavior = 'auto';
                    container.scrollLeft = 0;
                    
                    setTimeout(() => {
                        container.style.scrollBehavior = originalScrollBehavior;
                    }, 50);
                } else {
                    container.scrollLeft += 1; // Slow continuous scroll
                }
                
                // Show/hide left gradient based on scroll position
                const leftGradient = wrapper.querySelector('.scroll-gradient-left');
                if (leftGradient) {
                    leftGradient.style.opacity = container.scrollLeft > 20 ? 1 : 0;
                }
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
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('mouseup', handleMouseUp);
    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleMouseUp);
    
    // Add controls
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    controls.innerHTML = `
        <button class="carousel-control">
            <i class="fas fa-pause"></i>
        </button>
    `;
    wrapper.parentNode.insertBefore(controls, wrapper.nextSibling);
    
    // Add control functionality
    const controlButton = controls.querySelector('.carousel-control');
    controlButton.addEventListener('click', function() {
        autoScrolling = !autoScrolling;
        
        if (autoScrolling) {
            startAutoScroll();
            this.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            stopAutoScroll();
            this.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Start auto-scrolling by default
    startAutoScroll();
    
    // Handle scroll event to show/hide left gradient
    container.addEventListener('scroll', function() {
        const leftGradient = wrapper.querySelector('.scroll-gradient-left');
        if (leftGradient) {
            leftGradient.style.opacity = container.scrollLeft > 20 ? 1 : 0;
        }
    });
    
    // Cleanup function
    return {
        kill: () => {
            // Remove event listeners
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseUp);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleMouseUp);
            container.removeEventListener('scroll', handleMouseUp);
            
            // Stop auto-scrolling
            stopAutoScroll();
            
            // Remove controls
            controls.remove();
            
            // Reset container style
            container.style.cursor = '';
        }
    };
}

// Initialize product animations
function initProductAnimations() {
    const productItems = document.querySelectorAll('.product-item');
    const productsContainer = document.querySelector('.products-container');
    
    // Clear existing animations if they exist
    if (window.productScrollEffect) {
        window.productScrollEffect.kill();
        window.productScrollEffect = null;
    }
    
    if (window.productCarousel) {
        window.productCarousel.kill();
        window.productCarousel = null;
    }
    
    // Remove any existing carousel elements
    const existingWrapper = document.querySelector('.products-wrapper');
    if (existingWrapper) {
        const container = existingWrapper.querySelector('.products-container');
        if (container) {
            existingWrapper.parentNode.insertBefore(container, existingWrapper);
            existingWrapper.remove();
        }
    }
    
    // Remove carousel controls
    const existingControls = document.querySelector('.carousel-controls');
    if (existingControls) {
        existingControls.remove();
    }
    
    // Reset product items to default styles
    if (productItems.length) {
        productItems.forEach(item => {
            gsap.set(item, {
                clearProps: 'all'
            });
            item.style.visibility = 'visible';
            item.style.opacity = 1;
        });
    }
    
    // Reset products container
    if (productsContainer) {
        gsap.set(productsContainer, {
            clearProps: 'all'
        });
    }
    
    // Setup the new carousel effect
    window.productCarousel = setupProductCarousel();
}

// Make sure products are visible on page load
document.addEventListener('DOMContentLoaded', function() {
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