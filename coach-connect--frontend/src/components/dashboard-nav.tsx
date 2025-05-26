'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Settings,
  LogOut,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Clients',
    href: '/dashboard/clients',
    icon: Users,
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: UserCircle,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-2 rounded-md transition-colors cursor-pointer',
              pathname === item.href
                ? 'bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90'
                : 'text-aesthetic-medium hover:text-aesthetic-accent hover:bg-aesthetic-muted-light'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
      <div className="mt-auto pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-aesthetic-accent hover:text-aesthetic-accent/80 hover:bg-aesthetic-muted-light rounded-md cursor-pointer"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </nav>
  );
}
