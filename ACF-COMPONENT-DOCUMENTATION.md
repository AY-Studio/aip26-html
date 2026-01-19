# AIP Capital - ACF Flexible Content Component Documentation

**Senior Developer Reference Guide**
**Last Updated:** 2026-01-19

This document provides comprehensive ACF field configuration for all reusable components found in `components.html`. Use this as a reference when building WordPress ACF Flexible Content layouts.

---

## Table of Contents

1. [Text + Image Block](#1-text--image-block)
2. [Platform Snapshot (Stats Cards)](#2-platform-snapshot-stats-cards)
3. [Values Section (Icon Cards)](#3-values-section-icon-cards)
4. [Strategies Overview Cards](#4-strategies-overview-cards)
5. [Global Offices Interactive Map](#5-global-offices-interactive-map)
6. [Featured Platform Block](#6-featured-platform-block)
7. [Value Framework Section](#7-value-framework-section)
8. [Product Offerings Section](#8-product-offerings-section)
9. [Asset Types Section](#9-asset-types-section)
10. [ESG Pillars Section](#10-esg-pillars-section)
11. [Key Initiatives Section](#11-key-initiatives-section)
12. [Stats Section (Left-Aligned)](#12-stats-section-left-aligned)
13. [Charities Section](#13-charities-section)
14. [Contact Form Section](#14-contact-form-section)
15. [Global Offices Cards](#15-global-offices-cards)
16. [Connect With Us CTA](#16-connect-with-us-cta)
17. [Global Reach Video Section](#17-global-reach-video-section)
18. [Community Logos Section](#18-community-logos-section)
19. [Team Member Cards Grid](#19-team-member-cards-grid)
20. [Staff Directory Table](#20-staff-directory-table)

---

## 1. Text + Image Block

**Component Class:** `.text-image-block`
**Location:** components.html line ~476
**Examples:** about.html, strategies.html, private-credit.html, real-assets.html

### ACF Fields

#### 1.1 Theme (Button Group) - REQUIRED
- **Options:**
  - `light`: Light grey background (#EEEEEE), dark text, aqua accent
  - `dark`: Dark blue background (#0C162C), white text
  - `grey`: Grey background (#EEEEEE), dark text
- **Default:** `light`
- **CSS Classes:** `.text-image-block--light`, `.text-image-block--dark`, `.text-image-block--grey`

#### 1.2 Layout (Button Group) - REQUIRED
- **Options:**
  - `text-left`: Text on left, image on right (default)
  - `text-right`: Text on right, image on left
- **Default:** `text-left`
- **CSS Classes:** `.text-image-block--text-right` (when text-right selected)
- **Bootstrap:** Add `.order-lg-1` to image column, `.order-lg-2` to content column when text-right

#### 1.3 Title (Text) - REQUIRED
- **Max Characters:** 100
- **Outputs to:** `<h2 class="text-image-block__title text-image-block__title--accent">`

#### 1.4 Content Type (Button Group) - REQUIRED
- **Options:**
  - `intro_list`: Intro paragraph + bulleted list
  - `paragraph`: Simple paragraph text (WYSIWYG)
- **Default:** `paragraph`
- **Conditional Logic:** Shows different fields based on selection

#### 1.5 Intro Text (Textarea) - CONDITIONAL
- **Show if:** `content_type == intro_list`
- **Rows:** 3
- **Outputs to:** `<div class="text-image-block__intro">`

#### 1.6 List Items (Repeater) - CONDITIONAL
- **Show if:** `content_type == intro_list`
- **Min:** 0, **Max:** 10
- **Button Label:** "Add List Item"
- **Sub-fields:**
  - `text` (Textarea, Rows: 3)
- **Outputs to:** `<ul class="text-image-block__list"><li class="text-image-block__list-item">`
- **Note:** Bullet icon `img/asset-bullet.svg` is hardcoded in template

#### 1.7 Description (WYSIWYG) - CONDITIONAL
- **Show if:** `content_type == paragraph`
- **Toolbar:** Basic (bold, italic, link, lists)
- **Media Upload:** No
- **Outputs to:** `<div class="text-image-block__description">`

#### 1.8 Image (Image) - REQUIRED
- **Return Format:** Array
- **Preview Size:** Medium
- **Required Size:** 1200x800px minimum
- **Outputs to:** `<img>` with class `.img-fluid` or `.parallax-img`

#### 1.9 Buttons (Group) - OPTIONAL
- **Sub-fields:**
  - `enable_buttons` (True/False)
  - `button_1_text` (Text)
  - `button_1_link` (Link)
  - `button_1_style` (Select: btn-aqua, btn-white-ghost, btn-aqua-ghost)
  - `button_2_text` (Text) - Optional
  - `button_2_link` (Link) - Optional
  - `button_2_style` (Select: btn-aqua, btn-white-ghost, btn-aqua-ghost)

---

## 2. Platform Snapshot (Stats Cards)

**Component Class:** `.platform-snapshot-section`
**Location:** components.html line ~503
**Examples:** about.html

### ACF Fields

#### 2.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="snapshot-title snapshot-title-with-accent">`

#### 2.2 Stats Cards (Repeater) - REQUIRED
- **Min:** 1, **Max:** 12
- **Button Label:** "Add Stat Card"
- **Layout:** Block
- **Sub-fields:**
  - `title` (Text, Max: 40) - Example: "Assets Under Management"
  - `stat_value` (Number) - Supports decimals
  - `prefix` (Text, Max: 5) - Example: "$"
  - `suffix` (Text, Max: 10) - Example: "b+", "+", "%"

### Layout
- **Grid:** 3 columns (Bootstrap: `.col-lg-4 .col-md-6`)
- **Card Background:** Dark (#1A2332)
- **Number Color:** Aqua (#00D2E3)
- **Animation:** Count-up on scroll (JavaScript: `data-count` attribute)

---

## 3. Values Section (Icon Cards)

**Component Class:** `.values-section`
**Location:** components.html line ~734
**Examples:** about.html

### ACF Fields

#### 3.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="values-section__title">`

#### 3.2 Description (Textarea) - REQUIRED
- **Rows:** 5
- **Max Characters:** 500
- **Outputs to:** `<p class="values-section__description">`

#### 3.3 Value Cards (Repeater) - REQUIRED
- **Min:** 3, **Max:** 6
- **Recommended:** 3 cards for optimal layout
- **Button Label:** "Add Value Card"
- **Sub-fields:**
  - `icon` (Image) - Recommended: SVG or PNG, 200x200px
  - `title` (Text, Max: 40)
  - `description` (Textarea, Rows: 4, Max: 300)

### Layout
- **Grid:** 3 columns (`.col-lg-4 .col-md-6`)
- **Card Style:** White with border, hover shadow
- **Icon Position:** Top of card

---

## 4. Strategies Overview Cards

**Component Class:** `.strategies-overview-section`
**Location:** components.html line ~769
**Examples:** about.html

### ACF Fields

#### 4.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="strategies-overview-title strategies-title-with-accent">`

#### 4.2 Description (Textarea) - REQUIRED
- **Rows:** 3
- **Max Characters:** 300
- **Outputs to:** `<p class="strategies-overview-description">`

#### 4.3 Strategy Cards (Repeater) - REQUIRED
- **Min:** 1, **Max:** 8
- **Button Label:** "Add Strategy Card"
- **Sub-fields:**
  - `image` (Image) - 800x600px minimum
  - `title` (Text, Max: 60)
  - `description` (Textarea, Rows: 4, Max: 300)
  - `link` (Link) - Link text: "Learn more"

### Layout
- **Grid:** 2 columns (`.col-lg-6`)
- **Hover:** Card lifts with shadow
- **Link:** Sequential underline animation

---

## 5. Global Offices Interactive Map

**Component Class:** `.global-offices-section`
**Location:** components.html line ~890
**Examples:** about.html

### ACF Fields

#### 5.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="global-offices-title global-offices-title-with-accent">`

#### 5.2 Description (Textarea) - REQUIRED
- **Rows:** 3
- **Max Characters:** 300
- **Outputs to:** `<p class="global-offices-description">`

#### 5.3 Map Image (Image) - REQUIRED
- **Return Format:** URL
- **Recommended:** World map SVG or PNG

#### 5.4 Office Locations (Repeater) - REQUIRED
- **Min:** 1, **Max:** 20
- **Button Label:** "Add Office Location"
- **Sub-fields:**
  - `office_id` (Text) - Slug format (e.g., "stamford", "new-york")
  - `name` (Text) - Display name
  - `address` (Textarea)
  - `phone` (Text) - Optional
  - `position_top` (Number) - Percentage (0-100)
  - `position_left` (Number) - Percentage (0-100)

#### 5.5 CTA Button (Group) - OPTIONAL
- **Sub-fields:**
  - `button_text` (Text)
  - `button_link` (Link)
  - `button_style` (Select: btn-aqua, btn-black-ghost)

### JavaScript Integration
- Markers: `data-office` attribute must match `office_id`
- Modal: Populated from `officeData` object in scripts.js
- See `js/scripts.js` `initGlobalOfficesMap()` function

---

## 6. Featured Platform Block

**Component Class:** `.featured-platform-block`
**Location:** components.html line ~943
**Examples:** real-assets.html, asset-management.html, strategic-partnerships.html

### ACF Fields

#### 6.1 Background Theme (Button Group) - REQUIRED
- **Options:**
  - `standard`: Default white/light background
  - `alternate`: Dark background variant
- **Default:** `standard`
- **CSS Class:** `.featured-platform-block--bg-alt` (when alternate)

#### 6.2 Logo (Image) - REQUIRED
- **Return Format:** URL
- **Recommended:** SVG or PNG with transparency
- **Outputs to:** `<img class="featured-platform-block__logo">`

#### 6.3 Logo Size (Button Group) - REQUIRED
- **Options:**
  - `standard`: Normal width logo
  - `wide`: Extended width for wider logos
- **CSS Class:** `.featured-platform-block__logo--wide` (when wide)

#### 6.4 Label (Text) - REQUIRED
- **Max Characters:** 30
- **Example:** "FEATURED PLATFORM", "BUSINESS AVIATION"
- **Outputs to:** `<div class="featured-platform-block__label">`

#### 6.5 Title (Text) - REQUIRED
- **Max Characters:** 80
- **Outputs to:** `<h2 class="featured-platform-block__title">`

#### 6.6 Description (WYSIWYG) - REQUIRED
- **Toolbar:** Basic
- **Outputs to:** `<div class="featured-platform-block__description">`

#### 6.7 Stats (Repeater) - OPTIONAL
- **Min:** 0, **Max:** 6
- **Button Label:** "Add Stat"
- **Sub-fields:**
  - `value` (Text) - Example: "$2.4B+"
  - `label` (Text) - Example: "Assets Under Management"

#### 6.8 Image (Image) - REQUIRED
- **Return Format:** Array
- **Recommended:** 800x600px minimum
- **Outputs to:** Left column image

#### 6.9 Buttons (Group) - OPTIONAL
- **Sub-fields:**
  - `button_1_text` (Text)
  - `button_1_link` (Link)
  - `button_1_style` (Select: btn-aqua, btn-aqua-ghost, btn-white-ghost)
  - `button_2_text` (Text) - Optional
  - `button_2_link` (Link) - Optional

### Variations
- **Standard Background:** White/light
- **Alternate Background (--bg-alt):** Dark background with adjusted text colors
- **Wide Logo (--logo--wide):** Extended width for wider company logos

---

## 7. Value Framework Section

**Component Class:** `.value-framework-section`
**Location:** components.html line ~1005
**Examples:** real-assets.html, private-credit.html, strategic-partnerships.html

### ACF Fields

#### 7.1 Theme (Button Group) - REQUIRED
- **Options:**
  - `dark`: Dark theme with white text
  - `light`: Light/grey background
- **Default:** `light`
- **CSS Class:** `.value-framework-section--dark`

#### 7.2 Background Color (Color Picker) - OPTIONAL
- **Purpose:** Allow custom background colors
- **Examples:** #FFFFFF, #EEEEEE, #0C162C
- **Outputs:** Inline style `background-color`

#### 7.3 Title (Text) - REQUIRED
- **Max Characters:** 80
- **Outputs to:** `<h2 class="value-framework-section__title value-framework-section__title--accent">`

#### 7.4 Description (Textarea) - REQUIRED
- **Rows:** 4
- **Max Characters:** 400
- **Outputs to:** `<p class="value-framework-section__description">`

#### 7.5 Value Cards (Repeater) - REQUIRED
- **Min:** 3, **Max:** 6
- **Recommended:** 3 cards
- **Button Label:** "Add Value Card"
- **Sub-fields:**
  - `title` (Text, Max: 60)
  - `description` (Textarea, Rows: 4, Max: 300)

### Layout
- **Grid:** 3 columns (`.col-lg-4`)
- **No Icons:** Text-only cards

---

## 8. Product Offerings Section

**Component Class:** `.product-offerings-section`
**Location:** components.html line ~1037
**Examples:** private-credit.html

### ACF Fields

#### 8.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="section-title section-title-with-accent">`

#### 8.2 Product Cards (Repeater) - REQUIRED
- **Min:** 1, **Max:** 12
- **Button Label:** "Add Product Card"
- **Sub-fields:**
  - `icon` (Image) - SVG recommended
  - `title` (Text, Max: 60)

### Styling
- **Background:** Navy blue (#0C162C)
- **Text Color:** White
- **Grid:** 3 columns (`.col-lg-4 .col-md-6`)

---

## 9. Asset Types Section

**Component Class:** `.asset-types-section`
**Location:** components.html line ~1075
**Examples:** private-credit.html

### ACF Fields

#### 9.1 Background Color (Color Picker) - REQUIRED
- **Default:** #EEEEEE
- **Outputs:** Inline style

#### 9.2 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="section-title section-title-with-accent">`

#### 9.3 Title Color (Color Picker) - REQUIRED
- **Default:** #364153
- **Outputs:** Inline style

#### 9.4 Asset Images (Gallery) - REQUIRED
- **Return Format:** Array
- **Min:** 1, **Max:** 20
- **Recommended Size:** 400x300px
- **Layout:** Grid display with logos/images

---

## 10. ESG Pillars Section

**Component Class:** `.esg-pillars-section`
**Location:** components.html line ~1097
**Examples:** sustainability.html

### ACF Fields

#### 10.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="esg-pillars-section__title">`

#### 10.2 Pillar Cards (Repeater) - REQUIRED
- **Min:** 3, **Max:** 3 (Fixed)
- **Button Label:** "Add Pillar"
- **Sub-fields:**
  - `icon_image` (Image) - 400x400px recommended
  - `title` (Text, Max: 40)
  - `description` (Textarea, Rows: 5, Max: 400)

### Layout
- **Grid:** 3 columns (`.col-lg-4`)
- **Icon:** Image displayed above content

---

## 11. Key Initiatives Section

**Component Class:** `.key-initiatives-section`
**Location:** components.html line ~1141
**Examples:** sustainability.html

### ACF Fields

#### 11.1 Title (Text) - REQUIRED
- **Max Characters:** 80
- **Outputs to:** `<h2 class="key-initiatives-section__title key-initiatives-section__title--accent">`

#### 11.2 Initiative Items (Repeater) - REQUIRED
- **Min:** 1, **Max:** 12
- **Recommended:** 6 items
- **Button Label:** "Add Initiative"
- **Sub-fields:**
  - `title` (Text, Max: 50)
  - `description` (Textarea, Rows: 4, Max: 300)

### Layout
- **Grid:** 3 columns (`.col-lg-4 .col-md-6`)
- **Style:** Text-only, no icons or numbers

---

## 12. Stats Section (Left-Aligned)

**Component Class:** `.stats-section`
**Location:** components.html line ~1189
**Examples:** sustainability.html

### ACF Fields

#### 12.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="stats-title">`

#### 12.2 Description (WYSIWYG) - REQUIRED
- **Toolbar:** Basic
- **Outputs to:** `<div class="stats-description">`

#### 12.3 Stat Items (Repeater) - REQUIRED
- **Min:** 1, **Max:** 6
- **Recommended:** 4 items (2x2 grid)
- **Button Label:** "Add Stat"
- **Sub-fields:**
  - `number` (Number) - Count-up value
  - `suffix` (Text, Max: 10) - Example: "+", "%"
  - `label` (Text, Max: 40)

### Layout
- **Two-column:** Title/description left (col-lg-6), stats right (col-lg-6)
- **Stats Grid:** 2x2 on desktop
- **Animation:** Count-up on scroll

---

## 13. Charities Section

**Component Class:** `.charities-section`
**Location:** components.html line ~999
**Examples:** community.html

### ACF Fields

#### 13.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="charities-section__title charities-section__title--accent">`

#### 13.2 Description (WYSIWYG) - REQUIRED
- **Toolbar:** Basic
- **Outputs to:** `<div class="charities-section__description">`

#### 13.3 Charity Cards (Repeater) - REQUIRED
- **Min:** 1, **Max:** 12
- **Button Label:** "Add Charity"
- **Sub-fields:**
  - `image` (Image) - 800x600px recommended
  - `logo` (Image) - PNG/SVG with transparency
  - `name` (Text, Max: 60)
  - `description` (Textarea, Rows: 4, Max: 300)
  - `link` (Link) - Website URL

### Layout
- **Grid:** 3 columns (`.col-lg-4`)
- **Card:** Image, logo overlay, title, description, link

---

## 14. Contact Form Section

**Component Class:** `.contact-form-section`
**Location:** components.html line ~1057
**Examples:** contact.html

### ACF Fields

#### 14.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="contact-form-section__title">`

#### 14.2 Description (Textarea) - REQUIRED
- **Rows:** 3
- **Outputs to:** `<p class="contact-form-section__description">`

#### 14.3 Form Integration (Select) - REQUIRED
- **Options:** Gravity Forms or Contact Form 7 form IDs
- **Purpose:** Select which form to display

#### 14.4 Side Image (Image) - REQUIRED
- **Return Format:** Array
- **Recommended:** 800x1000px minimum
- **Outputs to:** Right column image

### Layout
- **Two-column:** Form left (col-lg-6), Image right (col-lg-6)
- **Form:** Gravity Forms or Contact Form 7

---

## 15. Global Offices Cards

**Component Class:** `.global-offices-cards-section`
**Location:** components.html line ~1217
**Examples:** contact.html

### ACF Fields

#### 15.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** `<h2 class="global-offices-cards-title global-offices-cards-title-with-accent">`

#### 15.2 Description (WYSIWYG) - REQUIRED
- **Toolbar:** Basic
- **Outputs to:** `<p class="global-offices-cards-description">`

#### 15.3 Office Cards (Repeater) - REQUIRED
- **Min:** 1, **Max:** 20
- **Button Label:** "Add Office"
- **Sub-fields:**
  - `name` (Text) - City name
  - `address` (Textarea)
  - `phone` (Text) - Optional
  - `email` (Email) - Optional

### Layout
- **Grid:** 3 columns (`.col-lg-4 .col-md-6`)
- **Card:** White background, minimal design

---

## 16. Connect With Us CTA

**Component Class:** `.connect-section`
**Location:** Found on multiple pages
**Examples:** real-assets.html, asset-management.html, strategic-partnerships.html

### ACF Fields

#### 16.1 Background Image (Image) - REQUIRED
- **Return Format:** URL
- **Recommended:** 1920x1080px minimum
- **Outputs to:** `<div class="connect-section__media"><img>`

#### 16.2 Title (Text) - REQUIRED
- **Max Characters:** 100
- **Supports:** HTML `<br>` tags for line breaks
- **Outputs to:** `<h2 class="connect-title">`

#### 16.3 Description (Textarea) - REQUIRED
- **Rows:** 4
- **Max Characters:** 300
- **Outputs to:** `<p class="connect-description">`

#### 16.4 Button (Group) - REQUIRED
- **Sub-fields:**
  - `text` (Text)
  - `link` (Link)
  - `style` (Select: btn-aqua, btn-white-ghost, btn-aqua-ghost)

### Styling
- **Full-width background image** with dark overlay
- **Centered content**
- **Parallax effect** on background image

---

## 17. Global Reach Video Section

**Component Class:** `.global-reach-section`
**Location:** Found on multiple pages
**Examples:** real-assets.html, asset-management.html, strategic-partnerships.html

### ACF Fields

#### 17.1 Title (Text) - REQUIRED
- **Max Characters:** 60
- **Outputs to:** Section title

#### 17.2 Video Settings (Group) - REQUIRED
- **Sub-fields:**
  - `youtube_video_id` (Text) - YouTube video ID
  - `segment_start` (Number) - Start time in seconds
  - `segment_length` (Number) - Length in seconds
  - `crossfade_duration` (Number) - Default: 2000ms

#### 17.3 Locations (Repeater) - REQUIRED
- **Fixed:** 6 locations (Stamford, New York, Dublin, Singapore, Seoul, Tokyo)
- **Sub-fields:**
  - `city` (Text)
  - `timezone` (Text) - IANA timezone (e.g., "America/New_York")

### JavaScript Integration
- Video player: `data-global-reach-video` attribute
- Video loop with crossfade
- Real-time clock display for each location
- See `js/scripts.js` `initGlobalReachVideo()` function

---

## 18. Community Logos Section

**Component Class:** `.community-logos-section`
**Location:** components.html
**Examples:** community.html

### ACF Fields

#### 18.1 Logo Grid (Gallery) - REQUIRED
- **Return Format:** Array
- **Min:** 1, **Max:** 20
- **Recommended:** PNG/SVG with transparency
- **Size:** 300x150px recommended

### Layout
- **Grid:** Responsive grid of logos
- **Style:** Grayscale with color on hover

---

## 19. Team Member Cards Grid

**Component Class:** `.team-member-grid`
**Location:** team.html
**Examples:** team.html

### ACF Fields

#### 19.1 Section Title (Text) - REQUIRED
- **Max Characters:** 60

#### 19.2 Team Members (Relationship) - REQUIRED
- **Post Type:** team_member
- **Return Format:** Post Object
- **Min:** 1, **Max:** Unlimited

### Individual Team Member Post Type Fields
- `photo` (Image) - Headshot
- `name` (Text) - Auto from post title
- `role` (Text)
- `bio` (WYSIWYG)
- `linkedin_url` (URL) - Optional

### Layout
- **Flexible grid:** 2-3 members per row
- **Responsive:** Adjusts based on total count

---

## 20. Staff Directory Table

**Component Class:** `.team-directory-section`
**Location:** team.html
**Examples:** team.html

### ACF Fields

#### 20.1 Directory Title (Text) - REQUIRED
- **Max Characters:** 60
- **Example:** "Staff Directory"

#### 20.2 Enable Search (True/False) - REQUIRED
- **Default:** True

#### 20.3 Enable Company Filter (True/False) - REQUIRED
- **Default:** True

#### 20.4 Directory Entries (Repeater) - REQUIRED
- **Min:** 1, **Max:** Unlimited
- **Button Label:** "Add Team Member"
- **Sub-fields:**
  - `name` (Text)
  - `title` (Text)
  - `company` (Text) - For filtering
  - `location` (Text)

### JavaScript Features
- Real-time search
- Company dropdown filter
- Sortable columns
- Pagination (optional)
- See `js/scripts.js` table functions

---

## Global Field Notes

### Common Field Types Across All Components

**Padding Options (True/False Groups):**
- `padding_top` (True/False) - Default: True
- `padding_bottom` (True/False) - Default: True
- `padding_size` (Select: small, default, large) - Default: default

**CSS Classes:** Apply `.padding-section-small`, `.padding-section-large` based on selection

**Background Colors:**
- Most components support custom background colors via Color Picker
- Common options: #FFFFFF, #EEEEEE, #0C162C, #1A2332

**Accent Colors:**
- Aqua: #00D2E3
- Dark Blue: #0C162C
- Dark Grey: #1A2332

### Animation Classes

**Count-Up Animation:**
- Element: `.stat-number`
- Attribute: `data-count="{value}"`
- Triggers: On scroll into view
- Function: `initCountUpAnimation()` in scripts.js

**Sequential Underline:**
- Elements: Footer links, news titles, strategy cards
- Class: `.footer-link-line`, `.news-title-line`, etc.
- Function: `initSequentialUnderlines()` in scripts.js

**Parallax Effects:**
- Class: `.parallax-img`
- Function: `initSmoothParallax()` in scripts.js
- Applied to: Hero images, text-image blocks

---

## WordPress Integration Notes

### Required Plugins
- Advanced Custom Fields Pro
- Gravity Forms (for contact forms)
- Optional: ACF Extended (for enhanced layout options)

### Custom Post Types Needed
- `team_member` (for team member profiles)
- `office` (for global offices - optional if using repeater instead)

### Template Files
Each component should be created as:
1. Flexible Content layout in ACF
2. PHP partial template in `/template-parts/components/`
3. Registered in functions.php

### Example Flexible Content Setup
```php
// Register Flexible Content field for page builder
if( function_exists('acf_add_local_field_group') ):
    acf_add_local_field_group(array(
        'key' => 'group_page_builder',
        'title' => 'Page Builder',
        'fields' => array(
            array(
                'key' => 'field_page_components',
                'label' => 'Page Components',
                'name' => 'page_components',
                'type' => 'flexible_content',
                'layouts' => array(
                    'layout_text_image_block' => array(
                        'key' => 'layout_text_image_block',
                        'name' => 'text_image_block',
                        'label' => 'Text + Image Block',
                        'display' => 'block',
                        'sub_fields' => array(
                            // Fields defined in this document
                        ),
                    ),
                    // Add all other component layouts here
                ),
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'page',
                ),
            ),
        ),
    ));
endif;
```

---

## Maintenance & Updates

**Version Control:**
- Document version: 1.0
- Last updated: 2026-01-19
- Maintainer: Development Team

**Change Log:**
- 2026-01-19: Initial documentation created

**Notes for Future Developers:**
- Always test components in WordPress Customizer preview
- Validate ACF field output in templates
- Check responsive breakpoints on all devices
- Test JavaScript animations on component load
- Verify accessibility (ARIA labels, keyboard navigation)

---

## Questions or Issues?

For questions about component implementation or ACF configuration, refer to:
1. This documentation
2. `components.html` for HTML structure
3. `css/styles.css` for styling details
4. `js/scripts.js` for JavaScript functionality
5. Individual page templates for real-world examples

---

**End of Documentation**
