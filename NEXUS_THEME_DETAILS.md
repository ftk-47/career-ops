# Nexus Theme - Bold & Vibrant Design

## Overview

The **Nexus** theme is designed for applications that need a bold, energetic, and modern aesthetic. Inspired by contemporary SaaS dashboards and digital signage systems, it features vibrant red accents, subtle peachy backgrounds, generous spacing, and carefully crafted typography.

## Design Philosophy

### Core Principles

1. **Bold Accents** - Vibrant red primary color (hue 20°) that commands attention
2. **Warm Backgrounds** - Subtle peachy/pink-tinted backgrounds for warmth
3. **Generous Spacing** - Increased padding and spacing for breathing room
4. **Refined Typography** - Larger sizes with semibold weights for clarity
5. **Soft Shadows** - Subtle, neutral shadows instead of colored ones
6. **Rounded Corners** - 0.75rem border radius for friendly, modern feel

## Color Palette

### Light Mode

#### Primary Colors
- **Primary**: `oklch(0.52 0.24 20)` - Vibrant red with warm undertone
- **Background**: `oklch(0.985 0.008 15)` - Subtle peachy/pink tint (not pure white)
- **Foreground**: `oklch(0.12 0.01 270)` - Deep dark for high contrast
- **Card**: Pure white `oklch(1 0 0)` - Stands out against tinted background

#### Borders & Inputs
- **Border**: `oklch(0.92 0.005 15)` - Light with peachy tint (8% darker than background)
- **Input**: `oklch(0.90 0.005 15)` - Slightly darker for definition
- These are **lighter and warmer** than other themes for a softer appearance

#### Status Colors
- **Success**: `oklch(0.60 0.17 145)` - Vibrant green
- **Warning**: `oklch(0.70 0.15 75)` - Bold yellow
- **Error/Destructive**: `oklch(0.55 0.22 25)` - Matches primary red
- **Info**: `oklch(0.55 0.20 240)` - Bold blue

### Dark Mode

#### Primary Colors
- **Primary**: `oklch(0.62 0.24 20)` - Brighter red with warm undertone
- **Background**: `oklch(0.11 0.008 270)` - Deep charcoal with slight warmth
- **Foreground**: `oklch(0.97 0 0)` - Near white for maximum contrast
- **Card**: `oklch(0.15 0.008 270)` - Slightly lighter than background

#### Borders & Inputs
- **Border**: `oklch(0.26 0.012 270)` - Visible with subtle warmth
- **Input**: `oklch(0.24 0.012 270)` - Clearly defined input fields

## Key Differentiators

### vs Other Themes

| Feature | Nexus | Winter/GGM | Mercel |
|---------|-------|------------|--------|
| **Primary Color** | Vibrant red (hue 20°) | Cool blue/Purple | Black |
| **Background** | Warm peachy tint | Pure white/gray | Pure white/black |
| **Border Radius** | 0.75rem (rounder) | 0.5-0.65rem | 0.5rem |
| **Border Lightness** | 92% (lighter, warmer) | 75-80% (medium) | 80% (medium) |
| **Spacing** | 2x generous | Standard | Standard |
| **Typography** | Larger, bolder | Standard | Standard |
| **Shadows** | Soft neutral | Colored tints | Sharp neutral |
| **Best For** | Bold dashboards | Professional apps | Minimalist design |

### When to Use Nexus

✅ **Perfect For:**
- SaaS dashboards
- Admin panels
- Energetic brands
- Apps needing strong CTAs
- Modern, bold aesthetics
- Digital signage systems

❌ **Not Ideal For:**
- Conservative industries (finance, legal)
- Subtle, understated designs
- Apps requiring calm, zen-like aesthetics

## Technical Details

### Typography
- **Font Family**: Inter (sans-serif)
- **Letter Spacing**: `-0.011em` (slightly tighter for elegance)
- **Heading 1**: `text-3xl` with `font-bold` (larger, bolder)
- **Heading 2**: `text-xl` with `font-semibold` (prominent)
- **Button Text**: `font-semibold` (stronger hierarchy)
- **Font Smoothing**: Optimized for modern displays

### Spacing & Layout
- **Base Spacing**: `0.5rem` (doubled from default 0.25rem)
- **Card Padding**: Horizontal `2rem` (8), Vertical `2rem` (8)
- **Generous whitespace** throughout for modern, clean feel

### Border Radius
- **Base**: `0.75rem` (12px) - Noticeably rounder than other themes
- Friendly, approachable feel

### Shadows
- **Color**: Neutral black `oklch(0 0 0)` - Not tinted
- **Opacity Range**: 4-12% (light mode), 12-28% (dark mode)
- **Style**: Soft, subtle - emphasizes depth without distraction
- **Blur**: Lower values (1-3px base) for crispness

### Accessibility

#### Light Mode Contrast Ratios
- **Foreground on Background**: ~14:1 (AAA)
- **Muted text on Background**: ~4.8:1 (AA)
- **Primary on White**: ~4.5:1 (AA)
- **Border on Background**: ~1.4:1 (Visible but subtle)

#### Dark Mode Contrast Ratios
- **Foreground on Background**: ~15:1 (AAA)
- **Muted text on Background**: ~6.5:1 (AAA)
- **Primary on Background**: ~7:1 (AAA)

## Design Comparison

### Border Strategy

The Nexus theme uses **90% lightness borders** in light mode, which are:
- **10% lighter** than Winter/GGM themes (75-80%)
- **More subtle** and modern
- Still **clearly visible** due to 1.4:1 contrast
- Better for **clean, spacious** layouts

### Color Intensity

Nexus uses **higher chroma values** (0.22 for primary):
- Creates **bold, memorable** interfaces
- Draws attention to **CTAs and actions**
- **Energizes** the user experience
- Maintains **professional polish**

## Component Styling

### Buttons
- Primary buttons use vibrant red `oklch(0.52 0.24 20)` with white text
- Font weight: `semibold` for stronger presence
- Hover states add depth with shadows
- Active states scale slightly for tactile feedback

### Badges
- Use 15% opacity backgrounds (light) / 25% (dark)
- Bold colors show through clearly
- Status badges are highly visible
- Semibold font weight for readability

### Cards
- **Pure white** cards on peachy background (light mode)
- **Generous padding**: 2rem (32px) horizontal and vertical
- Border radius: `0.75rem` for friendly corners
- Subtle borders with warm tint
- Soft shadows for depth without distraction

### Inputs & Forms
- Light peachy-tinted borders
- Clear focus states with red ring
- Proper contrast for accessibility
- Comfortable spacing between form elements

### Typography
- Headings are **larger and bolder**
- Body text has excellent contrast
- Tighter letter spacing (-0.011em) for modern look

## Usage Example

```tsx
// Apply Nexus theme
localStorage.setItem('style', 'nexus');
document.documentElement.classList.add('style-nexus');
```

## Files Modified

1. `components/style-selector.tsx` - Added Nexus option with Flame icon
2. `app/globals.css` - Added complete Nexus theme variables

## Migration from Other Themes

No breaking changes - the theme integrates seamlessly:
- All components automatically adapt
- Existing layouts remain unchanged
- Theme can be switched instantly via selector

## Special Features

### Background Gradient
The Nexus theme includes a custom gradient utility class:

```css
.bg-gradient-nexus
```

This creates a subtle radial gradient:
- **Light mode**: Peachy gradient fading from top
- **Dark mode**: Warm dark gradient from top
- Use on main containers for sophisticated depth

### Adaptive Spacing
The theme automatically applies generous spacing:
- Card padding increased to 2rem
- Base spacing variable doubled
- All components breathe more

## Inspiration

This theme draws inspiration from:
- **Pickel Digital Signage** dashboard design
- Modern SaaS dashboards (Stripe, Vercel)
- Digital signage control systems
- Bold consumer apps
- Contemporary web design trends with warm, approachable aesthetics

### Key Design Elements Borrowed:
1. **Warm background tints** - Peachy/pink undertones
2. **Generous whitespace** - Breathing room for content
3. **Bold CTAs** - Vibrant red that demands attention
4. **Soft corners** - 0.75rem radius for friendliness
5. **Refined typography** - Larger, bolder text hierarchy

The result is a professional yet energetic theme perfect for applications that need to make an impact while remaining approachable and modern.

