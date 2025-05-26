import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-aesthetic-muted-light py-8 bg-white">
      <div className="aesthetic-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="relative h-8 w-8 mr-2">
            <div className="absolute inset-0 bg-gradient-to-br from-aesthetic-accent to-aesthetic-accent-light rounded-md shadow-md"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
              CC
            </div>
          </div>
          <div className="flex items-center gap-0.5 font-bold text-xl">
            <span className="text-aesthetic-accent">Coach</span>
            <span className="text-aesthetic-dark">Connect</span>
          </div>
        </div>
        <p className="text-center text-sm text-aesthetic-muted">
          &copy; {new Date().getFullYear()} CoachConnect. All rights reserved.
        </p>
        <nav className="flex gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-aesthetic-medium hover:text-aesthetic-accent transition-colors"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-aesthetic-medium hover:text-aesthetic-accent transition-colors"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
