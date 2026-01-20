# Start Here: WordPress Conversion Guide

This guide provides the optimal reading order and workflow for AI developers beginning the WordPress theme conversion for the AIP Capital website.

---

## Essential Reading Order

Follow this sequence to understand the project comprehensively:

### 1. **WORDPRESS-CONVERSION-NOTES.md** (~10 min)
Start here for critical implementation requirements that supersede the original brief:
- Gravity Forms (not CF7)
- ACF Flexible Content architecture
- Hero system (4 types, selectable per page)
- Native WP Menu system
- Global components in ACF Options

### 2. **context.md** (~30 min)
Comprehensive project documentation covering:
- All components and their purposes
- Design system (colors, typography, spacing)
- JavaScript functionality
- Animation systems
- Responsive behavior

### 3. **ACF-COMPONENT-DOCUMENTATION.md** (~20 min)
Complete ACF field configurations for all 20+ components. This is your blueprint for ACF setup.

### 4. **Core Template Files** (~45 min)
Read these HTML files to understand structure and patterns:

#### Primary Templates (in order):
1. **index.html** - Homepage hero with video, stats, count-up animations
2. **about.html** - Standard page hero, component stacking patterns
3. **components.html** - All component variations side-by-side
4. **news.html** - News listing page, card grids, filtering
5. **news-single.html** - Single post template, related posts
6. **team.html** - Team member cards, modal functionality
7. **contact.html** - Form implementation, Gravity Forms mapping

#### Utility Pages:
8. **404.html** - Error page template
9. **search.html** - Search results page
10. **category.html** - Category/taxonomy template

### 5. **CSS Files** (~30 min)
1. **css/styles.css** - All custom styles, BEM naming conventions
   - Note component class structures
   - Identify CSS custom properties
   - Understand responsive breakpoints

### 6. **JavaScript Files** (~30 min)
1. **js/scripts.js** - All custom JavaScript
   - Navigation mega menu logic
   - Count-up animations (Intersection Observer)
   - Video management
   - Modal functionality
   - Form handling
   - Back-to-top button
   - Global reach time display

2. **js/aos.js** - Animate On Scroll library (external)

---

## Reading Workflow by Phase

### Phase 1: Understanding (40 min)
**Goal:** Grasp the WordPress architecture and critical requirements

1. Read WORDPRESS-CONVERSION-NOTES.md completely
2. Scan context.md table of contents
3. Note the three global components:
   - Connect With Us to Explore Lasting Opportunities
   - Our Global Reach
   - Strategic Partnerships & Control Investments
4. Understand hero type selection system

### Phase 2: Component Analysis (60 min)
**Goal:** Learn all components and their ACF field structures

1. Open components.html in browser
2. Read ACF-COMPONENT-DOCUMENTATION.md alongside it
3. Match HTML structure to ACF fields
4. Note repeater fields, image requirements, WYSIWYG fields
5. Identify which components use data attributes for JavaScript

### Phase 3: Functionality Review (45 min)
**Goal:** Understand JavaScript dependencies and animations

1. Read js/scripts.js section by section:
   - Navigation (lines ~1-100)
   - Count-up animations (Intersection Observer)
   - Video initialization
   - Modal system
   - Global reach clocks
2. Note data attributes that JavaScript relies on
3. Identify AOS animation configurations
4. Review form validation and submission

### Phase 4: Template Patterns (45 min)
**Goal:** Learn template structures and content patterns

1. Compare index.html vs about.html (different hero types)
2. Study component stacking in about.html
3. Review news.html for archive patterns
4. Check news-single.html for single post template
5. Understand team.html modal implementation
6. Analyze contact.html form structure

**Total estimated reading time: ~3 hours**

---

## Quick Reference Files

Keep these open while developing:

1. **WORDPRESS-CONVERSION-NOTES.md** - Implementation requirements
2. **ACF-COMPONENT-DOCUMENTATION.md** - Field configurations
3. **css/styles.css** - Class names and styling patterns
4. **components.html** - Visual reference for all components

---

## Files to Skip Initially

These are content pages that reuse components. Skip on first read:

- careers.html
- career-single.html
- community.html
- privacy-policy.html
- terms.html
- real-assets.html
- private-credit.html
- strategic-partnerships.html
- asset-management.html
- strategies.html
- sustainability.html

Return to these later for content patterns if needed.

---

## Critical Notes Before Starting

### 1. CSS Methodology
- **BEM naming** used throughout (Block__Element--Modifier)
- Component classes follow pattern: `component-name`, `component-name__element`, `component-name--variation`

### 2. Data Attributes
Many components use data attributes for JavaScript functionality:
```html
data-aos="fade"
data-timezone="stamford"
data-global-reach-video
data-video-id="durrAAgumQo"
```
These MUST be preserved in WordPress templates.

### 3. Bootstrap Grid
- Using Bootstrap 5.3.2 grid system
- Custom container: `.container-custom` (max-width: 1320px)
- Responsive columns: `.col-lg-6`, `.col-md-4`, etc.

### 4. Animation Dependencies
- **AOS (Animate On Scroll)** for fade-in animations
- **Intersection Observer API** for count-up animations
- All components with `data-aos="fade"` fade in on scroll

### 5. Hero System
Every page has a hero, but type varies:
- **Homepage:** Video background + stats grid + count-up animations
- **Page Hero:** 730px height, image background, title + description
- **News Header:** 500px height, breadcrumbs, category filtering
- **Small Hero:** 500px height, minimal content (404, search, category pages)

### 6. Global Components
Three components are global (ACF Options), with per-page toggles:
- Connect CTA (full-width aqua background)
- Global Reach (video background + office clocks)
- Strategic Partnerships (carousel)

### 7. Navigation
- Native WordPress Menu system
- Custom walker for mega menus
- Two mega menu dropdowns: "Our Firm" and "Strategies"
- Each mega menu has: menu links (left) + feature image (right)

---

## Start Here Checklist

- [ ] Read WORDPRESS-CONVERSION-NOTES.md (10 min)
- [ ] Read context.md fully (30 min)
- [ ] Read ACF-COMPONENT-DOCUMENTATION.md (20 min)
- [ ] Open components.html in browser for visual reference
- [ ] Read index.html (homepage template) (10 min)
- [ ] Read about.html (standard page template) (10 min)
- [ ] Scan components.html HTML structure (15 min)
- [ ] Read css/styles.css (note BEM patterns) (30 min)
- [ ] Read js/scripts.js (understand functionality) (30 min)
- [ ] Review news.html + news-single.html (15 min)
- [ ] Review team.html (modal system) (10 min)
- [ ] Review contact.html (Gravity Forms) (10 min)
- [ ] Review 404.html, search.html, category.html (10 min)

**Total: ~3 hours to fully understand the codebase**

---

## Next Steps After Reading

1. **Set up local WordPress environment**
   - Install WordPress
   - Install ACF Pro
   - Install Gravity Forms
   - Install required plugins

2. **Create theme structure**
   ```
   aip-capital-theme/
   ├── functions.php
   ├── style.css
   ├── header.php
   ├── footer.php
   ├── index.php
   ├── single.php
   ├── archive.php
   ├── page.php
   ├── 404.php
   ├── search.php
   ├── template-parts/
   │   ├── hero/
   │   │   ├── hero-homepage.php
   │   │   ├── hero-page.php
   │   │   ├── hero-news.php
   │   │   └── hero-small.php
   │   ├── components/
   │   │   ├── two-column-image-text.php
   │   │   ├── stats-grid.php
   │   │   ├── image-cards-grid.php
   │   │   └── [20+ other components]
   │   └── global/
   │       ├── connect-cta.php
   │       ├── global-reach.php
   │       └── partnerships.php
   ├── inc/
   │   ├── acf-fields.php
   │   ├── custom-post-types.php
   │   ├── menu-walker.php
   │   └── gravity-forms-config.php
   ├── assets/
   │   ├── css/
   │   ├── js/
   │   └── img/
   └── acf-json/
   ```

3. **Register Custom Post Types**
   - Partnerships
   - News & Insights
   - Team Members
   - Careers

4. **Configure ACF Field Groups**
   - Page Builder (Flexible Content with 20+ layouts)
   - Hero Settings (Type selector + fields for each type)
   - Global Options (Connect CTA, Global Reach, Partnerships)
   - Post-specific fields (News meta, Team bios, etc.)

5. **Set up Gravity Forms**
   - Contact form
   - Careers application form
   - Newsletter signup

6. **Port CSS & JavaScript**
   - Enqueue Bootstrap 5.3.2
   - Enqueue AOS library
   - Port custom styles.css
   - Port custom scripts.js
   - Ensure all data attributes are preserved

7. **Build Templates**
   - Start with page.php (most common)
   - Build hero variations
   - Build component partials
   - Build global component partials
   - Test component stacking

8. **Configure Menus**
   - Register menu locations
   - Create custom walker for mega menus
   - Add mega menu image support

---

## Questions to Answer While Reading

1. How does the mega menu navigation work in JavaScript?
2. Which components use Intersection Observer and why?
3. What are all the required ACF field types for each component?
4. How do the global reach office clocks get their time data?
5. What triggers the count-up animations?
6. How does the video looping work on the homepage hero?
7. What validation is on the contact form?
8. How are team member modals triggered and populated?
9. What are all the responsive breakpoints used?
10. How does the category filtering work on the news page?

---

## Support Files Reference

- **Design System:** See context.md → Design System & Styles
- **Component List:** See context.md → Components
- **JavaScript Functions:** See context.md → JavaScript Functionality
- **ACF Fields:** See ACF-COMPONENT-DOCUMENTATION.md
- **WordPress Requirements:** See WORDPRESS-CONVERSION-NOTES.md

---

## Ready to Start?

Once you've completed the checklist above, you'll have a comprehensive understanding of:
- The entire component library
- The WordPress architecture requirements
- The JavaScript functionality that must be preserved
- The ACF field structure for all components
- The template hierarchy and patterns

You'll be ready to begin building the WordPress theme with confidence.

Good luck! 🚀
