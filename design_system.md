# Prachatham Design System

## Core Philosophy
The Prachatham design system is built to convey **trust, community empowerment, and local voice**. It balances modern digital aesthetics with the warmth of grassroots community engagement.

---

## 1. Visual Identity

### 1.1 Color Palette
- **Brand (Prachatham Green):** `#059669` (600). Used for primary actions, branding, and emphasis.
- **Nature (Environment):** `#14b8a6` (500). Used for environmental and nature-related content.
- **Surface:** White, Gray 50 (backgrounds), Gray 100-900 (neutrals).
- **Semantic:** 
  - Success: `#059669`
  - Warning: `#d97706`
  - Error: `#dc2626`
  - Info: `#0284c7`

### 1.2 Typography
- **Primary Font:** `DB Helvethaica X` (Thai and English).
- **Scale:**
  - **Hero:** 3xl (mobile) to 6xl (desktop). Bold.
  - **Page Title:** 2xl to 4xl. Bold.
  - **Section Heading:** xl to 3xl. Semibold.
  - **Card Heading:** md to lg. Semibold.
  - **Body:** 1rem (base) to 1.125rem (lg). Line height 1.625 (relaxed).

---

## 2. Layout & Spacing

### 2.1 Containers
- **Content:** Max width `72rem` (7xl) for main content.
- **Narrow Content:** Max width `48rem` (4xl) for articles and forms.
- **Wide Content:** Max width `80rem` for immersive sections.

### 2.2 Section Padding
- **Small:** `3rem` (base 12)
- **Standard (Medium):** `5rem` (base 20)
- **Large:** `7rem` (base 28)

---

## 3. Components & UI Patterns

### 3.1 Buttons
- **Primary:** Filled Prachatham Green. Rounded (`full`). Hover: Lifted with brand glow shadow.
- **Secondary:** White background with Prachatham Green border. Rounded (`full`).
- **Ghost:** Gray text, no border. Subtle gray background on hover.

### 3.2 Cards (Post/Project/Feature)
- **Border Radius:** `xl` (1rem).
- **Border:** `1px solid gray.100`.
- **Shadow:** `sm` by default.
- **Hover:** `cardHover` (lifted, deeper shadow, brand border color).

### 3.3 Inputs
- **Border Radius:** `lg` (0.75rem).
- **Focus:** Prachatham Green 500 border with subtle outer glow.

### 3.4 Navigation
- **Height:** `64px`.
- **Background:** White with 92% opacity and 12px blur.
- **Top Accent:** Linear gradient from brand green to nature green.

---

## 4. Design Tokens (Technical)

Tokens are managed in `src/theme/tokens.ts` and applied via Chakra UI in `src/theme/client.ts`.

| Token | Value |
|-------|-------|
| prachatham.600 | #059669 |
| radius.xl | 1rem |
| radius.full | 9999px |
| shadow.cardHover | 0 20px 40px -8px rgba(0, 0, 0, 0.12) |
| shadow.brandGlow | 0 8px 30px -4px rgba(5, 150, 105, 0.35) |

---

## 5. Implementation Guidelines

1. **Use Variants:** Always prefer using Chakra UI component variants (e.g., `<Button variant="primary">`) over manual styling.
2. **Consistency:** Ensure all cards have the same `borderRadius` and `hover` behavior.
3. **Typography:** Use the `Heading` and `Text` variants defined in `theme/client.ts`.
4. **Spacing:** Use the spacing scale (1, 2, 4, 6, 8, 12, 16, 20) for consistent rhythm.
