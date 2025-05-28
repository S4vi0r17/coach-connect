'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { DashboardNav } from '@/components/dashboard-nav';

export function DashboardMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden cursor-pointer"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Main navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Navegación principal del panel de Coach Connect.
        </SheetDescription>
        <div className="flex h-16 items-center border-b border-aesthetic-muted-light px-6">
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
        </div>
        <div className="p-6">
          <DashboardNav />
        </div>
      </SheetContent>
    </Sheet>
  );
}
