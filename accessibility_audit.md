# Accessibility Audit Report — Prachatham

## 1. Executive Summary
The website has a solid foundation (SkipLink, semantic main tag, Thai language support), but several critical issues remain regarding keyboard navigation, focus management in mobile menus, and form accessibility.

## 2. Critical Issues (Level A/AA)

### 2.1 Mobile Navigation Focus & ARIA
- **Issue:** The mobile menu toggle lacks `aria-expanded` and `aria-controls` attributes. Focus is not trapped inside the mobile menu when it is open.
- **Impact:** Screen reader users won't know if the menu is open, and keyboard users might accidentally navigate "behind" the menu while it is visible.

### 2.2 Form Labels (Search)
- **Issue:** The search input in the navigation bar does not have a visible label or a hidden `aria-label`.
- **Impact:** Screen reader users will hear "Edit text" but won't know what the input is for.

### 2.3 Heading Hierarchy
- **Issue:** Some sections in the Footer and Homepage might have inconsistent heading levels (skipping from H1 to H3).
- **Impact:** Users navigating by headings will find the document structure confusing.

### 2.4 Contrast Ratios
- **Issue:** Text colors like `gray.500` on `gray.900` (Footer) and `gray.400` on white (PostCard excerpts) likely fail WCAG AA contrast requirements (4.5:1).
- **Impact:** Users with low vision or those in bright environments will struggle to read the content.

---

## 3. Recommended Actions

| Priority | Component | Action |
| :--- | :--- | :--- |
| **High** | Navigation | Add `aria-expanded`, `aria-controls`, and `aria-label` to the search input. |
| **High** | Navigation | Implement focus trapping or ensure the mobile menu is correctly announced. |
| **Medium** | Footer | Improve contrast for gray text on dark backgrounds. |
| **Medium** | PostCard | Increase contrast for excerpt text (`gray.500` -> `gray.600`). |
| **Low** | Images | Ensure all decorative images have `role="presentation"` or empty `alt`. |

---

## 4. Audit Checklist (Completed)
- [x] Lang attribute set to "th"
- [x] SkipLink implemented
- [x] Semantic `<main>` tag used
- [x] Basic ARIA labels on social icons
- [ ] Accessible Mobile Menu
- [ ] Accessible Search Form
- [ ] Contrast compliance for secondary text
