    document.addEventListener('DOMContentLoaded', function() {
        // Initialize network graph animation
        initNetworkGraph();
    
        // Mobile menu toggle
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    
        // Registration tabs functionality
        const registrationTabs = document.querySelectorAll('.registration-tab');
        if (registrationTabs.length > 0) {
            registrationTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs
                    registrationTabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    tab.classList.add('active');
                    
                    // Hide all panels
                    document.querySelectorAll('.registration-panel').forEach(panel => {
                        panel.classList.remove('active');
                    });
                    
                    // Show the corresponding panel
                    const targetId = tab.getAttribute('data-target');
                    document.getElementById(targetId + '-panel').classList.add('active');
                });
            });
        }
    
        // Typewriter effect implementation
        const typewriterTexts = [
            // "Revolutionizing urban mobility through AI and collective intelligence",
            "Annotate traffic. Train AI. Win prizes..",
            "Help AI see Indian traffic better",
            "Real data. Real AI. Real impact",
            "Compete, annotate, win—daily!",
            "Crowdsourced data powering India’s smartest traffic AI",
            "Annotate today, transform tomorrow's city traffic",
            "Your annotations can help millions get home faster",
            "Build award-winning AI from real-world traffic data",
            "Hack traffic problems with the power of community and AI",
            "Join the AI traffic revolution",
            "Your data, your AI, your city",
            "AI traffic solutions for India's cities",
            "Transform urban mobility with your data",
            "AI traffic solutions for India's cities",
            "Transform urban mobility with your data"
        ];
        
        const typewriterElement = document.getElementById('typewriter-text');
        const typewriterCursor = document.querySelector('.typewriter-cursor');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 50; // Base typing speed in ms
        let delayAfterTyping = 3000; // Pause when text is fully typed
        let delayAfterDeleting = 500; // Pause when text is deleted before typing new text
        
        function typeWriter() {
            const currentText = typewriterTexts[textIndex];
            
            if (isDeleting) {
                // Deleting text
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30; // Faster when deleting
            } else {
                // Typing tex
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 50; // Normal typing speed
            }
            
            // Determine next action based on current state
            if (!isDeleting && charIndex === currentText.length) {
                // Text fully typed, pause then start deleting
                typingSpeed = delayAfterTyping;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Text fully deleted, move to next text
                isDeleting = false;
                textIndex = (textIndex + 1) % typewriterTexts.length;
                typingSpeed = delayAfterDeleting;
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start the typewriter effect
        typeWriter();
    
        // Generate a unique visitor ID using browser fingerprint
        async function getVisitorId() {
            const components = [
                navigator.userAgent,
                navigator.hardwareConcurrency,
                navigator.deviceMemory,
                screen.width + 'x' + screen.height,
                navigator.language
            ].join('|');

            const hashBuffer = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(components));
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        // Track unique visitors
        async function trackVisitor() {
            try {
                const visitorId = await getVisitorId();
                let visitors = JSON.parse(localStorage.getItem('uniqueVisitors') || '{"count":0,"ids":[]}');
                
                if(!visitors.ids.includes(visitorId)) {
                    visitors.count++;
                    visitors.ids.push(visitorId);
                    localStorage.setItem('uniqueVisitors', JSON.stringify(visitors));
                }
                
                document.getElementById('visitCount').textContent = visitors.count;
            } catch {
                document.getElementById('visitCount').textContent = 'many';
            }
        }

        trackVisitor();

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    document.querySelector('.nav-links').classList.remove('active');
                }
            });
        });
        
        // Add scroll animations for modern elements
        function animateOnScroll() {
            const elements = document.querySelectorAll('.info-card, .timeline-item, .prize-card, .feature-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('animate');
                }
            });
        }
        
        // Intersection Observer for modern animations
        if (IntersectionObserver) {
            const options = {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px"
            };
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, options);
            
            document.querySelectorAll('.info-card, .timeline-item, .prize-card, .feature-card').forEach(el => {
                observer.observe(el);
            });
        } else {
            // Fallback for browsers that don't support Intersection Observer
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Initial check
        }
        
        // Add hover interactions for timeline
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('active');
            });
            
            item.addEventListener('mouseleave', () => {
                item.classList.remove('active');
            });
        });
        
        // Add click interactions for info cards
        document.querySelectorAll('.info-card').forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                document.querySelectorAll('.info-card').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Add active class to clicked card
                card.classList.add('active');
            });
        });
        
        // Tab functionality for date views
        document.querySelectorAll('.date-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                document.querySelectorAll('.date-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding panel
                const tabId = tab.getAttribute('data-tab');
                document.querySelectorAll('.date-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                
                if (tabId === 'timeline') {
                    document.getElementById('timeline-panel').classList.add('active');
                } else if (tabId === 'calendar') {
                    document.getElementById('calendar-panel').classList.add('active');
                }
            });
        });
        
        // Animated stat counters
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 1500; // ms
                const step = target / (duration / 30); // update every 30ms
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
        
        // Update timeline progress bar when in view
        function updateProgressBar() {
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                setTimeout(() => {
                    progressBar.style.height = '25%';
                }, 500);
            }
        }
        
        // Countdown functionality
        function updateCountdowns() {
            const countdowns = document.querySelectorAll('.countdown');
            
            countdowns.forEach(countdown => {
                const targetDate = new Date(countdown.getAttribute('data-date'));
                const now = new Date();
                
                const diff = targetDate - now;
                
                if (diff <= 0) {
                    countdown.textContent = 'Today!';
                    return;
                }
                
                // Calculate days, hours, minutes, seconds
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                // Format the countdown
                let timeString = '';
                if (days > 0) {
                    timeString += `${days}d `;
                }
                timeString += `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                countdown.textContent = timeString;
                countdown.classList.add('ticking');
            });
        }
        
        // Initialize when elements are in view
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateProgressBar();
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Observe elements
        const aboutSection = document.querySelector('.about-image');
        const timelineSection = document.querySelector('.timeline-progress');
        
        if (aboutSection) {
            aboutObserver.observe(aboutSection);
        }
        
        if (timelineSection) {
            timelineObserver.observe(timelineSection);
        }
        
        // Update countdowns
        updateCountdowns();
        
        // Schedule regular updates - update every second instead of every minute
        const countdownInterval = setInterval(updateCountdowns, 1000);

        // Clean up interval when page unloads
        window.addEventListener('beforeunload', () => {
            clearInterval(countdownInterval);
        });

        // Theme switcher functionality
        const toggleSwitch = document.querySelector('#checkbox');
        const currentTheme = localStorage.getItem('theme');

        // Check for saved theme preference
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                toggleSwitch.checked = true;
            }
        } else {
            // Check for user's system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                toggleSwitch.checked = true;
                localStorage.setItem('theme', 'dark');
            }
        }

        // Switch theme function
        function switchTheme(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                // Optional: Add smooth transition animation
                document.documentElement.classList.add('theme-transition');
                setTimeout(() => {
                    document.documentElement.classList.remove('theme-transition');
                }, 300);
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                // Optional: Add smooth transition animation
                document.documentElement.classList.add('theme-transition');
                setTimeout(() => {
                    document.documentElement.classList.remove('theme-transition');
                }, 300);
            }
        }

        // Event listener for theme switch
        toggleSwitch.addEventListener('change', switchTheme);

        // Game Gallery Functionality
        initGameGallery();

        // Animated benefits list
        const animatedBenefitsList = document.querySelector('.animated-list');
        
        const benefitsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    benefitsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        if (animatedBenefitsList) {
            benefitsObserver.observe(animatedBenefitsList);
        }
        
        // Interactive tags
        const interactiveTags = document.querySelectorAll('.interactive-tag');
        
        interactiveTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Animate the tag with a pulse
                tag.classList.add('pulse');
                setTimeout(() => {
                    tag.classList.remove('pulse');
                }, 1000);
            });
        });
        
        // Media Modal Functionality
        const showVideoBtn = document.getElementById('show-video');
        const showPosterBtn = document.getElementById('show-poster');
        const closeModalBtn = document.getElementById('close-modal');
        const mediaModal = document.getElementById('media-modal');
        const videoContainer = document.getElementById('video-player-container');
        const posterContainer = document.getElementById('poster-container');
        const videoPlayer = document.getElementById('video-player');
        const playPauseBtn = document.querySelector('.play-pause');
        const fullscreenBtn = document.querySelector('.fullscreen');
        const progressContainer = document.querySelector('.progress-container');
        const progressBar = document.querySelector('.progress-bar-video');
        
        // Show video in modal
        if (showVideoBtn) {
            showVideoBtn.addEventListener('click', () => {
                mediaModal.classList.add('active');
                videoContainer.classList.add('active');
                posterContainer.classList.remove('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        // Show poster in modal
        if (showPosterBtn) {
            showPosterBtn.addEventListener('click', () => {
                mediaModal.classList.add('active');
                posterContainer.classList.add('active');
                videoContainer.classList.remove('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        // Close modal
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                closeMediaModal();
            });
        }
        
        // Close modal when clicking outside content
        if (mediaModal) {
            mediaModal.addEventListener('click', (e) => {
                if (e.target === mediaModal || e.target.classList.contains('modal-overlay')) {
                    closeMediaModal();
                }
            });
        }
        
        // Close with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mediaModal && mediaModal.classList.contains('active')) {
                closeMediaModal();
            }
        });
        
        function closeMediaModal() {
            if (mediaModal) {
                mediaModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Video player controls
        if (videoPlayer) {
            // Play/Pause
            playPauseBtn.addEventListener('click', () => {
                if (videoPlayer.paused) {
                    videoPlayer.play();
                } else {
                    videoPlayer.pause();
                }
                updatePlayPauseIcon();
            });
            
            videoPlayer.addEventListener('click', () => {
                if (videoPlayer.paused) {
                    videoPlayer.play();
                } else {
                    videoPlayer.pause();
                }
                updatePlayPauseIcon();
            });
            
            // Update play/pause button icon
            function updatePlayPauseIcon() {
                if (videoPlayer.paused) {
                    playPauseBtn.innerHTML = '<i class="ri-play-line"></i>';
                } else {
                    playPauseBtn.innerHTML = '<i class="ri-pause-line"></i>';
                }
            }
            
            // Progress bar
            videoPlayer.addEventListener('timeupdate', () => {
                const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
                progressBar.style.width = `${progress}%`;
            });
            
            // Seek
            progressContainer.addEventListener('click', (e) => {
                const progressContainerRect = progressContainer.getBoundingClientRect();
                const clickPosition = e.clientX - progressContainerRect.left;
                const percentage = clickPosition / progressContainerRect.width;
                
                videoPlayer.currentTime = percentage * videoPlayer.duration;
            });
            
            // Fullscreen
            fullscreenBtn.addEventListener('click', () => {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    videoPlayer.requestFullscreen();
                }
            });
            
            // Update play button when video ends
            videoPlayer.addEventListener('ended', () => {
                playPauseBtn.innerHTML = '<i class="ri-play-line"></i>';
            });
        }

        // About Carousel
        function setupAboutCarousel() {
            const slides = document.querySelectorAll('.carousel-slide');
            const indicators = document.querySelectorAll('.carousel-indicator');
            let currentIndex = 0;
            let carouselInterval;

            // Show the specified slide
            function showSlide(index) {
                // Hide all slides
                slides.forEach(slide => slide.classList.remove('active'));
                // Hide all indicators
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                // Show active slide and indicator
                slides[index].classList.add('active');
                indicators[index].classList.add('active');
                
                currentIndex = index;
            }

            // Move to the next slide
            function nextSlide() {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            }

            // Start the carousel rotation
            function startCarousel() {
                carouselInterval = setInterval(nextSlide, 2000); // 2 seconds
            }

            // Reset and restart the carousel
            function resetCarousel() {
                clearInterval(carouselInterval);
                startCarousel();
            }

            // Add click event listeners to indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                    resetCarousel();
                });
            });

            // Initialize carousel
            startCarousel();
        }

        // Call the carousel setup
        setupAboutCarousel();
    });

    // Initialize Game Gallery
    function initGameGallery() {
        const gallery = document.querySelector('.modern-gallery');
        if (!gallery) return;
        
        const galleryContainer = gallery.querySelector('.gallery-container');
        const gallerySlides = gallery.querySelectorAll('.gallery-slide');
        const filmstripThumbs = gallery.querySelectorAll('.filmstrip-thumb');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const playPauseBtn = gallery.querySelector('.gallery-play-pause');
        const fullscreenBtn = gallery.querySelector('.gallery-fullscreen');
        const progressBar = gallery.querySelector('.progress-bar');
        const currentSlideEl = gallery.querySelector('.current-slide');
        const totalSlidesEl = gallery.querySelector('.total-slides');
        
        let currentSlide = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        let slideInterval;
        let isPlaying = true;
        let progressValue = 0;
        let progressInterval;
        
        // Update slide counter
        if (totalSlidesEl) {
            totalSlidesEl.textContent = gallerySlides.length;
        }
        
        // Set initial slide
        function showSlide(index) {
            // Reset progress
            resetProgress();
            
            // Remove active class from all slides
            gallerySlides.forEach(slide => {
                slide.classList.remove('active');
            });
            filmstripThumbs.forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            // Add active class to current slide
            gallerySlides[index].classList.add('active');
            filmstripThumbs[index].classList.add('active');
            
            // Update slide counter
            if (currentSlideEl) {
                currentSlideEl.textContent = index + 1;
            }
            
            currentSlide = index;
            
            // Start progress for autoplay
            if (isPlaying) {
                startProgress();
            }
        }
        
        // Navigate to previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + gallerySlides.length) % gallerySlides.length;
            showSlide(currentSlide);
        }
        
        // Navigate to next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % gallerySlides.length;
            showSlide(currentSlide);
        }
        
        // Progress bar functions
        function startProgress() {
            // Clear any existing interval
            clearInterval(progressInterval);
            
            // Reset progress
            progressValue = 0;
            if (progressBar) {
                progressBar.style.width = '0%';
            }
            
            // Start new progress
            progressInterval = setInterval(() => {
                progressValue += 0.67;
                if (progressBar) {
                    progressBar.style.width = `${progressValue}%`;
                }
                
                if (progressValue >= 100) {
                    nextSlide();
                }
            }, 20); // 20ms * 0.67 * 100 = ~3000ms (3s) for full progress
        }
        
        function resetProgress() {
            clearInterval(progressInterval);
            progressValue = 0;
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        }
        
        // Play/Pause functions
        function togglePlayPause() {
            isPlaying = !isPlaying;
            
            if (playPauseBtn) {
                if (isPlaying) {
                    playPauseBtn.innerHTML = '<i class="ri-pause-line"></i>';
                    playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
                    startProgress();
                    startAutoPlay();
                } else {
                    playPauseBtn.innerHTML = '<i class="ri-play-line"></i>';
                    playPauseBtn.setAttribute('aria-label', 'Play slideshow');
                    resetProgress();
                    stopAutoPlay();
                }
            }
        }
        
        // Fullscreen mode
        function toggleFullscreen() {
            if (galleryContainer.classList.contains('fullscreen')) {
                // Exit fullscreen
                galleryContainer.classList.remove('fullscreen');
                document.body.style.overflow = '';
                if (fullscreenBtn) {
                    fullscreenBtn.innerHTML = '<i class="ri-fullscreen-line"></i>';
                    fullscreenBtn.setAttribute('aria-label', 'View fullscreen');
                }
            } else {
                // Enter fullscreen
                galleryContainer.classList.add('fullscreen');
                document.body.style.overflow = 'hidden';
                if (fullscreenBtn) {
                    fullscreenBtn.innerHTML = '<i class="ri-fullscreen-exit-line"></i>';
                    fullscreenBtn.setAttribute('aria-label', 'Exit fullscreen');
                }
            }
        }
        
        // Add event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                if (isPlaying) {
                    resetProgress();
                    startProgress();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                if (isPlaying) {
                    resetProgress();
                    startProgress();
                }
            });
        }
        
        // Filmstrip thumbnails navigation
        filmstripThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const slideIndex = parseInt(thumb.getAttribute('data-index'));
                showSlide(slideIndex);
            });
        });
        
        // Play/Pause button
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', togglePlayPause);
        }
        
        // Fullscreen button
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', toggleFullscreen);
        }
        
        // Touch swipe functionality
        if (galleryContainer) {
            galleryContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            galleryContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }
        
        // Handle swipe
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left, go to next slide
                nextSlide();
            } else if (touchEndX > touchStartX + 50) {
                // Swipe right, go to previous slide
                prevSlide();
            }
        }
        
        // Auto-play functionality
        function startAutoPlay() {
            stopAutoPlay();
            slideInterval = setInterval(nextSlide, 3000);
        }
        
        function stopAutoPlay() {
            clearInterval(slideInterval);
        }
        
        // Pause auto-play on hover
        if (galleryContainer) {
            galleryContainer.addEventListener('mouseenter', () => {
                if (isPlaying) {
                    resetProgress();
                    stopAutoPlay();
                }
            });
            
            galleryContainer.addEventListener('mouseleave', () => {
                if (isPlaying) {
                    startProgress();
                    startAutoPlay();
                }
            });
        }
        
        // Keyboard navigation
        function handleKeyDown(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'Escape' && galleryContainer.classList.contains('fullscreen')) {
                toggleFullscreen();
            } else if (e.key === ' ') {
                // Space key to toggle play/pause
                togglePlayPause();
                e.preventDefault(); // Prevent page scrolling
            }
        }
        
        document.addEventListener('keydown', handleKeyDown);
        
        // Cleanup function for when the gallery is removed
        function cleanup() {
            stopAutoPlay();
            resetProgress();
            document.removeEventListener('keydown', handleKeyDown);
        }
        
        // Expose cleanup function
        gallery.cleanup = cleanup;
        
        // Initialize first slide
        showSlide(0);
        
        // Start autoplay
        startAutoPlay();
        startProgress();
    }

    // Network Graph Animation
    function initNetworkGraph() {
        const canvas = document.getElementById('network-graph');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        // Color settings
        const primaryColor = 'rgba(66, 153, 225, 0.5)'; // Blue
        const accentColor = 'rgba(255, 76, 41, 0.5)';   // Orange/Red accent
        const secondaryColor = 'rgba(72, 187, 120, 0.5)'; // Green
        const nodeColor = 'rgba(255, 255, 255, 0.6)';   // Nodes color
        const focusedColor = 'rgba(255, 255, 255, 0.9)'; // Highlighted nodes
        
        // Network settings
        const particleCount = Math.min(70, Math.floor(width * height / 12000)); // Reduced count
        const maxDistance = 180;
        const mouseSensitivity = 0.2;
        const particleSizeRange = { min: 1.5, max: 5 };
        const particleSpeedRange = { min: 0.1, max: 0.7 };
        
        // Mouse position with smoothing
        let targetMouseX = width / 2;
        let targetMouseY = height / 2;
        let mouseX = targetMouseX;
        let mouseY = targetMouseY;
        let mouseRadius = 180;
        
        // Special "brain center" position - moved slightly lower
        const brainCenter = {
            x: width / 2,
            y: height / 1.6, // Moved lower to avoid text
            radius: Math.min(width, height) * 0.2
        };
        
        // Text protection zone in the center
        const textZone = {
            x: width / 2,
            y: height / 2.5,
            width: Math.min(width * 0.7, 700), // Width of text protection area
            height: Math.min(height * 0.4, 300), // Height of text protection area
        };
        
        // Particles array
        let particles = [];
        
        // Data paths - simulates data flowing through the network
        let dataPaths = [];
        
        // Particle class
        class Particle {
            constructor(isSpecial = false) {
                // Initialize position - avoid placing directly in the text zone
                do {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                } while (isInTextZone(this.x, this.y));
                
                this.size = isSpecial ? 
                            particleSizeRange.max * 1.2 : 
                            Math.random() * (particleSizeRange.max - particleSizeRange.min) + particleSizeRange.min;
                this.baseSize = this.size;
                this.speedX = (Math.random() - 0.5) * particleSpeedRange.max;
                this.speedY = (Math.random() - 0.5) * particleSpeedRange.max;
                this.isAccent = Math.random() > 0.85; // 15% chance to be accent color
                this.isSecondary = !this.isAccent && Math.random() > 0.85; // Some will be green
                this.isSpecial = isSpecial; // Special nodes
                this.isNearMouse = false;
                this.pulsePhase = Math.random() * Math.PI * 2; // For pulse animation
                this.connectedTo = []; // Store connection info
                this.opacity = 0; // Start invisible and fade in
                this.targetOpacity = 0.6 + Math.random() * 0.4;
                
                // For brain clustering behavior
                const distToCenter = Math.sqrt(
                    Math.pow((width / 2) - this.x, 2) + 
                    Math.pow((height / 2) - this.y, 2)
                );
                
                // Reduce tendency to stay near center
                this.centerAttraction = (Math.random() * 0.015) * (isSpecial ? 1.2 : 0.8);
                // Make fewer particles cluster (40% instead of 60%)
                this.shouldCluster = Math.random() > 0.6;
            }
            
            update() {
                // Fade in animation
                if (this.opacity < this.targetOpacity) {
                    this.opacity += 0.01;
                }
                
                // Regular movement
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Mouse attraction
                const dx = targetMouseX - this.x;
                const dy = targetMouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                this.isNearMouse = distance < mouseRadius;
                
                if (this.isNearMouse) {
                    // Get attracted to mouse
                    const forceX = dx * mouseSensitivity / Math.max(10, distance);
                    const forceY = dy * mouseSensitivity / Math.max(10, distance);
                    this.speedX += forceX;
                    this.speedY += forceY;
                    
                    // Grow when near mouse
                    if (this.size < this.baseSize * 1.5) {
                        this.size += 0.05;
                    }
                } else {
                    // Shrink back to normal
                    if (this.size > this.baseSize) {
                        this.size -= 0.05;
                    }
                }
                
                // "Brain" clustering behavior - but avoid text zone
                if (this.shouldCluster) {
                    const dxCenter = brainCenter.x - this.x;
                    const dyCenter = brainCenter.y - this.y;
                    const distToCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
                    
                    if (distToCenter > brainCenter.radius) {
                        // Check if the particle is trying to move into the text zone
                        if (!wouldMoveIntoTextZone(this.x, this.y, dxCenter * this.centerAttraction / distToCenter, dyCenter * this.centerAttraction / distToCenter)) {
                            this.speedX += dxCenter * this.centerAttraction / distToCenter;
                            this.speedY += dyCenter * this.centerAttraction / distToCenter;
                        }
                    }
                }
                
                // Text zone repulsion - particles shouldn't stay in the text zone
                if (isInTextZone(this.x, this.y)) {
                    // Calculate vector from center of text zone to particle
                    const dxText = this.x - textZone.x;
                    const dyText = this.y - textZone.y;
                    const distToTextCenter = Math.sqrt(dxText * dxText + dyText * dyText);
                    
                    // Apply repulsion force to push particle out of text zone
                    if (distToTextCenter > 0) {
                        const repulsionForce = 0.05;
                        this.speedX += (dxText / distToTextCenter) * repulsionForce;
                        this.speedY += (dyText / distToTextCenter) * repulsionForce;
                    }
                }
                
                // Pulse animation
                this.pulsePhase += 0.02;
                if (this.pulsePhase > Math.PI * 2) this.pulsePhase = 0;
                
                // Apply damping to prevent excessive speed
                this.speedX *= 0.98;
                this.speedY *= 0.98;
                
                // Speed limit to prevent excessive movement
                const maxSpeed = 2;
                const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
                if (currentSpeed > maxSpeed) {
                    this.speedX = (this.speedX / currentSpeed) * maxSpeed;
                    this.speedY = (this.speedY / currentSpeed) * maxSpeed;
                }
                
                // Boundary check with bounce
                if (this.x < 0) {
                    this.x = 0;
                    this.speedX *= -1;
                } else if (this.x > width) {
                    this.x = width;
                    this.speedX *= -1;
                }
                
                if (this.y < 0) {
                    this.y = 0;
                    this.speedY *= -1;
                } else if (this.y > height) {
                    this.y = height;
                    this.speedY *= -1;
                }
            }
            
            draw() {
                // Skip drawing if in text zone and not near mouse
                if (isInTextZone(this.x, this.y) && !this.isNearMouse) {
                    this.opacity = Math.max(0, this.opacity - 0.05);
                    if (this.opacity < 0.1) return; // Too transparent, don't draw
                }
                
                // Determine color based on type and state
                let color;
                if (this.isNearMouse) {
                    color = focusedColor;
                } else if (this.isSpecial) {
                    color = this.isAccent ? accentColor.replace('0.5', '0.9') : primaryColor.replace('0.5', '0.9');
                } else if (this.isAccent) {
                    color = accentColor.replace('0.5', this.opacity.toString());
                } else if (this.isSecondary) {
                    color = secondaryColor.replace('0.5', this.opacity.toString());
                } else {
                    color = nodeColor.replace('0.6', this.opacity.toString());
                }
                
                ctx.fillStyle = color;
                
                // Pulsating effect for special nodes
                const pulseFactor = this.isSpecial ? Math.sin(this.pulsePhase) * 0.2 + 1 : 1;
                const finalSize = this.size * pulseFactor;
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, finalSize, 0, Math.PI * 2);
                ctx.fill();
                
                // Glow effect for special nodes
                if (this.isSpecial || this.isNearMouse) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, finalSize * 1.5, 0, Math.PI * 2);
                    const glowColor = this.isAccent ? 
                        `rgba(255, 76, 41, ${0.1 * pulseFactor})` : 
                        `rgba(66, 153, 225, ${0.1 * pulseFactor})`;
                    ctx.fillStyle = glowColor;
                    ctx.fill();
                }
            }
        }
        
        // Helper function to check if a point is in the text protection zone
        function isInTextZone(x, y) {
            return (
                x > textZone.x - textZone.width / 2 &&
                x < textZone.x + textZone.width / 2 &&
                y > textZone.y - textZone.height / 2 &&
                y < textZone.y + textZone.height / 2
            );
        }
        
        // Helper function to check if a move would put a particle into the text zone
        function wouldMoveIntoTextZone(x, y, dx, dy) {
            const newX = x + dx * 10; // Check ahead a bit
            const newY = y + dy * 10;
            return isInTextZone(newX, newY);
        }
        
        // DataPath class - represents data flowing between nodes
        class DataPath {
            constructor(sourceNode, targetNode) {
                this.sourceNode = sourceNode;
                this.targetNode = targetNode;
                this.progress = 0;
                this.speed = 0.02 + Math.random() * 0.03;
                this.size = 1.5 + Math.random();
                this.color = sourceNode.isAccent || targetNode.isAccent ? 
                            accentColor.replace('0.5', '0.8') : 
                            sourceNode.isSecondary || targetNode.isSecondary ?
                            secondaryColor.replace('0.5', '0.8') :
                            primaryColor.replace('0.5', '0.8');
                this.active = true;
            }
            
            update() {
                if (!this.active) return;
                
                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.active = false;
                }
            }
            
            draw() {
                if (!this.active) return;
                
                // Skip drawing if path crosses text zone
                const midX = this.sourceNode.x + (this.targetNode.x - this.sourceNode.x) * 0.5;
                const midY = this.sourceNode.y + (this.targetNode.y - this.sourceNode.y) * 0.5;
                if (isInTextZone(midX, midY)) return;
                
                // Calculate current position along the path
                const x = this.sourceNode.x + (this.targetNode.x - this.sourceNode.x) * this.progress;
                const y = this.sourceNode.y + (this.targetNode.y - this.sourceNode.y) * this.progress;
                
                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
        
        // Initialize particles
        function init() {
            particles = [];
            dataPaths = [];
            
            // Create special "hub" nodes - keep them away from the text
            for (let i = 0; i < 5; i++) {
                particles.push(new Particle(true));
            }
            
            // Create regular nodes
            for (let i = 0; i < particleCount - 5; i++) {
                particles.push(new Particle(false));
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Smooth mouse follow
            mouseX += (targetMouseX - mouseX) * 0.1;
            mouseY += (targetMouseY - mouseY) * 0.1;
            
            // Create data paths occasionally (less frequently)
            if (Math.random() < 0.02 && particles.length > 5) {
                const sourceIndex = Math.floor(Math.random() * particles.length);
                let targetIndex;
                do {
                    targetIndex = Math.floor(Math.random() * particles.length);
                } while (targetIndex === sourceIndex);
                
                const sourceNode = particles[sourceIndex];
                const targetNode = particles[targetIndex];
                
                // Skip if either node is in the text zone
                if (isInTextZone(sourceNode.x, sourceNode.y) || isInTextZone(targetNode.x, targetNode.y)) {
                    // Skip this path
                } else {
                    // Calculate distance to see if it makes sense to create a path
                    const dx = sourceNode.x - targetNode.x;
                    const dy = sourceNode.y - targetNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance * 1.5) {
                        dataPaths.push(new DataPath(sourceNode, targetNode));
                    }
                }
            }
            
            // Clean up inactive data paths
            dataPaths = dataPaths.filter(path => path.active);
            
            // Update and draw connections first (behind nodes)
            for (let i = 0; i < particles.length; i++) {
                connectParticles(particles[i], particles);
            }
            
            // Update and draw data paths
            for (let i = 0; i < dataPaths.length; i++) {
                dataPaths[i].update();
                dataPaths[i].draw();
            }
            
            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            
            requestAnimationFrame(animate);
        }
        
        // Draw lines between particles
        function connectParticles(particle, particles) {
            particle.connectedTo = [];
            
            for (let j = 0; j < particles.length; j++) {
                const p2 = particles[j];
                if (particle === p2) continue;
                
                const dx = particle.x - p2.x;
                const dy = particle.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Skip connections that cross the text zone
                    const midX = (particle.x + p2.x) / 2;
                    const midY = (particle.y + p2.y) / 2;
                    if (isInTextZone(midX, midY)) continue;
                    
                    particle.connectedTo.push(p2);
                    
                    // Set opacity based on distance and reduce general opacity
                    const opacity = (1 - (distance / maxDistance)) * 0.7;
                    
                    // Determine line color
                    let color;
                    if (particle.isNearMouse || p2.isNearMouse) {
                        color = focusedColor.replace('0.9', opacity * 0.7);
                    } else if (particle.isAccent || p2.isAccent) {
                        color = accentColor.replace('0.5', opacity * 0.4);
                    } else if (particle.isSecondary || p2.isSecondary) {
                        color = secondaryColor.replace('0.5', opacity * 0.4);
                    } else {
                        color = primaryColor.replace('0.5', opacity * 0.3);
                    }
                    
                    // Draw thinner lines overall
                    ctx.strokeStyle = color;
                    ctx.lineWidth = (particle.isSpecial || p2.isSpecial) ? opacity * 1.5 : opacity * 0.7;
                    
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            targetMouseX = e.clientX;
            targetMouseY = e.clientY;
        });
        
        // Handle touch events for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                e.preventDefault();
                targetMouseX = e.touches[0].clientX;
                targetMouseY = e.touches[0].clientY;
            }
        }, { passive: false });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            
            // Recalculate brain center and text zone
            brainCenter.x = width / 2;
            brainCenter.y = height / 1.6;
            brainCenter.radius = Math.min(width, height) * 0.2;
            
            textZone.x = width / 2;
            textZone.y = height / 2.5;
            textZone.width = Math.min(width * 0.7, 700);
            textZone.height = Math.min(height * 0.4, 300);
            
            init();
        });
        
        // Initialize and start animation
        init();
        animate();
    }