import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-sans text-sm uppercase tracking-widest text-rose-gold">404</p>
      <h1 className="font-display text-4xl text-charcoal md:text-5xl">This page stepped out for a treatment.</h1>
      <p className="max-w-md font-sans text-charcoal/70">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to somewhere beautiful.
      </p>
      <Button href="/">Back to Home</Button>
    </main>
  )
}
