# AIP Capital Website - Development Context

## Project Overview
This is a static HTML website for AIP Capital, a global alternative investment firm specializing in real assets, private credit, and strategic partnerships. The site is built with Bootstrap 5.3.2, custom SCSS, and vanilla JavaScript, with a focus on creating reusable components for future CMS integration (WordPress).

## Technology Stack
- **HTML5**: Semantic markup
- **CSS3**: Custom SCSS with Bootstrap 5.3.2 framework
- **JavaScript**: Vanilla ES6+ (no frameworks)
- **Bootstrap**: 5.3.2 (via CDN)
- **Font Awesome**: 6.5.1 (icons)
- **Google Fonts**: Mulish (200, 300, 400, 600, 700 weights)

## File Structure
```
html/
├── index.html              # Homepage
├── about.html              # About page
├── css/
│   └── styles.css          # Main stylesheet (all components documented)
├── js/
│   └── scripts.js          # All interactive functionality
├── assets/
│   ├── logo-header.svg     # Header logo
│   └── logo-footer.png     # Footer logo
├── img/                    # All images
│   ├── hero-about.jpg      # About page hero
│   ├── page-hero.jpg       # Generic page hero
│   ├── about-img-1.png     # About section image
│   ├── img-our-mission.png # Mission section image
│   ├── asset-bullet.svg    # Custom bullet icon
│   ├── news-*.png          # News card images
│   ├── logo-*.png/svg      # Partner/investment logos
│   ├── paralell.png        # Connect section background
│   ├── global-reach.jpg    # Global reach background
│   └── menu-placeholder*.png # Mega menu images
└── mp4/
    └── hero.mp4            # Homepage hero video
```

## Design System

### Brand Colors
```css
--color-aqua: #00D2E3          /* Primary brand color */
--color-white: #FFFFFF         /* Text on dark backgrounds */
--color-neutral-darkest: #1A2332  /* Dark backgrounds, cards */
--color-neutral-dark: #00D2E3  /* (duplicate, unused) */
--color-lilac: #BABCC9         /* Inactive tabs, secondary text */
--color-dark-blue: #0C162C     /* Section backgrounds */
--color-light-gray: #EEEEEE    /* Light section backgrounds */
--color-text-gray: #99A1AF     /* Card text, footer links */
```

### Typography (Mulish)
- **Nav**: 16px / 400
- **H1**: 56px / 300 / 1.2 (desktop), 36px (tablet), 28px (mobile)
- **H2**: 48px / 300 / 1.2 (desktop)
- **Body**: 18px / 400 / 1.5
- **Statistics**: 70px / 200 / 1.3 (desktop), 80px for snapshot cards
- **Tabs Title**: 24px / 400 / 1.4
- **Card Title**: 24px / 400 / 1.4
- **Card Body**: 16px / 400

### Layout
- **Container Width**: 1280px (max-width)
- **Responsive Breakpoints**:
  - Desktop: 1400px+
  - Tablet: 992px - 1399px
  - Mobile: 576px - 991px
  - Small Mobile: < 576px
- **Section Padding**:
  - `padding-section-large`: 8rem top/bottom (desktop), 100px (tablet), 80px (mobile)

## Reusable Components

### 1. Text-Image Block (UNIFIED COMPONENT)
**Location**: about.html (2 instances)
**CSS**: Lines 982-1137 in styles.css
**Class**: `.text-image-block`

**Purpose**: Flexible text + image layout with theme variations

**WordPress/CMS Settings**:
1. **Theme** (required):
   - `light`: White background (#FFFFFF), dark text (#1A2332)
   - `dark`: Dark blue background (#0C162C), white text
   - Classes: `.text-image-block--light` OR `.text-image-block--dark`

2. **Layout** (required):
   - `text-left`: Text on left, image on right (default)
     - Standard column order
     - 4rem padding-right on content
   - `text-right`: Text on right, image on left
     - Add `.text-image-block--text-right` class
     - Use Bootstrap order classes: `order-lg-2` on content, `order-lg-1` on image
     - 4rem padding-left on content

3. **Vertical Alignment** (required):
   - `align-start`: Content aligned to top (use `align-items-start` on row)
   - `align-center`: Content vertically centered (use `align-items-center` on row)

4. **Content Type** (required):
   - `paragraph`: Single paragraph (`.text-image-block__description`)
   - `paragraph-intro`: Intro + paragraph (`.text-image-block__intro`)
   - `bullet-list`: Intro + bullet list (`.text-image-block__list`)

5. **Accent Bar** (optional):
   - `true`: Add `.text-image-block__title--accent` class (64px × 4px aqua bar)
   - `false`: No accent bar

6. **Image** (required):
   - Upload with alt text

**BEM Class Structure**:
```css
.text-image-block                    /* Base component */
.text-image-block--light             /* Theme modifier */
.text-image-block--dark              /* Theme modifier */
.text-image-block--text-right        /* Layout modifier */
.text-image-block__content           /* Content wrapper */
.text-image-block__title             /* Title element */
.text-image-block__title--accent     /* Accent bar modifier */
.text-image-block__intro             /* Intro paragraph */
.text-image-block__description       /* Main paragraph */
.text-image-block__list              /* Bullet list */
.text-image-block__list-item         /* List item */
.text-image-block__bullet-icon       /* Bullet icon (24px) */
.text-image-block__image             /* Image wrapper */
```

**Examples**:
- Light theme with bullets: "Pre-Eminent Dedicated Asset-Based Finance Investor"
- Dark theme with paragraph: "Our Mission"

---

### 2. Vision Statement Block
**Location**: about.html
**CSS**: Lines 932-980 in styles.css
**Class**: `.vision-section`

**Purpose**: Centered large text block for vision/mission statements

**WordPress/CMS Settings**:
1. **Title** (required): Text input (32px / 300 / aqua)
2. **Description** (required): Large text area (40px / 300 / 1.2 / white)
3. **Background**: Fixed #0C162C (dark blue)
4. **Layout**: Fixed centered (col-lg-8)

**Example**: "AIP Capital Vision"

---

### 3. Stats Cards Grid
**Location**: about.html
**CSS**: Lines 1150-1238 in styles.css
**Class**: `.platform-snapshot-section`

**Purpose**: Grid of statistic cards with large numbers and count-up animation

**WordPress/CMS Settings**:
1. **Section Title** (required):
   - Text input with accent bar (always shown)
   - 48px / 300 / #1A2332

2. **Cards** (repeatable, 1-6 recommended):
   - **Card Title**: Text at top (20px / white)
   - **Stat Value**: Large number at bottom (80px / 200 / aqua)
   - Text prefix/suffix support ($, +, etc.)
   - Count-up animation (enabled via `data-count` attribute)

3. **Grid Layout**:
   - Desktop: 3 columns (col-lg-4)
   - Tablet: 2 columns (col-md-6)
   - Mobile: 1 column

4. **Background**: Fixed #EEEEEE (light gray)

5. **Card Styling**:
   - Dark background (#1A2332)
   - Min height: 300px
   - Padding: 1.5rem
   - Hover: Lift effect (`translateY(-8px)`) with aqua shadow

**Example**: "Platform Snapshot"

---

### 4. Page Hero
**Location**: about.html
**CSS**: Lines 153-165 in styles.css
**Classes**: `.about-header`, `.page-hero`

**Purpose**: Fixed height hero with image or video background

**Features**:
- Fixed height: 730px (desktop), 500px (tablet), 400px (mobile)
- Supports both image and video backgrounds
- Dark overlay for readability
- No angled overlay (unlike homepage hero)
- Title with aqua accent bar
- Description text

---

### 5. Stats Section (Homepage)
**Location**: index.html
**CSS**: Lines 459-560 in styles.css
**Class**: `.stats-section`

**Features**:
- Dark blue background (#1A2332)
- 2-column layout (6-6)
- Left: Title, description, buttons
- Right: 2×2 grid of stats with count-up animation
- Stats have left border accent

---

### 6. Strategic Partnerships Cards
**Location**: index.html
**CSS**: Lines 764-822 in styles.css
**Class**: `.investments-section`

**Purpose**: Grid of partner cards with logos

**Features**:
- White background
- Dark cards (#1A2332) with logo, title, description
- 3 columns on desktop
- Logos sized with max-width: 80%
- Hover effect (lift + aqua shadow)

---

### 7. News Cards
**Location**: index.html
**CSS**: Lines 816-876 in styles.css
**Class**: `.news-section`

**Features**:
- Light gray background (#EEEEEE)
- Full-width image (240px height)
- Title in #1A2332
- Date in #AAAAAA at bottom
- Entire card clickable
- 2px aqua border on hover

---

### 8. Global Reach Section
**Location**: index.html
**CSS**: Lines 1240-1293 in styles.css
**Class**: `.global-reach-section`

**Features**:
- Background image with overlay
- 6 columns showing locations with live times
- Cascading blink animation on colons (0.05s delay between each)
- Real-time timezone updates every minute
- Aqua left border on location items

---

### 9. Mega Menu Dropdowns
**Location**: index.html (navigation)
**CSS**: Lines 268-379 in styles.css
**Class**: `.mega-menu`

**Features**:
- Fixed position below navbar (top: 88px)
- White background on desktop
- 400px height content area
- 8-col links, 4-col image
- Chevron rotation on active
- Mobile: Accordion style with max-height transitions
- Smooth enter/exit animations

---

### 10. Connect With Us Section
**Location**: index.html
**CSS**: Lines 880-930 in styles.css
**Class**: `.connect-section`

**Features**:
- Background image with overlay
- Centered content (col-lg-8)
- White text on dark overlay
- Single CTA button

---

## JavaScript Functionality

### Core Features (js/scripts.js)

1. **Count-up Animation** (Lines 9-53):
   - Animates numbers from 0 to target value
   - Triggered by Intersection Observer when section enters viewport
   - Supports decimals (e.g., 6.2)
   - Duration: 2000ms at 60fps

2. **Smooth Scroll** (Lines 52-76):
   - Smooth scrolling for anchor links
   - 80px header offset
   - Skips special links (#login, #team-page)

3. **Navbar Scroll Effect** (Lines 81-98):
   - Adds subtle shadow after scrolling 100px
   - Smooth transition

4. **Fade-in Animation** (Lines 103-125):
   - Staggered fade-in for investment cards and news cards
   - 100ms delay between items
   - Triggered by Intersection Observer

5. **Mega Menu Toggle** (Lines 218-276):
   - Desktop: Click to open/close, click outside to close
   - Mobile: Accordion style
   - Closes others when opening new one
   - Chevron rotation animation

6. **Mobile Menu** (Lines 146-195):
   - Smooth slide-down/up transitions
   - Body scroll lock when menu open
   - Auto-close dropdowns on menu close
   - Close on link click

7. **Global Time Updates** (Lines 331-362):
   - Real-time timezone display
   - Updates every 60 seconds
   - Cascading blink animation on colons (0.05s × index delay)
   - Supports 6 timezones:
     - Stamford/New York: America/New_York
     - Dublin: Europe/Dublin
     - Singapore: Asia/Singapore
     - Seoul: Asia/Seoul
     - Tokyo: Asia/Tokyo

8. **Video Fallback** (Lines 177-184):
   - Pauses video and reduces opacity on mobile (< 768px)

9. **Lazy Loading** (Lines 189-203):
   - Intersection Observer for images
   - 50px root margin for preloading

10. **Tab Animation** (Lines 128-141):
    - Fade-in animation when switching tabs

## Navigation Structure

### Main Navigation
- Our Firm (mega menu dropdown)
  - About Us → about.html
  - Our Team
  - Sustainability
  - Careers
  - Community
- Our Team
- Strategies (mega menu dropdown)
  - Strategies Overview
  - Real Assets
  - Private Credit
  - Strategic Partnerships & Control Investments
  - Asset Management
- News & Insights
- Contact
- Investor Login (aqua button)

### Footer Navigation
Three columns:
1. **Our Firm**: About Us, Our Team, Sustainability, News & Insights, Investor Login
2. **Strategies**: Overview, Real Assets, Asset Management, Private Credit, Partnerships & Investments
3. **Partnerships**: 6 partner companies

Footer also includes:
- Disclaimer text
- Legal links: Privacy Policy, Accessibility, Modern Slavery Statement, Terms of Service, Cookies Settings
- Copyright notice
- 4px aqua border at bottom

## Page Structure

### Homepage (index.html)
1. Hero Section (video background, angled aqua overlay)
2. ~~Our Firm Section~~ (commented out)
3. Stats Section (dark background, 4 stats with count-up)
4. Our Strategies Section (tabs with content + images)
5. Strategic Partnerships Cards (6 investment cards)
6. Team Section (background image, centered text)
7. News Section (3 news cards)
8. Connect With Us (background image, centered CTA)
9. Global Reach (6 locations with live times)
10. Footer

### About Page (about.html)
1. Page Hero (image background, 730px fixed height)
2. Vision Statement Block (centered, large text)
3. Text-Image Block - Light (bullet list with icon)
4. Stats Cards Grid (6 cards with count-up animation)
5. Text-Image Block - Dark (paragraph text)
6. Footer

## Key Design Patterns

### Accent Bars
- 64px width × 4px height
- Aqua color (#00D2E3)
- 24px padding-top on title
- Used on: sections titles, hero titles

### Button Styles
- **Aqua Button**: Solid aqua background, dark text, 2px border
- **White Ghost**: Transparent with 2px white border
- **Aqua Ghost**: Transparent with 2px aqua border
- **Text Button**: Transparent, no border, with chevron icon
- All buttons: No border-radius, 0.75rem × 2rem padding
- Hover: Darken color (no translateY)

### Card Patterns
- **Investment Cards**: Logo top, title, description, hover lift effect
- **News Cards**: Full-width image top, title, date bottom, entire card clickable
- **Stat Cards**: Title top, large number bottom, flexbox space-between

### Spacing System
- Section padding: `padding-section-large` (8rem/100px/80px)
- Card padding: 2.5rem or 1.5rem depending on component
- Text padding-right: 4rem on desktop (for text-image layouts)

## Responsive Behavior

### Breakpoints
```css
@media (max-width: 1400px)  /* Container 1140px */
@media (max-width: 991px)   /* Tablet */
@media (max-width: 575px)   /* Mobile */
```

### Mobile Adaptations
- Hero heights reduce: 100vh → 70vh → adjustable
- Font sizes scale down (H1: 56px → 36px → 28px)
- 3-column grids → 2-column → 1-column
- Mega menus → accordion style
- Navbar → hamburger menu with slide-down
- Text-image blocks: maintain mobile-first image placement
- Padding reduces: 8rem → 100px → 80px

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- ES6+ JavaScript
- Intersection Observer API
- CSS Custom Properties (variables)

## Performance Optimizations
1. Lazy loading for images
2. Intersection Observer for animations (no constant checking)
3. Debounced resize handler (250ms)
4. Video paused on mobile
5. Smooth scroll behavior via CSS
6. Efficient DOM queries (querySelectorAll cached where possible)

## Future WordPress Integration Notes

### ACF Field Recommendations

**Text-Image Block**:
- Radio: Theme (light/dark)
- Radio: Layout (text-left/text-right)
- Radio: Alignment (align-start/align-center)
- Radio: Content Type (paragraph/paragraph-intro/bullet-list)
- True/False: Accent Bar
- Text: Title
- Textarea: Intro (conditional)
- WYSIWYG: Description (conditional)
- Repeater: Bullet List (conditional)
  - Image: Bullet Icon
  - Text: Bullet Text
- Image: Main Image

**Stats Cards Grid**:
- Text: Section Title
- Repeater: Cards (1-6)
  - Text: Card Title
  - Number: Stat Value
  - Text: Prefix (e.g., $)
  - Text: Suffix (e.g., +, b+)
  - True/False: Enable Count-up

**Vision Statement Block**:
- Text: Title
- Textarea: Description

### Custom Post Types
- Partnerships/Investments (for cards)
- News & Insights (for news cards)
- Team Members

### Template Parts
- `template-parts/text-image-block.php`
- `template-parts/stats-cards.php`
- `template-parts/vision-statement.php`

## Development Guidelines

### Adding New Components
1. Document in CSS with comment block including:
   - Component name
   - Purpose
   - WordPress/CMS settings
   - Example usage
2. Use BEM naming: `.component__element--modifier`
3. Create both light and dark theme support where applicable
4. Include responsive styles for all breakpoints
5. Add HTML comment with settings above component
6. Update this context.md file

### Code Style
- **CSS**: BEM methodology, mobile-first approach
- **JavaScript**: ES6+, functional where possible
- **HTML**: Semantic markup, Bootstrap grid system
- **Comments**: Document all WordPress-configurable settings

## Assets Checklist

### Required Images
- [x] Hero video (mp4/hero.mp4)
- [x] About hero image (img/hero-about.jpg)
- [x] About section image (img/about-img-1.png)
- [x] Mission image (img/img-our-mission.png)
- [x] Asset bullet icon (img/asset-bullet.svg)
- [x] Partner logos (8 logos in various formats)
- [x] News images (news-1.png, news-2.png, news-3.png)
- [x] Background images (paralell.png, global-reach.jpg, finance-stats-bg.png)
- [x] Mega menu placeholders (menu-placeholder.png, menu-placeholder-2.png)
- [x] Sample content image (jet-sample.png)
- [x] Header/Footer logos (assets/logo-header.svg, assets/logo-footer.png)
- [x] AIP Asia logo (img/logo-aip-asia.png)

## Common Tasks

### Adding a New Text-Image Block
```html
<section class="text-image-block text-image-block--dark padding-section-large">
    <div class="container-custom">
        <div class="row align-items-center">
            <div class="col-lg-6 text-image-block__content">
                <h2 class="text-image-block__title text-image-block__title--accent">Title</h2>
                <p class="text-image-block__description">Text content here.</p>
            </div>
            <div class="col-lg-6 text-image-block__image">
                <img src="img/your-image.png" alt="Alt text" class="img-fluid">
            </div>
        </div>
    </div>
</section>
```

### Reversing Layout (Image Left, Text Right)
Add these modifications:
1. Add class to section: `text-image-block--text-right`
2. Add `order-lg-2` to content column
3. Add `order-lg-1` to image column

### Adding a Stats Card
```html
<div class="col-lg-4 col-md-6">
    <div class="snapshot-card">
        <h4 class="snapshot-card-title">Card Title</h4>
        <div class="snapshot-card-stat">
            <span class="stat-number" data-count="100">0</span>+
        </div>
    </div>
</div>
```

## Known Issues & Limitations
- None currently identified

## Browser Testing Checklist
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Deployment Notes
- All assets use relative paths
- No server-side processing required (static HTML)
- CDN dependencies: Bootstrap, Font Awesome
- Google Fonts loaded via CDN

---

**Last Updated**: 2026-01-13
**Developer Notes**: All components documented for WordPress/CMS migration. Use BEM naming conventions and mobile-first approach for any new development.
