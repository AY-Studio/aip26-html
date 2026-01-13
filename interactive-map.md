# Interactive Map WordPress Plugin - Complete Specification

## Plugin Overview

**Name:** Interactive Map Pro
**Version:** 1.0.0
**Description:** Create beautiful, interactive maps with clickable location markers and modal popups. Perfect for office locations, store finders, real estate listings, and more.
**Author:** [Your Company]
**License:** GPL v2 or later

---

## Table of Contents

1. [Features](#features)
2. [Technical Requirements](#technical-requirements)
3. [Database Structure](#database-structure)
4. [Admin Interface](#admin-interface)
5. [Frontend Display](#frontend-display)
6. [Shortcode & Gutenberg Block](#shortcode--gutenberg-block)
7. [Embed Code Generator](#embed-code-generator)
8. [Customization Options](#customization-options)
9. [Code Implementation Guide](#code-implementation-guide)
10. [File Structure](#file-structure)

---

## Features

### Core Features
- ✅ Upload custom map images (any size, responsive)
- ✅ Click-to-place interactive marker positioning
- ✅ Drag markers to reposition after placement
- ✅ Unlimited location markers per map
- ✅ Modal popup with location details
- ✅ Customizable marker colors (per map or per marker)
- ✅ Pulsing animation (enable/disable)
- ✅ Fully responsive design
- ✅ Mobile optimized with larger touch targets
- ✅ Multiple maps per page support
- ✅ Shortcode implementation
- ✅ Gutenberg block with live preview
- ✅ Embed code for external websites
- ✅ Import/Export map configurations
- ✅ Analytics tracking (optional)

### Premium Features (Optional)
- ⭐ Google Maps integration
- ⭐ Custom marker icons (upload images instead of dots)
- ⭐ Multi-language support
- ⭐ Advanced animations
- ⭐ Click-to-call on phone numbers
- ⭐ Directions link integration
- ⭐ Search/filter markers
- ⭐ Cluster markers when close together

---

## Technical Requirements

### WordPress Requirements
- WordPress 6.0 or higher
- PHP 7.4 or higher
- MySQL 5.7 or higher

### Dependencies
- No external libraries required for core functionality
- Vanilla JavaScript (ES6+)
- WordPress REST API support
- Gutenberg editor support

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Database Structure

### Custom Post Type: `interactive_map`

```php
// Register custom post type
function register_interactive_map_post_type() {
    $args = array(
        'labels' => array(
            'name' => 'Interactive Maps',
            'singular_name' => 'Interactive Map',
            'add_new' => 'Add New Map',
            'add_new_item' => 'Add New Interactive Map',
            'edit_item' => 'Edit Map',
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-location',
        'supports' => array('title'),
        'show_in_rest' => true, // For Gutenberg
    );
    register_post_type('interactive_map', $args);
}
```

### Meta Fields (ACF or Custom)

#### Map Settings
```php
$map_meta = array(
    '_map_image' => '', // Image ID
    '_map_width' => '', // Optional: max-width in pixels
    '_map_height' => '', // Optional: max-height in pixels
    '_marker_color' => '#00D2E3', // Default marker color
    '_marker_hover_color' => '#00B8C7', // Hover color
    '_marker_size' => '16', // Marker size in pixels
    '_enable_pulse' => '1', // Enable/disable pulse animation
    '_pulse_speed' => '2', // Animation duration in seconds
    '_modal_style' => 'default', // Modal style preset
    '_background_color' => '#EEEEEE', // Section background
);
```

#### Location Data (Repeater)
```php
$locations = array(
    array(
        'id' => 'unique-id-1',
        'name' => 'Office Name',
        'address' => "123 Main St\nCity, State 12345\nCountry",
        'phone' => 'Tel: +1 (555) 123-4567',
        'email' => 'office@company.com', // Optional
        'position_x' => '22', // Percentage (0-100)
        'position_y' => '35', // Percentage (0-100)
        'custom_color' => '', // Override map default color
        'link_url' => '', // Optional external link
    ),
    // ... more locations
);
```

---

## Admin Interface

### Map Editor Screen

#### 1. Map Upload Section
```
┌─────────────────────────────────────────┐
│ Map Image                               │
├─────────────────────────────────────────┤
│ [Upload Map Image] [Remove]            │
│                                         │
│ Image Preview:                          │
│ ┌─────────────────────────┐            │
│ │                         │            │
│ │   [Uploaded map shows]  │            │
│ │                         │            │
│ └─────────────────────────┘            │
│                                         │
│ Recommended: 1920x1080px or larger     │
│ Supported: JPG, PNG, SVG               │
└─────────────────────────────────────────┘
```

#### 2. Interactive Marker Placement
```
┌─────────────────────────────────────────┐
│ Location Markers                        │
├─────────────────────────────────────────┤
│ [+ Add Location]                        │
│                                         │
│ Click on the map to place markers      │
│ Drag markers to reposition             │
│                                         │
│ ┌─────────────────────────┐            │
│ │  [Map with markers]     │            │
│ │                         │            │
│ │    ●   ●       ●        │            │
│ │                         │            │
│ └─────────────────────────┘            │
│                                         │
│ Active Locations:                       │
│ • Office 1 [Edit] [Delete]             │
│ • Office 2 [Edit] [Delete]             │
│ • Office 3 [Edit] [Delete]             │
└─────────────────────────────────────────┘
```

#### 3. Location Details Form (Slide-out Panel)
```
┌─────────────────────────────────────────┐
│ Edit Location                      [X]  │
├─────────────────────────────────────────┤
│ Location Name: *                        │
│ [_____________________________]         │
│                                         │
│ Address:                                │
│ [_____________________________]         │
│ [_____________________________]         │
│ [_____________________________]         │
│                                         │
│ Phone:                                  │
│ [_____________________________]         │
│                                         │
│ Email: (optional)                       │
│ [_____________________________]         │
│                                         │
│ Position:                               │
│ X: [___]% Y: [___]%                    │
│ (Auto-set when clicking map)           │
│                                         │
│ Custom Color: (optional)                │
│ [Color Picker]                         │
│                                         │
│ Link URL: (optional)                    │
│ [_____________________________]         │
│                                         │
│ [Save] [Cancel]                         │
└─────────────────────────────────────────┘
```

#### 4. Appearance Settings
```
┌─────────────────────────────────────────┐
│ Appearance                              │
├─────────────────────────────────────────┤
│ Default Marker Color:                   │
│ [●] #00D2E3                            │
│                                         │
│ Hover Color:                            │
│ [●] #00B8C7                            │
│                                         │
│ Marker Size:                            │
│ [16]px                                  │
│                                         │
│ Background Color:                       │
│ [●] #EEEEEE                            │
│                                         │
│ ☑ Enable pulse animation                │
│ Pulse Speed: [2] seconds               │
│                                         │
│ Modal Style:                            │
│ ⦿ Default   ○ Minimal   ○ Card         │
└─────────────────────────────────────────┘
```

#### 5. Embed & Export
```
┌─────────────────────────────────────────┐
│ Share & Export                          │
├─────────────────────────────────────────┤
│ Shortcode:                              │
│ [interactive-map id="123"]              │
│ [Copy]                                  │
│                                         │
│ Embed Code: (for external sites)        │
│ <script src="..."></script>             │
│ <div id="interactive-map-123"></div>    │
│ [Copy]                                  │
│                                         │
│ Export Configuration:                   │
│ [Download JSON]                         │
│                                         │
│ Import Configuration:                   │
│ [Choose File] [Import]                  │
└─────────────────────────────────────────┘
```

---

## Frontend Display

### HTML Structure (Generated by Plugin)

```html
<!-- Interactive Map Container -->
<section class="interactive-map-wrapper" id="interactive-map-{id}" style="background-color: {background_color};">
    <div class="interactive-map-container">
        <!-- Map Image with Markers -->
        <div class="interactive-map-image-wrapper">
            <img src="{map_image_url}" alt="Interactive Map" class="interactive-map-image">

            <!-- Location Markers (generated dynamically) -->
            <div class="map-marker"
                 data-location="{location_id}"
                 style="top: {position_y}%; left: {position_x}%;">
                <div class="map-marker-dot"
                     style="background-color: {marker_color};"></div>
            </div>
            <!-- Repeat for each location -->
        </div>
    </div>

    <!-- Modal Popup (hidden by default) -->
    <div class="map-modal" id="map-modal-{map_id}">
        <div class="map-modal-content">
            <button class="map-modal-close">&times;</button>
            <h3 class="map-modal-title"></h3>
            <div class="map-modal-body">
                <p class="map-modal-address"></p>
                <p class="map-modal-phone"></p>
                <p class="map-modal-email"></p>
            </div>
        </div>
    </div>
</section>
```

### CSS Classes (Plugin generates)

```css
/* Core styles injected by plugin */
.interactive-map-wrapper { /* Section container */ }
.interactive-map-container { /* Inner container */ }
.interactive-map-image-wrapper { /* Relative positioned wrapper */ }
.interactive-map-image { /* Map image */ }
.map-marker { /* Marker positioning */ }
.map-marker-dot { /* Visible dot */ }
.map-modal { /* Modal overlay */ }
.map-modal-content { /* Modal card */ }
.map-modal-close { /* Close button */ }
/* ... etc */
```

---

## Shortcode & Gutenberg Block

### Shortcode Implementation

**Basic Usage:**
```
[interactive-map id="123"]
```

**With Parameters:**
```
[interactive-map id="123" height="600px" marker-color="#FF0000"]
```

**PHP Implementation:**
```php
function render_interactive_map_shortcode($atts) {
    $atts = shortcode_atts(array(
        'id' => '',
        'height' => 'auto',
        'marker-color' => '',
        'background' => '',
    ), $atts);

    if (empty($atts['id'])) {
        return '<p>Please specify a map ID.</p>';
    }

    // Get map data
    $map = get_post($atts['id']);
    if (!$map || $map->post_type !== 'interactive_map') {
        return '<p>Map not found.</p>';
    }

    // Get meta data
    $locations = get_post_meta($map->ID, '_locations', true);
    $settings = get_post_meta($map->ID, '_map_settings', true);

    // Override settings with shortcode params
    if (!empty($atts['marker-color'])) {
        $settings['marker_color'] = $atts['marker-color'];
    }

    // Generate HTML
    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/map-display.php';
    return ob_get_clean();
}
add_shortcode('interactive-map', 'render_interactive_map_shortcode');
```

### Gutenberg Block

**Block Registration:**
```javascript
// block.js
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

registerBlockType('interactive-map/map', {
    title: 'Interactive Map',
    icon: 'location',
    category: 'widgets',
    attributes: {
        mapId: {
            type: 'number',
            default: 0,
        },
    },

    edit({ attributes, setAttributes }) {
        const { mapId } = attributes;

        // Fetch available maps
        const [maps, setMaps] = useState([]);

        useEffect(() => {
            wp.apiFetch({ path: '/wp/v2/interactive_map' })
                .then(data => setMaps(data));
        }, []);

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Map Settings">
                        <SelectControl
                            label="Select Map"
                            value={mapId}
                            options={maps.map(m => ({
                                label: m.title.rendered,
                                value: m.id,
                            }))}
                            onChange={val => setAttributes({ mapId: parseInt(val) })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className="interactive-map-block-preview">
                    {mapId ? (
                        <ServerSideRender
                            block="interactive-map/map"
                            attributes={attributes}
                        />
                    ) : (
                        <Placeholder
                            icon="location"
                            label="Interactive Map"
                            instructions="Select a map from the sidebar"
                        />
                    )}
                </div>
            </>
        );
    },

    save() {
        return null; // Rendered server-side
    },
});
```

---

## Embed Code Generator

### External Website Embedding

**Generated Embed Code:**
```html
<!-- Interactive Map Embed - Paste this code where you want the map to appear -->
<div id="interactive-map-{id}-embed"></div>
<script>
(function() {
    var script = document.createElement('script');
    script.src = 'https://yoursite.com/wp-json/interactive-map/v1/embed/{id}';
    script.async = true;
    document.body.appendChild(script);
})();
</script>
<noscript>
    <a href="https://yoursite.com/map/{id}" target="_blank">View Interactive Map</a>
</noscript>
```

**REST API Endpoint:**
```php
// Register embed endpoint
add_action('rest_api_init', function() {
    register_rest_route('interactive-map/v1', '/embed/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'generate_embed_script',
        'permission_callback' => '__return_true',
    ));
});

function generate_embed_script($request) {
    $map_id = $request['id'];

    // Get map data
    $map = get_post($map_id);
    if (!$map) {
        return new WP_Error('not_found', 'Map not found', array('status' => 404));
    }

    // Generate JavaScript that renders the map
    $locations = get_post_meta($map_id, '_locations', true);
    $settings = get_post_meta($map_id, '_map_settings', true);

    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/embed-script.php';
    $script = ob_get_clean();

    header('Content-Type: application/javascript');
    echo $script;
    exit;
}
```

**Embed Script Template (embed-script.php):**
```javascript
(function() {
    // Inject styles
    var style = document.createElement('style');
    style.textContent = `
        /* Copy all CSS from styles.css */
        .interactive-map-wrapper { ... }
        /* ... */
    `;
    document.head.appendChild(style);

    // Create map HTML
    var container = document.getElementById('interactive-map-<?php echo $map_id; ?>-embed');
    if (!container) return;

    container.innerHTML = `
        <?php include 'map-display.php'; ?>
    `;

    // Initialize map functionality
    var locations = <?php echo json_encode($locations); ?>;
    var settings = <?php echo json_encode($settings); ?>;

    // Initialize markers and modal
    initInteractiveMap('<?php echo $map_id; ?>', locations, settings);

    function initInteractiveMap(mapId, locations, settings) {
        // Copy JavaScript from scripts.js
        // ... marker click handlers, modal functionality, etc.
    }
})();
```

---

## Customization Options

### Admin Settings Page

Create a settings page for global defaults:

```php
// Settings page: Settings > Interactive Maps
add_action('admin_menu', function() {
    add_options_page(
        'Interactive Maps Settings',
        'Interactive Maps',
        'manage_options',
        'interactive-maps-settings',
        'render_settings_page'
    );
});

// Settings fields
register_setting('interactive_maps', 'imap_default_marker_color');
register_setting('interactive_maps', 'imap_default_marker_size');
register_setting('interactive_maps', 'imap_enable_analytics');
register_setting('interactive_maps', 'imap_google_maps_api');
```

### Filter Hooks for Developers

```php
// Allow developers to modify map output
apply_filters('interactive_map_html', $html, $map_id, $locations, $settings);

// Modify marker colors dynamically
apply_filters('interactive_map_marker_color', $color, $location, $map_id);

// Add custom fields to location data
apply_filters('interactive_map_location_fields', $fields, $location);

// Modify modal content
apply_filters('interactive_map_modal_content', $content, $location);
```

### Action Hooks for Developers

```php
// Before map renders
do_action('interactive_map_before_render', $map_id);

// After map renders
do_action('interactive_map_after_render', $map_id);

// When marker is clicked (analytics)
do_action('interactive_map_marker_clicked', $location_id, $map_id);
```

---

## Code Implementation Guide

### File Structure

```
interactive-map-pro/
├── interactive-map-pro.php          # Main plugin file
├── readme.txt                        # WordPress.org readme
├── LICENSE                           # GPL license
│
├── admin/
│   ├── class-admin.php              # Admin interface
│   ├── class-metaboxes.php          # Custom meta boxes
│   ├── class-settings.php           # Settings page
│   ├── css/
│   │   └── admin.css                # Admin styles
│   └── js/
│       ├── admin.js                 # Admin JavaScript
│       └── map-editor.js            # Interactive map editor
│
├── includes/
│   ├── class-post-type.php          # Register CPT
│   ├── class-shortcode.php          # Shortcode handler
│   ├── class-gutenberg.php          # Gutenberg block
│   ├── class-rest-api.php           # REST API endpoints
│   └── class-embed.php              # Embed code generator
│
├── public/
│   ├── class-public.php             # Frontend display
│   ├── css/
│   │   └── interactive-map.css      # Frontend styles
│   └── js/
│       └── interactive-map.js       # Frontend JavaScript
│
├── templates/
│   ├── map-display.php              # Map HTML template
│   ├── modal.php                    # Modal template
│   └── embed-script.php             # Embed JavaScript
│
└── assets/
    ├── icon-128x128.png             # Plugin icon
    └── banner-772x250.png           # Plugin banner
```

### Main Plugin File

```php
<?php
/**
 * Plugin Name: Interactive Map Pro
 * Description: Create beautiful interactive maps with clickable markers
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 * Text Domain: interactive-map-pro
 */

// Prevent direct access
if (!defined('ABSPATH')) exit;

// Define plugin constants
define('IMP_VERSION', '1.0.0');
define('IMP_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('IMP_PLUGIN_URL', plugin_dir_url(__FILE__));

// Autoloader
spl_autoload_register(function($class) {
    $prefix = 'InteractiveMapPro\\';
    $base_dir = IMP_PLUGIN_DIR . 'includes/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) return;

    $relative_class = substr($class, $len);
    $file = $base_dir . 'class-' . strtolower(str_replace('_', '-', $relative_class)) . '.php';

    if (file_exists($file)) require $file;
});

// Initialize plugin
function imp_init() {
    // Register post type
    $post_type = new InteractiveMapPro\PostType();
    $post_type->register();

    // Initialize admin
    if (is_admin()) {
        $admin = new InteractiveMapPro\Admin();
        $admin->init();
    }

    // Initialize frontend
    $public = new InteractiveMapPro\PublicDisplay();
    $public->init();

    // Register shortcode
    $shortcode = new InteractiveMapPro\Shortcode();
    $shortcode->register();

    // Register Gutenberg block
    $gutenberg = new InteractiveMapPro\Gutenberg();
    $gutenberg->register();

    // REST API
    $rest = new InteractiveMapPro\RestAPI();
    $rest->init();
}
add_action('plugins_loaded', 'imp_init');

// Activation hook
register_activation_hook(__FILE__, function() {
    flush_rewrite_rules();
});

// Deactivation hook
register_deactivation_hook(__FILE__, function() {
    flush_rewrite_rules();
});
```

---

## Implementation Checklist

### Phase 1: Core Functionality
- [ ] Create plugin structure
- [ ] Register custom post type
- [ ] Create admin interface for map upload
- [ ] Build interactive marker placement UI
- [ ] Implement marker drag-to-reposition
- [ ] Create location data form
- [ ] Save/retrieve map data from database
- [ ] Build frontend display template
- [ ] Implement modal popup functionality
- [ ] Add CSS styling (based on existing code)
- [ ] Add JavaScript functionality (based on existing code)

### Phase 2: Shortcode & Gutenberg
- [ ] Create shortcode handler
- [ ] Build Gutenberg block
- [ ] Add block preview
- [ ] Implement map selector in block inspector

### Phase 3: Customization
- [ ] Add color picker for markers
- [ ] Implement pulse animation toggle
- [ ] Add appearance settings panel
- [ ] Create settings page for global defaults
- [ ] Add import/export functionality

### Phase 4: Embed & Share
- [ ] Build embed code generator
- [ ] Create REST API endpoint for embeds
- [ ] Generate standalone JavaScript for external sites
- [ ] Test embed on external websites

### Phase 5: Polish & Launch
- [ ] Add documentation
- [ ] Create video tutorials
- [ ] Write WordPress.org readme
- [ ] Design plugin banner and icon
- [ ] Test on multiple WordPress versions
- [ ] Test on various themes
- [ ] Performance optimization
- [ ] Security audit
- [ ] Submit to WordPress.org

---

## Example Usage Scenarios

### Scenario 1: Office Locations
```
Company with 5 global offices wants to show locations on a world map.
- Upload: world-map.png
- Add 5 markers at office locations
- Enter: office names, addresses, phone numbers
- Display on "Contact Us" page
```

### Scenario 2: Store Finder
```
Retail chain with 50 stores wants regional maps.
- Create multiple maps (one per region)
- Add store markers with details
- Enable click-to-call on phone numbers
- Embed maps on store locator page
```

### Scenario 3: Real Estate Listings
```
Real estate company showcasing properties on a neighborhood map.
- Upload: neighborhood-map.jpg
- Mark available properties
- Link each marker to property detail page
- Show on listings page
```

---

## Support & Documentation

### User Documentation
- Getting Started guide
- Video tutorials for common tasks
- FAQ section
- Troubleshooting guide

### Developer Documentation
- Hook reference (filters & actions)
- Code examples
- API documentation
- Extending the plugin guide

---

## Future Enhancements

### Version 2.0 Ideas
- Google Maps integration
- Custom marker icons (upload images)
- Marker clustering
- Search/filter functionality
- Multi-language support
- Import from CSV
- Mobile app for map management
- Analytics dashboard
- A/B testing for different marker colors
- Integration with popular form plugins

---

## License & Credits

This specification is based on the Interactive Map component originally developed for AIP Capital website. The code is licensed under GPL v2 or later, compatible with WordPress.org requirements.

---

## Quick Start Code Snippet

To get started immediately, copy the existing code from:
- **HTML:** `about.html` (lines 415-454)
- **CSS:** `css/styles.css` (lines 1818-2110)
- **JavaScript:** `js/scripts.js` (lines 386-569)

These files contain production-ready code with comprehensive comments explaining every aspect of the functionality.

---

## Contact & Support

For questions about this specification or development assistance:
- Email: developer@yourcompany.com
- GitHub: github.com/yourcompany/interactive-map-pro
- Documentation: yourcompany.com/docs/interactive-map-pro

---

**Ready to build the perfect WordPress plugin!** 🚀
