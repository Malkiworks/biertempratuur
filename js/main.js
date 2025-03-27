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
/**
 * BierTempratuur Product Carousel
 * A simplified, responsive carousel that works on both mobile and desktop
 */

// ===== Product Carousel Logic =====
class ProductCarousel {
    constructor(containerSelector) {
      // DOM Elements
      this.container = document.querySelector(containerSelector);
      if (!this.container) return;
      
      // Configuration
      this.config = {
        autoplay: true,
        autoplaySpeed: 30, // ms between movements (lower = faster)
        autoplayStepSize: 0.5, // px per step when autoplaying
        snapToItem: true,
        infiniteScroll: true,
        touchThreshold: 5, // minimum px to consider a touch as a swipe
        maxClones: 6 // maximum number of clones on each side
      };
      
      // State
      this.state = {
        isDragging: false,
        startX: 0,
        startScrollLeft: 0,
        velocity: 0,
        lastScrollLeft: 0,
        lastTimestamp: 0,
        autoPlayInterval: null,
        momentumInterval: null,
        resizeObserver: null,
        isPaused: false,
        initialized: false
      };
      
      // Initialize
      this.init();
    }
    
    init() {
      // Check if we already have products
      const items = this.container.querySelectorAll('.product-item:not(.cloned-item)');
      if (items.length === 0) return;
      
      // Configure container for smooth scrolling
      this.container.style.scrollBehavior = 'smooth';
      this.container.style.overflowX = 'auto';
      this.container.style.scrollSnapType = 'x mandatory';
      this.container.style.webkitOverflowScrolling = 'touch';
      
      // Ensure hardware acceleration
      this.container.style.transform = 'translateZ(0)';
      this.container.style.willChange = 'scroll-position';
      
      // Setup infinite scroll by cloning items
      if (this.config.infiniteScroll) {
        this.setupInfiniteScroll();
      }
      
      // Add event listeners
      this.addEventListeners();
      
      // Create carousel controls
      this.createControls();
      
      // Start autoplay if enabled
      if (this.config.autoplay) {
        this.startAutoplay();
      }
      
      // Watch for resize events
      this.watchResize();
      
      // Mark as initialized
      this.state.initialized = true;
      
      // Initial scroll position for infinite scroll
      if (this.config.infiniteScroll) {
        this.jumpToStart();
      }
    }
    
    setupInfiniteScroll() {
      // Remove any existing clones
      this.removeClones();
      
      // Get original items
      const items = Array.from(this.container.querySelectorAll('.product-item:not(.cloned-item)'));
      if (items.length === 0) return;
      
      // Determine how many to clone based on container width
      const containerWidth = this.container.clientWidth;
      let totalWidth = 0;
      let itemsToClone = [];
      
      // Find how many items we need to fill the container width
      for (let i = 0; i < items.length && totalWidth < containerWidth; i++) {
        const item = items[i];
        const itemWidth = item.offsetWidth + parseInt(getComputedStyle(this.container).columnGap || '0');
        totalWidth += itemWidth;
        itemsToClone.push(i);
      }
      
      // If we don't have enough items or need all of them
      if (itemsToClone.length === 0 || itemsToClone.length === items.length) {
        itemsToClone = Array.from(items).map((_, i) => i);
      }
      
      // Limit the number of clones to avoid performance issues
      const cloneCount = Math.min(itemsToClone.length, this.config.maxClones);
      
      // Add clones to the beginning
      for (let i = 0; i < cloneCount; i++) {
        const index = items.length - 1 - i;
        if (index >= 0) {
          const clone = items[index].cloneNode(true);
          clone.classList.add('cloned-item');
          clone.setAttribute('aria-hidden', 'true');
          this.container.insertBefore(clone, this.container.firstChild);
        }
      }
      
      // Add clones to the end
      for (let i = 0; i < cloneCount; i++) {
        const clone = items[i].cloneNode(true);
        clone.classList.add('cloned-item');
        clone.setAttribute('aria-hidden', 'true');
        this.container.appendChild(clone);
      }
    }
    
    removeClones() {
      const clones = this.container.querySelectorAll('.cloned-item');
      clones.forEach(clone => clone.remove());
    }
    
    jumpToStart() {
      // Wait a moment for the DOM to update
      setTimeout(() => {
        const items = this.container.querySelectorAll('.product-item');
        const realItems = this.container.querySelectorAll('.product-item:not(.cloned-item)');
        
        if (items.length === 0 || realItems.length === 0) return;
        
        // Calculate where the first real item should be
        const clonesBefore = Array.from(items).findIndex(item => !item.classList.contains('cloned-item'));
        
        if (clonesBefore > 0) {
          // Set scroll position to the first real item
          this.container.scrollLeft = this.getItemOffset(items[clonesBefore]);
        }
      }, 100);
    }
    
    getItemOffset(item) {
      if (!item) return 0;
      return item.offsetLeft - this.container.offsetLeft;
    }
    
    addEventListeners() {
      // Touch events
      this.container.addEventListener('touchstart', this.handleDragStart.bind(this), { passive: true });
      this.container.addEventListener('touchmove', this.handleDragMove.bind(this), { passive: false });
      this.container.addEventListener('touchend', this.handleDragEnd.bind(this), { passive: true });
      
      // Mouse events
      this.container.addEventListener('mousedown', this.handleDragStart.bind(this), { passive: true });
      this.container.addEventListener('mousemove', this.handleDragMove.bind(this), { passive: false });
      this.container.addEventListener('mouseup', this.handleDragEnd.bind(this), { passive: true });
      this.container.addEventListener('mouseleave', this.handleDragEnd.bind(this), { passive: true });
      
      // Scroll events
      this.container.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    }
    
    handleDragStart(e) {
      this.state.isDragging = true;
      this.state.startX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
      this.state.startScrollLeft = this.container.scrollLeft;
      this.state.lastScrollLeft = this.state.startScrollLeft;
      this.state.lastTimestamp = Date.now();
      
      // Pause autoplay while dragging
      this.pauseAutoplay();
      
      // Stop any ongoing momentum
      this.stopMomentum();
      
      // Set cursor style
      this.container.style.cursor = 'grabbing';
      
      // Remove smooth scrolling during drag for better performance
      this.container.style.scrollBehavior = 'auto';
    }
    
    handleDragMove(e) {
      if (!this.state.isDragging) return;
      
      // Calculate movement
      const currentX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
      const diff = this.state.startX - currentX;
      
      // Only prevent default if it's a significant drag to allow normal scrolling
      if (Math.abs(diff) > this.config.touchThreshold) {
        e.preventDefault();
        
        // Move the container
        this.container.scrollLeft = this.state.startScrollLeft + diff;
        
        // Calculate velocity for momentum scrolling
        const now = Date.now();
        const elapsed = now - this.state.lastTimestamp;
        
        if (elapsed > 0) {
          // pixels per millisecond
          this.state.velocity = (this.container.scrollLeft - this.state.lastScrollLeft) / elapsed;
          this.state.lastScrollLeft = this.container.scrollLeft;
          this.state.lastTimestamp = now;
        }
      }
    }
    
    handleDragEnd() {
      if (!this.state.isDragging) return;
      
      // Reset drag state
      this.state.isDragging = false;
      
      // Restore cursor
      this.container.style.cursor = '';
      
      // Apply momentum if velocity is significant
      if (Math.abs(this.state.velocity) > 0.1) {
        this.applyMomentum();
      } else if (this.config.snapToItem) {
        this.snapToClosestItem();
      }
      
      // Restore smooth scrolling
      this.container.style.scrollBehavior = 'smooth';
      
      // Resume autoplay after a delay
      setTimeout(() => {
        if (!this.state.isPaused) {
          this.startAutoplay();
        }
      }, 1000);
    }
    
    handleScroll() {
      // Check infinite scroll boundaries
      if (this.config.infiniteScroll) {
        this.checkInfiniteScrollBoundary();
      }
      
      // Update active classes
      this.updateActiveItems();
    }
    
    checkInfiniteScrollBoundary() {
      // Don't check during drag operations
      if (this.state.isDragging) return;
      
      const items = this.container.querySelectorAll('.product-item');
      const realItems = this.container.querySelectorAll('.product-item:not(.cloned-item)');
      
      if (items.length === 0 || realItems.length === 0) return;
      
      // Calculate the width of all real items
      const realItemsWidth = Array.from(realItems).reduce((sum, item) => {
        return sum + item.offsetWidth + parseInt(getComputedStyle(this.container).columnGap || '0');
      }, 0);
      
      // Find the first and last real item
      const firstRealItemIndex = Array.from(items).findIndex(item => !item.classList.contains('cloned-item'));
      const firstRealItem = items[firstRealItemIndex];
      const lastRealItemIndex = Array.from(items).lastIndexOf(Array.from(realItems).pop());
      const lastRealItem = items[lastRealItemIndex];
      
      // Check if we've scrolled too far to the right
      if (this.container.scrollLeft >= this.getItemOffset(lastRealItem) - 50) {
        // Jump back to the beginning without animation
        this.container.style.scrollBehavior = 'auto';
        this.container.scrollLeft = this.getItemOffset(firstRealItem);
        this.container.style.scrollBehavior = 'smooth';
      }
      
      // Check if we've scrolled too far to the left
      if (this.container.scrollLeft <= this.getItemOffset(firstRealItem) - realItemsWidth) {
        // Jump to the end without animation
        this.container.style.scrollBehavior = 'auto';
        this.container.scrollLeft = this.getItemOffset(lastRealItem) - realItemsWidth;
        this.container.style.scrollBehavior = 'smooth';
      }
    }
    
    updateActiveItems() {
      const items = this.container.querySelectorAll('.product-item');
      const containerCenter = this.container.scrollLeft + this.container.offsetWidth / 2;
      
      items.forEach(item => {
        const itemCenter = this.getItemOffset(item) + item.offsetWidth / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        
        // Normalize distance as a percentage of container width
        const normalizedDistance = distance / (this.container.offsetWidth / 2);
        
        // Apply scale based on distance (1 at center, 0.85 at edges)
        const scale = Math.max(0.85, 1 - normalizedDistance * 0.15);
        
        // Apply opacity based on distance (1 at center, 0.7 at edges)
        const opacity = Math.max(0.7, 1 - normalizedDistance * 0.3);
        
        // Apply transform
        item.style.transform = `scale(${scale})`;
        item.style.opacity = opacity;
        
        // Toggle active class
        if (distance < item.offsetWidth * 0.5) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
    
    applyMomentum() {
      // Apply momentum scrolling with inertia
      let velocity = this.state.velocity * 15; // Scale up for more dramatic effect
      let damping = 0.95; // Friction factor (higher = less friction)
      
      this.stopMomentum();
      
      this.state.momentumInterval = setInterval(() => {
        // If velocity is too low, snap and stop
        if (Math.abs(velocity) < 0.2) {
          this.stopMomentum();
          if (this.config.snapToItem) {
            this.snapToClosestItem();
          }
          return;
        }
        
        // Apply velocity with damping
        this.container.scrollLeft += velocity;
        velocity *= damping;
        
        // Check infinite scroll boundaries
        if (this.config.infiniteScroll) {
          this.checkInfiniteScrollBoundary();
        }
        
        // Update active states
        this.updateActiveItems();
      }, 16); // ~60fps
    }
    
    stopMomentum() {
      if (this.state.momentumInterval) {
        clearInterval(this.state.momentumInterval);
        this.state.momentumInterval = null;
      }
    }
    
    snapToClosestItem() {
      const items = this.container.querySelectorAll('.product-item');
      const containerCenter = this.container.scrollLeft + this.container.offsetWidth / 2;
      let closestItem = null;
      let closestDistance = Infinity;
      
      items.forEach(item => {
        const itemCenter = this.getItemOffset(item) + item.offsetWidth / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestItem = item;
        }
      });
      
      if (closestItem) {
        // Calculate target scroll position to center the item
        const targetScrollLeft = this.getItemOffset(closestItem) - 
          (this.container.offsetWidth - closestItem.offsetWidth) / 2;
        
        // Scroll to the target
        this.container.style.scrollBehavior = 'smooth';
        this.container.scrollLeft = targetScrollLeft;
      }
    }
    
    startAutoplay() {
      this.pauseAutoplay();
      
      if (!this.config.autoplay) return;
      
      this.state.isPaused = false;
      this.updatePlayPauseButton();
      
      // Use requestAnimationFrame for smoother animation
      let lastTimestamp = null;
      
      const animate = (timestamp) => {
        if (this.state.isDragging || this.state.isPaused || 
            this.state.momentumInterval) {
          lastTimestamp = null;
          this.state.autoPlayInterval = requestAnimationFrame(animate);
          return;
        }
        
        if (!lastTimestamp) {
          lastTimestamp = timestamp;
        }
        
        const elapsed = timestamp - lastTimestamp;
        
        // Only update every few frames to maintain frame rate
        if (elapsed > this.config.autoplaySpeed) {
          this.container.scrollLeft += this.config.autoplayStepSize;
          
          if (this.config.infiniteScroll) {
            this.checkInfiniteScrollBoundary();
          }
          
          this.updateActiveItems();
          lastTimestamp = timestamp;
        }
        
        this.state.autoPlayInterval = requestAnimationFrame(animate);
      };
      
      this.state.autoPlayInterval = requestAnimationFrame(animate);
    }
    
    pauseAutoplay() {
      if (this.state.autoPlayInterval) {
        cancelAnimationFrame(this.state.autoPlayInterval);
        this.state.autoPlayInterval = null;
      }
    }
    
    toggleAutoplay() {
      this.state.isPaused = !this.state.isPaused;
      
      if (this.state.isPaused) {
        this.pauseAutoplay();
      } else {
        this.startAutoplay();
      }
      
      this.updatePlayPauseButton();
    }
    
    updatePlayPauseButton() {
      const button = document.querySelector('.carousel-control');
      if (!button) return;
      
      button.innerHTML = this.state.isPaused 
        ? '<i class="fas fa-play"></i>' 
        : '<i class="fas fa-pause"></i>';
    }
    
    createControls() {
      // Check if controls already exist
      const existingControls = document.querySelector('.carousel-controls');
      if (existingControls) {
        existingControls.remove();
      }
      
      // Create controls container
      const controls = document.createElement('div');
      controls.className = 'carousel-controls';
      
      // Create play/pause button
      const playPauseButton = document.createElement('button');
      playPauseButton.className = 'carousel-control';
      playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
      playPauseButton.setAttribute('aria-label', 'Pause carousel');
      
      // Add event listener
      playPauseButton.addEventListener('click', this.toggleAutoplay.bind(this));
      
      // Add button to controls
      controls.appendChild(playPauseButton);
      
      // Find a suitable place to add the controls
      const parent = this.container.parentNode;
      const ctaContainer = document.querySelector('.cta-container');
      
      if (ctaContainer && ctaContainer.parentNode) {
        ctaContainer.parentNode.insertBefore(controls, ctaContainer);
      } else {
        parent.appendChild(controls);
      }
    }
    
    watchResize() {
      // Clean up existing observer
      if (this.state.resizeObserver) {
        this.state.resizeObserver.disconnect();
      }
      
      // Create resize observer
      this.state.resizeObserver = new ResizeObserver(debounce(() => {
        if (this.config.infiniteScroll) {
          // Remember scroll position as percentage
          const scrollPercentage = this.container.scrollLeft / 
            (this.container.scrollWidth - this.container.clientWidth);
          
          // Rebuild infinite scroll
          this.setupInfiniteScroll();
          
          // Restore approximate scroll position
          const newMaxScroll = this.container.scrollWidth - this.container.clientWidth;
          this.container.scrollLeft = Math.max(0, Math.min(
            newMaxScroll, 
            newMaxScroll * scrollPercentage
          ));
        }
        
        // Update active items
        this.updateActiveItems();
      }, 250));
      
      // Observe container and window
      this.state.resizeObserver.observe(this.container);
      
      // Also listen for window resize as a fallback
      window.addEventListener('resize', debounce(() => {
        if (this.config.infiniteScroll) {
          this.setupInfiniteScroll();
        }
        this.updateActiveItems();
      }, 250));
    }
    
    destroy() {
      // Remove event listeners
      this.container.removeEventListener('touchstart', this.handleDragStart.bind(this));
      this.container.removeEventListener('touchmove', this.handleDragMove.bind(this));
      this.container.removeEventListener('touchend', this.handleDragEnd.bind(this));
      this.container.removeEventListener('mousedown', this.handleDragStart.bind(this));
      this.container.removeEventListener('mousemove', this.handleDragMove.bind(this));
      this.container.removeEventListener('mouseup', this.handleDragEnd.bind(this));
      this.container.removeEventListener('mouseleave', this.handleDragEnd.bind(this));
      this.container.removeEventListener('scroll', this.handleScroll.bind(this));
      
      // Stop autoplay and momentum
      this.pauseAutoplay();
      this.stopMomentum();
      
      // Disconnect resize observer
      if (this.state.resizeObserver) {
        this.state.resizeObserver.disconnect();
      }
      
      // Remove clones
      this.removeClones();
      
      // Remove controls
      const controls = document.querySelector('.carousel-controls');
      if (controls) {
        controls.remove();
      }
      
      // Reset container style
      this.container.style.scrollBehavior = '';
      this.container.style.cursor = '';
      
      // Reset item styles
      const items = this.container.querySelectorAll('.product-item');
      items.forEach(item => {
        item.style.transform = '';
        item.style.opacity = '';
        item.classList.remove('active');
      });
    }
  }
  
  // Utility function for debouncing
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  
  // ===== Initialize Carousel =====
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to load
    if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Initialize after the page is fully loaded
    window.addEventListener('load', () => {
      // Cleanup any existing carousel
      if (window.productCarousel && typeof window.productCarousel.destroy === 'function') {
        window.productCarousel.destroy();
      }
      
      // Create a new carousel
      window.productCarousel = new ProductCarousel('.products-container');
      
      // Remove loader
      const loader = document.querySelector('.loader');
      if (loader) {
        gsap.to(loader, {
          opacity: 0,
          visibility: 'hidden',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            loader.style.display = 'none';
          }
        });
      }
    });
    
    // Handle window resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Reinitialize the carousel on major size changes
        if (window.productCarousel && 
            typeof window.productCarousel.destroy === 'function') {
          window.productCarousel.destroy();
        }
        window.productCarousel = new ProductCarousel('.products-container');
      }, 500);
    });
  });