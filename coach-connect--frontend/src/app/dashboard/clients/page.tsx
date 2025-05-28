import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClientsTable } from '@/components/clients/clients-table';

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-aesthetic-dark">Clients</h1>
        <Link href="/dashboard/clients/new">
          <Button
            size="sm"
            className="h-8 gap-1 bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Add Client</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </Link>
      </div>
      <ClientsTable />
    </div>
  );
}
