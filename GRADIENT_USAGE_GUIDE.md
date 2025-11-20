# Gradient Design System - Usage Guide

## Overview

This gradient design system adds meaningful, tasteful gradient usage throughout the Hiration Counsellor Admin dashboard. All gradients are theme-aware and work seamlessly across all 4 style themes (autumn, meadow, pastel, stripy) in both light and dark modes.

## Design Philosophy

- **Calm & Enterprise-Quality**: Inspired by Linear, Superhuman, and Vercel
- **Subtle by Default**: Gradients enhance, not overwhelm
- **Theme-Aware**: Automatically adapts to the active color scheme
- **Performance-Optimized**: CSS-based gradients with hardware acceleration

---

## 1. Gradient CSS Utilities

All gradient utilities are defined in `app/globals.css` and can be used directly in your components.

### Primary Gradients

#### `bg-gradient-primary`
Main CTA gradient with hover effect. Bold and noticeable.

```tsx
<button className="bg-gradient-primary text-white px-6 py-3 rounded-lg">
  Get Started
</button>
```

#### `bg-gradient-secondary`
Softer alternative for secondary actions.

```tsx
<div className="bg-gradient-secondary p-4 rounded-lg">
  Secondary content
</div>
```

#### `bg-gradient-accent`
For highlights and special elements.

```tsx
<div className="bg-gradient-accent p-6 rounded-xl">
  Featured content
</div>
```

### Background Gradients

#### `bg-gradient-subtle`
Barely noticeable vertical gradient for backgrounds.

```tsx
<div className="bg-gradient-subtle min-h-screen">
  Page content
</div>
```

#### `bg-gradient-subtle-horizontal`
Horizontal variant for sidebar items.

```tsx
<div className="hover:bg-gradient-subtle-horizontal p-2 rounded">
  Sidebar item
</div>
```

#### `bg-gradient-radial`
Radial fade for section backgrounds (top-left origin).

```tsx
<section className="bg-gradient-radial py-12">
  Section content
</section>
```

#### `bg-gradient-radial-center`
Radial fade from center.

```tsx
<div className="bg-gradient-radial-center p-8">
  Centered content
</div>
```

### Specialized Gradients

#### `bg-gradient-glow`
Soft glow for icon containers.

```tsx
<div className="relative">
  <div className="absolute inset-0 bg-gradient-glow" />
  <Icon className="relative z-10" />
</div>
```

#### `bg-gradient-table-header`
Very subtle gradient for table headers.

```tsx
<thead className="bg-gradient-table-header">
  <tr>...</tr>
</thead>
```

#### `bg-gradient-hero`
Large radial gradient for hero sections.

```tsx
<div className="bg-gradient-hero py-24">
  <h1>Welcome to Dashboard</h1>
</div>
```

#### `bg-gradient-empty-state`
Elliptical gradient for empty states.

```tsx
<div className="bg-gradient-empty-state p-12">
  Empty state content
</div>
```

#### `bg-gradient-card`
Subtle gradient for card backgrounds.

```tsx
<div className="bg-gradient-card p-6 rounded-xl">
  Card content
</div>
```

### Special Effects

#### `sidebar-active-gradient`
Horizontal gradient for active sidebar items.

```tsx
<div className="sidebar-active-gradient p-3 rounded-lg">
  Active item
</div>
```

#### `hover-gradient-intensify`
Gradient that appears on hover.

```tsx
<button className="hover-gradient-intensify p-4">
  Hover me
</button>
```

#### `text-gradient`
Gradient text effect.

```tsx
<h1 className="text-gradient text-4xl font-bold">
  Gradient Heading
</h1>
```

---

## 2. Updated Components

### Button Component

**New `gradient` variant** for primary CTAs with shine effect on hover.

```tsx
import { Button } from "@/components/ui/button";

// Gradient button
<Button variant="gradient" size="lg">
  Get Started
</Button>

// Regular button (unchanged)
<Button variant="default">
  Continue
</Button>
```

**Variants:**
- `default` - Standard primary button
- `gradient` - New! Bold gradient with shine animation
- `destructive` - Destructive actions
- `outline` - Outlined button
- `secondary` - Secondary actions
- `ghost` - Minimal button
- `link` - Link-styled button

### Sidebar

Active and hover states now include gradients:

**Features:**
- Gradient bar on left edge of active items
- Horizontal gradient on hover
- Semi-transparent gradient overlay on active background

```tsx
// Already implemented in app-sidebar.tsx
// Active state automatically shows gradient effects
```

### Metric Cards

Enhanced with subtle gradients and hover effects:

**Features:**
- Subtle gradient background layer
- Radial glow behind icon container (appears on hover)
- Gradient intensification on hover

```tsx
<MetricCard
  title="Total Users"
  value="1,234"
  description="Active users"
  icon={Users}
  onClick={() => navigate('/users')}
/>
```

### Table Headers

Minimal gradient for improved scannability:

```tsx
<Table>
  <TableHeader>
    {/* Gradient automatically applied */}
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* ... */}
  </TableBody>
</Table>
```

### Page Headers

Radial gradient fade behind title with gradient divider:

```tsx
<PageHeader
  title="Dashboard"
  description="Welcome back!"
  actions={<Button>Action</Button>}
/>
```

### Empty States

Enhanced with gradient accents and glows:

```tsx
<EmptyState
  icon={FileText}
  title="No submissions yet"
  description="Start by creating your first submission."
  action={{
    label: "Create Submission",
    onClick: handleCreate
  }}
/>
```

**Features:**
- Gradient background behind card
- Soft gradient circles in background
- Gradient glow behind icon
- Uses gradient button variant for action

### Dialog Component

Gradient border and shadow glow:

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Item</DialogTitle>
      <DialogDescription>
        Enter the details below.
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

**Features:**
- Gradient glow shadow effect
- Subtle gradient background
- Gradient border ring
- Gradient underline in header

### Sheet Component

Vertical gradient divider and header background:

```tsx
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>
        Manage your preferences
      </SheetDescription>
    </SheetHeader>
    {/* Content */}
  </SheetContent>
</Sheet>
```

**Features:**
- Vertical gradient divider (side sheets)
- Gradient header background
- Gradient divider line
- Subtle background gradient

### Quick Actions

Gradient hover effects and icon glows:

```tsx
<QuickActions
  actions={[
    {
      label: "Invite Member",
      description: "Add a new team member",
      icon: UserPlus,
      onClick: handleInvite
    }
  ]}
/>
```

**Features:**
- Gradient overlay on hover
- Icon gradient glow on hover
- Smooth transitions

---

## 3. Gradient Helper Components

Reusable components for common gradient patterns.

### GradientBorder

Wraps content with a gradient border.

```tsx
import { GradientBorder } from "@/components/gradient";

<GradientBorder rounded="lg" borderWidth={2}>
  <div className="p-4">
    Content with gradient border
  </div>
</GradientBorder>

// With animation
<GradientBorder rounded="xl" animated>
  <div className="p-6">
    Animated gradient border
  </div>
</GradientBorder>
```

**Props:**
- `children` - Content to wrap
- `className?` - Additional classes
- `borderWidth?` - Border width in pixels (default: 1)
- `rounded?` - Border radius: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
- `animated?` - Enable gradient rotation animation

### GradientBackground

Configurable gradient backgrounds for sections.

```tsx
import { GradientBackground } from "@/components/gradient";

// Hero section
<GradientBackground type="hero" intensity="high" position="top-left">
  <div className="py-24">
    <h1>Welcome to Dashboard</h1>
  </div>
</GradientBackground>

// Subtle card background
<GradientBackground type="card" intensity="low">
  <div className="p-6">
    Card content
  </div>
</GradientBackground>

// Radial glow
<GradientBackground type="glow" position="center">
  <div className="p-8">
    Glowing content
  </div>
</GradientBackground>
```

**Props:**
- `children` - Content to wrap
- `type?` - Gradient type: "subtle" | "radial" | "accent" | "hero" | "card" | "glow" | "primary" | "secondary"
- `className?` - Additional classes
- `intensity?` - Opacity level: "low" | "medium" | "high"
- `position?` - For radial types: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"

### GradientButton

Pre-built gradient CTA button with optional shine effect.

```tsx
import { GradientButton } from "@/components/gradient";
import { Plus } from "lucide-react";

// Basic gradient button
<GradientButton onClick={handleClick}>
  Get Started
</GradientButton>

// With icon and shine effect
<GradientButton
  icon={Plus}
  iconPosition="left"
  shine={true}
  size="lg"
  onClick={handleCreate}
>
  Create New
</GradientButton>

// Disabled state
<GradientButton disabled>
  Processing...
</GradientButton>
```

**Props:**
- `children` - Button content
- `onClick?` - Click handler
- `icon?` - Lucide icon component
- `iconPosition?` - "left" | "right"
- `size?` - "sm" | "default" | "lg"
- `className?` - Additional classes
- `disabled?` - Disabled state
- `shine?` - Enable shine animation
- `type?` - "button" | "submit" | "reset"

---

## 4. Real-World Examples

### Example 1: Enhanced Dashboard Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GradientBackground } from "@/components/gradient";
import { TrendingUp } from "lucide-react";

function EnhancedDashboardCard() {
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
      <GradientBackground type="subtle" intensity="medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Revenue</CardTitle>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$45,231</div>
          <p className="text-sm text-muted-foreground mt-1">
            +20.1% from last month
          </p>
        </CardContent>
      </GradientBackground>
    </Card>
  );
}
```

### Example 2: Call-to-Action Section

```tsx
import { GradientBackground, GradientButton } from "@/components/gradient";
import { ArrowRight } from "lucide-react";

function CTASection() {
  return (
    <GradientBackground type="hero" intensity="high" position="center">
      <div className="text-center py-24 px-6">
        <h2 className="text-4xl font-bold mb-4 text-gradient">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of teams already using our platform to streamline their workflow.
        </p>
        <div className="flex gap-4 justify-center">
          <GradientButton
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            shine={true}
          >
            Start Free Trial
          </GradientButton>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </GradientBackground>
  );
}
```

### Example 3: Featured Card with Gradient Border

```tsx
import { GradientBorder, GradientBackground } from "@/components/gradient";
import { Star } from "lucide-react";

function FeaturedCard() {
  return (
    <GradientBorder rounded="xl" borderWidth={2}>
      <GradientBackground type="card" intensity="low">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">Featured</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Premium Plan</h3>
          <p className="text-muted-foreground mb-4">
            Get access to all premium features and priority support.
          </p>
          <GradientButton className="w-full">
            Upgrade Now
          </GradientButton>
        </div>
      </GradientBackground>
    </GradientBorder>
  );
}
```

### Example 4: Sidebar with Gradient Active State

```tsx
// Already implemented in app-sidebar.tsx
// Shows how active navigation items use gradients

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Analytics", href: "/analytics", icon: BarChart },
];

// Active item automatically shows:
// - Gradient bar on left edge
// - Horizontal gradient background
// - Smooth transitions
```

### Example 5: Custom Modal with Gradients

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GradientButton } from "@/components/gradient";

function CustomModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        {/* Gradient effects automatically applied */}
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground">
            Are you sure you want to proceed with this action?
          </p>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <GradientButton onClick={handleConfirm}>
            Confirm
          </GradientButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 5. Best Practices

### Do's ✅

1. **Use gradient buttons for primary CTAs**
   ```tsx
   <GradientButton>Sign Up Now</GradientButton>
   ```

2. **Apply subtle gradients to card backgrounds**
   ```tsx
   <div className="bg-gradient-subtle p-6 rounded-xl">...</div>
   ```

3. **Use radial gradients for hero sections**
   ```tsx
   <section className="bg-gradient-hero py-24">...</section>
   ```

4. **Leverage hover states for progressive disclosure**
   ```tsx
   <div className="hover-gradient-intensify">...</div>
   ```

5. **Combine gradients with shadows for depth**
   ```tsx
   <Card className="shadow-sm hover:shadow-md transition-shadow">...</Card>
   ```

### Don'ts ❌

1. **Don't stack multiple intense gradients**
   ```tsx
   {/* Bad */}
   <div className="bg-gradient-primary">
     <div className="bg-gradient-accent">...</div>
   </div>
   ```

2. **Don't use gradients on small text**
   ```tsx
   {/* Bad */}
   <p className="text-xs text-gradient">Small text</p>
   ```

3. **Don't override gradient classes unnecessarily**
   ```tsx
   {/* Bad */}
   <Button variant="gradient" className="bg-red-500">
     This breaks the gradient
   </Button>
   ```

4. **Don't use too many gradient buttons on one screen**
   ```tsx
   {/* Bad - only one should be gradient */}
   <GradientButton>Action 1</GradientButton>
   <GradientButton>Action 2</GradientButton>
   <GradientButton>Action 3</GradientButton>
   ```

5. **Don't apply gradients to loading or disabled states**
   ```tsx
   {/* Good - gradient variant handles this automatically */}
   <Button variant="gradient" disabled>Loading...</Button>
   ```

---

## 6. Performance Considerations

- All gradients use CSS and hardware acceleration
- No JavaScript is needed for gradient rendering
- Gradient classes are applied conditionally to minimize DOM complexity
- Hover effects use CSS transitions for smooth performance
- backdrop-filter effects (blur) are used sparingly

---

## 7. Accessibility

- All gradient text maintains WCAG AA contrast ratios
- Gradients are decorative and don't convey critical information
- Color is not the only way information is communicated
- Focus states remain clearly visible on gradient backgrounds
- All interactive elements with gradients remain keyboard accessible

---

## 8. Browser Support

The gradient system works across all modern browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

Fallbacks are provided for older browsers through the CSS cascade.

---

## Summary

This gradient design system provides a comprehensive, theme-aware approach to adding visual hierarchy and modern aesthetics to your dashboard. All components are production-ready, accessible, and optimized for performance.

For questions or issues, refer to the component source files or the design system documentation.

