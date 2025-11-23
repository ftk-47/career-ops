# Design System Documentation

**Version:** 1.0  
**Last Updated:** November 2024  
**Purpose:** Comprehensive design system for career-ops admin dashboard

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography Scale](#typography-scale)
3. [Spacing System](#spacing-system)
4. [Border Radius](#border-radius)
5. [Shadows](#shadows)
6. [Component Sizing Standards](#component-sizing-standards)
7. [Visual Hierarchy Rules](#visual-hierarchy-rules)
8. [Interactive States](#interactive-states)
9. [Common Patterns & Anti-patterns](#common-patterns--anti-patterns)
10. [LLM Guidelines](#llm-guidelines)

---

## Color System

### Semantic Color Tokens

Our design system uses semantic color tokens that automatically adapt to light/dark themes. **Always use semantic tokens, never hardcoded color values.**

#### Primary Colors

| Token | Usage | Example Classes |
|-------|-------|-----------------|
| `--background` | Main page background | `bg-background` |
| `--foreground` | Primary text color | `text-foreground` |
| `--primary` | Primary actions, CTA buttons | `bg-primary`, `text-primary` |
| `--primary-foreground` | Text on primary backgrounds | `text-primary-foreground` |

#### Secondary & Accent Colors

| Token | Usage | Example Classes |
|-------|-------|-----------------|
| `--secondary` | Secondary actions, alternative styling | `bg-secondary`, `text-secondary` |
| `--secondary-foreground` | Text on secondary backgrounds | `text-secondary-foreground` |
| `--accent` | Highlights, hover states | `bg-accent`, `text-accent` |
| `--accent-foreground` | Text on accent backgrounds | `text-accent-foreground` |

#### Muted Colors

| Token | Usage | Example Classes |
|-------|-------|-----------------|
| `--muted` | Subtle backgrounds, disabled elements | `bg-muted` |
| `--muted-foreground` | Secondary text, captions, labels | `text-muted-foreground` |

#### Card & Surface Colors

| Token | Usage | Example Classes |
|-------|-------|-----------------|
| `--card` | Card backgrounds | `bg-card` |
| `--card-foreground` | Text on cards | `text-card-foreground` |
| `--popover` | Popover/dropdown backgrounds | `bg-popover` |
| `--popover-foreground` | Text in popovers | `text-popover-foreground` |

#### Border & Input Colors

| Token | Usage | Example Classes |
|-------|-------|-----------------|
| `--border` | General borders | `border-border` |
| `--input` | Input field borders | `border-input` |
| `--ring` | Focus ring color | `ring-ring` |

#### Feedback Colors

| Token | Usage | Example Classes |
|-------|-------|-----------------|
| `--destructive` | Error states, delete actions | `bg-destructive`, `text-destructive` |
| `--destructive-foreground` | Text on destructive backgrounds | `text-destructive-foreground` |
| `--success` | Success messages, completed states | `bg-success`, `text-success` |
| `--success-foreground` | Text on success backgrounds | `text-success-foreground` |
| `--warning` | Warning messages, caution states | `bg-warning`, `text-warning` |
| `--warning-foreground` | Text on warning backgrounds | `text-warning-foreground` |
| `--info` | Informational messages | `bg-info`, `text-info` |
| `--info-foreground` | Text on info backgrounds | `text-info-foreground` |

### Color Application Hierarchy

**When choosing colors for UI elements:**

1. **Background → Foreground:** Always pair backgrounds with their corresponding foreground colors
   - `bg-primary` → `text-primary-foreground`
   - `bg-card` → `text-card-foreground`
   - `bg-muted` → `text-muted-foreground`

2. **Opacity Patterns:** Use consistent opacity values for emphasis
   - 100% - Primary content
   - 50% - Hover states, subtle backgrounds (`bg-muted/50`)
   - 20% - Very subtle highlights (`bg-primary/20`)
   - 10% - Minimal emphasis, badges (`bg-primary/10`)

3. **Color Priority:**
   - **Primary**: Most important actions (Save, Submit, Create)
   - **Secondary**: Alternative actions (Cancel with action, secondary CTAs)
   - **Accent**: Highlights, hover states, active states
   - **Muted**: De-emphasized content, placeholders
   - **Destructive**: Delete, remove, error states

### Hiration Theme Specifics

The Hiration brand theme uses:
- **Primary**: Blue (`oklch(0.6690 0.1837 248.8066)`) - Main brand color
- **Secondary**: Yellow/Orange (`oklch(0.6958 0.2043 43.4910)`) - Accent brand color
- **Clean whites and subtle grays** for backgrounds
- **Reduced saturation** in muted colors for better readability

---

## Typography Scale

### Font Families

```css
--font-sans: Inter, sans-serif      /* Default for UI and body text */
--font-serif: Georgia, serif         /* For editorial content, quotes */
--font-mono: SF Mono, monospace      /* For code, technical content */
```

**Usage Rules:**
- **Headings**: Always use `--font-sans` (default)
- **Body text**: Use `--font-sans` (default)
- **Code/Technical**: Explicitly use `font-mono` class
- **Editorial/Quotes**: Use `font-serif` class when appropriate

### Font Size Scale

| Class | Size | Usage |
|-------|------|-------|
| `text-xs` | 0.75rem (12px) | Small labels, captions, badges |
| `text-sm` | 0.875rem (14px) | Secondary text, table cells, helper text |
| `text-base` | 1rem (16px) | Body text, standard content |
| `text-lg` | 1.125rem (18px) | Subheadings, emphasized text |
| `text-xl` | 1.25rem (20px) | Section headings |
| `text-2xl` | 1.5rem (24px) | Page titles, major headings |
| `text-3xl` | 1.875rem (30px) | Hero headings |
| `text-4xl` | 2.25rem (36px) | Large hero headings |

### Font Weight Scale

| Class | Weight | Usage |
|-------|--------|-------|
| `font-normal` | 400 | Body text, standard content |
| `font-medium` | 500 | Slightly emphasized text, subheadings |
| `font-semibold` | 600 | Headings, important labels |
| `font-bold` | 700 | High emphasis, critical information |

### Line Height Ratios

| Class | Ratio | Usage |
|-------|-------|-------|
| `leading-tight` | 1.25 | Large headings, condensed text |
| `leading-normal` | 1.5 | Body text (default) |
| `leading-relaxed` | 1.75 | Long-form content, better readability |

### Letter Spacing

| Class | Value | Usage |
|-------|-------|-------|
| `tracking-normal` | 0em | Default (most content) |
| `tracking-tight` | -0.025em | Large headings |
| `tracking-wide` | 0.025em | All-caps text, small labels |
| `tracking-wider` | 0.05em | Very wide spacing (rarely used) |

### Typography Combinations

**Page Titles:**
```tsx
<h1 className="text-2xl font-semibold tracking-tight">Page Title</h1>
```

**Section Headings:**
```tsx
<h2 className="text-lg font-medium">Section Heading</h2>
```

**Body Text:**
```tsx
<p className="text-base">Standard body text content</p>
```

**Captions/Helper Text:**
```tsx
<span className="text-sm text-muted-foreground">Helper text</span>
```

**Table Headers:**
```tsx
<th className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
  Header
</th>
```

---

## Spacing System

### Base Unit

**Base unit:** `0.25rem` (4px)  
**Spacing multiplier:** All spacing uses multiples of the base unit

### Spacing Scale

| Class | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `0` | 0 | 0px | Remove spacing |
| `1` | 0.25rem | 4px | Minimal spacing |
| `2` | 0.5rem | 8px | Tight spacing, icon gaps |
| `3` | 0.75rem | 12px | Small gaps |
| `4` | 1rem | 16px | Standard gap, form fields |
| `5` | 1.25rem | 20px | Medium spacing |
| `6` | 1.5rem | 24px | Comfortable spacing, card padding |
| `8` | 2rem | 32px | Large spacing, section gaps |
| `10` | 2.5rem | 40px | Extra large spacing |
| `12` | 3rem | 48px | Major section spacing |
| `16` | 4rem | 64px | Hero spacing |
| `20` | 5rem | 80px | Extra large hero spacing |
| `24` | 6rem | 96px | Maximum spacing |

### Component Internal Padding Patterns

#### Buttons
```tsx
// Small button
<Button size="sm" className="px-3 py-1.5">     // 12px × 6px

// Default button  
<Button className="px-4 py-2">                 // 16px × 8px

// Large button
<Button size="lg" className="px-6 py-3">       // 24px × 12px
```

#### Cards
```tsx
// Small card (tight content)
<Card className="p-4">                         // 16px padding

// Standard card
<Card className="p-6">                         // 24px padding (recommended)

// Large card
<Card className="p-8">                         // 32px padding
```

#### Inputs
```tsx
// Standard input
<Input className="px-3 py-2">                  // 12px × 8px (40px height)
```

#### Dialogs
```tsx
// Dialog content
<DialogContent className="p-6">                // 24px padding

// Dialog header/footer
<DialogHeader className="p-4">                 // 16px padding
```

### Gap Patterns

**Component Gaps:**
```tsx
// Icon + text in buttons
className="gap-2"                              // 8px

// Form fields stacked
className="space-y-4"                          // 16px between fields

// Grid of cards
className="gap-4"                              // 16px grid gap

// Major sections
className="gap-6"                              // 24px section gap

// Large section breaks
className="gap-8"                              // 32px between major sections
```

**Table Spacing:**
```tsx
// Table cell padding
className="px-4 py-3"                          // Horizontal 16px, Vertical 12px

// Table row height: 48px (comfortable) or 40px (compact)
```

### Margin Patterns

**Vertical Rhythm:**
```tsx
// Between form fields
className="mb-4"                               // 16px bottom margin

// Between sections
className="mb-6"                               // 24px bottom margin

// Between major sections
className="mb-8"                               // 32px bottom margin

// Hero section spacing
className="mb-12"                              // 48px bottom margin
```

### Responsive Spacing

Use responsive prefixes for different breakpoints:
```tsx
// Responsive padding
className="p-4 md:p-6 lg:p-8"

// Responsive gaps
className="gap-4 md:gap-6 lg:gap-8"
```

---

## Border Radius

### Base Radius

**Base value:** `0.5rem` (8px) for Hiration theme

### Radius Scale

| CSS Variable | Value | Usage |
|--------------|-------|-------|
| `--radius-sm` | `0.125rem` (2px) | Small elements, subtle rounding |
| `--radius-md` | `0.25rem` (4px) | Medium elements |
| `--radius-lg` | `0.5rem` (8px) | Standard (buttons, inputs, cards) |
| `--radius-xl` | `0.875rem` (14px) | Large elements (dialogs, large cards) |

### Usage Guidelines

| Element | Radius Class | Example |
|---------|-------------|---------|
| Buttons | `rounded-lg` | Standard button rounding |
| Inputs | `rounded-lg` | Match button rounding |
| Cards | `rounded-lg` or `rounded-xl` | Standard card rounding |
| Dialogs/Modals | `rounded-xl` | Larger rounding for prominence |
| Badges | `rounded-md` | Subtle, compact rounding |
| Avatars | `rounded-full` | Perfect circles |
| Images (decorative) | `rounded-lg` | Standard rounding |
| Popovers | `rounded-lg` | Match other surfaces |
| Tooltips | `rounded-md` | Compact rounding |

**Consistency Rule:** When buttons and inputs appear together (like search bars with buttons), they should use the same radius class (`rounded-lg`).

---

## Shadows

### Shadow Scale

Our shadow system uses subtle, elevation-based shadows:

| CSS Variable | Usage |
|--------------|-------|
| `--shadow-2xs` | Minimal elevation (rarely used) |
| `--shadow-xs` | Very subtle elevation |
| `--shadow-sm` | Small elevation, buttons |
| `--shadow` | Default shadow |
| `--shadow-md` | Medium elevation, elevated cards |
| `--shadow-lg` | Large elevation, dropdowns, popovers |
| `--shadow-xl` | Extra large elevation, modals |
| `--shadow-2xl` | Maximum elevation, important dialogs |

### Usage Rules

#### Element-Specific Shadows

| Element Type | Shadow | Additional Notes |
|--------------|--------|------------------|
| **Buttons** | `shadow-sm` | Increase to `shadow-md` on hover |
| **Cards (default)** | `shadow-sm` | Subtle elevation |
| **Cards (hover)** | `shadow-md` | Lift effect on interaction |
| **Dropdowns** | `shadow-lg` | Clear separation from page |
| **Popovers** | `shadow-lg` | Similar to dropdowns |
| **Dialogs** | `shadow-2xl` | Maximum prominence |
| **Sheets/Drawers** | `shadow-xl` | Side panels |
| **Tables** | No shadow | Use borders instead |
| **Inputs** | `shadow-sm` | Very subtle |
| **Floating Action Buttons** | `shadow-lg` | Always elevated |

### Shadow Behavior

**Hover Effects:**
- Increase shadow size by one level on hover
- Example: `shadow-sm hover:shadow-md`

**Interaction States:**
- Active/pressed: Can reduce shadow slightly for "pushed" effect
- Focus: Use rings, not shadows

**Dark Mode:**
- Shadows are automatically adjusted in dark mode
- Hiration theme uses consistent shadow colors that work in both themes

---

## Component Sizing Standards

### Button Heights

| Size | Height | Padding | Text Size |
|------|--------|---------|-----------|
| Small | `32px` (`h-8`) | `px-3` | `text-xs` |
| Default | `40px` (`h-10`) | `px-4 py-2` | `text-sm` |
| Large | `48px` (`h-12`) | `px-6 py-3` | `text-base` |

**Icon-only buttons:**
- Small: `32×32px` (`size-8`)
- Default: `40×40px` (`size-10`)
- Large: `48×48px` (`size-12`)

### Input Heights

| Type | Height | Padding |
|------|--------|---------|
| Default | `40px` (`h-10`) | `px-3 py-2` |
| With button group | Match button height | Same as button |

**Rule:** When inputs and buttons appear together, they must have matching heights.

### Icon Sizes

| Context | Size | Class |
|---------|------|-------|
| Small (badges, chips) | `16px` | `size-4` |
| Default (buttons, inputs) | `20px` | `size-5` |
| Large (headers, emphasis) | `24px` | `size-6` |
| Hero (landing pages) | `32px` | `size-8` |

### Avatar Sizes

| Size | Dimension | Class | Usage |
|------|-----------|-------|-------|
| Small | `32px` | `size-8` | Compact lists, inline mentions |
| Medium | `40px` | `size-10` | Standard (default) |
| Large | `48px` | `size-12` | Profile headers, emphasis |
| Extra Large | `64px` | `size-16` | Profile pages, hero sections |

### Card Sizing

**Width:**
- Metric cards: `min-w-[280px]` (minimum width)
- Content cards: Fluid with `max-w-*` constraints
- Full-width cards: `w-full`

**Height:**
- Let content determine height (default)
- Use `min-h-*` for consistent card grids
- Avoid fixed heights unless necessary

### Table Row Heights

| Density | Height | Padding |
|---------|--------|---------|
| Compact | `40px` | `py-2` |
| Comfortable (default) | `48px` | `py-3` |
| Spacious | `56px` | `py-4` |

### Dialog/Modal Sizing

**Width:**
- Small: `max-w-sm` (384px)
- Default: `max-w-md` (448px)
- Large: `max-w-lg` (512px)
- Extra Large: `max-w-2xl` (672px)

**Height:**
- Let content determine height
- Use `max-h-[90vh]` with `overflow-y-auto` for tall content

---

## Visual Hierarchy Rules

### Action Priority

#### 1. Primary Actions
**Characteristics:**
- Use `variant="default"` (primary color)
- Solid background
- Prominent placement (top-right, bottom-right)
- Most visually distinct

**Examples:**
```tsx
<Button variant="default">Save Changes</Button>
<Button variant="default">Create New</Button>
<Button variant="gradient">Get Started</Button>  // Premium variant
```

#### 2. Secondary Actions
**Characteristics:**
- Use `variant="secondary"` or `variant="outline"`
- Less prominent than primary
- Adjacent to primary actions

**Examples:**
```tsx
<Button variant="secondary">Cancel</Button>
<Button variant="outline">Learn More</Button>
```

#### 3. Tertiary Actions
**Characteristics:**
- Use `variant="ghost"` or `variant="link"`
- Minimal visual weight
- Inline with content

**Examples:**
```tsx
<Button variant="ghost">View Details</Button>
<Button variant="link">Read Documentation</Button>
```

#### 4. Destructive Actions
**Characteristics:**
- Use `variant="destructive"`
- Always confirm before executing
- Clear warning state

**Examples:**
```tsx
<Button variant="destructive">Delete Account</Button>
<Button variant="destructive">Remove User</Button>
```

### Text Hierarchy

| Element | Styling | Usage |
|---------|---------|-------|
| **Page Title** | `text-2xl font-semibold tracking-tight` | Main page heading |
| **Section Heading** | `text-lg font-medium` | Major sections |
| **Subsection Heading** | `text-base font-semibold` | Subsections |
| **Body Text** | `text-base` | Standard content |
| **Emphasized Text** | `text-base font-medium` | Important content |
| **Caption** | `text-sm text-muted-foreground` | Helper text, labels |
| **Small Caption** | `text-xs text-muted-foreground` | Metadata, timestamps |

### Visual Weight Distribution

**High Emphasis (100% opacity):**
- Primary text
- Active buttons
- Important data

**Medium Emphasis (70-90% opacity):**
- Secondary text
- Disabled states (50%)
- Placeholder text

**Low Emphasis (40-60% opacity):**
- Captions
- Helper text
- Subtle backgrounds (`/10`, `/20`)

---

## Interactive States

### Hover States

**Visual Changes:**
1. **Elevation increase:** `hover:shadow-md`
2. **Slight lift:** `hover:-translate-y-0.5`
3. **Background lightness:** `hover:bg-primary/90`
4. **Scale:** `hover:scale-[1.02]` (subtle, for cards)

**Examples:**
```tsx
// Button hover
className="hover:bg-primary/90 hover:shadow-md"

// Card hover
className="hover:shadow-md hover:-translate-y-0.5 transition-all"

// Link hover
className="hover:underline hover:text-primary"
```

### Active/Pressed States

**Visual Changes:**
1. **Scale down:** `active:scale-[0.98]`
2. **Shadow increase:** `active:shadow-lg`
3. **No lift:** Remove translate-y on active

**Example:**
```tsx
className="active:scale-[0.98] transition-transform"
```

### Focus States

**Ring Styling:**
```tsx
// Standard focus ring (default on all interactive elements)
className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// Destructive focus
className="focus-visible:ring-2 focus-visible:ring-destructive"
```

**Rules:**
- Always include focus states on interactive elements
- Use `focus-visible:` prefix (keyboard-only focus)
- Ring color matches element purpose (primary → ring, destructive → ring-destructive)
- 2px ring with 2px offset is standard

### Disabled States

**Visual Changes:**
1. **Opacity:** `disabled:opacity-50`
2. **Cursor:** `disabled:cursor-not-allowed`
3. **No interactions:** `disabled:pointer-events-none`
4. **Flatten elevation:** Remove shadows

**Example:**
```tsx
<Button 
  disabled 
  className="disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
>
  Disabled Button
</Button>
```

### Loading States

**Visual Changes:**
1. **Show spinner:** Display loading indicator
2. **Reduce opacity:** `opacity-70`
3. **Disable interactions:** `pointer-events-none`
4. **Keep layout:** Don't collapse, use loading overlay

**Example:**
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Spinner className="size-4" />
      <span className="opacity-70">Loading...</span>
    </>
  ) : (
    "Submit"
  )}
</Button>
```

### Validation States

**Error State:**
```tsx
className="border-destructive ring-2 ring-destructive/20"
aria-invalid="true"
```

**Success State:**
```tsx
className="border-success ring-2 ring-success/20"
```

---

## Common Patterns & Anti-patterns

### ✅ DO: Use Semantic Color Tokens

```tsx
// GOOD - Uses semantic tokens
<div className="bg-primary text-primary-foreground">
  <Button className="bg-card text-card-foreground">Action</Button>
</div>

// GOOD - Uses opacity modifiers
<div className="bg-muted/50 hover:bg-muted/70">
```

### ❌ DON'T: Use Hardcoded Colors

```tsx
// BAD - Hardcoded colors
<div className="bg-blue-500 text-white">
  <Button className="bg-gray-100">Action</Button>
</div>

// BAD - Arbitrary opacity
<div style={{ backgroundColor: 'rgba(100, 100, 100, 0.37)' }}>
```

### ✅ DO: Maintain Consistent Spacing

```tsx
// GOOD - Uses spacing scale
<div className="space-y-4">
  <Input className="mb-4" />
  <Button className="mt-6" />
</div>

// GOOD - Consistent card padding
<Card className="p-6">
  <CardHeader className="mb-4">
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>
```

### ❌ DON'T: Use Arbitrary Spacing

```tsx
// BAD - Arbitrary spacing values
<div className="mt-[13px] mb-[27px]">
  <Input className="mb-[9px]" />
</div>

// BAD - Inconsistent spacing
<Card className="p-7">  {/* Should be p-6 or p-8 */}
```

### ✅ DO: Use Proper Border Classes

```tsx
// GOOD - Semantic border colors
<Input className="border border-input focus:border-primary" />
<Card className="border border-border" />
```

### ❌ DON'T: Style Borders Inline

```tsx
// BAD - Inline border styles
<div style={{ border: '1px solid #ccc' }}>

// BAD - Arbitrary border colors
<div className="border border-gray-300">
```

### ✅ DO: Stack Related Items Consistently

```tsx
// GOOD - Consistent gaps
<div className="flex flex-col gap-4">
  <FormField />
  <FormField />
  <FormField />
</div>

// GOOD - Proper section separation
<div className="space-y-8">
  <Section />
  <Section />
</div>
```

### ❌ DON'T: Mix Different Gap Values

```tsx
// BAD - Inconsistent gaps in same context
<div className="flex flex-col">
  <div className="mb-2"><FormField /></div>
  <div className="mb-5"><FormField /></div>
  <div className="mb-3"><FormField /></div>
</div>
```

### ✅ DO: Match Heights for Adjacent Elements

```tsx
// GOOD - Matching heights
<div className="flex gap-2">
  <Input className="h-10" />
  <Button size="default" className="h-10">Submit</Button>
</div>
```

### ❌ DON'T: Misalign Adjacent Elements

```tsx
// BAD - Mismatched heights
<div className="flex gap-2">
  <Input className="h-10" />
  <Button size="lg" className="h-12">Submit</Button>  {/* Wrong height */}
</div>
```

---

## LLM Guidelines

**Instructions specifically for AI assistants creating or modifying components:**

### Before Creating Components

1. **Reference this document** - Always review relevant sections before generating code
2. **Check existing components** - Look for similar patterns in the codebase
3. **Use semantic tokens** - Never use hardcoded colors or arbitrary values
4. **Follow spacing scale** - Use the documented spacing values (4, 6, 8, etc.)

### Component Creation Checklist

- [ ] Uses semantic color tokens (`bg-primary`, `text-foreground`, etc.)
- [ ] Follows spacing scale (no arbitrary values like `mt-[13px]`)
- [ ] Includes all interactive states (hover, focus, active, disabled)
- [ ] Uses proper border radius (usually `rounded-lg`)
- [ ] Applies appropriate shadows (usually `shadow-sm`)
- [ ] Has proper text hierarchy (correct font sizes and weights)
- [ ] Matches heights with adjacent elements (inputs + buttons = 40px)
- [ ] Uses consistent padding (cards = `p-6`)
- [ ] Implements proper focus rings (`focus-visible:ring-2 ring-ring ring-offset-2`)
- [ ] Works in both light and dark themes

### Accessibility Requirements

1. **Color Contrast:** Verify all color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
2. **Focus Indicators:** All interactive elements must have visible focus states
3. **Semantic HTML:** Use proper HTML elements (`<button>`, `<input>`, etc.)
4. **ARIA Labels:** Add labels where visual context isn't sufficient
5. **Keyboard Navigation:** Ensure all actions are keyboard accessible

### Common Mistakes to Avoid

1. **Don't** use `bg-blue-500` - Use `bg-primary` instead
2. **Don't** use `mt-[15px]` - Use `mt-4` (16px) instead
3. **Don't** forget focus states - Always include `focus-visible:ring-2`
4. **Don't** mix button/input heights - Keep them consistent at 40px (default)
5. **Don't** use different padding in similar cards - Standardize to `p-6`
6. **Don't** create new spacing values - Use the documented scale
7. **Don't** forget hover states - Add appropriate elevation/color changes
8. **Don't** use the same text size everywhere - Apply proper hierarchy
9. **Don't** hardcode opacity values - Use `/10`, `/20`, `/50`, etc.
10. **Don't** ignore dark mode - Test both themes

### Testing Your Components

After creating a component:

1. **Visual Test:** View in both light and dark Hiration theme
2. **Interaction Test:** Verify all interactive states work
3. **Spacing Test:** Check that spacing feels consistent with other components
4. **Accessibility Test:** Ensure keyboard navigation and focus states work
5. **Responsive Test:** Verify component works on mobile, tablet, desktop

### Example: Well-Formed Component

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

function ExampleForm() {
  return (
    <Card className="p-6">
      <CardHeader className="mb-6">
        <CardTitle className="text-2xl font-semibold">
          Example Form
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Email Address
          </label>
          <Input 
            type="email" 
            placeholder="Enter your email"
            className="h-10"
          />
          <p className="text-xs text-muted-foreground">
            We'll never share your email
          </p>
        </div>
        
        <div className="flex gap-2 justify-end mt-6">
          <Button variant="outline">
            Cancel
          </Button>
          <Button variant="default">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

**Why this is good:**
- ✅ Uses semantic tokens throughout
- ✅ Follows spacing scale (`space-y-4`, `gap-2`, `mt-6`, `mb-6`, `p-6`)
- ✅ Proper text hierarchy (`text-2xl`, `text-sm`, `text-xs`)
- ✅ Consistent component structure
- ✅ Matching button heights
- ✅ Clear visual hierarchy
- ✅ Proper use of muted text for helper content
- ✅ Uses documented component patterns

---

## Appendix: Quick Reference

### Most Common Classes

**Colors:**
- `bg-primary text-primary-foreground`
- `bg-secondary text-secondary-foreground`
- `bg-muted/50`
- `text-muted-foreground`
- `border-border`

**Spacing:**
- `p-6` (card padding)
- `gap-4` (standard gap)
- `space-y-4` (form field spacing)
- `mb-6` (section spacing)

**Typography:**
- `text-2xl font-semibold` (page title)
- `text-lg font-medium` (section heading)
- `text-sm text-muted-foreground` (caption)

**Sizing:**
- `h-10` (standard input/button)
- `rounded-lg` (standard radius)
- `shadow-sm` (standard shadow)

---

**Document Version:** 1.0  
**Last Updated:** November 2024  
**Maintained By:** CareerOps Team

