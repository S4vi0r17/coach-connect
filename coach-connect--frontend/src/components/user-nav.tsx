'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DashboardMobileNav } from './dashboard-mobile-nav';
import { useSession } from 'next-auth/react';

export function UserNav() {
  const router = useRouter();

  const { data: session, status } = useSession();

  return (
    <div className="flex items-center gap-2">
      <DashboardMobileNav />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session?.user?.image || ''}
                alt={session?.user?.name || 'User'}
              />
              <AvatarFallback className="bg-aesthetic-accent text-white cursor-pointer">
                {session?.user?.name
                  ? session.user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'US'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 animate-fade-in"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-aesthetic-dark">
                {status === 'loading'
                  ? 'Loading...'
                  : session?.user?.name || 'User'}
              </p>
              <p className="text-xs leading-none text-aesthetic-muted">
                {status === 'loading' ? '' : session?.user?.email || ''}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/dashboard">
              <DropdownMenuItem className="text-aesthetic-medium cursor-pointer hover:text-aesthetic-dark">
                Dashboard
              </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/profile">
              <DropdownMenuItem className="text-aesthetic-medium cursor-pointer hover:text-aesthetic-dark">
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/clients">
              <DropdownMenuItem className="text-aesthetic-medium cursor-pointer hover:text-aesthetic-dark">
                Clients
              </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/settings">
              <DropdownMenuItem className="text-aesthetic-medium cursor-pointer hover:text-aesthetic-dark">
                Settings
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push('/')}
            className="text-aesthetic-accent cursor-pointer hover:text-aesthetic-accent/80"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
