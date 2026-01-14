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

// ===================================
// Global Offices Interactive Map
// ===================================
/**
 * INTERACTIVE MAP COMPONENT
 *
 * Full documentation: See interactive-map.md
 *
 * This JavaScript powers the interactive office location map.
 * It handles marker clicks and displays location details in a modal popup.
 *
 * PLUGIN CONVERSION NOTES:
 * ------------------------
 * For WordPress plugin development:
 *
 * 1. DATA STRUCTURE:
 *    - Move officeData to PHP/database (custom post type)
 *    - Use wp_localize_script() to pass data to JavaScript
 *    - Each office needs: ID, name, address, phone, map position (x,y %)
 *
 * 2. ADMIN INTERFACE:
 *    - Map upload field (image selection)
 *    - Interactive map preview where admin clicks to place markers
 *    - Drag markers to reposition
 *    - Color picker for marker customization
 *    - Enable/disable pulse animation toggle
 *
 * 3. SHORTCODE/GUTENBERG BLOCK:
 *    - [interactive-map id="1"] for shortcode
 *    - Gutenberg block with live preview
 *    - Embed code generator for external sites
 *
 * 4. DYNAMIC GENERATION:
 *    - PHP generates HTML markers from database
 *    - Inline styles for marker positions and colors
 *    - JSON data structure passed to this script
 */

/**
 * Office Data Configuration
 *
 * STRUCTURE: Each office has a unique key (used in data-office attribute)
 * FIELDS:
 *   - name: Location title (shown in modal header)
 *   - address: Multi-line address (use \n for line breaks)
 *   - tel: Phone number with label
 *
 * PLUGIN NOTE: This will be replaced with wp_localize_script data:
 * wp_localize_script('interactive-map', 'officeMapData', [
 *     'offices' => $office_locations,
 *     'colors' => $marker_colors
 * ]);
 */
const officeData = {
    stamford: {
        name: "AIP Capital - Stamford",
        address: "123 Main Street\nStamford, CT 06901\nUnited States",
        tel: "Tel: +1 (203) 555-0100"
    },
    dublin: {
        name: "AIP Capital - Dublin",
        address: "45 St. Stephen's Green\nDublin 2\nIreland",
        tel: "Tel: +353 1 555 0200"
    },
    singapore: {
        name: "AIP Capital - Singapore",
        address: "8 Marina Boulevard\nSingapore 018981",
        tel: "Tel: +65 6555 0300"
    },
    seoul: {
        name: "AIP Capital - Seoul",
        address: "123 Teheran-ro\nGangnam-gu, Seoul 06234\nSouth Korea",
        tel: "Tel: +82 2 555 0400"
    },
    tokyo: {
        name: "AIP Capital - Tokyo",
        address: "1-2-3 Marunouchi\nChiyoda-ku, Tokyo 100-0005\nJapan",
        tel: "Tel: +81 3 5555 0500"
    }
};

/**
 * Initialize Interactive Map
 *
 * Sets up event listeners for:
 * - Marker clicks (opens modal with location details)
 * - Modal close button
 * - Click outside modal (closes modal)
 * - Escape key (closes modal)
 * - Body scroll lock when modal is open
 *
 * PLUGIN NOTE: This function should be called after DOM is ready
 * and can handle multiple maps on the same page by using unique IDs
 */
function initGlobalOfficesMap() {
    // Get all DOM elements needed for the interactive map
    const markers = document.querySelectorAll('.office-marker');
    const modal = document.getElementById('officeModal');
    const closeBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalAddress = document.getElementById('modalAddress');
    const modalTel = document.getElementById('modalTel');

    // Exit if modal doesn't exist on page (allows script to run on all pages)
    if (!modal) return;

    /**
     * MARKER CLICK HANDLER
     *
     * When a marker is clicked:
     * 1. Gets the office ID from data-office attribute
     * 2. Looks up office data from officeData object
     * 3. Populates modal with office information
     * 4. Shows modal with fade/slide animation
     * 5. Locks body scroll to prevent background scrolling
     *
     * PLUGIN NOTE: Add analytics tracking here for click events
     */
    markers.forEach(marker => {
        marker.addEventListener('click', function() {
            const officeId = this.getAttribute('data-office');
            const office = officeData[officeId];

            if (office) {
                // Populate modal content
                modalTitle.textContent = office.name;
                modalAddress.textContent = office.address; // \n preserved by white-space: pre-line
                modalTel.textContent = office.tel;

                // Show modal and prevent background scrolling
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // PLUGIN NOTE: Fire custom event for tracking
                // document.dispatchEvent(new CustomEvent('officeMarkerClicked', { detail: office }));
            }
        });
    });

    /**
     * CLOSE BUTTON HANDLER
     * Closes modal and restores body scroll
     */
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    /**
     * CLICK OUTSIDE HANDLER
     * Closes modal when clicking on the dark overlay (not the modal content)
     */
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /**
     * ESCAPE KEY HANDLER
     * Closes modal when user presses Escape key (accessibility)
     */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialize on DOM Ready
 *
 * PLUGIN NOTE: For multiple maps, loop through each map instance:
 * document.querySelectorAll('.interactive-map').forEach(map => {
 *     initInteractiveMap(map);
 * });
 */
/**
 * ================================================
 * STAFF TABLE COMPONENT - APPLY STRIPING
 * ================================================
 *
 * Shared function to apply alternating row colors to visible rows only
 */
function applyTableStriping(table) {
    const tbody = table.querySelector('tbody');
    const allRows = Array.from(tbody.querySelectorAll('tr:not(.no-results-row)'));
    const noResultsRow = tbody.querySelector('.no-results-row');

    const visibleRows = allRows.filter(row => !row.classList.contains('hidden') && row.style.display !== 'none');

    // Remove all striping classes
    allRows.forEach(row => row.classList.remove('table-stripe-odd', 'table-stripe-even'));

    // Apply striping to visible rows
    visibleRows.forEach((row, index) => {
        if (index % 2 === 0) {
            row.classList.add('table-stripe-even');
        } else {
            row.classList.add('table-stripe-odd');
        }
    });

    // Show/hide no results row
    if (noResultsRow) {
        if (visibleRows.length === 0) {
            noResultsRow.style.display = '';
        } else {
            noResultsRow.style.display = 'none';
        }
    }
}

/**
 * ================================================
 * STAFF TABLE COMPONENT - TABLE SORTING
 * ================================================
 *
 * Full documentation: staff-table.md
 *
 * Adds click-to-sort functionality for team directory table
 *
 * FEATURES:
 * - Click column header to sort ascending
 * - Click again to sort descending
 * - Bootstrap Icons toggle between up/down arrows
 * - Active sort highlighted in aqua
 * - Only one column sorted at a time
 *
 * WORDPRESS NOTE:
 * This function works with any table structure. No changes needed
 * for WordPress integration - just ensure table has .team-directory-table
 * class and headers have .sortable class.
 */
function initTableSorting() {
    const table = document.querySelector('.team-directory-table');
    if (!table) return;

    const headers = table.querySelectorAll('th.sortable');

    headers.forEach((header, columnIndex) => {
        header.addEventListener('click', function() {
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr:not(.no-results-row)'));
            const currentSort = this.classList.contains('asc') ? 'asc' :
                               this.classList.contains('desc') ? 'desc' : 'none';

            // Remove sort classes and reset icons for all headers
            headers.forEach(h => {
                h.classList.remove('asc', 'desc');
                const icon = h.querySelector('.sort-icon');
                if (icon) {
                    icon.classList.remove('bi-caret-up-fill');
                    icon.classList.add('bi-caret-down-fill');
                }
            });

            // Determine new sort direction
            let newSort = 'asc';
            if (currentSort === 'asc') {
                newSort = 'desc';
            }

            // Add sort class to current header
            this.classList.add(newSort);

            // Update icon for current header
            const icon = this.querySelector('.sort-icon');
            if (icon) {
                if (newSort === 'asc') {
                    icon.classList.remove('bi-caret-down-fill');
                    icon.classList.add('bi-caret-up-fill');
                } else {
                    icon.classList.remove('bi-caret-up-fill');
                    icon.classList.add('bi-caret-down-fill');
                }
            }

            // Sort rows
            const sortedRows = rows.sort((a, b) => {
                const aValue = a.cells[columnIndex].textContent.trim();
                const bValue = b.cells[columnIndex].textContent.trim();

                if (newSort === 'asc') {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
                }
            });

            // Re-append sorted rows
            sortedRows.forEach(row => tbody.appendChild(row));

            // Reapply striping after sort
            applyTableStriping(table);
        });
    });
}

/**
 * ================================================
 * STAFF TABLE COMPONENT - SEARCH AND FILTER
 * ================================================
 *
 * Full documentation: staff-table.md
 *
 * Adds real-time search and company filter for team directory table
 *
 * FEATURES:
 * - Search: Real-time search across all table columns
 * - Filter: Dropdown to filter by company
 * - Smooth fade animations when hiding/showing rows
 * - Maintains striped table pattern for visible rows only
 * - Shows "No results found" when no matches
 *
 * WORDPRESS NOTE:
 * No JavaScript changes needed for WordPress integration.
 * Ensure company filter dropdown is populated with unique company values
 * from the database (see staff-table.md for PHP code).
 */
function initTableFilters() {
    const searchInput = document.getElementById('teamSearch');
    const companyFilter = document.getElementById('companyFilter');
    const table = document.querySelector('.team-directory-table');

    if (!searchInput || !companyFilter || !table) return;

    const tbody = table.querySelector('tbody');
    const allRows = Array.from(tbody.querySelectorAll('tr:not(.no-results-row)'));

    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCompany = companyFilter.value;

        allRows.forEach(row => {
            const cells = Array.from(row.cells);
            const rowText = cells.map(cell => cell.textContent.toLowerCase()).join(' ');
            const companyCell = cells[2].textContent; // Company is 3rd column (index 2)

            // Check search match
            const matchesSearch = searchTerm === '' || rowText.includes(searchTerm);

            // Check company filter match
            const matchesCompany = selectedCompany === '' || companyCell === selectedCompany;

            // Show or hide row with smooth animation
            if (matchesSearch && matchesCompany) {
                row.classList.remove('hidden');
                row.style.display = '';
            } else {
                row.classList.add('hidden');
                // Delay display: none to allow fade animation
                setTimeout(() => {
                    if (row.classList.contains('hidden')) {
                        row.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Reapply striping after animation
        setTimeout(() => {
            applyTableStriping(table);
        }, 50);
    }

    // Apply initial striping on load
    applyTableStriping(table);

    // Add event listeners
    searchInput.addEventListener('keyup', filterTable);
    companyFilter.addEventListener('change', filterTable);
}

document.addEventListener('DOMContentLoaded', function() {
    initGlobalOfficesMap();
    initTableSorting();
    initTableFilters();
});
