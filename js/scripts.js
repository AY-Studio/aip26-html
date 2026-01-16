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
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = prefix + (decimals === 1 ? target.toFixed(1) : Math.round(target)) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + (decimals === 1 ? current.toFixed(1) : Math.round(current)) + suffix;
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

    const headerSection = document.querySelector('.header-section');
    if (headerSection) {
        statsObserver.observe(headerSection);
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
// Navbar Scroll Effect - Hide on scroll down, show on scroll up
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    let lastScroll = 0;
    const scrollThreshold = 100; // Don't hide until scrolled past this point

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Don't hide navbar if mobile menu is open
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            return;
        }

        // Don't hide navbar if we're near the top
        if (currentScroll <= scrollThreshold) {
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
            navbar.style.boxShadow = 'none';
            lastScroll = currentScroll;
            return;
        }

        // Add shadow when scrolled
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';

        // Determine scroll direction
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // Scrolling down - hide navbar
            navbar.classList.add('navbar-hidden');
            navbar.classList.remove('navbar-visible');
        } else if (currentScroll < lastScroll) {
            // Scrolling up - show navbar
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
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
    initSmoothParallax();

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

    const visibleRows = allRows.filter(row =>
        !row.classList.contains('hidden') &&
        !row.classList.contains('pagination-hidden')
    );

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

            // Update pagination after sort (keeps current page)
            if (window.tablePagination) {
                window.tablePagination.update();
            } else {
                // Fallback if pagination not initialized
                applyTableStriping(table);
            }
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

        // Reset pagination to page 1 and update after animation
        setTimeout(() => {
            if (window.tablePagination) {
                window.tablePagination.reset();
            } else {
                // Fallback if pagination not initialized
                applyTableStriping(table);
            }
        }, 50);
    }

    // Apply initial striping on load
    applyTableStriping(table);

    // Add event listeners
    searchInput.addEventListener('keyup', filterTable);
    companyFilter.addEventListener('change', filterTable);
}

/**
 * ================================================
 * STAFF TABLE COMPONENT - PAGINATION
 * ================================================
 *
 * Adds pagination controls for the team directory table
 *
 * FEATURES:
 * - Configurable rows per page (10, 20, 50, 100, All)
 * - Page number buttons with ellipsis for large page counts
 * - Previous/Next navigation
 * - Shows current range and total entries
 * - Works seamlessly with search, filter, and sort
 * - Maintains striping for visible rows
 *
 * WORDPRESS NOTE:
 * No changes needed for WordPress. Pagination automatically
 * adjusts based on the number of rows in the table.
 */
function initTablePagination() {
    const table = document.querySelector('.team-directory-table');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    const rowsPerPageSelect = document.getElementById('rowsPerPage');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const paginationStart = document.getElementById('paginationStart');
    const paginationEnd = document.getElementById('paginationEnd');
    const paginationTotal = document.getElementById('paginationTotal');

    if (!rowsPerPageSelect || !prevButton || !nextButton || !paginationNumbers) return;

    let currentPage = 1;
    let rowsPerPage = 20;

    /**
     * Get all visible rows (not hidden by search/filter)
     */
    function getVisibleRows() {
        const allRows = Array.from(tbody.querySelectorAll('tr:not(.no-results-row)'));
        return allRows.filter(row => !row.classList.contains('hidden'));
    }

    /**
     * Update pagination display and show/hide rows for current page
     */
    function updatePagination() {
        const visibleRows = getVisibleRows();
        const totalRows = visibleRows.length;
        const totalPages = rowsPerPage === 'all' ? 1 : Math.ceil(totalRows / rowsPerPage);

        // Ensure current page is within bounds
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }
        if (currentPage < 1) {
            currentPage = 1;
        }

        // Calculate range
        let startIndex, endIndex;
        if (rowsPerPage === 'all') {
            startIndex = 0;
            endIndex = totalRows;
        } else {
            startIndex = (currentPage - 1) * rowsPerPage;
            endIndex = Math.min(startIndex + rowsPerPage, totalRows);
        }

        // Mark all visible rows as pagination-hidden first
        visibleRows.forEach(row => {
            row.classList.add('pagination-hidden');
        });

        // Remove pagination-hidden class from rows on current page
        visibleRows.forEach((row, index) => {
            if (index >= startIndex && index < endIndex) {
                row.classList.remove('pagination-hidden');
            }
        });

        // Update pagination info text
        if (paginationStart && paginationEnd && paginationTotal) {
            paginationTotal.textContent = totalRows;
            if (totalRows === 0) {
                paginationStart.textContent = '0';
                paginationEnd.textContent = '0';
            } else {
                paginationStart.textContent = startIndex + 1;
                paginationEnd.textContent = endIndex;
            }
        }

        // Update prev/next buttons
        if (prevButton) {
            prevButton.disabled = currentPage <= 1;
        }
        if (nextButton) {
            nextButton.disabled = currentPage >= totalPages || totalPages === 0;
        }

        // Generate page number buttons
        generatePageNumbers(totalPages);

        // Reapply striping to visible rows on current page
        applyTableStriping(table);
    }

    /**
     * Generate page number buttons with smart ellipsis
     */
    function generatePageNumbers(totalPages) {
        if (!paginationNumbers) return;

        paginationNumbers.innerHTML = '';

        if (totalPages <= 1 || rowsPerPage === 'all') {
            return; // Don't show page numbers if only 1 page or showing all
        }

        const maxButtons = 7; // Maximum number of page buttons to show
        let startPage, endPage;

        if (totalPages <= maxButtons) {
            // Show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // Calculate range with ellipsis
            const maxPagesBeforeCurrentPage = Math.floor(maxButtons / 2);
            const maxPagesAfterCurrentPage = Math.ceil(maxButtons / 2) - 1;

            if (currentPage <= maxPagesBeforeCurrentPage) {
                // Near the start
                startPage = 1;
                endPage = maxButtons - 1;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // Near the end
                startPage = totalPages - maxButtons + 2;
                endPage = totalPages;
            } else {
                // Somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage + 1;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        // Always show first page
        if (startPage > 1) {
            addPageButton(1);
            if (startPage > 2) {
                addEllipsis();
            }
        }

        // Add page buttons
        for (let i = startPage; i <= endPage; i++) {
            addPageButton(i);
        }

        // Always show last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                addEllipsis();
            }
            addPageButton(totalPages);
        }
    }

    /**
     * Add a page number button
     */
    function addPageButton(pageNum) {
        const button = document.createElement('button');
        button.className = 'btn-page-number';
        button.textContent = pageNum;
        if (pageNum === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = pageNum;
            updatePagination();
        });
        paginationNumbers.appendChild(button);
    }

    /**
     * Add ellipsis
     */
    function addEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        paginationNumbers.appendChild(ellipsis);
    }

    // Event listener for rows per page dropdown
    if (rowsPerPageSelect) {
        rowsPerPageSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            rowsPerPage = value === 'all' ? 'all' : parseInt(value);
            currentPage = 1; // Reset to first page
            updatePagination();
        });
    }

    // Event listener for previous button
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });
    }

    // Event listener for next button
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const visibleRows = getVisibleRows();
            const totalPages = rowsPerPage === 'all' ? 1 : Math.ceil(visibleRows.length / rowsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
            }
        });
    }

    // Initialize pagination
    updatePagination();

    // Return function to reset to page 1 (used by filter/search)
    return {
        reset: () => {
            currentPage = 1;
            updatePagination();
        },
        update: updatePagination
    };
}

/**
 * ================================================
 * STAFF TABLE COMPONENT - CLICKABLE ROWS
 * ================================================
 *
 * Makes table rows clickable to navigate to team member pages
 *
 * FEATURES:
 * - Entire row is clickable
 * - Respects modifier keys (Ctrl/Cmd for new tab)
 * - Cursor shows pointer on hover
 *
 * WORDPRESS NOTE:
 * Add data-href="<?php echo get_permalink($post->ID); ?>" to each <tr>
 * Example: <tr data-href="<?php echo get_permalink($post->ID); ?>">
 */
function initClickableTableRows() {
    const table = document.querySelector('.team-directory-table');
    if (!table) return;

    const tbody = table.querySelector('tbody');

    // Event delegation for better performance
    tbody.addEventListener('click', function(e) {
        // Find the closest tr with data-href
        const row = e.target.closest('tr[data-href]');

        if (row && row.dataset.href) {
            // Check if user held Ctrl/Cmd key (open in new tab)
            if (e.ctrlKey || e.metaKey) {
                window.open(row.dataset.href, '_blank');
            } else {
                window.location.href = row.dataset.href;
            }
        }
    });

    // Optional: Add keyboard navigation
    tbody.addEventListener('keydown', function(e) {
        const row = e.target.closest('tr[data-href]');

        if (row && row.dataset.href && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            window.location.href = row.dataset.href;
        }
    });
}

// ===================================
// Smooth Parallax Effect
// ===================================
/**
 * Creates an elegant parallax effect where the background moves
 * at a slower rate than the scroll, creating beautiful depth
 */
function initSmoothParallax() {
    const parallaxSections = document.querySelectorAll('.connect-section, .team-section, .text-image-block__image--parallax');

    if (parallaxSections.length === 0) return;

    // Only apply parallax on desktop for better performance
    if (window.innerWidth < 992) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;

        parallaxSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Only apply parallax when section is in viewport
            if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                // Calculate the parallax offset
                // Subtract sectionTop to start the effect when section enters viewport
                const offset = (scrolled - sectionTop) * 0.4; // 0.4 = parallax speed (slower than scroll)

                // Apply the transform with smooth movement
                section.style.backgroundPosition = `center calc(50% + ${offset}px)`;
            }
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Listen to scroll events
    window.addEventListener('scroll', requestTick);

    // Initial call
    updateParallax();
}

// ===================================
// Back to Top Button
// ===================================
/**
 * Shows/hides back to top button based on scroll position
 * Smooth scrolls to top when clicked
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');

    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top on click
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Email Obfuscation for Footer
// ===================================
function initFooterEmail() {
    const emailLink = document.getElementById('footerEmailLink');

    if (!emailLink) return;

    // Obfuscated email parts
    const user = 'info';
    const domain = 'aipcapital';
    const tld = 'com';

    // Build email address
    const email = user + '@' + domain + '.' + tld;

    // Set href and text content
    emailLink.href = 'mailto:' + email;
    emailLink.textContent = email;
}

document.addEventListener('DOMContentLoaded', function() {
    initGlobalOfficesMap();
    initTableSorting();
    initTableFilters();
    initClickableTableRows();
    initBackToTop();
    initSmoothParallax();
    initFooterEmail();

    // Initialize pagination and store reference
    window.tablePagination = initTablePagination();
});
