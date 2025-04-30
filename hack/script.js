        // Typewriter effect implementation
        const typewriterTexts = [
            // "Revolutionizing urban mobility through AI and collective intelligence",
            "Annotate traffic. Train AI. Win prizes.",
            "Help AI see Indian traffic better",
            "Real data. Real AI. Real impact",
            "Compete, annotate, win—daily!",
            "Crowdsourced data powering India's smartest traffic AI",
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
        
let typewriterElement;
let typewriterCursor;
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 50; // Base typing speed in ms
        let delayAfterTyping = 3000; // Pause when text is fully typed
        let delayAfterDeleting = 500; // Pause when text is deleted before typing new text
        
        function typeWriter() {
    if (!typewriterElement) {
        typewriterElement = document.getElementById('typewriter-text');
        typewriterCursor = document.querySelector('.typewriter-cursor');
        if (!typewriterElement) return; // Exit if element doesn't exist
    }

            const currentText = typewriterTexts[textIndex];
            
            if (isDeleting) {
                // Deleting text
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30; // Faster when deleting
            } else {
        // Typing text
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
        
// Theme switcher functionality
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        // Update map theme if map exists
        if (document.getElementById('india-map')) {
            updateMapTheme(true);
            // Force redraw of markers after theme change
            setTimeout(refreshMapMarkers, 100);
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        // Update map theme if map exists
        if (document.getElementById('india-map')) {
            updateMapTheme(false);
            // Force redraw of markers after theme change
            setTimeout(refreshMapMarkers, 100);
        }
    }
}

// Function to completely rebuild markers if they're out of position
function refreshMapMarkers() {
    if (!window.participantMap || !window.pincodeData || !window.markerLayer) return;
    
    // Preserve current center and zoom
    const center = window.participantMap.getCenter();
    const zoom = window.participantMap.getZoom();
    
    // Clear existing markers
    window.markerLayer.clearLayers();
    
    // Get current theme
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Recreate all markers
    const markers = [];
    
    // Re-add each marker at its exact geographic position
    window.pincodeData.forEach(entry => {
        if (entry.pincode && entry.lat && entry.lng) {
            const marker = L.circleMarker([entry.lat, entry.lng], {
                radius: 8,
                fillColor: "#ff4c29",
                color: isDarkMode ? "#333" : "#fff",
                weight: 2,
                opacity: 1,
                fillOpacity: 1,
                interactive: false
            }).addTo(window.markerLayer);
            
            markers.push(marker);
        }
    });
    
    // Update global markers array
    window.markers = markers;
    
    // Ensure map stays at same position
    window.participantMap.setView(center, zoom, {
        animate: false,
        duration: 0
    });
    
    // Bring marker layer to front
    window.markerLayer.bringToFront();
}

 // Immediate carousel initialization
 document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentIndex = 0;
    let carouselInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Start carousel immediately
    carouselInterval = setInterval(nextSlide, 2000);

    // Enable manual navigation
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(carouselInterval);
            showSlide(index);
            carouselInterval = setInterval(nextSlide, 2000);
        });
    });
});

// Apply custom styling to map based on theme
function updateMapTheme(isDarkMode) {
    const mapContainer = document.getElementById('india-map');
    
    if (!mapContainer || !window.participantMap) return;
    
    // Get the current theme from the document if not explicitly provided
    if (isDarkMode === undefined) {
        isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    }
    
    // Store current map view state
    const currentCenter = window.participantMap.getCenter();
    const currentZoom = window.participantMap.getZoom();
    
    if (isDarkMode) {
        // Apply dark mode styling to map with improved contrast
        document.querySelectorAll('.leaflet-tile-pane .leaflet-layer').forEach(layer => {
            layer.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.7) contrast(1.4)';
        });
        
        // Update map container styling
        mapContainer.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
    } else {
        // Reset to light mode
        document.querySelectorAll('.leaflet-tile-pane .leaflet-layer').forEach(layer => {
            layer.style.filter = 'none';
        });
        
        // Reset map container styling
        mapContainer.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
    }
    
    // Update marker styles based on theme
    if (window.updateMarkerStyles) {
        window.updateMarkerStyles(isDarkMode);
    }
    
    // Forces a redraw of the map to ensure everything is correctly positioned
    if (window.participantMap) {
        // Stop any animations
        window.participantMap.stop();
        
        // Invalidate size to force a redraw
        window.participantMap.invalidateSize(true);
        
        // Small delay to ensure map has redrawn
        setTimeout(() => {
            // Force the map to reset view to same center and zoom level
            window.participantMap.setView(currentCenter, currentZoom, {
                animate: false,
                duration: 0
            });
            
            // Bring marker layer to front to ensure it's visible
            if (window.markerLayer) {
                window.markerLayer.bringToFront();
            }
        }, 50);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initial theme based on user preference or saved setting
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark" || (savedTheme === null && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute("data-theme", "dark");
        document.getElementById("checkbox").checked = true;
    }

    // Theme switch functionality
    const themeSwitch = document.getElementById('checkbox');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', switchTheme, false);
    }

    // Mobile menu functionality
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Initialize timeline progress
    if (document.querySelector('.timeline-progress')) {
        updateTimelineProgress();
        initializeTimeline();
    }

    // Initialize visitor counter
    if (document.querySelector('.visit-counter')) {
        trackVisitor();
    }
    
    // Initialize all components
    // Initialize participant map
    if (document.getElementById('india-map')) {
        initializeParticipantMap();
    }

    // Initialize game gallery
    if (document.querySelector('.gallery-container')) {
        initGameGallery();
    }

    // Initialize network graph for hero section
    if (document.getElementById('network-graph')) {
        initNetworkGraph();
    }

    // Initialize about carousel
    if (document.querySelector('.carousel-container')) {
        setupAboutCarousel();
    }

    // Start counters when in view
    document.addEventListener('scroll', function() {
        animateOnScroll();
    });

    // Call scroll once on load to check for elements in view
    animateOnScroll();

    // Start the typewriter effect
    typeWriter();

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
                    // First item (Registration Opens) is active initially
                    // With 6 timeline items, 100% ÷ 6 ≈ 16.67% per item
                    progressBar.style.height = '16.67%';
                }, 500);
            }
        }
        
        // Countdown functionality
        function updateCountdowns() {
            const countdowns = document.querySelectorAll('.countdown');
            const currentYear = new Date().getFullYear();
            
            countdowns.forEach((countdown, index) => {
                const targetDate = new Date(countdown.getAttribute('data-date'));
                const now = new Date();
                
                const diff = targetDate - now;
                const timelineItem = countdown.closest('.timeline-item');
                const timeRemainingEl = countdown.closest('.time-remaining');
                
                if (diff <= 0) {
                    // If the date is in the past
                    const daysPast = Math.floor((now - targetDate) / (1000 * 60 * 60 * 24));
                    if (daysPast === 0) {
                        countdown.textContent = 'Today!';
                    } else if (daysPast === 1) {
                        countdown.textContent = 'Yesterday';
                    } else if (daysPast <= 7) {
                        countdown.textContent = `${daysPast} days ago`;
                    } else {
                        // Handle Registration Opens differently (index 0)
                        if (index === 0) {
                            countdown.textContent = 'Registration open';
                        } else {
                            countdown.textContent = 'Completed';
                        }
                    }
                    
                    // Mark the parent element as past
                    if (timelineItem) {
                        timelineItem.classList.add('past-date');
                    }
                    return;
                }
                
                // It's a future date - calculate time components
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                // Format the countdown
                let timeString = '';
                
                // More than 1 month shows just days
                if (days > 30) {
                    timeString = `${days} days`;
                    
                    // Add appropriate prefixes based on the event type
                    if (index === 0) {
                        if (timeRemainingEl) timeRemainingEl.innerHTML = `Registration opens in <span class="countdown" data-date="${targetDate.toISOString().split('T')[0]}">${timeString}</span>`;
                        else countdown.textContent = timeString;
                    } else {
                        if (timeRemainingEl) timeRemainingEl.innerHTML = `Coming in <span class="countdown" data-date="${targetDate.toISOString().split('T')[0]}">${timeString}</span>`;
                        else countdown.textContent = timeString;
                    }
                }
                // Less than a month but more than a day
                else if (days > 0) {
                    timeString = `${days}d ${hours.toString().padStart(2, '0')}h`;
                    if (timeRemainingEl) timeRemainingEl.innerHTML = `Coming in <span class="countdown ticking" data-date="${targetDate.toISOString().split('T')[0]}">${timeString}</span>`;
                    else {
                        countdown.textContent = timeString;
                        countdown.classList.add('ticking');
                    }
                }
                // Less than a day
                else {
                    timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    if (timeRemainingEl) timeRemainingEl.innerHTML = `Starting in <span class="countdown ticking" data-date="${targetDate.toISOString().split('T')[0]}">${timeString}</span>`;
                    else {
                        countdown.textContent = timeString;
                        countdown.classList.add('ticking');
                    }
                }
                
                // Add any special styling for upcoming event (the next event in the timeline)
                if (timelineItem && !document.querySelector('.timeline-item.upcoming')) {
                    let foundActiveItem = false;
                    document.querySelectorAll('.timeline-item').forEach(item => {
                        if (item === timelineItem && !foundActiveItem) {
                            item.classList.add('upcoming');
                            foundActiveItem = true;
                        }
                    });
                }
            });
            
            // Update progress bar based on timeline events
            updateTimelineProgress();
        }
        
        // Update timeline progress based on completed events
        function updateTimelineProgress() {
            const progressBar = document.querySelector('.timeline-progress .progress-bar');
            if (!progressBar) return;
            
            const timelineItems = document.querySelectorAll('.timeline-item');
            const totalItems = timelineItems.length;
            
            // For future events (2025), the progress bar should be at the beginning
            progressBar.style.height = '0%';
            
            // Set the first item as active if we're still before all events
            const hasUpcoming = document.querySelector('.timeline-item.upcoming');
            if (!hasUpcoming && timelineItems.length > 0) {
                timelineItems.forEach(i => i.classList.remove('active', 'upcoming'));
                timelineItems[0].classList.add('active', 'upcoming');
            }
        }
        
        // Initialize timeline based on current date
        function initializeTimeline() {
            updateCountdowns(); // This will mark past events and set the active one
            
            // Also check if we need to update the progress bar immediately
            const timelineSection = document.querySelector('.timeline-progress');
            if (timelineSection && timelineSection.offsetParent !== null) { // Check if visible
                updateTimelineProgress();
            }
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
                    updateTimelineProgress();
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
        
        // Initialize timeline and countdowns
        initializeTimeline();
        
        // Schedule regular updates - update every second instead of every minute
        const countdownInterval = setInterval(updateCountdowns, 1000);

        // Clean up interval when page unloads
        window.addEventListener('beforeunload', () => {
            clearInterval(countdownInterval);
        });

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
        
        // Show video modal
        showVideoBtn.addEventListener('click', function() {
            mediaModal.classList.add('active');
            videoContainer.style.display = 'block';
            posterContainer.style.display = 'none';

            // Add autoplay functionality
            if (videoPlayer) {
                videoPlayer.src += (videoPlayer.src.includes('?') ? '&' : '?') + 'autoplay=1';
            }
        });
        
        // Show poster modal
        showPosterBtn.addEventListener('click', function() {
            mediaModal.classList.add('active');
            videoContainer.style.display = 'none';
            posterContainer.style.display = 'block';

            // Stop video playback when switching to poster
            if (videoPlayer) {
                videoPlayer.src = videoPlayer.src.split('?')[0]; // Reset video source to stop playback
            }
        });
        
        // Close modal
        closeModalBtn.addEventListener('click', function() {
            mediaModal.classList.remove('active');

            // Stop video playback when closing the modal
            if (videoPlayer) {
                videoPlayer.src = videoPlayer.src.split('?')[0]; // Reset video source to stop playback
            }
        });
        
        // Close modal when clicking outside
        mediaModal.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal-overlay')) {
                mediaModal.classList.remove('active');
            }
        });
        
        // Close with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mediaModal && mediaModal.classList.contains('active')) {
                mediaModal.classList.remove('active');
            }
        });
        
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

    // Set up the about carousel
        function setupAboutCarousel() {
            const slides = document.querySelectorAll('.carousel-slide');
            const indicators = document.querySelectorAll('.carousel-indicator');
            let currentIndex = 0;
            let carouselInterval;

            function showSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                slides[index].classList.add('active');
                indicators[index].classList.add('active');
                
                currentIndex = index;
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            }

        // Start carousel immediately
        carouselInterval = setInterval(nextSlide, 2000);

        // Enable manual navigation
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                clearInterval(carouselInterval);
                    showSlide(index);
                carouselInterval = setInterval(nextSlide, 2000);
                });
            });
        }

        // Call the carousel setup
        setupAboutCarousel();
    });

    // Initialize Game Gallery
    function initGameGallery() {
        const galleryContainer = document.querySelector('.gallery-container');
        if (!galleryContainer) return;
        
        const slides = document.querySelectorAll('.gallery-slide');
        const prevButton = document.querySelector('.gallery-prev');
        const nextButton = document.querySelector('.gallery-next');
        const progressBar = document.querySelector('.gallery-progress .progress-bar');
        const filmstripThumbs = document.querySelectorAll('.filmstrip-thumb');
        const playPauseButton = document.querySelector('.gallery-play-pause');
        const fullscreenButton = document.querySelector('.gallery-fullscreen');
        const currentSlideSpan = document.querySelector('.current-slide');
        const totalSlidesSpan = document.querySelector('.total-slides');
        
        let currentIndex = 0;
        let autoPlayInterval;
        let progressInterval;
        let isPlaying = true;
        let isFull = false;
        
        // GIF caching - preload GIFs
        function preloadGIFs() {
            const gifSlides = document.querySelectorAll('.gallery-slide[data-type="gif"] img');
            const gifURLs = Array.from(gifSlides).map(gif => gif.src);
            
            // Create cache by preloading images
            gifURLs.forEach(url => {
                const img = new Image();
                img.src = url;
                
                // Store in sessionStorage that we've loaded this GIF
                sessionStorage.setItem(`cached_${url}`, 'true');
                
                // Optional: Add loading indicator
                img.onload = function() {
                    console.log(`GIF cached: ${url}`);
                };
            });
        }
        
        // Run preload when the page loads or when user switches to the game section
        document.addEventListener('DOMContentLoaded', preloadGIFs);
        
        // Also add lazy loading attribute to GIFs to improve initial page load
        document.querySelectorAll('.gallery-slide[data-type="gif"] img').forEach(gif => {
            gif.setAttribute('loading', 'lazy');
        });
        
        // Variable timing for slides based on type
        function getSlideTime(index) {
            const slideType = slides[index].getAttribute('data-type');
            return slideType === 'gif' ? 5000 : 2500; // 5 seconds for GIFs, 2.5 seconds for images
        }
        
        // Initialize total slides counter
        if (totalSlidesSpan) {
            totalSlidesSpan.textContent = slides.length;
        }
        
        function showSlide(index) {
            // Stop any current progress and remove active class from all slides
            resetProgress();
            slides.forEach(slide => slide.classList.remove('active'));
            filmstripThumbs.forEach(thumb => thumb.classList.remove('active'));
            
            // Set the new active slide
            currentIndex = index;
            slides[currentIndex].classList.add('active');
            
            if (filmstripThumbs[currentIndex]) {
                filmstripThumbs[currentIndex].classList.add('active');
            }
            
            if (currentSlideSpan) {
                currentSlideSpan.textContent = currentIndex + 1;
            }
            
            // If autoplay is active, start progress for the appropriate duration
            if (isPlaying) {
                startProgress(getSlideTime(currentIndex));
            }
        }
        
        function prevSlide() {
            const newIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        }
        
        function nextSlide() {
            const newIndex = (currentIndex + 1) % slides.length;
            showSlide(newIndex);
        }
        
        function startProgress(duration = 3000) {
            if (!progressBar) return;
            
            let startTime = null;
            
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration * 100, 100);
                
                progressBar.style.width = `${progress}%`;
                
                if (progress < 100) {
                    progressInterval = requestAnimationFrame(animate);
                } else {
                    // When progress reaches 100%, move to next slide
                    nextSlide();
                }
            };
            
            progressInterval = requestAnimationFrame(animate);
        }
        
        function resetProgress() {
            if (progressInterval) {
                cancelAnimationFrame(progressInterval);
                progressInterval = null;
            }
            
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        }
        
        function togglePlayPause() {
            isPlaying = !isPlaying;
            
            if (playPauseButton) {
                playPauseButton.innerHTML = isPlaying 
                    ? '<i class="ri-pause-line"></i>' 
                    : '<i class="ri-play-line"></i>';
                    
                playPauseButton.setAttribute('aria-label', isPlaying ? 'Pause slideshow' : 'Play slideshow');
            }
            
            if (isPlaying) {
                startProgress(getSlideTime(currentIndex));
                startAutoPlay();
            } else {
                resetProgress();
                stopAutoPlay();
            }
        }
        
        function toggleFullscreen() {
            isFull = !isFull;
            
            if (isFull) {
                galleryContainer.classList.add('fullscreen');
                fullscreenButton.innerHTML = '<i class="ri-fullscreen-exit-line"></i>';
                document.body.style.overflow = 'hidden';
            } else {
                galleryContainer.classList.remove('fullscreen');
                fullscreenButton.innerHTML = '<i class="ri-fullscreen-line"></i>';
                document.body.style.overflow = '';
            }
        }
        
        // Set up event handlers for buttons
        if (prevButton) prevButton.addEventListener('click', () => {
            prevSlide();
            restartAutoPlay(); 
        });
        
        if (nextButton) nextButton.addEventListener('click', () => {
            nextSlide();
            restartAutoPlay();
        });
        
        // Function to restart auto-play
        function restartAutoPlay() {
            stopAutoPlay(); // Clear the existing interval
            startAutoPlay(); // Start a new interval
        }

        // Set up filmstrip thumbnails
        filmstripThumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Set up play/pause button
        if (playPauseButton) {
            playPauseButton.addEventListener('click', togglePlayPause);
        }
        
        // Set up fullscreen button
        if (fullscreenButton) {
            fullscreenButton.addEventListener('click', toggleFullscreen);
        }
        
        // Handle swipe events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (swipeDistance > swipeThreshold) {
                prevSlide();
            } else if (swipeDistance < -swipeThreshold) {
                nextSlide();
            }
        }
        
        function startAutoPlay() {
            stopAutoPlay(); // Clear any existing interval
            // No need to set an interval here since we're using requestAnimationFrame for timing
            autoPlayInterval = setInterval(nextSlide, 10000); // Auto-play every 2 seconds
        }
        
        function stopAutoPlay() {
            // resetProgress();
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }
        
        startAutoPlay();
        // Add touch event handlers
        galleryContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        galleryContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        // Add keyboard navigation
        function handleKeyDown(e) {
            if (!galleryContainer.contains(document.activeElement) && 
                !galleryContainer.classList.contains('fullscreen')) {
                return;
            }
            
            switch (e.key) {
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
                case ' ':
                    togglePlayPause();
                    e.preventDefault();
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
                case 'Escape':
                    if (isFull) toggleFullscreen();
                    break;
            }
        }
        
        document.addEventListener('keydown', handleKeyDown);
        
        // Cleanup function to remove event listeners
        function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
            stopAutoPlay();
        }
        
        // Initialize
        showSlide(0);
        startAutoPlay();
        
        // Return cleanup function
        return cleanup;
    }

    // Network Graph Animation
    function initNetworkGraph() {
        const canvas = document.getElementById('network-graph');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        // Check if device is mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        // Color settings
        const primaryColor = 'rgba(66, 153, 225, 0.5)'; // Blue
        const accentColor = 'rgba(255, 76, 41, 0.5)';   // Orange/Red accent
        const secondaryColor = 'rgba(72, 187, 120, 0.5)'; // Green
        const nodeColor = 'rgba(255, 255, 255, 0.6)';   // Nodes color
        const focusedColor = 'rgba(255, 255, 255, 0.9)'; // Highlighted nodes
        
        // Network settings - greatly reduced for mobile
        const particleCount = isMobile ? 
            Math.min(20, Math.floor(width * height / 30000)) : // Fewer particles on mobile
            Math.min(50, Math.floor(width * height / 15000));  // Reduced count on desktop too
            
        const maxDistance = isMobile ? 120 : 150; // Shorter connection distance on mobile
        const mouseSensitivity = isMobile ? 0.1 : 0.2; // Reduced sensitivity on mobile
        const particleSizeRange = { 
            min: isMobile ? 1 : 1.5, 
            max: isMobile ? 3 : 4 
        };
        const particleSpeedRange = { 
            min: isMobile ? 0.05 : 0.1, 
            max: isMobile ? 0.3 : 0.5 
        }; // Slower movement on mobile
        
        // Maximum connections per node (degree constraint)
        const MAX_CONNECTIONS_PER_NODE = isMobile ? 2 : 3;
        
        // Mouse position with smoothing
        let targetMouseX = width / 2;
        let targetMouseY = height / 2;
        let mouseX = targetMouseX;
        let mouseY = targetMouseY;
        let mouseRadius = isMobile ? 100 : 150;
        
        // Special "brain center" position - moved slightly lower
        const brainCenter = {
            x: width / 2,
            y: height / 1.6, // Moved lower to avoid text
            radius: Math.min(width, height) * (isMobile ? 0.15 : 0.2)
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
        
        // Animation frame tracking
        let animationFrameId = null;
        
        // Reduced frame rate for mobile
        const FPS = isMobile ? 30 : 60;
        const frameInterval = 1000 / FPS;
        let lastFrameTime = 0;
        
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
                this.centerAttraction = (Math.random() * 0.01) * (isSpecial ? 1.2 : 0.8);
                // Make fewer particles cluster (30% instead of 60%)
                this.shouldCluster = Math.random() > (isMobile ? 0.8 : 0.7);
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
                
                // Pulse animation - slower on mobile
                this.pulsePhase += isMobile ? 0.01 : 0.02;
                if (this.pulsePhase > Math.PI * 2) this.pulsePhase = 0;
                
                // Apply damping to prevent excessive speed
                this.speedX *= 0.98;
                this.speedY *= 0.98;
                
                // Speed limit to prevent excessive movement
                const maxSpeed = isMobile ? 1.5 : 2;
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
                
                // Glow effect only for special nodes on desktop, simplified on mobile
                if ((this.isSpecial || this.isNearMouse) && !isMobile) {
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
                this.speed = (isMobile ? 0.01 : 0.02) + Math.random() * 0.02;
                this.size = 1 + Math.random();
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
            
            // Create special "hub" nodes - limit to 3 on mobile
            const specialNodes = isMobile ? 2 : 4;
            for (let i = 0; i < specialNodes; i++) {
                particles.push(new Particle(true));
            }
            
            // Create regular nodes
            for (let i = 0; i < particleCount - specialNodes; i++) {
                particles.push(new Particle(false));
            }
        }
        
        // Animation loop with throttling for mobile
        function animate(timestamp) {
            // Skip frames to maintain target FPS
            if (timestamp - lastFrameTime < frameInterval) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }
            
            lastFrameTime = timestamp;
            
            ctx.clearRect(0, 0, width, height);
            
            // Smooth mouse follow
            mouseX += (targetMouseX - mouseX) * 0.1;
            mouseY += (targetMouseY - mouseY) * 0.1;
            
            // Create data paths occasionally (less frequently)
            if (Math.random() < (isMobile ? 0.005 : 0.015) && particles.length > 3) {
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
                    
                    if (distance < maxDistance * 1.2) {
                        // Only create data path if within connection limit
                        if (dataPaths.length < (isMobile ? 5 : 15)) {
                            dataPaths.push(new DataPath(sourceNode, targetNode));
                        }
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
            
            animationFrameId = requestAnimationFrame(animate);
        }
        
        // Draw lines between particles with degree constraint
        function connectParticles(particle, particles) {
            particle.connectedTo = [];
            
            // Find potential connections within maxDistance
            let potentialConnections = [];
            
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
                    
                    potentialConnections.push({
                        particle: p2,
                        distance: distance
                    });
                }
            }
            
            // Sort by distance (prioritize closer particles)
            potentialConnections.sort((a, b) => a.distance - b.distance);
            
            // Limit to MAX_CONNECTIONS_PER_NODE connections
            const connections = potentialConnections.slice(0, MAX_CONNECTIONS_PER_NODE);
            
            // Draw the selected connections
            connections.forEach(connection => {
                const p2 = connection.particle;
                const distance = connection.distance;
                
                particle.connectedTo.push(p2);
                
                // Only draw if the other node hasn't already connected to this one
                // This ensures we don't draw the same connection twice
                if (!p2.connectedTo.includes(particle)) {
                    // Set opacity based on distance and reduce general opacity
                    const opacity = (1 - (distance / maxDistance)) * 0.6;
                    
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
                    ctx.lineWidth = (particle.isSpecial || p2.isSpecial) ? 
                                    opacity * (isMobile ? 1 : 1.5) : 
                                    opacity * (isMobile ? 0.5 : 0.7);
                    
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            targetMouseX = e.clientX;
            targetMouseY = e.clientY;
        });
        
        // Handle touch events for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                // Do NOT prevent default to allow scrolling
                targetMouseX = e.touches[0].clientX;
                targetMouseY = e.touches[0].clientY;
            }
        }, { passive: true }); // Set passive to true to improve scroll performance
        
        // Handle scroll - pause animation during scroll on mobile
        let scrollTimeout;
        const pauseAnimationDuringScroll = () => {
            if (isMobile) {
                // Cancel the existing animation frame
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
                
                // Clear existing timeout
                clearTimeout(scrollTimeout);
                
                // Set a timeout to resume animation after scrolling stops
                scrollTimeout = setTimeout(() => {
                    if (!animationFrameId) {
                        animationFrameId = requestAnimationFrame(animate);
                    }
                }, 200); // Resume after 200ms of no scrolling
            }
        };
        
        window.addEventListener('scroll', pauseAnimationDuringScroll, { passive: true });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Check if device type changed
            const wasDesktop = !isMobile;
            const newIsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
            
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            
            // Recalculate brain center and text zone
            brainCenter.x = width / 2;
            brainCenter.y = height / 1.6;
            brainCenter.radius = Math.min(width, height) * (newIsMobile ? 0.15 : 0.2);
            
            textZone.x = width / 2;
            textZone.y = height / 2.5;
            textZone.width = Math.min(width * 0.7, 700);
            textZone.height = Math.min(height * 0.4, 300);
            
            // If device type changed, we should reinitialize
            if (wasDesktop !== newIsMobile) {
                // Stop animation
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                
                // Reinitialize with new settings
                init();
                animationFrameId = requestAnimationFrame(animate);
            } else {
                // Just reinitialize
                init();
            }
        });
        
        // Cleanup function to stop animation when the canvas is no longer visible
        function cleanup() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            
            // Remove event listeners
            window.removeEventListener('scroll', pauseAnimationDuringScroll);
        }
        
        // Initialize and start animation
        init();
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
        
        // Add global cleanup method
        window.cleanupNetworkGraph = cleanup;
        
        // Visibility API - pause animation when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            } else {
                if (!animationFrameId) {
                    lastFrameTime = performance.now();
                    animationFrameId = requestAnimationFrame(animate);
                }
            }
        });
    }

// Initialize the participant map
function initializeParticipantMap() {
    // Create map centered on India with more restrictive settings
    const map = L.map('india-map', {
        center: [23.5937, 78.9629], // Center of India
        zoom: 4.5,
        zoomControl: true,
        scrollWheelZoom: true,
        maxZoom: 5, // Limit max zoom level
        minZoom: 4, // Limit min zoom level
        dragging: true,
        tap: false,
        // Add bounds to restrict panning
        maxBounds: [
            [6.5, 68.0], // Southwest coordinates
            [36.0, 98.0]  // Northeast coordinates
        ],
        maxBoundsViscosity: 1.0 // Make the bounds hard to cross
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create sets to track unique values
    const uniquePincodes = new Set();
    const uniqueCities = new Set();
    const uniqueStates = new Set();
    
    // Hardcoded pincode data with accurate coordinates
    const pincodeData = [
        { "pincode": "110007", "lat": 28.6779, "lng": 77.2126, "city": "New Delhi", "state": "Delhi" },
        { "pincode": "110020", "lat": 28.5317, "lng": 77.2766, "city": "New Delhi", "state": "Delhi" },
        { "pincode": "110078", "lat": 28.6114, "lng": 77.0327, "city": "New Delhi", "state": "Delhi" },
        { "pincode": "122103", "lat": 28.2671, "lng": 77.1444, "city": "Gurgaon", "state": "Haryana" },
        { "pincode": "151302", "lat": 30.2767, "lng": 74.9313, "city": "Bathinda", "state": "Punjab" },
        { "pincode": "160012", "lat": 30.7415, "lng": 76.7681, "city": "Chandigarh", "state": "Chandigarh" },
        { "pincode": "160022", "lat": 30.7337, "lng": 76.7725, "city": "Chandigarh", "state": "Chandigarh" },
        { "pincode": "201009", "lat": 28.6342, "lng": 77.4397, "city": "Ghaziabad", "state": "Uttar Pradesh" },
        { "pincode": "201204", "lat": 28.8302, "lng": 77.5853, "city": "Ghaziabad", "state": "Uttar Pradesh" },
        { "pincode": "201301", "lat": 28.5355, "lng": 77.3910, "city": "Noida", "state": "Uttar Pradesh" },
        { "pincode": "211002", "lat": 25.4696, "lng": 81.8563, "city": "Allahabad", "state": "Uttar Pradesh" },
        { "pincode": "221005", "lat": 25.2786, "lng": 82.9945, "city": "Varanasi", "state": "Uttar Pradesh" },
        { "pincode": "226301", "lat": 26.7123, "lng": 80.9953, "city": "Lucknow", "state": "Uttar Pradesh" },
        { "pincode": "243006", "lat": 28.3901, "lng": 79.4577, "city": "Bareilly", "state": "Uttar Pradesh" },

        { "pincode": "243202", "lat": 28.6100, "lng": 79.4000, "city": "Bareilly", "state": "Uttar Pradesh" },
        { "pincode": "247667", "lat": 29.8543, "lng": 77.8880, "city": "Roorkee", "state": "Uttarakhand" },
        { "pincode": "281401", "lat": 27.7167, "lng": 77.5167, "city": "Mathura", "state": "Uttar Pradesh" },
        { "pincode": "303007", "lat": 26.8100, "lng": 75.5500, "city": "Jaipur", "state": "Rajasthan" },
        { "pincode": "305817", "lat": 26.5426, "lng": 74.6269, "city": "Ajmer", "state": "Rajasthan" },
        { "pincode": "333013", "lat": 28.1300, "lng": 75.4000, "city": "Jhunjhunu", "state": "Rajasthan" },
        { "pincode": "333031", "lat": 28.2000, "lng": 75.5000, "city": "Jhunjhunu", "state": "Rajasthan" },
        { "pincode": "333333", "lat": 28.2500, "lng": 75.6000, "city": "Jhunjhunu", "state": "Rajasthan" },
        { "pincode": "388421", "lat": 22.6000, "lng": 72.8000, "city": "Anand", "state": "Gujarat" },

        { "pincode": "390004", "lat": 22.3000, "lng": 73.2000, "city": "Vadodara", "state": "Gujarat" },
        { "pincode": "395007", "lat": 21.1702, "lng": 72.8311, "city": "Surat", "state": "Gujarat" },
        { "pincode": "400018", "lat": 19.0500, "lng": 72.8500, "city": "Mumbai", "state": "Maharashtra" },
        { "pincode": "400019", "lat": 19.0700, "lng": 72.8800, "city": "Mumbai", "state": "Maharashtra" },
        { "pincode": "400056", "lat": 19.1000, "lng": 72.8500, "city": "Mumbai", "state": "Maharashtra" },
        { "pincode": "400058", "lat": 19.1100, "lng": 72.8600, "city": "Mumbai", "state": "Maharashtra" },
        { "pincode": "400070", "lat": 19.1200, "lng": 72.8700, "city": "Mumbai", "state": "Maharashtra" },
        { "pincode": "400614", "lat": 19.0300, "lng": 73.0300, "city": "Navi Mumbai", "state": "Maharashtra" },
        { "pincode": "410210", "lat": 18.8000, "lng": 73.1000, "city": "Raigad", "state": "Maharashtra" },
        { "pincode": "411001", "lat": 18.5204, "lng": 73.8567, "city": "Pune", "state": "Maharashtra" },
        { "pincode": "411021", "lat": 18.5300, "lng": 73.8500, "city": "Pune", "state": "Maharashtra" },
        { "pincode": "411033", "lat": 18.5400, "lng": 73.8600, "city": "Pune", "state": "Maharashtra" },
        { "pincode": "411035", "lat": 18.5500, "lng": 73.8700, "city": "Pune", "state": "Maharashtra" },
        { "pincode": "411038", "lat": 18.5600, "lng": 73.8800, "city": "Pune", "state": "Maharashtra" },
        { "pincode": "411041", "lat": 18.5700, "lng": 73.8900, "city": "Pune", "state": "Maharashtra" },
        { "pincode": "411044", "lat": 18.5800, "lng": 73.9000, "city": "Pune", "state": "Maharashtra" },
        { "pincode": "411052", "lat": 18.5900, "lng": 73.9100, "city": "Pune", "state": "Maharashtra" },
        { "pincode": "411061", "lat": 18.6000, "lng": 73.9200, "city": "Pune", "state": "Maharashtra" },
        { "pincode": "412201", "lat": 18.6100, "lng": 73.9300, "city": "Pune", "state": "Maharashtra" },
        { "pincode": "413001", "lat": 17.6599, "lng": 75.9064, "city": "Solapur", "state": "Maharashtra" },
        { "pincode": "424002", "lat": 21.0000, "lng": 75.5600, "city": "Jalgaon", "state": "Maharashtra" },

        { "pincode": "440013", "lat": 21.1500, "lng": 79.0900, "city": "Nagpur", "state": "Maharashtra" },
        { "pincode": "441108", "lat": 21.2000, "lng": 79.1000, "city": "Bhandara", "state": "Maharashtra" },
        { "pincode": "441110", "lat": 21.2500, "lng": 79.1500, "city": "Bhandara", "state": "Maharashtra" },
        { "pincode": "462022", "lat": 23.2599, "lng": 77.4126, "city": "Bhopal", "state": "Madhya Pradesh" },
        { "pincode": "462044", "lat": 23.2599, "lng": 77.4126, "city": "Bhopal", "state": "Madhya Pradesh" },
        { "pincode": "462066", "lat": 23.2599, "lng": 77.4126, "city": "Bhopal", "state": "Madhya Pradesh" },
        { "pincode": "466114", "lat": 23.5000, "lng": 77.5000, "city": "Sehore", "state": "Madhya Pradesh" },

        { "pincode": "482005", "lat": 23.1667, "lng": 79.9333, "city": "Jabalpur", "state": "Madhya Pradesh" },
        { "pincode": "500007", "lat": 17.3850, "lng": 78.4867, "city": "Hyderabad", "state": "Telangana" },

        { "pincode": "500014", "lat": 17.3850, "lng": 78.4867, "city": "Hyderabad", "state": "Telangana" },
        { "pincode": "500032", "lat": 17.3850, "lng": 78.4867, "city": "Hyderabad", "state": "Telangana" },
        { "pincode": "500043", "lat": 17.3850, "lng": 78.4867, "city": "Hyderabad", "state": "Telangana" },
        { "pincode": "500075", "lat": 17.4445, "lng": 78.5343, "city": "Mirjaguda", "state": "Telangana" },
        { "pincode": "500089", "lat": 17.3850, "lng": 78.4867, "city": "Hyderabad", "state": "Telangana" },
        { "pincode": "500090", "lat": 17.3850, "lng": 78.4867, "city": "Hyderabad", "state": "Telangana" },
        { "pincode": "500100", "lat": 17.3850, "lng": 78.4867, "city": "Hyderabad", "state": "Telangana" },
  
        { "pincode": "506004", "lat": 17.9784, "lng": 79.5941, "city": "Warangal", "state": "Telangana" },
        { "pincode": "517102", "lat": 13.6288, "lng": 79.4192, "city": "Tirupati", "state": "Andhra Pradesh" },
        { "pincode": "517541", "lat": 13.6288, "lng": 79.4192, "city": "Tirupati", "state": "Andhra Pradesh" },
        { "pincode": "522240", "lat": 16.3067, "lng": 80.4365, "city": "Guntur", "state": "Andhra Pradesh" },

        { "pincode": "522502", "lat": 16.3067, "lng": 80.4365, "city": "Guntur", "state": "Andhra Pradesh" },
        { "pincode": "530003", "lat": 17.6868, "lng": 83.2185, "city": "Visakhapatnam", "state": "Andhra Pradesh" },
        { "pincode": "530045", "lat": 17.6868, "lng": 83.2185, "city": "Visakhapatnam", "state": "Andhra Pradesh" },
        { "pincode": "534202", "lat": 16.7050, "lng": 81.0950, "city": "West Godavari", "state": "Andhra Pradesh" },
        { "pincode": "560001", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560004", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560012", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560019", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560022", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560035", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560048", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560054", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560059", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560064", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560066", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560068", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560070", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560074", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560078", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560083", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560092", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560107", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "561203", "lat": 13.0000, "lng": 77.5000, "city": "Bangalore Rural", "state": "Karnataka" },
        { "pincode": "562112", "lat": 13.0000, "lng": 77.5000, "city": "Bangalore Rural", "state": "Karnataka" },
        { "pincode": "562125", "lat": 13.0000, "lng": 77.5000, "city": "Bangalore Rural", "state": "Karnataka" },
        { "pincode": "562157", "lat": 13.0000, "lng": 77.5000, "city": "Bangalore Rural", "state": "Karnataka" },
        { "pincode": "570028", "lat": 12.2958, "lng": 76.6394, "city": "Mysore", "state": "Karnataka" },
        { "pincode": "572216", "lat": 13.0000, "lng": 76.0000, "city": "Tumkur", "state": "Karnataka" },
        { "pincode": "574110", "lat": 12.9000, "lng": 75.0000, "city": "Dakshina Kannada", "state": "Karnataka" },
        { "pincode": "575025", "lat": 13.3400, "lng": 74.7800, "city": "Mangalore", "state": "Karnataka" },
        { "pincode": "576104", "lat": 13.3700, "lng": 74.7900, "city": "Udupi", "state": "Karnataka" },
        { "pincode": "580007", "lat": 12.9716, "lng": 77.5946, "city": "Hubli", "state": "Karnataka" },
        { "pincode": "580009", "lat": 12.9716, "lng": 77.5946, "city": "Hubli", "state": "Karnataka" },
        { "pincode": "580031", "lat": 12.9716, "lng": 77.5946, "city": "Hubli", "state": "Karnataka" },
        { "pincode": "590008", "lat": 15.8400, "lng": 74.5000, "city": "Belgaum", "state": "Karnataka" },
        { "pincode": "600017", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600019", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600036", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600041", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600044", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600045", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600048", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600063", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600069", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600089", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600119", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600124", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "600127", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "601206", "lat": 12.9716, "lng": 77.5946, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "602025", "lat": 12.9716, "lng": 77.5946, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "602105", "lat": 12.9716, "lng": 77.5946, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "602109", "lat": 12.9716, "lng": 77.5946, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "602603", "lat": 12.9716, "lng": 77.5946, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "603023", "lat": 12.9716, "lng": 77.5946, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "603103", "lat": 12.9716, "lng": 77.5946, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "603110", "lat": 12.9716, "lng": 77.5946, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "603203", "lat": 12.9716, "lng": 77.5946, "city": "Chennai", "state": "Tamil Nadu" },
        { "pincode": "612001", "lat": 10.7905, "lng": 79.7020, "city": "Thanjavur", "state": "Tamil Nadu" },
        { "pincode": "613401", "lat": 11.0000, "lng": 79.0000, "city": "Cuddalore", "state": "Tamil Nadu" },
        { "pincode": "620015", "lat": 9.9395, "lng": 78.1460, "city": "Tiruchirappalli", "state": "Tamil Nadu" },
        { "pincode": "621105", "lat": 10.0000, "lng": 78.0000, "city": "Tiruchirappalli", "state": "Tamil Nadu" },
        { "pincode": "626126", "lat": 9.5000, "lng": 77.5000, "city": "Virudhunagar", "state": "Tamil Nadu" },
        { "pincode": "630003", "lat": 9.5000, "lng": 77.5000, "city": "Sivaganga", "state": "Tamil Nadu" },
        { "pincode": "632014", "lat": 12.0000, "lng": 78.0000, "city": "Vellore", "state": "Tamil Nadu" },
        { "pincode": "632059", "lat": 12.0000, "lng": 78.0000, "city": "Vellore", "state": "Tamil Nadu" },
        { "pincode": "636006", "lat": 11.0000, "lng": 77.0000, "city": "Salem", "state": "Tamil Nadu" },
        { "pincode": "637215", "lat": 11.0000, "lng": 77.0000, "city": "Namakkal", "state": "Tamil Nadu" },
        { "pincode": "637504", "lat": 11.0000, "lng": 77.0000, "city": "Namakkal", "state": "Tamil Nadu" },
        { "pincode": "638060", "lat": 11.0000, "lng": 77.0000, "city": "Erode", "state": "Tamil Nadu" },
        { "pincode": "641004", "lat": 11.0168, "lng": 76.9558, "city": "Coimbatore", "state": "Tamil Nadu" },
        { "pincode": "641018", "lat": 11.0168, "lng": 76.9558, "city": "Coimbatore", "state": "Tamil Nadu" },
        { "pincode": "641032", "lat": 11.0168, "lng": 76.9558, "city": "Coimbatore", "state": "Tamil Nadu" },
        { "pincode": "641062", "lat": 11.0168, "lng": 76.9558, "city": "Coimbatore", "state": "Tamil Nadu" },
        { "pincode": "641112", "lat": 11.0168, "lng": 76.9558, "city": "Coimbatore", "state": "Tamil Nadu" },
        { "pincode": "64112", "lat": 11.0168, "lng": 76.9558, "city": "Coimbatore", "state": "Tamil Nadu" },
        { "pincode": "641402", "lat": 11.0168, "lng": 76.9558, "city": "Coimbatore", "state": "Tamil Nadu" },
        { "pincode": "641665", "lat": 11.0168, "lng": 76.9558, "city": "Coimbatore", "state": "Tamil Nadu" },
        { "pincode": "642062", "lat": 11.0168, "lng": 76.9558, "city": "Coimbatore", "state": "Tamil Nadu" },
        { "pincode": "673005", "lat": 11.2588, "lng": 75.7804, "city": "Kozhikode", "state": "Kerala" },
        { "pincode": "673601", "lat": 11.2588, "lng": 75.7804, "city": "Kozhikode", "state": "Kerala" },
        { "pincode": "683576", "lat": 10.2588, "lng": 76.7804, "city": "Thrissur", "state": "Kerala" },
        { "pincode": "683577", "lat": 10.2588, "lng": 76.7804, "city": "Thrissur", "state": "Kerala" },
        { "pincode": "690525", "lat": 9.2588, "lng": 76.7804, "city": "Kollam", "state": "Kerala" },
        { "pincode": "690546", "lat": 9.2588, "lng": 76.7804, "city": "Kollam", "state": "Kerala" },
        { "pincode": "695016", "lat": 8.2588, "lng": 77.7804, "city": "Thiruvananthapuram", "state": "Kerala" },
        { "pincode": "695551", "lat": 8.2588, "lng": 77.7804, "city": "Thiruvananthapuram", "state": "Kerala" },
        { "pincode": "700019", "lat": 22.5726, "lng": 88.3639, "city": "Kolkata", "state": "West Bengal" },
        { "pincode": "700091", "lat": 22.5726, "lng": 88.3639, "city": "Kolkata", "state": "West Bengal" },
        { "pincode": "700109", "lat": 22.5726, "lng": 88.3639, "city": "Kolkata", "state": "West Bengal" },
        { "pincode": "700126", "lat": 22.5726, "lng": 88.3639, "city": "Kolkata", "state": "West Bengal" },
        { "pincode": "700135", "lat": 22.5726, "lng": 88.3639, "city": "Kolkata", "state": "West Bengal" },
        { "pincode": "721302", "lat": 22.5726, "lng": 88.3639, "city": "Kolkata", "state": "West Bengal" },
        { "pincode": "751024", "lat": 20.2961, "lng": 85.8189, "city": "Bhubaneswar", "state": "Odisha" },
        { "pincode": "761008", "lat": 19.3133, "lng": 84.7915, "city": "Berhampur", "state": "Odisha" },
        { "pincode": "788010", "lat": 24.7582, "lng": 92.9376, "city": "Karimganj", "state": "Assam" },
        { "pincode": "796012", "lat": 24.7582, "lng": 92.9376, "city": "Imphal", "state": "Manipur" },
        { "pincode": "799046", "lat": 23.8314, "lng": 91.2807, "city": "Agartala", "state": "Tripura" },
        { "pincode": "800005", "lat": 25.5941, "lng": 85.1376, "city": "Patna", "state": "Bihar" },
        { "pincode": "801106", "lat": 25.5941, "lng": 85.1376, "city": "Patna", "state": "Bihar" },
        { "pincode": "20201", "lat": 44.425, "lng": -68.985, "city": "Bar Harbor", "state": "Maine" },
        { "pincode": "52240", "lat": 41.6611, "lng": -91.5302, "city": "Iowa City", "state": "Iowa" },
        { "pincode": "560092", "lat": 12.9716, "lng": 77.5946, "city": "Bengaluru", "state": "Karnataka" },
        { "pincode": "562112", "lat": 12.9716, "lng": 77.5946, "city": "Bengaluru Rural", "state": "Karnataka" },
        { "pincode": "570028", "lat": 12.2958, "lng": 76.6394, "city": "Mysuru", "state": "Karnataka" },
        { "pincode": "572216", "lat": 13.3392, "lng": 77.101, "city": "Tumakuru", "state": "Karnataka" },
        { "pincode": "580007", "lat": 15.3647, "lng": 75.124, "city": "Hubballi", "state": "Karnataka" },
        { "pincode": "603203", "lat": 12.8239, "lng": 80.0454, "city": "Chengalpattu", "state": "Tamil Nadu" },
        { "pincode": "690525", "lat": 9.2620, "lng": 76.7832, "city": "Alappuzha", "state": "Kerala" },
        { "pincode": "695016", "lat": 8.5241, "lng": 76.9366, "city": "Thiruvananthapuram", "state": "Kerala" },
        { "pincode": "247667", "lat": 29.8543, "lng": 77.8880, "city": "Haridwar", "state": "Uttarakhand" },
        { "pincode": "110001", "lat": 28.6139, "lng": 77.2090, "city": "Delhi", "state": "Delhi" },
        { "pincode": "380001", "lat": 23.0225, "lng": 72.5714, "city": "Ahmedabad", "state": "Gujarat" },
        { "pincode": "781001", "lat": 26.1445, "lng": 91.7362, "city": "Guwahati", "state": "Assam" },
        { "pincode": "141001", "lat": 30.9050, "lng": 75.8573, "city": "Ludhiana", "state": "Punjab" },
        { "pincode": "209305", "lat": 26.3722, "lng": 80.2050, "city": "Kanpur Nagar", "state": "Uttar Pradesh" },
        { "pincode": "236301", "lat": 24.3722, "lng": 70.3050, "city": "Samastipur", "state": "Bihar" },
        { "pincode": "500074", "lat": 17.3575, "lng": 78.5575, "city": "Hyderabad", "state": "Telangana" },
        { "pincode": "500078", "lat": 17.5833, "lng": 78.5500, "city": "Hyderabad", "state": "Telangana" },
        { "pincode": "522302", "lat": 16.4500, "lng": 80.6167, "city": "Guntur", "state": "Andhra Pradesh" },
        { "pincode": "560037", "lat": 12.9568, "lng": 77.7010, "city": "Bangalore", "state": "Karnataka" },
        { "pincode": "560082", "lat": 12.8000, "lng": 77.5000, "city": "Bangalore Rural", "state": "Karnataka" },
        { "pincode": "641014", "lat": 11.0300, "lng": 77.0400, "city": "Coimbatore", "state": "Tamil Nadu" },
        { "pincode": "683582", "lat": 10.2000, "lng": 76.4000, "city": "Ernakulam", "state": "Kerala" },
        { "pincode": "700032", "lat": 22.4980, "lng": 88.3700, "city": "Kolkata", "state": "West Bengal" }
    ];

    // Create a fixed layer for markers to avoid positioning issues
    const markerLayer = L.layerGroup().addTo(map);
    
    // Store all markers for later reference
    const markers = [];
    
    // Create a simple circle marker function - more stable than icon-based markers
    function createCircleMarker(lat, lng) {
        return L.circleMarker([lat, lng], {
            radius: 8,
            fillColor: "#ff4c29",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 1,
            interactive: false
        });
    }
    
    // Add markers for each pincode
    pincodeData.forEach(entry => {
        if (entry.pincode && entry.lat && entry.lng) {
            // Create a simple circle marker - more stable for positioning
            const marker = createCircleMarker(entry.lat, entry.lng).addTo(markerLayer);
            markers.push(marker);
            
            // Track unique values
            uniquePincodes.add(entry.pincode);
            if (entry.city) uniqueCities.add(entry.city.trim());
            if (entry.state) uniqueStates.add(entry.state.trim());
        }
    });
    
    // Function to update marker styles based on theme
    function updateMarkerStyles(isDarkMode) {
        markers.forEach(marker => {
            marker.setStyle({
                color: isDarkMode ? "#333" : "#fff"
            });
        });
    }
    
    // Update stats
    document.getElementById('total-cities').textContent = uniqueCities.size + '+';
    document.getElementById('total-states').textContent = uniqueStates.size + '+';

    // Store map instance and update function for theme updates
    window.participantMap = map;
    window.updateMarkerStyles = updateMarkerStyles;
    window.markerLayer = markerLayer; // Expose marker layer to global scope
    window.pincodeData = pincodeData; // Store pincode data for potential marker redrawing
    window.markers = markers; // Expose markers array globally
    
    // Apply current theme
    updateMapTheme();
    
    // Ensure markers are refreshed after zoom
    map.on('zoomend', function() {
        markerLayer.bringToFront();
    });
    
    return map;
}