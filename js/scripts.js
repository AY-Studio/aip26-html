/**
 * AIP Custom Scripts
 * Handles countup animations, smooth scrolling, and interactive elements
 */

// ===================================
// Countup Animation for Statistics
// ===================================
function animateCountUp(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    const decimals = target % 1 !== 0 ? 1 : 0; // Use 1 decimal if not a whole number

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = decimals === 1 ? target.toFixed(1) : Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = decimals === 1 ? current.toFixed(1) : Math.round(current);
        }
    }, 16);
}

// Initialize countup when stats section is in viewport
function initCountUp() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only animate stats within the intersecting section
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-count'));
                    if (target) {
                        animateCountUp(stat, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    const snapshotSection = document.querySelector('.platform-snapshot-section');
    if (snapshotSection) {
        statsObserver.observe(snapshotSection);
    }
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip empty hash or just "#"
            if (!href || href === '#' || href === '#login' || href === '#team-page') {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Navbar now has solid background, add subtle shadow on scroll
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            navbar.style.transition = 'all 0.3s ease';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ===================================
// Fade In Animation on Scroll
// ===================================
function initFadeInAnimation() {
    const fadeElements = document.querySelectorAll('.investment-card, .news-card');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('fade-in');
                }, index * 100);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(element);
    });
}

// ===================================
// Tab Animation
// ===================================
function initTabAnimation() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');

    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', function (e) {
            const target = document.querySelector(e.target.getAttribute('data-bs-target'));
            if (target) {
                target.style.animation = 'fadeIn 0.5s ease-in-out';
            }
        });
    });
}

// ===================================
// Mobile Menu Close on Link Click
// ===================================
function initMobileMenuClose() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Prevent body scroll when mobile menu is open
    if (navbarCollapse && navbarToggler) {
        navbarCollapse.addEventListener('shown.bs.collapse', function () {
            if (window.innerWidth < 992) {
                document.body.style.overflow = 'hidden';
            }
        });

        navbarCollapse.addEventListener('hidden.bs.collapse', function () {
            document.body.style.overflow = '';

            // Close all open dropdowns when mobile menu closes
            if (window.innerWidth < 992) {
                const dropdowns = document.querySelectorAll('.nav-dropdown');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const megaMenu = dropdown.querySelector('.mega-menu');
                    if (megaMenu) megaMenu.classList.remove('active');
                });
            }
        });
    }

    // Close mobile menu when clicking non-dropdown nav links
    const regularNavLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.nav-dropdown .nav-link)');
    regularNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close if it's a dropdown toggle
            if (!link.closest('.nav-dropdown')) {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Close mobile menu when clicking mega menu links
    const megaMenuLinks = document.querySelectorAll('.mega-menu a');
    megaMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                // Close the dropdown first
                const dropdown = link.closest('.nav-dropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                    const megaMenu = dropdown.querySelector('.mega-menu');
                    if (megaMenu) megaMenu.classList.remove('active');
                }
                // Then close the mobile menu
                setTimeout(() => {
                    navbarToggler.click();
                }, 300);
            }
        });
    });
}

// ===================================
// Video Fallback for Mobile
// ===================================
function initVideoFallback() {
    const video = document.querySelector('.header-video');

    if (video && window.innerWidth < 768) {
        video.pause();
        video.style.opacity = '0.2';
    }
}

// ===================================
// Lazy Loading for Images
// ===================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[src*="placeholder"]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// Mega Menu Toggle
// ===================================
function initMegaMenu() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        const megaMenu = dropdown.querySelector('.mega-menu');

        if (!dropdownLink || !megaMenu) return;

        dropdownLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const isMobile = window.innerWidth < 992;

            if (isMobile) {
                // On mobile, just toggle the current dropdown
                const isActive = dropdown.classList.contains('active');
                dropdown.classList.toggle('active');
                megaMenu.classList.toggle('active');
            } else {
                // On desktop, close others first
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                        const otherMenu = otherDropdown.querySelector('.mega-menu');
                        if (otherMenu) otherMenu.classList.remove('active');
                    }
                });

                // Toggle current dropdown
                dropdown.classList.toggle('active');
                megaMenu.classList.toggle('active');
            }
        });

        // Close mega menu when clicking a link inside (desktop only)
        const megaMenuLinks = megaMenu.querySelectorAll('a');
        megaMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth >= 992) {
                    dropdown.classList.remove('active');
                    megaMenu.classList.remove('active');
                }
            });
        });
    });

    // Close all mega menus when clicking outside (desktop only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth >= 992 && !e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const megaMenu = dropdown.querySelector('.mega-menu');
                if (megaMenu) megaMenu.classList.remove('active');
            });
        }
    });
}

// ===================================
// Initialize All Functions
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('AIP Website Initialized');

    // Initialize all features
    initCountUp();
    initSmoothScroll();
    initNavbarScroll();
    initFadeInAnimation();
    initTabAnimation();
    initMobileMenuClose();
    initVideoFallback();
    initLazyLoading();
    initMegaMenu();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initVideoFallback();
        }, 250);
    });
});

// ===================================
// Global Time Updates
// ===================================
function updateGlobalTimes() {
    const timeElements = document.querySelectorAll('.location-time');
    const timezones = {
        'stamford': 'America/New_York',
        'new-york': 'America/New_York',
        'dublin': 'Europe/Dublin',
        'singapore': 'Asia/Singapore',
        'seoul': 'Asia/Seoul',
        'tokyo': 'Asia/Tokyo'
    };

    timeElements.forEach((element, index) => {
        const location = element.getAttribute('data-timezone');
        if (location && timezones[location]) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: timezones[location],
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }).toLowerCase().replace(' ', '');

            // Add flashing colon for live clock effect with staggered delay
            const delay = index * 0.12; // 0.12s delay between each location (wave completes in 0.6s)
            const timeWithFlashingColon = timeString.replace(':', `<span class="time-colon" style="animation-delay: ${delay}s">:</span>`);
            element.innerHTML = timeWithFlashingColon;
        }
    });
}

// Initialize time updates
document.addEventListener('DOMContentLoaded', function() {
    updateGlobalTimes();
    // Update times every minute
    setInterval(updateGlobalTimes, 60000);
});

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================
document.documentElement.style.visibility = 'visible';
