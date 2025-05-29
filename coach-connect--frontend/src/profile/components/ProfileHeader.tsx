import { DashboardMobileNav } from '@/components/dashboard-mobile-nav';

export function ProfileHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-aesthetic-dark">Profile</h1>
      <DashboardMobileNav />
    </div>
  );
}
