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

// Setup continuous product carousel effect
function setupProductCarousel() {
    const productsContainer = document.querySelector('.products-container');
    if (!productsContainer) return null;
    
    const productItems = gsap.utils.toArray('.product-item');
    if (productItems.length === 0) return null;
    
    // Clear existing grid layout to allow for absolute positioning
    gsap.set(productsContainer, {
        display: 'block',
        position: 'relative',
        height: '500px',
        margin: '0 auto',
        overflow: 'hidden',
        width: '100%'
    });
    
    // Set all products to absolute position for the carousel
    productItems.forEach((item, i) => {
        gsap.set(item, {
            position: 'absolute',
            top: 0,
            left: '50%',
            xPercent: -50,
            x: i === 0 ? 0 : window.innerWidth, // Position off-screen to the right
            opacity: i === 0 ? 1 : 0,
            scale: i === 0 ? 1 : 0.8,
            width: '85%',
            maxWidth: '350px',
            margin: '0 auto',
            zIndex: i === 0 ? 10 : 1
        });
    });
    
    // Create the looping sequence
    const createProductLoop = () => {
        const tl = gsap.timeline({
            repeat: -1, // Infinite repeat
            onRepeat: () => {
                // Move the first item to the end to create seamless loop
                const firstProduct = productItems[0];
                productItems.push(productItems.shift());
                // Reset the moved product
                gsap.set(firstProduct, { 
                    x: window.innerWidth, 
                    opacity: 0, 
                    scale: 0.8,
                    zIndex: 1 
                });
            }
        });
        
        // Animation for each product
        productItems.forEach((item, i) => {
            // Stagger the start time for each product
            const staggerDelay = i * 4; // 4 seconds between each product start
            
            // Enter from right side of screen
            tl.to(item, {
                x: 0,
                opacity: 1,
                scale: 1,
                zIndex: 10,
                duration: 0.8,
                ease: "back.out(1.2)",
            }, staggerDelay);
            
            // Stay visible
            tl.to(item, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 2.2
            }, staggerDelay + 0.8);
            
            // Exit to left side of screen
            tl.to(item, {
                x: -window.innerWidth,
                opacity: 0,
                scale: 0.8,
                zIndex: 1,
                duration: 1,
                ease: "power1.in"
            }, staggerDelay + 3);
        });
        
        return tl;
    };
    
    let productLoop;
    let scrollTriggerInstance;
    let progressContainer;
    
    // Start the animation on mobile only
    if (window.innerWidth <= 768) {
        // Adjust products container height based on screen size
        const containerHeight = Math.min(Math.max(window.innerHeight * 0.6, 450), 550);
        gsap.set(productsContainer, {
            height: containerHeight
        });

        // Create a progress indicator
        progressContainer = document.createElement('div');
        progressContainer.className = 'carousel-progress';
        Object.assign(progressContainer.style, {
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            margin: '15px auto 25px',
            position: 'relative',
            zIndex: 20
        });
        
        // Add dots for each product
        productItems.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            Object.assign(dot.style, {
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: i === 0 ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.5)',
                transition: 'background-color 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            });
            progressContainer.appendChild(dot);
        });
        
        // Insert the progress container after the products container
        productsContainer.parentNode.insertBefore(progressContainer, productsContainer.nextSibling);
        
        const dots = document.querySelectorAll('.carousel-dot');
        let activeIndex = 0;
        
        // Add auto-play/pause controls
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'carousel-controls';
        Object.assign(controlsContainer.style, {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            margin: '0 auto 20px',
            position: 'relative',
            zIndex: 20
        });
        
        // Create play/pause button
        const playPauseBtn = document.createElement('button');
        playPauseBtn.className = 'carousel-control';
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        Object.assign(playPauseBtn.style, {
            background: 'rgba(0, 0, 0, 0.3)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        });
        
        controlsContainer.appendChild(playPauseBtn);
        
        // Insert controls below progress dots
        progressContainer.parentNode.insertBefore(controlsContainer, progressContainer.nextSibling);
        
        // Start the product loop
        productLoop = createProductLoop();
        let isPlaying = true;
        
        // Play/pause functionality
        playPauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                productLoop.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                productLoop.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
        
        // Update the active dot indicator
        productLoop.eventCallback('onUpdate', () => {
            // Calculate which product is currently active based on the timeline progress
            const totalTime = productLoop.totalDuration();
            const cycleTime = totalTime / productItems.length;
            const progress = productLoop.time() % totalTime;
            const newActiveIndex = Math.floor((progress % totalTime) / cycleTime);
            
            if (newActiveIndex !== activeIndex) {
                // Update dots
                dots.forEach((dot, i) => {
                    dot.style.backgroundColor = i === newActiveIndex ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.5)';
                });
                activeIndex = newActiveIndex;
            }
        });
        
        // Create ScrollTrigger to control the animation
        scrollTriggerInstance = ScrollTrigger.create({
            trigger: '.cold-section',
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => {
                if (isPlaying) productLoop.play();
            },
            onLeave: () => {
                if (isPlaying) productLoop.pause();
            },
            onEnterBack: () => {
                if (isPlaying) productLoop.play();
            },
            onLeaveBack: () => {
                if (isPlaying) productLoop.pause();
            }
        });
    }
    
    // Return an object with a kill method to clean up
    return {
        kill: function() {
            if (productLoop) productLoop.kill();
            if (scrollTriggerInstance) scrollTriggerInstance.kill();
            
            // Remove the controls container if it exists
            const controlsContainer = document.querySelector('.carousel-controls');
            if (controlsContainer) {
                // Remove event listeners first
                const playPauseBtn = controlsContainer.querySelector('.carousel-control');
                if (playPauseBtn) {
                    playPauseBtn.removeEventListener('click', playPauseBtn.onclick);
                }
                controlsContainer.remove();
            }
        }
    };
}

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
            
            // Initialize appropriate animation based on viewport width
            if (window.innerWidth > 768) {
                // On desktop, use scroll effect animation
                productItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.visibility = 'visible';
                    item.style.transform = 'translateX(-50px)';
                });
                
                // Staggered left to right animation with slight bounce
                gsap.to(productItems, {
                    x: 0,
                    opacity: 1,
                    stagger: { 
                        each: 0.1,
                        from: "start", 
                        grid: "auto",
                        ease: "power2.out"
                    },
                    duration: 0.8,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: '.products-header',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                });
                
                // Setup scroll-based animation
                productScrollEffect = setupProductsScrollEffect();
            } else {
                // On mobile, use the carousel animation
                productItems.forEach(item => {
                    item.style.visibility = 'visible';
                });
                
                // Setup the carousel effect
                productCarousel = setupProductCarousel();
            }
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
        
        // Add hover effects (for desktop)
        productItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    gsap.to(item, {
                        y: -10,
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 15px 30px rgba(100, 200, 255, 0.3)',
                        duration: 0.3
                    });
                }
            });
            
            item.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    gsap.to(item, {
                        y: 0,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        duration: 0.3
                    });
                }
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