import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b border-aesthetic-muted-light bg-white sticky top-0 z-10">
      <div className="aesthetic-container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="relative h-10 w-10 mr-2">
            <div className="absolute inset-0 bg-gradient-to-br from-aesthetic-accent to-aesthetic-accent-light rounded-md shadow-md"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
              CC
            </div>
          </div>
          <Link
            href={'/'}
            className="flex items-center gap-0.5 font-bold text-xl"
          >
            <span className="text-aesthetic-accent">Coach</span>
            <span className="text-aesthetic-dark">Connect</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-aesthetic-medium hover:text-aesthetic-accent transition-colors"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-aesthetic-medium hover:text-aesthetic-accent transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-aesthetic-medium hover:text-aesthetic-accent transition-colors"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-aesthetic-medium hover:text-aesthetic-accent hover:bg-aesthetic-muted-light cursor-pointer"
            >
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="aesthetic-button bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
