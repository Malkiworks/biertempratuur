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
    
    // Do not create a wrapper - work directly with the container
    let wrapper = container.parentElement;
    
    // More comprehensive detection for iOS Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || 
                     /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                     (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // Set up cloned items for infinite scroll if not already done
    setupInfiniteScroll(container);
    
    // Initialize state
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let autoScrollInterval = null;
    let autoScrolling = true;
    let resetInProgress = false;
    let lastInteractionTime = 0;
    let scrollSpeed = isiOS ? 1 : 2; // Slower for iOS to prevent issues
    let manualScrolling = false;
    let touchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    // Set cursor style (only on desktop)
    if (!touchDevice) {
        container.style.cursor = 'grab';
    }
    
    // Force start the animation with a small delay to ensure iOS is ready
    setTimeout(() => {
        if (isSafari || isiOS) {
            // Reset any existing scrolling state
            stopAutoScroll();
            // Force scroll to initial position
            container.scrollLeft = container.scrollLeft + 1;
            // Start the animation with a delay
            setTimeout(() => {
                startAutoScroll();
            }, 300);
        } else {
            // Start auto-scrolling immediately for non-Safari
            startAutoScroll();
        }
    }, 500);
    
    // Mouse/touch down event handler
    function handleMouseDown(e) {
        if (resetInProgress) return;
        isDragging = true;
        manualScrolling = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        if (!touchDevice) container.style.cursor = 'grabbing';
        container.style.scrollBehavior = 'auto'; // Disable smooth scrolling during drag
        lastInteractionTime = Date.now();
        
        // Stop auto-scrolling temporarily
        stopAutoScroll();
    }
    
    // Touch start event handler
    function handleTouchStart(e) {
        if (resetInProgress) return;
        isDragging = true;
        manualScrolling = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.scrollBehavior = 'auto'; // Disable smooth scrolling during drag
        lastInteractionTime = Date.now();
        
        // Add class to body to prevent unwanted scrolling
        document.body.classList.add('touching');
        
        // Stop auto-scrolling temporarily
        stopAutoScroll();
    }
    
    // Handle automatic scrolling
    function startAutoScroll() {
        // Clear any existing animation to prevent duplication
        stopAutoScroll();
        
        // Safari on iOS has animation issues, so we need to use a different approach
        if (isSafari || isiOS) {
            // For iOS Safari, use requestAnimationFrame for smoother performance
            let lastTimestamp = null;
            let animationId = null;
            
            const scrollAnimation = (timestamp) => {
                if (!container || isDragging || resetInProgress || manualScrolling) {
                    lastTimestamp = null;
                    animationId = requestAnimationFrame(scrollAnimation);
                    return;
                }
                
                if (!lastTimestamp) {
                    lastTimestamp = timestamp;
                }
                
                // Only update every few frames for iOS to prevent jank
                const elapsed = timestamp - lastTimestamp;
                if (elapsed > 32) { // Approximately 30fps for iOS
                    container.scrollLeft += scrollSpeed;
                    checkInfiniteScrollBoundaries();
                    lastTimestamp = timestamp;
                }
                
                animationId = requestAnimationFrame(scrollAnimation);
            };
            
            animationId = requestAnimationFrame(scrollAnimation);
            
            // Store the animation ID for cleanup
            autoScrollInterval = {
                cancel: () => {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                }
            };
            
            // Add a special class for iOS to help with CSS optimizations
            container.classList.add('ios-scrolling');
        } else {
            // For other browsers, use the standard interval approach
            autoScrollInterval = setInterval(() => {
                if (!container || isDragging || resetInProgress || manualScrolling) return;
                
                container.scrollLeft += scrollSpeed;
                checkInfiniteScrollBoundaries();
            }, 16); // ~60fps for smoother animation
        }
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            if ((isSafari || isiOS) && autoScrollInterval.cancel) {
                autoScrollInterval.cancel();
            } else if (!isSafari && !isiOS) {
                clearInterval(autoScrollInterval);
            }
            autoScrollInterval = null;
        }
    }
    
    // Setup product item animations with Safari fixes
    function setupProductItemAnimations() {
        const productItems = container.querySelectorAll('.product-item');
        
        productItems.forEach(item => {
            // Reset any existing animations
            gsap.set(item, { clearProps: 'all' });
            
            if (!touchDevice) {
                // Add hover animation (desktop only)
                item.addEventListener('mouseenter', () => {
                    if (!isDragging) {
                        gsap.to(item, {
                            y: -8,
                            scale: 1.03,
                            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)',
                            duration: 0.3,
                            ease: 'power2.out',
                            force3D: true // Force 3D transforms for better performance
                        });
                        
                        // Also animate the image
                        const image = item.querySelector('.product-image');
                        if (image) {
                            gsap.to(image, {
                                scale: 1.08,
                                duration: 0.5,
                                ease: 'power1.out',
                                force3D: true // Force 3D transforms for better performance
                            });
                        }
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, {
                        y: 0,
                        scale: 1,
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                        duration: 0.4,
                        ease: 'power2.out',
                        force3D: true // Force 3D transforms for better performance
                    });
                    
                    // Reset image animation
                    const image = item.querySelector('.product-image');
                    if (image) {
                        gsap.to(image, {
                            scale: 1,
                            duration: 0.5,
                            ease: 'power1.out',
                            force3D: true // Force 3D transforms for better performance
                        });
                    }
                });
            } else {
                // Add tap/touch animation (mobile only)
                item.addEventListener('touchstart', () => {
                    if (isDragging) return;
                    
                    gsap.to(item, {
                        y: -5,
                        scale: 1.02,
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
                        duration: 0.2,
                        ease: 'power2.out',
                        force3D: true // Force 3D transforms for better performance
                    });
                });
                
                item.addEventListener('touchend', () => {
                    gsap.to(item, {
                        y: 0,
                        scale: 1,
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                        duration: 0.3,
                        ease: 'power2.out',
                        force3D: true // Force 3D transforms for better performance
                    });
                });
            }
        });
    }
    
    // Mouse/touch move event handler
    function handleMouseMove(e) {
        if (!isDragging || resetInProgress) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2.5; // Increased multiplier for more responsive dragging
        container.scrollLeft = scrollLeft - walk;
        lastInteractionTime = Date.now();
        
        // Check infinite scroll boundaries immediately during drag
        checkInfiniteScrollBoundaries();
    }
    
    // Touch move event handler
    function handleTouchMove(e) {
        if (!isDragging || resetInProgress) return;
        e.preventDefault(); // Prevent page scroll while dragging
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2.5; // Increased multiplier for more responsive dragging
        container.scrollLeft = scrollLeft - walk;
        lastInteractionTime = Date.now();
        
        // Check infinite scroll boundaries immediately during drag
        checkInfiniteScrollBoundaries();
    }
    
    // Setup infinite scroll by cloning items
    function setupInfiniteScroll(container) {
        // Remove any existing cloned items first to avoid duplication on resize/reinit
        const existingClones = container.querySelectorAll('.cloned-item');
        existingClones.forEach(clone => clone.remove());
        
        // Reset the data attribute
        container.dataset.infiniteScrollReady = 'false';
        
        const items = container.querySelectorAll('.product-item:not(.cloned-item)');
        if (items.length < 2) return;
        
        // Clone enough items to fill the container width plus a bit more
        // We'll ensure at least one full screen width of clones on each side
        const containerWidth = container.clientWidth;
        let currentWidth = 0;
        let itemsToClone = [];
        
        // Measure how many items we need to clone to fill at least one screen width
        for (let i = 0; i < items.length && currentWidth < containerWidth; i++) {
            currentWidth += items[i].offsetWidth + parseInt(window.getComputedStyle(container).columnGap || 0);
            itemsToClone.push(i);
        }
        
        // If we don't have enough items, clone all of them
        if (itemsToClone.length === 0 || itemsToClone.length === items.length) {
            itemsToClone = Array.from(items).map((_, i) => i);
        }
        
        // Clone items and add to end and beginning
        for (let i of itemsToClone) {
            const clone = items[i].cloneNode(true);
            clone.classList.add('cloned-item');
            container.appendChild(clone);
        }
        
        for (let i = items.length - itemsToClone.length; i < items.length; i++) {
            const clone = items[i >= 0 ? i : 0].cloneNode(true);
            clone.classList.add('cloned-item');
            container.insertBefore(clone, container.firstChild);
        }
        
        // Mark container as having infinite scroll ready
        container.dataset.infiniteScrollReady = 'true';
        
        // Initial scroll position to show original items
        setTimeout(() => {
            const totalCloneWidth = itemsToClone.reduce((sum, i) => {
                return sum + items[i].offsetWidth + 
                        parseInt(window.getComputedStyle(container).columnGap || 0);
            }, 0);
            
            container.scrollLeft = totalCloneWidth;
            checkInfiniteScrollBoundaries();
        }, 50);
    }
    
    // Check for infinite scroll boundaries
    function checkInfiniteScrollBoundaries() {
        if (resetInProgress) return;
        
        const items = container.querySelectorAll('.product-item:not(.cloned-item)');
        if (items.length <= 1) return;
        
        const originalItemsWidth = Array.from(items).reduce((sum, item) => {
            return sum + item.offsetWidth + 
                    parseInt(window.getComputedStyle(container).columnGap || 0);
        }, 0);
        
        // We use the first and last few cloned items as our threshold
        const firstClones = container.querySelectorAll('.cloned-item:nth-child(-n+3)');
        const threshold = Array.from(firstClones).reduce((sum, item) => {
            return sum + item.offsetWidth + 
                    parseInt(window.getComputedStyle(container).columnGap || 0);
        }, 0);
        
        // Check if we've scrolled too far left or right and jump to the appropriate position
        if (container.scrollLeft < threshold / 2) {
            resetInProgress = true;
            container.style.scrollBehavior = 'auto';
            container.scrollLeft += originalItemsWidth;
            setTimeout(() => {
                resetInProgress = false;
                container.style.scrollBehavior = 'smooth';
            }, 10);
        } else if (container.scrollLeft > originalItemsWidth + threshold) {
            resetInProgress = true;
            container.style.scrollBehavior = 'auto';
            container.scrollLeft -= originalItemsWidth;
            setTimeout(() => {
                resetInProgress = false;
                container.style.scrollBehavior = 'smooth';
            }, 10);
        }
    }
    
    // Stop dragging
    function handleMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        if (!touchDevice) container.style.cursor = 'grab';
        container.style.scrollBehavior = 'smooth'; // Re-enable smooth scrolling
        lastInteractionTime = Date.now();
        
        // Remove touch handling class
        document.body.classList.remove('touching');
        
        // Resume auto-scrolling immediately without delay
        manualScrolling = false;
        if (autoScrolling) {
            startAutoScroll();
        }
    }
    
    // Handle scroll events
    function handleScroll() {
        if (isDragging || resetInProgress) return;
        lastInteractionTime = Date.now();
        
        // Check infinite scroll boundaries
        checkInfiniteScrollBoundaries();
    }
    
    // Add event listeners with proper passive settings for better performance
    container.addEventListener('mousedown', handleMouseDown, { passive: false });
    container.addEventListener('mousemove', handleMouseMove, { passive: false });
    container.addEventListener('mouseup', handleMouseUp, { passive: true });
    container.addEventListener('mouseleave', handleMouseUp, { passive: true });
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleMouseUp, { passive: true });
    container.addEventListener('touchcancel', handleMouseUp, { passive: true });
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add resize event listener to handle orientation changes
    const handleResize = () => {
        // Re-initialize the infinite scroll with proper clone widths
        // This is important for mobile orientation changes
        setupInfiniteScroll(container);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Add controls directly to the parent instead of the wrapper
    const parent = container.parentElement;
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    controls.innerHTML = `
        <button class="carousel-control">
            <i class="fas fa-pause"></i>
        </button>
    `;
    parent.insertBefore(controls, container.nextSibling);
    
    // Add control functionality
    const controlButton = controls.querySelector('.carousel-control');
    controlButton.addEventListener('click', function() {
        autoScrolling = !autoScrolling;
        
        if (autoScrolling) {
            this.innerHTML = '<i class="fas fa-pause"></i>';
            manualScrolling = false;
            startAutoScroll();
        } else {
            stopAutoScroll();
            this.innerHTML = '<i class="fas fa-play"></i>';
            manualScrolling = true;
        }
    });
    
    // Setup product item animations
    setupProductItemAnimations();
    
    // Start auto-scrolling by default
    container.style.scrollBehavior = 'smooth';
    startAutoScroll();
    
    // Cleanup function
    return {
        kill: () => {
            // Remove event listeners
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mouseleave', handleMouseUp);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleMouseUp);
            container.removeEventListener('touchcancel', handleMouseUp);
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            
            // Remove touch class if present
            document.body.classList.remove('touching');
            
            // Stop auto-scrolling
            stopAutoScroll();
            
            // Remove controls
            controls.remove();
            
            // Reset container style
            container.style.cursor = '';
            container.style.scrollBehavior = '';
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
            // Remove cloned items to ensure a clean slate
            const clonedItems = container.querySelectorAll('.cloned-item');
            clonedItems.forEach(item => item.remove());
            
            // Move the container out of the wrapper
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
            // Make sure items are visible with smooth transitions
            gsap.to(item, {
                autoAlpha: 1,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.1,
                delay: 0.2
            });
        });
    }
    
    // Reset products container
    if (productsContainer) {
        gsap.set(productsContainer, {
            clearProps: 'all'
        });
        
        // Reset any data attributes
        productsContainer.dataset.infiniteScrollReady = 'false';
    }
    
    // Setup the new carousel effect with a slight delay to ensure DOM is ready
    setTimeout(() => {
        // Create carousel with improved infinite scrolling
        window.productCarousel = setupProductCarousel();
        
        // Add entrance animation for product items (original items only)
        gsap.from('.product-item:not(.cloned-item)', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.3
        });
    }, 100);
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