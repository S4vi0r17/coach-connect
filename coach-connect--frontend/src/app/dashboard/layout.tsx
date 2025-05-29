import Link from 'next/link';
import { DashboardNav } from '@/components/dashboard-nav';
import { UserNav } from '@/components/user-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-aesthetic-light">
      <header className="sticky top-0 z-10 border-b border-aesthetic-muted-light bg-white">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link href={'/dashboard'} className="flex items-center">
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
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        {/* Fixed width sidebar - hidden on mobile */}
        <aside className="hidden md:block w-64 border-r border-aesthetic-muted-light bg-white p-6">
          <DashboardNav />
        </aside>
        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
