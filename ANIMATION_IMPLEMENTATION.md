# Framer Motion Animation Implementation

## Overview

This document provides a comprehensive overview of the Framer Motion animations added to the admin dashboard. All animations follow Linear, Vercel, and Notion design principles - calm, purposeful, and premium.

## 🎯 What Was Implemented

### 1. Animation Primitives & Reusable Components

Created in `components/motion/`:

#### **page-transition.tsx**
- Handles fade + upward motion on route changes
- Duration: 180ms with easeOut
- Variants: initial (opacity: 0, y: 10) → animate (opacity: 1, y: 0) → exit (opacity: 0, y: -10)

#### **page-wrapper.tsx**
- Wraps all page content in layout.tsx
- Handles first-load animation on every page refresh: fade (0→1) + scale (0.98→1), 220ms
- Switches to page transitions on route changes

#### **stagger-list.tsx**
- Container and item components for table row animations
- Stagger delay: 0.03s between rows
- Row animation: fade + y: 6 → 0, duration: 150ms
- Supports tbody and div containers

#### **animated-card.tsx**
- Card wrapper with fade + upward motion
- Optional hover scale (1.02) and tap scale (0.98)
- Configurable delay for staggered card grids

#### **fade-in.tsx**
- Simple fade-in wrapper with optional slide directions (up/down/left/right)
- Configurable duration and delay

#### **animated-button.tsx**
- Button wrapper with hover (scale: 1.01) and tap (scale: 0.98) animations
- Duration: 150ms

### 2. Animation Utilities

#### **lib/animation-variants.ts**
Centralized animation variants including:
- `pageTransition` - Route change animations
- `firstLoad` - Initial app load animation
- `tableStagger` - Table row stagger animations
- `cardFade` - Card mount animations with delay
- `fadeIn` - Simple fade animations
- `slideIn` - Directional slide animations
- `dialogOverlay` & `dialogContent` - Modal animations
- `sheetOverlay` & `sheetContent` - Slide panel animations
- `dropdownMenu` - Dropdown scale + fade
- `badgeMount` - Badge scale animation

Also includes `getAnimation()` helper that respects `prefers-reduced-motion`.

#### **lib/motion-config.ts**
- Motion configuration utilities
- Transition presets: fast, normal, slow, spring, springBouncy
- `prefersReducedMotion()` detection
- `getTransition()` helper for accessibility

### 3. Layout & Page Transitions

#### **app/layout.tsx**
- Wrapped `SidebarInset` children with `PageWrapper`
- Sidebar remains static during transitions
- Only page content animates

### 4. Page Animations

#### **app/page.tsx (Dashboard)**
- Metric cards: Staggered fade-in with delays (0, 0.05, 0.1, 0.15, 0.2s)
- Alert card: Fade-in with upward motion (delay: 0.3s)
- Quick actions: Fade-in with upward motion (delay: 0.35s)
- Recent activity table: Staggered row animations (delay: 0.5s)
- Hover effects on metric cards and table rows

#### **app/student-submissions/page.tsx**
- Table rows with stagger animation
- Bulk actions bar with slide-down animation
- Hover highlight on table rows

#### **app/review-center/page.tsx**
- Table rows with stagger animation
- Hover highlight on table rows

#### **app/manage-team/page.tsx**
- Table rows with stagger animation
- Hover highlight on table rows

#### **app/manage-cohorts/page.tsx**
- Table rows with stagger animation
- Hover highlight on table rows

#### **app/manage-interviews/page.tsx**
- Table rows with stagger animation
- Hover highlight on table rows

### 5. Sidebar Animations

#### **components/app-sidebar.tsx**
- Logo hover: subtle scale (1.02) + rotation (5deg)
- Menu items: hover slide (x: 2) + scale (1.01)
- Active indicator: animated left border with layoutId for smooth transitions
- Tap feedback: scale (0.98)

### 6. Component Enhancements

#### **components/ui/badge.tsx**
- Mount animation: scale (0.9 → 1) + fade, 120ms
- Uses Framer Motion for smooth entry

#### **components/metric-card.tsx**
- Hover scale using CSS transitions for performance
- Active scale feedback

#### **components/quick-actions.tsx**
- Button hover scale using CSS transitions
- Tap feedback

## 🎨 Animation Principles

### Timing
- Fast: 120-150ms (micro-interactions)
- Normal: 180ms (standard transitions)
- Slow: 220ms (first-load)
- All use `easeOut` for natural deceleration

### Motion Style
- Subtle, purposeful movements
- No flashy or distracting effects
- Animations feel "invisible" but add polish
- GPU-accelerated (transform & opacity only)

### Accessibility
- Respects `prefers-reduced-motion`
- All animations are interruptible
- No blocking animations
- Essential UI remains functional without animations

## 🚀 Performance Optimizations

1. **GPU Acceleration**: All animations use `transform` and `opacity` (GPU-accelerated properties)
2. **No Layout Animations**: Avoided `layout` prop to prevent expensive recalculations
3. **CSS Fallbacks**: Simple hover effects use CSS transitions for lighter components
4. **Stagger Optimization**: Small delays (0.03s) prevent long wait times
5. **Reduced Motion Support**: Automatically disables/reduces animations when user prefers reduced motion

## 📦 File Structure

```
components/
  motion/
    page-transition.tsx       - Route change animations
    page-wrapper.tsx          - First-load & route wrapper
    stagger-list.tsx          - Table stagger animations
    animated-card.tsx         - Card mount animations
    fade-in.tsx               - Simple fade wrapper
    animated-button.tsx       - Button micro-interactions
  ui/
    badge.tsx                 - Enhanced with mount animation
  app-sidebar.tsx             - Enhanced with hover/active animations
  metric-card.tsx             - Enhanced with CSS hover
  quick-actions.tsx           - Enhanced with CSS hover
lib/
  animation-variants.ts       - Centralized animation variants
  motion-config.ts            - Motion utilities & config
app/
  layout.tsx                  - Page wrapper integration
  page.tsx                    - Dashboard animations
  student-submissions/page.tsx - Table animations
  review-center/page.tsx       - Table animations
  manage-team/page.tsx         - Table animations
  manage-cohorts/page.tsx      - Table animations
  manage-interviews/page.tsx   - Table animations
```

## 🎯 Usage Examples

### Animating a new page
```tsx
import { FadeIn } from "@/components/motion/fade-in";

export default function NewPage() {
  return (
    <div>
      <FadeIn direction="up" delay={0.1}>
        <h1>Page Title</h1>
      </FadeIn>
    </div>
  );
}
```

### Animating a table
```tsx
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";

<Table>
  <TableHeader>...</TableHeader>
  <StaggerContainer as="tbody">
    {data.map((item) => (
      <StaggerItem key={item.id} as="tr" className="...">
        <TableCell>...</TableCell>
      </StaggerItem>
    ))}
  </StaggerContainer>
</Table>
```

### Animating cards
```tsx
import { AnimatedCard } from "@/components/motion/animated-card";

{items.map((item, index) => (
  <AnimatedCard key={item.id} delay={index * 0.05}>
    <Card>...</Card>
  </AnimatedCard>
))}
```

## ✅ Testing Checklist

- [x] Route transitions work smoothly
- [x] First-load animation plays on page refresh
- [x] Table rows stagger in correctly
- [x] Sidebar interactions feel responsive
- [x] Cards animate on mount
- [x] Hover effects are smooth
- [x] No layout shift during animations
- [x] Respects prefers-reduced-motion
- [x] No console errors or warnings
- [x] Performance is smooth (60fps)

## 🔧 Customization

### Adjusting timing
Edit `lib/animation-variants.ts` to change global animation timings:
```typescript
pageTransition: {
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.18, ease: "easeOut" } // Change here
  }
}
```

### Disabling specific animations
Wrap components with conditional rendering based on `prefersReducedMotion()`:
```typescript
import { prefersReducedMotion } from "@/lib/motion-config";

const shouldAnimate = !prefersReducedMotion();
```

### Adding new animations
1. Create variant in `lib/animation-variants.ts`
2. Use in component with `motion.div` and `variants` prop
3. Ensure accessibility with `getAnimation()` wrapper

## 🎬 Result

The dashboard now features:
- ✨ Polished, premium feel
- 🎯 Purposeful, calm animations
- ⚡ Performance-optimized
- ♿ Accessible to all users
- 🎨 Consistent with Linear/Vercel/Notion design language

All animations are production-ready and follow best practices for modern web applications.

