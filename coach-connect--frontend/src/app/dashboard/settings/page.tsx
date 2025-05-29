import { DashboardMobileNav } from '@/components/dashboard-mobile-nav';
import {
  ChangePasswordForm,
  NotificationSettings,
} from '@/settings/components';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-aesthetic-dark">Settings</h1>
        <DashboardMobileNav />
      </div>
      <div className="grid gap-6">
        <NotificationSettings />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
