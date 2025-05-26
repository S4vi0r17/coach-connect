import Link from 'next/link';

export function AuthLogo() {
  return (
    <Link
      href="/"
      className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center"
    >
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
    </Link>
  );
}
