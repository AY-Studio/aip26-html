# WordPress Conversion - Key Implementation Notes

## Critical Requirements

### 1. Forms Integration
**Use Gravity Forms** (not Contact Form 7)
- Install Gravity Forms plugin
- Create contact form matching design in contact.html
- Style Gravity Forms to match site design system
- Custom CSS for form fields to match `.search-filter-input` styling
- Button styling to match `.btn-aqua`
- Validation styling with aqua accent color

---

### 2. ACF Flexible Content Architecture

**All Page Components Built as Flexible Content Layouts**

Every component should be a Flexible Content layout option, allowing editors to build pages by stacking components in any order.

**ACF Field Group Structure:**
```
Page Builder (Flexible Content)
├── Hero Section (Layout 1)
├── Text-Image Block (Layout 2)
├── Stats Cards Grid (Layout 3)
├── Vision Statement (Layout 4)
├── ESG Pillars (Layout 5)
├── Key Initiatives (Layout 6)
├── Community Logos (Layout 7)
├── Charities (Layout 8)
├── News Section (Layout 9)
├── Strategies Tabs (Layout 10)
└── [Additional layouts as needed]
```

**Note:** Global components (Connect CTA, Global Reach, Strategic Partnerships) are NOT in Flexible Content - they're managed in ACF Options and can be toggled on/off per page.

---

### 3. Hero Section System

**Every Page Must Have a Hero**
- Hero is NOT part of Flexible Content
- Hero settings stored in page meta fields (separate ACF group)
- Editors select hero type per page

**Hero Type Options (Radio/Select Field):**

1. **Homepage Hero** (`.header-section`)
   - Video background upload
   - Video poster image (fallback)
   - Blue angled SVG overlay (automatic)
   - Hero description text
   - Stats grid (4 stats with count-up)
   - Fixed height: 100vh (desktop)

2. **Page Hero** (`.about-header .page-hero`)
   - Background image upload
   - Title text
   - Description text (optional)
   - Fixed height: 730px (desktop), 500px (tablet), 400px (mobile)
   - Dark overlay (automatic)

3. **News Header** (`.news-header`)
   - Background image upload
   - Title text
   - Description text (optional)
   - Fixed height: 500px (desktop), 300px (tablet), 280px (mobile)
   - Centered text with top padding

4. **Small Hero** (404/Search/Category pages)
   - Background image upload
   - Title text
   - Description text (optional)
   - Fixed height: 500px (desktop), 300px (tablet), 280px (mobile)
   - Same as News Header but separate for categorization

**ACF Hero Field Group (Applied to All Pages):**
```php
// Hero Settings
'hero_type' => [
    'type' => 'radio',
    'choices' => [
        'homepage' => 'Homepage Hero (Video + Stats)',
        'page' => 'Page Hero (730px)',
        'news' => 'News Header (500px)',
        'small' => 'Small Hero (500px - for utility pages)'
    ],
    'default' => 'page'
],

// Conditional Fields based on hero_type
'hero_background_image' => [
    'type' => 'image',
    'conditional_logic' => [
        ['hero_type', '==', 'page'],
        ['hero_type', '==', 'news'],
        ['hero_type', '==', 'small']
    ]
],

'hero_video' => [
    'type' => 'file',
    'conditional_logic' => [
        ['hero_type', '==', 'homepage']
    ]
],

'hero_title' => [
    'type' => 'text',
    'default_value' => '' // Falls back to page title if empty
],

'hero_description' => [
    'type' => 'textarea',
    'conditional_logic' => [
        ['hero_type', '!=', 'homepage']
    ]
],

'hero_stats' => [
    'type' => 'repeater',
    'min' => 4,
    'max' => 4,
    'conditional_logic' => [
        ['hero_type', '==', 'homepage']
    ],
    'sub_fields' => [
        'stat_value' => ['type' => 'number'],
        'stat_prefix' => ['type' => 'text'],
        'stat_suffix' => ['type' => 'text'],
        'stat_label' => ['type' => 'text']
    ]
]
```

**Template Implementation:**
```php
// In header.php or template part
$hero_type = get_field('hero_type') ?: 'page';
get_template_part('template-parts/hero/hero', $hero_type);
```

---

### 4. Native WordPress Menu System

**Menu Locations (Register in functions.php):**
```php
register_nav_menus([
    'primary' => 'Primary Navigation',
    'footer-our-firm' => 'Footer - Our Firm',
    'footer-strategies' => 'Footer - Strategies',
    'footer-partnerships' => 'Footer - Partnerships',
    'footer-legal' => 'Footer - Legal Links'
]);
```

**Primary Navigation Requirements:**
- Support for mega menus (custom walker class)
- Detect parent items with children for mega menu display
- Add chevron icons automatically to parent items
- Image field for mega menu preview (ACF on menu items)
- Mobile accordion functionality
- Maintain all existing JavaScript functionality

**Custom Walker for Mega Menus:**
```php
class AIP_Mega_Menu_Walker extends Walker_Nav_Menu {
    // Custom logic for:
    // - Adding mega-menu markup
    // - Rendering mega menu images from ACF
    // - Adding chevron icons
    // - Proper ARIA attributes
}
```

**ACF Fields on Menu Items:**
```php
// Add to menu items that have children
'mega_menu_image' => [
    'type' => 'image',
    'label' => 'Mega Menu Image',
    'instructions' => 'Optional image shown in mega menu dropdown'
]
```

**Menu Structure in WordPress Admin:**
```
Primary Navigation
├── Our Firm (parent)
│   ├── About Us (link to /about/)
│   ├── Careers (link to /careers/)
│   └── Community (link to /community/)
├── Our Team (link to /team/)
├── Strategies (parent)
│   ├── Strategies Overview (link to /strategies/)
│   ├── Real Assets (link to /real-assets/)
│   ├── Private Credit (link to /private-credit/)
│   ├── Strategic Partnerships (link to /strategic-partnerships/)
│   └── Asset Management (link to /asset-management/)
├── News & Insights (link to /news/)
├── Contact (link to /contact/)
└── Investor Login (external link with .btn-aqua class)
```

---

### 5. Global Components (ACF Options Page)

**Create ACF Options Page:**
```php
// In functions.php or inc/acf-fields.php
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page([
        'page_title' => 'Global Components',
        'menu_title' => 'Global Components',
        'menu_slug' => 'global-components',
        'capability' => 'edit_posts',
        'redirect' => false,
        'icon_url' => 'dashicons-admin-site-alt3'
    ]);
}
```

**Three Global Components:**

#### A. Connect With Us CTA
**Field Group:** `global_connect_cta`
```php
'connect_cta_title' => [
    'type' => 'text',
    'default_value' => 'Connect With Us to Explore Lasting Opportunities'
],
'connect_cta_description' => [
    'type' => 'textarea',
    'default_value' => 'Contact us to learn more information about our firm\'s experience, investment strategies and opportunities.'
],
'connect_cta_button_text' => [
    'type' => 'text',
    'default_value' => 'Contact us'
],
'connect_cta_button_link' => [
    'type' => 'link',
    'default_value' => '/contact/'
],
'connect_cta_background_image' => [
    'type' => 'image',
    'default_value' => 'img/paralell.jpg'
]
```

**Per-Page Toggle:**
```php
// In Page Builder meta or page settings
'show_connect_cta' => [
    'type' => 'true_false',
    'label' => 'Show Connect CTA Section',
    'default_value' => 0,
    'ui' => 1
]
```

#### B. Our Global Reach
**Field Group:** `global_reach`
```php
'global_reach_title' => [
    'type' => 'text',
    'default_value' => 'Our Global Reach'
],
'global_reach_background_image' => [
    'type' => 'image',
    'default_value' => 'img/global-reach.jpg'
],
'global_reach_video_id' => [
    'type' => 'text',
    'label' => 'YouTube Video ID',
    'default_value' => 'durrAAgumQo'
],
'global_offices' => [
    'type' => 'repeater',
    'label' => 'Office Locations',
    'min' => 1,
    'max' => 6,
    'layout' => 'table',
    'sub_fields' => [
        'office_name' => [
            'type' => 'text',
            'label' => 'Office Name'
        ],
        'timezone' => [
            'type' => 'select',
            'choices' => [
                'america_new_york' => 'America/New_York (Stamford, New York)',
                'europe_dublin' => 'Europe/Dublin',
                'asia_singapore' => 'Asia/Singapore',
                'asia_seoul' => 'Asia/Seoul',
                'asia_tokyo' => 'Asia/Tokyo'
            ]
        ],
        'map_pin_top' => [
            'type' => 'text',
            'label' => 'Map Pin Position Top (%)',
            'instructions' => 'E.g., 34'
        ],
        'map_pin_left' => [
            'type' => 'text',
            'label' => 'Map Pin Position Left (%)',
            'instructions' => 'E.g., 31'
        ]
    ],
    'default_value' => [
        ['office_name' => 'Stamford', 'timezone' => 'america_new_york', 'map_pin_top' => '34', 'map_pin_left' => '31'],
        ['office_name' => 'New York', 'timezone' => 'america_new_york', 'map_pin_top' => '37', 'map_pin_left' => '30'],
        ['office_name' => 'Dublin', 'timezone' => 'europe_dublin', 'map_pin_top' => '29', 'map_pin_left' => '46.5'],
        ['office_name' => 'Singapore', 'timezone' => 'asia_singapore', 'map_pin_top' => '58', 'map_pin_left' => '79'],
        ['office_name' => 'Seoul', 'timezone' => 'asia_seoul', 'map_pin_top' => '42', 'map_pin_left' => '84'],
        ['office_name' => 'Tokyo', 'timezone' => 'asia_tokyo', 'map_pin_top' => '43', 'map_pin_left' => '88']
    ]
]
```

**Per-Page Toggle:**
```php
'show_global_reach' => [
    'type' => 'true_false',
    'label' => 'Show Global Reach Section',
    'default_value' => 0,
    'ui' => 1
]
```

#### C. Strategic Partnerships & Control Investments
**Field Group:** `global_partnerships`
```php
'partnerships_title' => [
    'type' => 'text',
    'default_value' => 'Strategic Partnerships & Control Investments'
],
'partnerships_description' => [
    'type' => 'textarea',
    'default_value' => 'AIP Capital and its affiliates is comprised of industry leading professionals creating value through operational excellence and strategic growth initiatives.'
],
'partnerships' => [
    'type' => 'repeater',
    'label' => 'Partnership Cards',
    'min' => 1,
    'max' => 12,
    'layout' => 'block',
    'sub_fields' => [
        'logo' => [
            'type' => 'image',
            'label' => 'Company Logo',
            'return_format' => 'array'
        ],
        'logo_wide' => [
            'type' => 'true_false',
            'label' => 'Wide Logo Layout',
            'instructions' => 'Enable for text-heavy logos that need more width',
            'ui' => 1
        ],
        'title' => [
            'type' => 'text',
            'label' => 'Company Name'
        ],
        'description' => [
            'type' => 'textarea',
            'label' => 'Description',
            'rows' => 4
        ],
        'link_url' => [
            'type' => 'url',
            'label' => 'External URL',
            'instructions' => 'Company website (opens in new tab)'
        ],
        'link_text' => [
            'type' => 'text',
            'label' => 'Link Text',
            'default_value' => 'Find out more'
        ]
    ]
]
```

**Per-Page Toggle:**
```php
'show_partnerships' => [
    'type' => 'true_false',
    'label' => 'Show Strategic Partnerships Section',
    'default_value' => 0,
    'ui' => 1
]
```

---

### 6. Global Components - Template Implementation

**In page.php or template file:**
```php
<?php
// After Flexible Content loop, check for global components

// Connect CTA
if (get_field('show_connect_cta')) {
    get_template_part('template-parts/global/connect-cta');
}

// Global Reach
if (get_field('show_global_reach')) {
    get_template_part('template-parts/global/global-reach');
}

// Strategic Partnerships
if (get_field('show_partnerships')) {
    get_template_part('template-parts/global/partnerships');
}
?>
```

**Template Part Example (template-parts/global/connect-cta.php):**
```php
<?php
$title = get_field('connect_cta_title', 'option');
$description = get_field('connect_cta_description', 'option');
$button_text = get_field('connect_cta_button_text', 'option');
$button_link = get_field('connect_cta_button_link', 'option');
$bg_image = get_field('connect_cta_background_image', 'option');
?>

<section id="connect" class="connect-section padding-section-large">
    <div class="connect-section__media" aria-hidden="true">
        <img src="<?php echo esc_url($bg_image['url']); ?>" alt="" loading="lazy">
    </div>
    <div class="container-custom" data-aos="fade">
        <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
                <h2 class="connect-title"><?php echo esc_html($title); ?></h2>
                <p class="connect-description"><?php echo esc_html($description); ?></p>
                <div class="connect-buttons">
                    <a href="<?php echo esc_url($button_link); ?>" class="btn btn-aqua">
                        <?php echo esc_html($button_text); ?> <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

### 7. Page Template Structure

**Standard Page Layout:**
```php
<?php get_header(); ?>

<!-- Hero Section (always present) -->
<?php
$hero_type = get_field('hero_type') ?: 'page';
get_template_part('template-parts/hero/hero', $hero_type);
?>

<!-- Flexible Content Components -->
<?php
if (have_rows('page_builder')) {
    while (have_rows('page_builder')) {
        the_row();
        $layout = get_row_layout();
        get_template_part('template-parts/components/' . $layout);
    }
}
?>

<!-- Global Components (toggled per page) -->
<?php
if (get_field('show_partnerships')) {
    get_template_part('template-parts/global/partnerships');
}

if (get_field('show_connect_cta')) {
    get_template_part('template-parts/global/connect-cta');
}

if (get_field('show_global_reach')) {
    get_template_part('template-parts/global/global-reach');
}
?>

<?php get_footer(); ?>
```

---

### 8. Additional Global Settings (ACF Options)

**Site-wide Settings:**
```php
// General Settings Tab
'site_email' => [
    'type' => 'email',
    'label' => 'Contact Email',
    'default_value' => 'info@aipcapital.com'
],

'linkedin_url' => [
    'type' => 'url',
    'label' => 'LinkedIn Profile URL'
],

'investor_login_url' => [
    'type' => 'url',
    'label' => 'Investor Login URL',
    'default_value' => 'https://iam.intralinks.com/...'
],

// Footer Settings Tab
'footer_description' => [
    'type' => 'textarea',
    'label' => 'Footer Description',
    'default_value' => 'A global alternative investment firm specializing in real assets and private credit.'
],

'aum_footnote' => [
    'type' => 'wysiwyg',
    'label' => 'AUM Footnote Text',
    'toolbar' => 'basic',
    'default_value' => 'Assets under management ("AUM") means all equity...'
],

// Logo Settings Tab
'header_logo' => [
    'type' => 'image',
    'label' => 'Header Logo (SVG preferred)'
],

'footer_logo' => [
    'type' => 'image',
    'label' => 'Footer Logo (PNG)'
]
```

---

### 9. Dependencies Summary

**Required Plugins:**
- ✅ **ACF Pro** (for Flexible Content, Options Pages, Repeaters)
- ✅ **Gravity Forms** (for contact forms)
- ✅ Yoast SEO (recommended, not required)

**NOT Using:**
- ❌ Contact Form 7
- ❌ Custom Fields plugins other than ACF
- ❌ Page builders (Elementor, WPBakery, etc.)

---

### 10. Editor Experience

**Page Building Workflow:**

1. **Create New Page**
2. **Configure Hero:**
   - Select hero type (Homepage/Page/News/Small)
   - Upload background image or video
   - Enter title and description
   - Add stats (if homepage hero)

3. **Build Page Content:**
   - Click "Add Row" in Flexible Content
   - Select component layout
   - Fill in component fields
   - Repeat for additional sections

4. **Enable Global Components:**
   - Toggle "Show Strategic Partnerships" (if needed)
   - Toggle "Show Connect CTA" (if needed)
   - Toggle "Show Global Reach" (if needed)

5. **Publish**

**Global Component Management:**
- Navigate to "Global Components" in admin menu
- Edit once, reflects across all pages where enabled
- No need to update multiple pages

---

### 11. Menu Management Best Practices

**WordPress Admin → Appearance → Menus:**

1. Create menu items using native WordPress UI
2. For mega menu parent items:
   - Add child items (will automatically become mega menu)
   - Upload mega menu image via ACF field on menu item
3. For Investor Login button:
   - Add custom class: `btn btn-aqua`
   - Link to external URL
4. Footer menus are standard WordPress menus (no mega menu functionality)

**No Custom Menu Code in Templates:**
- All menu rendering via `wp_nav_menu()` with custom walker
- JavaScript handles mega menu interactions (already exists in scripts.js)

---

### Development Priority Order

1. **Theme Setup** - functions.php, asset enqueuing
2. **Hero System** - Template parts for all 4 hero types
3. **ACF Options Page** - Global components setup
4. **Navigation** - Custom walker for mega menus
5. **Global Components** - Connect CTA, Global Reach, Partnerships
6. **Flexible Content** - Core components (Text-Image, Stats, etc.)
7. **Homepage Template** - front-page.php with all sections
8. **Standard Pages** - page.php with flexible content
9. **News/Blog** - archive.php, single.php
10. **Utility Pages** - 404.php, search.php, category.php
11. **Gravity Forms Integration** - Contact page
12. **Testing & Refinement**

---

**Last Updated:** 2026-01-20
**Developer Notes:** These requirements supersede any conflicting information in the original conversion brief. All components must work with ACF Flexible Content, heroes are mandatory but customizable, and global components are managed centrally for efficiency.
