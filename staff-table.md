# Staff Table Component - WordPress Implementation Guide

## Overview

The Staff Table component is a filterable, sortable, searchable directory table designed for displaying team members or staff. This guide provides complete instructions for implementing this component in WordPress using a custom post type.

**Component Location:** `team.html` (lines 192-408)
**CSS:** `css/styles.css` (lines 1151-1379)
**JavaScript:** `js/scripts.js` (lines 567-736)

---

## Features

- ✅ **Real-time Search** - Search across all fields (name, title, company, location)
- ✅ **Company Filter** - Dropdown to filter by company
- ✅ **Sortable Columns** - Click any column header to sort ascending/descending
- ✅ **Pagination** - 10, 20, 50, 100 rows per page, or show all (default: 20)
- ✅ **Clickable Rows** - Each row links to individual team member page
- ✅ **Smooth Animations** - Fade in/out when filtering
- ✅ **Responsive Design** - Mobile-friendly with touch-optimized controls
- ✅ **No Results State** - Displays "No results found" when no matches
- ✅ **Striped Rows** - Maintains alternating row colors even when filtered
- ✅ **Bootstrap Integration** - Uses Bootstrap 5 table classes and icons

---

## WordPress Implementation

### Phase 1: Custom Post Type Setup

#### 1.1 Register Custom Post Type

Add this code to your theme's `functions.php` or create a custom plugin:

```php
/**
 * Register Team Member Custom Post Type
 */
function register_team_post_type() {
    $labels = array(
        'name'                  => 'Team Members',
        'singular_name'         => 'Team Member',
        'menu_name'             => 'Team',
        'add_new'               => 'Add New',
        'add_new_item'          => 'Add New Team Member',
        'edit_item'             => 'Edit Team Member',
        'new_item'              => 'New Team Member',
        'view_item'             => 'View Team Member',
        'search_items'          => 'Search Team Members',
        'not_found'             => 'No team members found',
        'not_found_in_trash'    => 'No team members found in trash'
    );

    $args = array(
        'labels'                => $labels,
        'public'                => true,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'query_var'             => true,
        'rewrite'               => array('slug' => 'team'),
        'capability_type'       => 'post',
        'has_archive'           => true,
        'hierarchical'          => false,
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-groups',
        'supports'              => array('title', 'thumbnail'),
        'show_in_rest'          => true, // Enable Gutenberg
    );

    register_post_type('team', $args);
}
add_action('init', 'register_team_post_type');
```

#### 1.2 Register Meta Fields

```php
/**
 * Register Team Member Meta Fields
 */
function register_team_meta_fields() {
    // Name
    register_post_meta('team', 'name', array(
        'type'              => 'string',
        'description'       => 'Team member full name',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'sanitize_text_field',
    ));

    // Title/Position
    register_post_meta('team', 'title', array(
        'type'              => 'string',
        'description'       => 'Team member job title',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'sanitize_text_field',
    ));

    // Company
    register_post_meta('team', 'company', array(
        'type'              => 'string',
        'description'       => 'Company name',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'sanitize_text_field',
    ));

    // Location
    register_post_meta('team', 'location', array(
        'type'              => 'string',
        'description'       => 'Office location',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'sanitize_text_field',
    ));
}
add_action('init', 'register_team_meta_fields');
```

---

### Phase 2: Admin Interface

#### 2.1 Add Meta Boxes

```php
/**
 * Add Team Member Meta Boxes
 */
function add_team_meta_boxes() {
    add_meta_box(
        'team_details',
        'Team Member Details',
        'render_team_meta_box',
        'team',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_team_meta_boxes');

/**
 * Render Team Member Meta Box
 */
function render_team_meta_box($post) {
    // Add nonce for security
    wp_nonce_field('team_meta_box', 'team_meta_box_nonce');

    // Get current values
    $name = get_post_meta($post->ID, 'name', true);
    $title = get_post_meta($post->ID, 'title', true);
    $company = get_post_meta($post->ID, 'company', true);
    $location = get_post_meta($post->ID, 'location', true);
    ?>
    <style>
        .team-meta-field { margin-bottom: 20px; }
        .team-meta-field label { display: block; font-weight: 600; margin-bottom: 5px; }
        .team-meta-field input { width: 100%; padding: 8px; }
    </style>

    <div class="team-meta-field">
        <label for="team_name">Full Name *</label>
        <input type="text" id="team_name" name="team_name" value="<?php echo esc_attr($name); ?>" required>
    </div>

    <div class="team-meta-field">
        <label for="team_title">Job Title *</label>
        <input type="text" id="team_title" name="team_title" value="<?php echo esc_attr($title); ?>" required>
    </div>

    <div class="team-meta-field">
        <label for="team_company">Company *</label>
        <input type="text" id="team_company" name="team_company" value="<?php echo esc_attr($company); ?>" required>
        <p class="description">Enter company name (e.g., AIP Capital, Phoenix Aviation Capital)</p>
    </div>

    <div class="team-meta-field">
        <label for="team_location">Location *</label>
        <input type="text" id="team_location" name="team_location" value="<?php echo esc_attr($location); ?>" required>
        <p class="description">Enter office location (e.g., Stamford, New York, Dublin)</p>
    </div>
    <?php
}

/**
 * Save Team Member Meta Data
 */
function save_team_meta_data($post_id) {
    // Check nonce
    if (!isset($_POST['team_meta_box_nonce']) ||
        !wp_verify_nonce($_POST['team_meta_box_nonce'], 'team_meta_box')) {
        return;
    }

    // Check autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Save meta fields
    if (isset($_POST['team_name'])) {
        update_post_meta($post_id, 'name', sanitize_text_field($_POST['team_name']));
    }
    if (isset($_POST['team_title'])) {
        update_post_meta($post_id, 'title', sanitize_text_field($_POST['team_title']));
    }
    if (isset($_POST['team_company'])) {
        update_post_meta($post_id, 'company', sanitize_text_field($_POST['team_company']));
    }
    if (isset($_POST['team_location'])) {
        update_post_meta($post_id, 'location', sanitize_text_field($_POST['team_location']));
    }
}
add_action('save_post_team', 'save_team_meta_data');
```

---

### Phase 3: Frontend Display (Shortcode)

#### 3.1 Create Shortcode

```php
/**
 * Staff Table Shortcode
 * Usage: [staff-table]
 */
function staff_table_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(array(
        'title' => 'AIP Capital Team',
        'description' => "AIP Capital's team is composed of seasoned investment professionals with deep expertise across asset-based finance.",
        'show_title' => 'yes',
        'show_description' => 'yes',
    ), $atts);

    // Query team members
    $args = array(
        'post_type'      => 'team',
        'posts_per_page' => -1,
        'orderby'        => 'meta_value',
        'meta_key'       => 'name',
        'order'          => 'ASC',
    );
    $team_query = new WP_Query($args);

    // Get unique companies for filter
    $companies = get_unique_companies();

    // Start output buffering
    ob_start();
    ?>

    <section class="team-directory-section padding-section-large">
        <div class="container-custom">

            <?php if ($atts['show_title'] === 'yes' || $atts['show_description'] === 'yes'): ?>
            <div class="row">
                <div class="col-lg-8">
                    <?php if ($atts['show_title'] === 'yes'): ?>
                        <h2 class="team-directory-title"><?php echo esc_html($atts['title']); ?></h2>
                    <?php endif; ?>

                    <?php if ($atts['show_description'] === 'yes'): ?>
                        <p class="team-directory-description"><?php echo esc_html($atts['description']); ?></p>
                    <?php endif; ?>
                </div>
            </div>
            <?php endif; ?>

            <!-- Search and Filter Controls -->
            <div class="row mt-5 align-items-center mb-4">
                <div class="col-md-6"></div>
                <div class="col-md-6">
                    <div class="table-controls">
                        <div class="table-search">
                            <input type="text" id="teamSearch" class="form-control" placeholder="Search...">
                        </div>
                        <div class="table-filter">
                            <select id="companyFilter" class="form-select">
                                <option value="">All Companies</option>
                                <?php foreach ($companies as $company): ?>
                                    <option value="<?php echo esc_attr($company); ?>">
                                        <?php echo esc_html($company); ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover team-directory-table">
                            <thead>
                                <tr>
                                    <th class="sortable">
                                        Name
                                        <i class="bi bi-caret-down-fill sort-icon"></i>
                                    </th>
                                    <th class="sortable">
                                        Title
                                        <i class="bi bi-caret-down-fill sort-icon"></i>
                                    </th>
                                    <th class="sortable">
                                        Company
                                        <i class="bi bi-caret-down-fill sort-icon"></i>
                                    </th>
                                    <th class="sortable">
                                        Location
                                        <i class="bi bi-caret-down-fill sort-icon"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if ($team_query->have_posts()): ?>
                                    <?php while ($team_query->have_posts()): $team_query->the_post(); ?>
                                        <tr data-href="<?php echo esc_url(get_permalink()); ?>">
                                            <td><?php echo esc_html(get_post_meta(get_the_ID(), 'name', true)); ?></td>
                                            <td><?php echo esc_html(get_post_meta(get_the_ID(), 'title', true)); ?></td>
                                            <td><?php echo esc_html(get_post_meta(get_the_ID(), 'company', true)); ?></td>
                                            <td><?php echo esc_html(get_post_meta(get_the_ID(), 'location', true)); ?></td>
                                        </tr>
                                    <?php endwhile; ?>
                                    <?php wp_reset_postdata(); ?>
                                <?php else: ?>
                                    <tr>
                                        <td colspan="4" class="text-center">No team members found</td>
                                    </tr>
                                <?php endif; ?>

                                <!-- No Results Row (for filtering) -->
                                <tr class="no-results-row" style="display: none;">
                                    <td colspan="4" class="text-center">No results found</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php
    return ob_get_clean();
}
add_shortcode('staff-table', 'staff_table_shortcode');

/**
 * Get Unique Companies for Filter Dropdown
 */
function get_unique_companies() {
    global $wpdb;

    $companies = $wpdb->get_col(
        "SELECT DISTINCT meta_value
         FROM {$wpdb->postmeta}
         WHERE meta_key = 'company'
         AND meta_value != ''
         ORDER BY meta_value ASC"
    );

    return $companies;
}
```

---

### Phase 4: Enqueue Assets

#### 4.1 Enqueue CSS and JavaScript

```php
/**
 * Enqueue Staff Table Assets
 */
function enqueue_staff_table_assets() {
    // Check if shortcode is used on the page
    global $post;
    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'staff-table')) {

        // Bootstrap Icons (if not already loaded)
        wp_enqueue_style(
            'bootstrap-icons',
            'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
            array(),
            '1.11.3'
        );

        // Custom Staff Table CSS
        wp_enqueue_style(
            'staff-table-styles',
            get_template_directory_uri() . '/css/styles.css',
            array(),
            '1.0.0'
        );

        // Custom Staff Table JavaScript
        wp_enqueue_script(
            'staff-table-scripts',
            get_template_directory_uri() . '/js/scripts.js',
            array('jquery'),
            '1.0.0',
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'enqueue_staff_table_assets');
```

---

### Phase 5: Gutenberg Block (Optional)

#### 5.1 Register Gutenberg Block

```php
/**
 * Register Staff Table Gutenberg Block
 */
function register_staff_table_block() {
    // Register block
    register_block_type('aip/staff-table', array(
        'editor_script'   => 'staff-table-block-editor',
        'editor_style'    => 'staff-table-block-editor-style',
        'style'           => 'staff-table-block-style',
        'render_callback' => 'render_staff_table_block',
        'attributes'      => array(
            'title' => array(
                'type'    => 'string',
                'default' => 'AIP Capital Team',
            ),
            'description' => array(
                'type'    => 'string',
                'default' => "AIP Capital's team is composed of seasoned investment professionals.",
            ),
            'showTitle' => array(
                'type'    => 'boolean',
                'default' => true,
            ),
            'showDescription' => array(
                'type'    => 'boolean',
                'default' => true,
            ),
        ),
    ));
}
add_action('init', 'register_staff_table_block');

/**
 * Render Staff Table Block
 */
function render_staff_table_block($attributes) {
    $atts = array(
        'title'            => $attributes['title'],
        'description'      => $attributes['description'],
        'show_title'       => $attributes['showTitle'] ? 'yes' : 'no',
        'show_description' => $attributes['showDescription'] ? 'yes' : 'no',
    );

    return staff_table_shortcode($atts);
}
```

---

## Usage Examples

### Example 1: Basic Shortcode

```
[staff-table]
```

### Example 2: Custom Title and Description

```
[staff-table
    title="Our Leadership Team"
    description="Meet the experienced professionals leading our organization."]
```

### Example 3: Hide Title

```
[staff-table show_title="no"]
```

### Example 4: Table Only (No Header)

```
[staff-table show_title="no" show_description="no"]
```

---

## Customization

### CSS Customization

All styles are located in `css/styles.css` starting at line 1151. Key customization points:

```css
/* Background Color */
.team-directory-section {
    background-color: #EEEEEE; /* Change to your brand color */
}

/* Table Header Color */
.team-directory-table thead {
    background-color: #1A2332; /* Change to your brand color */
}

/* Active Sort Icon Color */
.team-directory-table thead th.sortable.asc .sort-icon,
.team-directory-table thead th.sortable.desc .sort-icon {
    color: var(--color-aqua); /* Change to your brand color */
}

/* Column Widths */
.team-directory-table thead th:nth-child(1) { width: 20%; } /* Name */
.team-directory-table thead th:nth-child(2) { width: 30%; } /* Title */
.team-directory-table thead th:nth-child(3) { width: 30%; } /* Company */
.team-directory-table thead th:nth-child(4) { width: 20%; } /* Location */
```

### JavaScript Customization

All JavaScript is located in `js/scripts.js` starting at line 567. The code is modular and well-commented for easy customization.

---

## Database Schema

### Posts Table
```
wp_posts
├── ID (post_id)
├── post_title (used for admin reference)
├── post_type = 'team'
├── post_status = 'publish'
└── post_date
```

### Post Meta Table
```
wp_postmeta
├── post_id → wp_posts.ID
├── meta_key = 'name' → Full name
├── meta_key = 'title' → Job title
├── meta_key = 'company' → Company name
└── meta_key = 'location' → Office location
```

---

## Performance Optimization

### Caching

```php
/**
 * Cache Team Members Query
 */
function get_cached_team_members() {
    $cache_key = 'staff_table_team_members';
    $team_members = wp_cache_get($cache_key);

    if (false === $team_members) {
        $args = array(
            'post_type'      => 'team',
            'posts_per_page' => -1,
            'orderby'        => 'meta_value',
            'meta_key'       => 'name',
            'order'          => 'ASC',
        );
        $team_query = new WP_Query($args);
        $team_members = $team_query->posts;

        // Cache for 1 hour
        wp_cache_set($cache_key, $team_members, '', 3600);
    }

    return $team_members;
}

/**
 * Clear Cache When Team Member Updated
 */
function clear_team_cache($post_id) {
    if (get_post_type($post_id) === 'team') {
        wp_cache_delete('staff_table_team_members');
    }
}
add_action('save_post', 'clear_team_cache');
```

---

## Security Best Practices

1. **Always Sanitize Input**
   ```php
   sanitize_text_field($_POST['team_name'])
   ```

2. **Always Escape Output**
   ```php
   echo esc_html($name);
   echo esc_attr($company);
   ```

3. **Use Nonces for Forms**
   ```php
   wp_nonce_field('team_meta_box', 'team_meta_box_nonce');
   wp_verify_nonce($_POST['team_meta_box_nonce'], 'team_meta_box');
   ```

4. **Check User Capabilities**
   ```php
   if (!current_user_can('edit_post', $post_id)) {
       return;
   }
   ```

---

## Troubleshooting

### Issue: Table not displaying

**Solution:** Check that:
1. Bootstrap 5 CSS/JS is loaded
2. Bootstrap Icons CSS is loaded
3. Custom CSS and JS are enqueued
4. Team posts exist and are published

### Issue: Sorting not working

**Solution:** Check browser console for JavaScript errors. Ensure:
1. jQuery is loaded before custom JS
2. Table has `.team-directory-table` class
3. Headers have `.sortable` class

### Issue: Filter not populating

**Solution:** Check that:
1. Team members have company meta field populated
2. `get_unique_companies()` function is working
3. Database query permissions are correct

### Issue: Striping breaks when filtering

**Solution:** This should not happen as the JavaScript automatically reapplies striping. If it does:
1. Check that rows don't have `.no-results-row` class
2. Verify `applyStriping()` function is being called
3. Check CSS for conflicting Bootstrap overrides

---

## Future Enhancements

Potential additions for future versions:

1. **Pagination** - Add pagination for large teams
2. **Export** - Export table data to CSV/Excel
3. **Bio Modal** - Click row to view full biography
4. **Photos** - Add team member photos
5. **Departments** - Additional filter for department
6. **REST API** - Expose team data via REST API
7. **Import/Export** - CSV import for bulk team member creation
8. **Advanced Search** - Search individual columns
9. **Sort Memory** - Remember last sort preference
10. **AJAX Loading** - Load table data via AJAX for better performance

---

## Support

For questions or issues with this component:

1. Review this documentation thoroughly
2. Check inline code comments in HTML, CSS, and JavaScript files
3. Verify all dependencies are loaded (Bootstrap 5, Bootstrap Icons)
4. Test in a clean WordPress installation to rule out theme/plugin conflicts

---

## Version History

- **v1.0.0** (2026-01-13)
  - Initial release
  - Search, filter, and sort functionality
  - Responsive design
  - WordPress shortcode implementation
  - Comprehensive documentation

---

## Credits

**Component Design:** AIP Capital
**Development:** Custom implementation
**Framework:** Bootstrap 5
**Icons:** Bootstrap Icons
**Documentation:** staff-table.md

---

**End of Documentation**
