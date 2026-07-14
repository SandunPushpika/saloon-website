# Foundation & Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Next.js 15 project skeleton, testing framework, design tokens (colors/fonts), and the small set of foundational utilities/components (motion wrappers, Button, Badge, SectionHeading, `useScrolled`) that every later page and section will build on.

**Architecture:** A single Next.js App Router project at the repo root (no `src/` dir). Tailwind CSS v4's CSS-first config (`@theme` in `app/globals.css`) supplies the five brand colors and two font-family tokens; `next/font/google` loads Playfair Display and Inter and exposes them as CSS variables that `@theme inline` maps into Tailwind's `font-display`/`font-sans` utilities. Vitest + React Testing Library provide component/unit tests; tests are colocated next to the source file they cover (`Button.tsx` + `Button.test.tsx`).

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS v4, Framer Motion, Zustand, Radix UI (`react-dialog`, `react-accordion`, `react-tabs`, `react-tooltip`), `clsx` + `tailwind-merge`, `lucide-react` (icons), Vitest + `@testing-library/react` + `@testing-library/user-event`.

## Global Constraints

- No git repository for this project — do NOT run `git init`, `git add`, or `git commit` at any point. Every "commit" step from the standard plan template is omitted; a task is done once its verification step passes.
- Colors (exact hex, from the design spec): ivory `#F8F6F2`, charcoal `#222222`, beige `#DCC9B6`, rose-gold `#C9987A`, sage `#9BA88D`.
- Fonts: Playfair Display for headings only (`font-display`), Inter for body/UI (`font-sans`). Buttons/UI labels always use `font-sans`, never `font-display`.
- No `src/` directory — routes live in `app/`, everything else at repo root (`components/`, `sections/`, `lib/`, `hooks/`, `types/`, `constants/`).
- Package manager is npm. All commands below assume the current working directory is the project root (`C:\Users\SandunPushpika\Documents\Personal\saloon`).
- Reference spec: `docs/superpowers/specs/2026-07-13-salon-website-design.md`.

---

### Task 1: Scaffold the Next.js Project

**Files:**
- Create (via `create-next-app`): `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `postcss.config.mjs`, `eslint.config.mjs`, `public/`

**Interfaces:**
- Produces: the entire project scaffold (Next.js 15 App Router, TypeScript, Tailwind CSS v4, ESLint) that every later task and plan builds on.

- [ ] **Step 1: Run the scaffold command**

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
```

If it errors out because the directory isn't empty (it already contains `docs/`), scaffold into a temporary sibling folder and move the generated files in instead:

```bash
npx create-next-app@latest saloon-tmp --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
mv saloon-tmp/* saloon-tmp/.* . 2>/dev/null
rmdir saloon-tmp
```

Expected: a full Next.js project structure is created alongside the existing `docs/` folder, ending with "Success! Created ..." (or the files simply appear if using the fallback).

- [ ] **Step 2: Verify the project builds**

Run: `npm run build`
Expected: build completes with "Compiled successfully" and no TypeScript/ESLint errors.

- [ ] **Step 3: Verify the dev server serves the default page**

Run: `npm run dev` (in the background/a separate terminal), then `curl -s http://localhost:3000 | grep -i "next"`
Expected: HTML containing the default Next.js starter content is returned. Stop the dev server after confirming.

---

### Task 2: Set Up the Testing Framework (Vitest + React Testing Library)

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (add `test`/`test:watch` scripts)
- Test: `tests/smoke.test.ts` (temporary, deleted at the end of this task)

**Interfaces:**
- Produces: `npm test` (single run) and `npm run test:watch` (watch mode), globals (`describe`/`it`/`expect`/`vi`) available in every `*.test.ts`/`*.test.tsx` file without imports, jsdom environment, `@/*` path alias resolution matching `tsconfig.json`.

- [ ] **Step 1: Install testing dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Add test scripts to `package.json`**

Add to the `"scripts"` block:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write a temporary smoke test**

Create `tests/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest'

describe('smoke', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 6: Run it and confirm the framework works**

Run: `npm test`
Expected: `1 passed` for `tests/smoke.test.ts`.

- [ ] **Step 7: Delete the temporary smoke test**

Delete `tests/smoke.test.ts` and the now-empty `tests/` directory — it served only to verify the framework wiring; all real tests going forward are colocated with their source files.

---

### Task 3: Install Core Runtime Dependencies

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `framer-motion`, `zustand`, `clsx`, `tailwind-merge`, `lucide-react`, `@radix-ui/react-dialog`, `@radix-ui/react-accordion`, `@radix-ui/react-tabs`, `@radix-ui/react-tooltip` available for import in every later task/plan.

- [ ] **Step 1: Install the dependencies**

```bash
npm install framer-motion zustand clsx tailwind-merge lucide-react @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-tooltip
```

- [ ] **Step 2: Verify the project still builds**

Run: `npm run build`
Expected: "Compiled successfully" — confirms no dependency conflicts.

---

### Task 4: Configure Fonts and Tailwind Design Tokens

**Files:**
- Modify: `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (temporarily, for visual verification, then reverted)

**Interfaces:**
- Produces: Tailwind utilities `bg-ivory`, `text-ivory`, `bg-charcoal`, `text-charcoal`, `bg-beige`, `text-beige`, `bg-rose-gold`, `text-rose-gold`, `bg-sage`, `text-sage`, `font-display`, `font-sans`, usable by every component in every later task/plan.

- [ ] **Step 1: Load the fonts in `app/layout.tsx`**

At the top of `app/layout.tsx`:

```tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
```

Apply both variables to the `<html>` element:

```tsx
<html lang="en" className={`${playfair.variable} ${inter.variable}`}>
```

- [ ] **Step 2: Define the color and font tokens in `app/globals.css`**

Check the top of `app/globals.css` (as generated by the scaffold in Task 1):

- If it starts with `@import "tailwindcss";` (Tailwind v4, expected from `create-next-app@latest`), add this block right after the import:

```css
@theme inline {
  --color-ivory: #F8F6F2;
  --color-charcoal: #222222;
  --color-beige: #DCC9B6;
  --color-rose-gold: #C9987A;
  --color-sage: #9BA88D;
  --font-display: var(--font-playfair);
  --font-sans: var(--font-inter);
}

body {
  background-color: var(--color-ivory);
  color: var(--color-charcoal);
}
```

- If instead the scaffold produced a `tailwind.config.ts` with `@tailwind base/components/utilities` directives (Tailwind v3), add the same five colors under `theme.extend.colors` (keys: `ivory`, `charcoal`, `beige`, `"rose-gold"`, `sage`, using the hex values above) and the two font families under `theme.extend.fontFamily` (keys: `display: ['var(--font-playfair)']`, `sans: ['var(--font-inter)']`) instead of editing `globals.css`.

- [ ] **Step 3: Temporarily verify the tokens visually**

Edit `app/page.tsx` to temporarily render:

```tsx
<main className="flex min-h-screen items-center justify-center bg-ivory">
  <h1 className="font-display text-6xl text-rose-gold">Lumière</h1>
</main>
```

Run: `npm run dev`, open `http://localhost:3000`.
Expected: an ivory background with "Lumière" rendered in the Playfair Display serif font, in the rose-gold color (#C9987A).

- [ ] **Step 4: Revert `app/page.tsx`**

Revert `app/page.tsx` back to the default scaffold content — the real Home page content is built in a later plan, not this one. Stop the dev server.

- [ ] **Step 5: Confirm the build still passes**

Run: `npm run build`
Expected: "Compiled successfully".

---

### Task 5: Build the `cn` Class-Merging Utility

**Files:**
- Create: `lib/utils.ts`
- Test: `lib/utils.test.ts`

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string` — used by every component task from here on to merge base/variant/override Tailwind classes.

- [ ] **Step 1: Write the failing test**

Create `lib/utils.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges plain class name strings', () => {
    expect(cn('px-2 py-1', 'text-white')).toBe('px-2 py-1 text-white')
  })

  it('resolves conflicting tailwind classes, last one wins', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('drops falsy conditional classes', () => {
    expect(cn('base', false && 'hidden', true && 'block')).toBe('base block')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run lib/utils.test.ts`
Expected: FAIL — `lib/utils.ts` does not exist yet.

- [ ] **Step 3: Implement `cn`**

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run lib/utils.test.ts`
Expected: `3 passed`.

---

### Task 6: Build Motion Tokens and the `FadeIn`/`Stagger` Wrapper Components

**Files:**
- Create: `lib/motion.ts`, `components/motion/FadeIn.tsx`, `components/motion/Stagger.tsx`
- Test: `components/motion/FadeIn.test.tsx`, `components/motion/Stagger.test.tsx`
- Modify: `vitest.setup.ts` (add an `IntersectionObserver` stub, required by Framer Motion's `whileInView`)

**Interfaces:**
- Consumes: nothing new (plain Framer Motion + React).
- Produces: `fadeInUp` and `staggerContainer` variants from `lib/motion.ts`; `<FadeIn className? delay?>` and `<Stagger className?>` components, both used throughout every later section/page task to reveal content on scroll.

- [ ] **Step 1: Stub `IntersectionObserver` for jsdom**

Modify `vitest.setup.ts` to add, below the existing import:

```ts
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
```

- [ ] **Step 2: Write the failing tests**

Create `components/motion/FadeIn.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FadeIn } from './FadeIn'

describe('FadeIn', () => {
  it('renders its children', () => {
    render(<FadeIn>Hello</FadeIn>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies a custom className to the wrapper', () => {
    render(<FadeIn className="test-class">Content</FadeIn>)
    expect(screen.getByText('Content')).toHaveClass('test-class')
  })
})
```

Create `components/motion/Stagger.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Stagger } from './Stagger'

describe('Stagger', () => {
  it('renders its children', () => {
    render(<Stagger>Hello</Stagger>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies a custom className to the wrapper', () => {
    render(<Stagger className="test-class">Content</Stagger>)
    expect(screen.getByText('Content')).toHaveClass('test-class')
  })
})
```

- [ ] **Step 3: Run them to verify they fail**

Run: `npx vitest run components/motion`
Expected: FAIL — neither `FadeIn.tsx` nor `Stagger.tsx` exists yet.

- [ ] **Step 4: Implement `lib/motion.ts`**

```ts
import type { Variants } from 'framer-motion'

export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}
```

- [ ] **Step 5: Implement `FadeIn`**

Create `components/motion/FadeIn.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 6: Implement `Stagger`**

Create `components/motion/Stagger.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'

interface StaggerProps {
  children: React.ReactNode
  className?: string
}

export function Stagger({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npx vitest run components/motion`
Expected: `4 passed`.

---

### Task 7: Build the `Button` Component

**Files:**
- Create: `components/ui/Button.tsx`
- Test: `components/ui/Button.test.tsx`

**Interfaces:**
- Consumes: `cn` from `lib/utils.ts` (Task 5).
- Produces: `<Button variant="primary"|"secondary"|"ghost" size="default"|"lg" href? onClick? className?>` — the single button component used for every CTA across the whole site.

- [ ] **Step 1: Write the failing tests**

Create `components/ui/Button.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders as a button by default', () => {
    render(<Button>Book Now</Button>)
    expect(screen.getByRole('button', { name: 'Book Now' })).toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    render(<Button href="/services">View Services</Button>)
    expect(screen.getByRole('link', { name: 'View Services' })).toHaveAttribute('href', '/services')
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-charcoal')
  })
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: FAIL — `Button.tsx` does not exist yet.

- [ ] **Step 3: Implement `Button`**

Create `components/ui/Button.tsx`:

```tsx
import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'default' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonProps = ButtonBaseProps &
  (
    | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>)
  )

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-rose-gold text-white hover:bg-rose-gold/90',
  secondary: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory',
  ghost: 'text-charcoal hover:text-rose-gold',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-sans uppercase tracking-wider font-medium transition-colors duration-300 rounded-full'

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = 'primary', size = 'default', className, children, href, ...props }, ref) {
    const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }
)
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: `4 passed`.

---

### Task 8: Build the `Badge` Component

**Files:**
- Create: `components/ui/Badge.tsx`
- Test: `components/ui/Badge.test.tsx`

**Interfaces:**
- Consumes: `cn` from `lib/utils.ts` (Task 5).
- Produces: `<Badge className?>` — used standalone and inside `SectionHeading` (Task 9) as the small eyebrow label.

- [ ] **Step 1: Write the failing tests**

Create `components/ui/Badge.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders its text', () => {
    render(<Badge>Featured</Badge>)
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('applies a custom className', () => {
    render(<Badge className="test-class">Featured</Badge>)
    expect(screen.getByText('Featured')).toHaveClass('test-class')
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run components/ui/Badge.test.tsx`
Expected: FAIL — `Badge.tsx` does not exist yet.

- [ ] **Step 3: Implement `Badge`**

Create `components/ui/Badge.tsx`:

```tsx
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-beige/60 px-4 py-1.5 text-xs font-sans uppercase tracking-widest text-charcoal',
        className
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run components/ui/Badge.test.tsx`
Expected: `2 passed`.

---

### Task 9: Build the `SectionHeading` Component

**Files:**
- Create: `components/ui/SectionHeading.tsx`
- Test: `components/ui/SectionHeading.test.tsx`

**Interfaces:**
- Consumes: `cn` from `lib/utils.ts` (Task 5), `Badge` from `components/ui/Badge.tsx` (Task 8).
- Produces: `<SectionHeading eyebrow? title description? align="left"|"center" className?>` — the shared heading used at the top of every page section from here on.

- [ ] **Step 1: Write the failing tests**

Create `components/ui/SectionHeading.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionHeading } from './SectionHeading'

describe('SectionHeading', () => {
  it('renders the title as a level-2 heading', () => {
    render(<SectionHeading title="Our Services" />)
    expect(screen.getByRole('heading', { level: 2, name: 'Our Services' })).toBeInTheDocument()
  })

  it('renders the eyebrow badge when provided', () => {
    render(<SectionHeading eyebrow="What We Offer" title="Our Services" />)
    expect(screen.getByText('What We Offer')).toBeInTheDocument()
  })

  it('omits the eyebrow badge when not provided', () => {
    render(<SectionHeading title="Our Services" />)
    expect(screen.queryByText('What We Offer')).not.toBeInTheDocument()
  })

  it('renders the description when provided', () => {
    render(<SectionHeading title="Our Services" description="Crafted for you" />)
    expect(screen.getByText('Crafted for you')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run components/ui/SectionHeading.test.tsx`
Expected: FAIL — `SectionHeading.tsx` does not exist yet.

- [ ] **Step 3: Implement `SectionHeading`**

Create `components/ui/SectionHeading.tsx`:

```tsx
import { cn } from '@/lib/utils'
import { Badge } from './Badge'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2 className="font-display text-4xl text-charcoal md:text-5xl lg:text-6xl">{title}</h2>
      {description && <p className="max-w-2xl font-sans text-base text-charcoal/70 md:text-lg">{description}</p>}
    </div>
  )
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run components/ui/SectionHeading.test.tsx`
Expected: `4 passed`.

---

### Task 10: Build the `useScrolled` Hook

**Files:**
- Create: `hooks/useScrolled.ts`
- Test: `hooks/useScrolled.test.ts`

**Interfaces:**
- Produces: `useScrolled(threshold?: number): boolean` — will be consumed by the `Navbar` component in the next plan to switch from transparent to solid on scroll.

- [ ] **Step 1: Write the failing tests**

Create `hooks/useScrolled.test.ts`:

```ts
import { describe, it, expect, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrolled } from './useScrolled'

describe('useScrolled', () => {
  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  it('returns false when scrollY is below the threshold', () => {
    const { result } = renderHook(() => useScrolled(10))
    expect(result.current).toBe(false)
  })

  it('returns true once scrollY exceeds the threshold after a scroll event', () => {
    const { result } = renderHook(() => useScrolled(10))
    Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run hooks/useScrolled.test.ts`
Expected: FAIL — `useScrolled.ts` does not exist yet.

- [ ] **Step 3: Implement `useScrolled`**

Create `hooks/useScrolled.ts`:

```ts
'use client'

import { useEffect, useState } from 'react'

export function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run hooks/useScrolled.test.ts`
Expected: `2 passed`.

- [ ] **Step 5: Run the full test suite and full build as a final check**

Run: `npm test`
Expected: every test file created in this plan (`lib/utils.test.ts`, `components/motion/FadeIn.test.tsx`, `components/motion/Stagger.test.tsx`, `components/ui/Button.test.tsx`, `components/ui/Badge.test.tsx`, `components/ui/SectionHeading.test.tsx`, `hooks/useScrolled.test.ts`) passes with zero failures.

Run: `npm run build`
Expected: "Compiled successfully" with no TypeScript or ESLint errors.

---

## What's Next

This plan produces the design-system foundation only — no pages, no Navbar/Footer, no content. The next plan (site shell + content data layer) will build `constants/`+`types/` for services/stylists/testimonials/gallery/pricing/faq, then `Navbar`, `Footer`, `ScrollProgress`, `ScrollToTop`, and wire up `app/layout.tsx` for real.
