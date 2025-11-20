# Gradient Design System - Visual Examples

This document provides code examples showing how gradients are applied throughout the dashboard.

---

## 1. Sidebar Navigation

### Active Item with Gradient

```tsx
// components/app-sidebar.tsx

<SidebarMenuItem>
  {isActive && (
    <>
      {/* Vertical gradient bar on left edge */}
      <motion.div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full">
        <div className="w-full h-full bg-linear-to-b from-primary via-primary to-primary/70" />
      </motion.div>
      
      {/* Horizontal gradient background overlay */}
      <motion.div className="absolute inset-0 rounded-lg sidebar-active-gradient" />
    </>
  )}
  
  <SidebarMenuButton
    isActive={isActive}
    className="hover:bg-gradient-subtle-horizontal"
  >
    <Icon className="h-5 w-5" />
    <span>Dashboard</span>
  </SidebarMenuButton>
</SidebarMenuItem>
```

**Visual Effect:**
- Active: Vertical gradient bar (left edge) + horizontal gradient overlay
- Hover: Subtle horizontal gradient fade
- Smooth: Framer Motion animations

---

## 2. Primary CTA Buttons

### Gradient Button Variant

```tsx
// Using the Button component
<Button variant="gradient" size="lg">
  Get Started
</Button>

// Or using the GradientButton helper
<GradientButton icon={Plus} iconPosition="left" shine={true}>
  Create New
</GradientButton>
```

**CSS Implementation:**
```css
.bg-gradient-primary {
  background: linear-gradient(
    135deg,
    oklch(from var(--primary) l c h) 0%,
    oklch(from var(--primary) calc(l * 1.1) calc(c * 0.9) calc(h + 10)) 100%
  );
}

/* Shine effect on hover */
.before:bg-gradient-to-r.before:from-transparent.before:via-white/20.before:to-transparent
```

**Visual Effect:**
- Bold diagonal gradient
- Shine animation sweeps across on hover
- Flattened gradient when disabled
- Scale animation on click

---

## 3. Metric Cards

### Enhanced Dashboard Cards

```tsx
// components/metric-card.tsx

<Card className="relative overflow-hidden group">
  {/* Subtle gradient background - always visible */}
  <div className="absolute inset-0 bg-gradient-subtle opacity-60 group-hover:opacity-100" />
  
  {/* Radial glow - appears on hover */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial opacity-0 group-hover:opacity-100" />
  
  <CardHeader>
    <CardTitle>Total Users</CardTitle>
    <div className="relative">
      {/* Icon glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100" />
      <div className="relative bg-primary/10 rounded-lg p-2">
        <Users className="h-5 w-5 text-primary" />
      </div>
    </div>
  </CardHeader>
  
  <CardContent>
    <div className="text-3xl font-bold">1,234</div>
    <p className="text-sm text-muted-foreground">Active users</p>
  </CardContent>
</Card>
```

**Visual Effect:**
- Resting: Subtle vertical gradient (barely visible)
- Hover: Gradient intensifies + radial glow appears
- Icon: Glow effect behind icon on hover
- Smooth: All transitions are 300ms ease

---

## 4. Table Headers

### Minimalist Gradient for Scannability

```tsx
// components/ui/table.tsx

<Table>
  <TableHeader>
    {/* bg-gradient-table-header automatically applied */}
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* ... */}
  </TableBody>
</Table>
```

**CSS Implementation:**
```css
.bg-gradient-table-header {
  background: linear-gradient(
    to right,
    oklch(from var(--muted) l c h / 0.5) 0%,
    oklch(from var(--muted) l c h / 0.3) 100%
  );
}

/* Dark mode variant */
.dark .bg-gradient-table-header {
  background: linear-gradient(
    to right,
    oklch(from var(--muted) l c h / 0.4) 0%,
    oklch(from var(--muted) l c h / 0.2) 100%
  );
}
```

**Visual Effect:**
- Extremely subtle horizontal gradient
- Improves header visibility and scannability
- Different opacity in dark mode
- Works with any table content

---

## 5. Page Headers

### Radial Gradient Fade

```tsx
// components/page-header.tsx

<header className="sticky top-0 z-10 relative overflow-hidden">
  {/* Radial gradient fade behind header */}
  <div className="absolute inset-0 bg-gradient-radial opacity-60" />
  
  {/* Gradient divider at bottom */}
  <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
  
  <div className="relative z-10">
    <div className="relative">
      {/* Glow behind title */}
      <div className="absolute -inset-2 bg-gradient-glow opacity-30 blur-xl" />
      <h1>Dashboard</h1>
      <p className="text-muted-foreground">Welcome back!</p>
    </div>
  </div>
</header>
```

**Visual Effect:**
- Radial gradient emanates from top-left
- Subtle glow behind page title
- Gradient divider line at bottom
- Creates depth and hierarchy

---

## 6. Empty States

### Gradient Accents and Glows

```tsx
// components/empty-state.tsx

<Card className="relative overflow-hidden">
  {/* Main gradient background */}
  <div className="absolute inset-0 bg-gradient-empty-state opacity-80" />
  
  {/* Decorative gradient circles */}
  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial-center opacity-40 blur-2xl" />
  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-radial-center opacity-30 blur-3xl" />
  
  <div className="relative z-10">
    <div className="relative inline-flex">
      {/* Glow behind icon */}
      <div className="absolute inset-0 bg-gradient-glow scale-150 opacity-60" />
      {/* Icon container with gradient outline */}
      <div className="relative bg-gradient-to-br from-muted to-muted/50 ring-1 ring-primary/20 rounded-full p-4">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
    </div>
    
    <h3>No submissions yet</h3>
    <p>Start by creating your first submission.</p>
    
    <Button variant="gradient" size="lg">
      Create Submission
    </Button>
  </div>
</Card>
```

**Visual Effect:**
- Elliptical gradient background
- Floating gradient circles (blurred)
- Icon has gradient glow and outline
- CTA button uses gradient variant
- Creates welcoming, engaging look

---

## 7. Dialog Modals

### Gradient Border and Glow

```tsx
// components/ui/dialog.tsx

<DialogContent className="relative overflow-hidden">
  {/* Gradient glow shadow effect */}
  <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent opacity-0 data-[state=open]:opacity-100 blur-xl" />
  
  {/* Subtle gradient background */}
  <div className="absolute inset-0 bg-gradient-radial opacity-40" />
  
  {/* Gradient border ring */}
  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-primary/10" />
  
  <div className="relative z-10">
    <DialogHeader>
      <DialogTitle>Create New Item</DialogTitle>
      <DialogDescription>Enter the details below.</DialogDescription>
      {/* Gradient underline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
    </DialogHeader>
    
    {/* Dialog content */}
  </div>
</DialogContent>
```

**Visual Effect:**
- Glowing border effect (subtle)
- Radial gradient background
- Gradient underline in header
- Premium, polished appearance
- Animates in with dialog

---

## 8. Sheet Panels

### Vertical Gradient Divider

```tsx
// components/ui/sheet.tsx

<SheetContent side="right" className="relative overflow-hidden">
  {/* Vertical gradient divider */}
  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
  
  {/* Subtle background gradient */}
  <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
  
  <div className="relative z-10">
    <SheetHeader>
      {/* Gradient header background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
      {/* Gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Manage your preferences</SheetDescription>
    </SheetHeader>
    
    {/* Sheet content */}
  </div>
</SheetContent>
```

**Visual Effect:**
- Vertical gradient line at edge
- Gradient header section
- Subtle background gradient
- Professional side panel appearance

---

## 9. Quick Action Cards

### Hover Gradient Effects

```tsx
// components/quick-actions.tsx

<Button
  variant="outline"
  className="relative overflow-hidden group"
>
  {/* Gradient overlay - appears on hover */}
  <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity" />
  
  <div className="relative z-10">
    <div className="relative">
      {/* Icon glow on hover */}
      <div className="absolute inset-0 bg-gradient-glow scale-150 opacity-0 group-hover:opacity-100" />
      <div className="relative bg-primary/10 group-hover:bg-primary/20 rounded-lg p-2">
        <Plus className="h-4 w-4 text-primary" />
      </div>
    </div>
    <span>Create Cohort</span>
    <span className="text-xs text-muted-foreground">
      Start a new student cohort
    </span>
  </div>
</Button>
```

**Visual Effect:**
- Resting: Subtle outline button
- Hover: Gradient overlay fades in
- Icon: Gradient glow appears
- Smooth: 300ms transitions
- Encourages interaction

---

## 10. Custom Gradient Patterns

### Using Helper Components

```tsx
// Custom card with gradient border and background
import { GradientBorder, GradientBackground, GradientButton } from "@/components/gradient";

function FeatureCard() {
  return (
    <GradientBorder rounded="xl" borderWidth={2}>
      <GradientBackground type="card" intensity="low">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Featured</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2">Premium Plan</h3>
          
          <p className="text-muted-foreground mb-4">
            Get access to all premium features and priority support.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Unlimited projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Priority support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Advanced analytics</span>
            </div>
          </div>
          
          <GradientButton className="w-full" size="lg" shine={true}>
            Upgrade Now
          </GradientButton>
        </div>
      </GradientBackground>
    </GradientBorder>
  );
}
```

**Visual Effect:**
- Gradient border wraps entire card
- Gradient background inside
- Gradient button for CTA
- Premium, featured appearance
- Combines multiple gradient elements

---

## 11. Hero Section Pattern

### Large Radial Gradient Background

```tsx
function HeroSection() {
  return (
    <GradientBackground type="hero" intensity="high" position="center">
      <div className="py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gradient">
          Welcome to Dashboard
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Streamline your workflow with powerful tools and insights.
        </p>
        
        <div className="flex gap-4 justify-center">
          <GradientButton
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            shine={true}
          >
            Get Started
          </GradientButton>
          
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
        
        {/* Stats with gradient metric cards */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
          <MetricCard
            title="Active Users"
            value="10K+"
            icon={Users}
          />
          <MetricCard
            title="Projects"
            value="50K+"
            icon={Briefcase}
          />
          <MetricCard
            title="Satisfaction"
            value="98%"
            icon={Star}
          />
        </div>
      </div>
    </GradientBackground>
  );
}
```

**Visual Effect:**
- Large radial gradient from center
- Gradient text for headline
- Gradient button for primary CTA
- Metric cards with hover gradients
- Creates impressive hero section

---

## 12. Gradient Text Effects

### Animated Gradient Headings

```tsx
function GradientHeading() {
  return (
    <div className="space-y-4">
      {/* Standard gradient text */}
      <h1 className="text-4xl font-bold text-gradient">
        Beautiful Gradient Heading
      </h1>
      
      {/* With custom animation */}
      <h2 className="text-3xl font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
        Animated Gradient Text
      </h2>
    </div>
  );
}
```

**CSS for Animation:**
```css
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 3s ease infinite;
}
```

**Visual Effect:**
- Gradient flows through text
- Optional animation
- Eye-catching for headlines
- Theme-aware colors

---

## Color Scheme Adaptation

### How Gradients Adapt to Themes

All gradients use CSS custom properties from the active theme:

**Autumn Theme (Warm & Earthy):**
- Primary: Warm orange-red tones
- Gradients have earthy, warm feel
- Lower contrast, softer appearance

**Meadow Theme (Fresh & Vibrant):**
- Primary: Fresh green tones
- Gradients are more vibrant
- Higher energy, nature-inspired

**Lavender Theme (Cool & Elegant):**
- Primary: Purple-pink tones
- Gradients are sophisticated
- Elegant, professional feel

**Stripy Theme (Bold & Modern):**
- Primary: Bold purple tones
- Gradients are more intense
- Modern, tech-forward aesthetic

**Example:**
```css
/* This gradient automatically uses the active theme's primary color */
.bg-gradient-primary {
  background: linear-gradient(
    135deg,
    oklch(from var(--primary) l c h) 0%,      /* ← Theme primary */
    oklch(from var(--primary) calc(l * 1.1) calc(c * 0.9) calc(h + 10)) 100%
  );
}
```

---

## Performance Optimization

### Efficient Gradient Rendering

**Good Practices Applied:**

1. **CSS-Only Gradients** (Hardware Accelerated)
```tsx
{/* ✅ Good - Pure CSS */}
<div className="bg-gradient-primary" />

{/* ❌ Avoid - JavaScript gradients */}
<div style={{ background: calculateGradient() }} />
```

2. **Conditional Rendering for Hover Effects**
```tsx
{/* ✅ Good - CSS handles visibility */}
<div className="opacity-0 group-hover:opacity-100 transition-opacity" />

{/* ❌ Avoid - JavaScript state */}
{isHovered && <div className="gradient" />}
```

3. **Transform for Animations**
```tsx
{/* ✅ Good - GPU accelerated */}
<div className="scale-110 transition-transform" />

{/* ❌ Avoid - Layout-triggering properties */}
<div className="w-[110%] transition-all" />
```

4. **Layered Approach**
```tsx
{/* ✅ Good - Multiple layers for depth */}
<div className="relative">
  <div className="absolute inset-0 bg-gradient-subtle" />
  <div className="absolute inset-0 bg-gradient-glow opacity-0 hover:opacity-100" />
  <div className="relative z-10">Content</div>
</div>
```

---

## Summary

These examples demonstrate the full range of gradient implementations:

✅ **Sidebar** - Active state with vertical bar + horizontal overlay
✅ **Buttons** - Bold gradients with shine effects
✅ **Cards** - Subtle backgrounds with hover intensification
✅ **Tables** - Minimal header gradients for scannability
✅ **Headers** - Radial fades with glowing titles
✅ **Empty States** - Engaging gradients with circular patterns
✅ **Modals** - Gradient borders and glows
✅ **Panels** - Vertical dividers and header gradients
✅ **Actions** - Hover-activated gradient overlays
✅ **Custom** - Flexible helper components for any pattern

All implementations are:
- Theme-aware across 4 color schemes
- Performant with CSS-only rendering
- Accessible with proper contrast
- Responsive across all devices
- Production-ready with TypeScript support

For more information, see `GRADIENT_USAGE_GUIDE.md`.

