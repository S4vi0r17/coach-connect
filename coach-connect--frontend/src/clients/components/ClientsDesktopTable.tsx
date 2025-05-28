import Link from 'next/link';
import { Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClientsResponse } from '@/clients/interfaces/clients-response';

interface Props {
  clients: ClientsResponse[];
}

export function ClientsDesktopTable({ clients }: Props) {
  return (
    <div className="hidden md:block rounded-md border border-aesthetic-muted-light overflow-hidden">
      <Table>
        <TableHeader className="bg-aesthetic-muted-light/50">
          <TableRow>
            <TableHead className="text-aesthetic-medium">Name</TableHead>
            <TableHead className="text-aesthetic-medium">Email</TableHead>
            <TableHead className="hidden lg:table-cell text-aesthetic-medium">
              Phone
            </TableHead>
            <TableHead className="text-aesthetic-medium">Status</TableHead>
            <TableHead className="hidden lg:table-cell text-aesthetic-medium">
              Start Date
            </TableHead>
            <TableHead className="text-right text-aesthetic-medium">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-aesthetic-muted"
              >
                No clients found.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client, index) => (
              <TableRow
                key={client._id}
                className="animate-slide-up hover:bg-aesthetic-muted-light/30 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div className="font-medium text-aesthetic-dark">
                    {client.firstName} {client.lastName}
                  </div>
                </TableCell>
                <TableCell className="text-aesthetic-medium">
                  {client.email}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-aesthetic-medium">
                  {client.phone}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`capitalize ${
                      client.status === 'active'
                        ? 'bg-aesthetic-accent text-white'
                        : client.status === 'inactive'
                        ? 'bg-aesthetic-muted-light text-aesthetic-medium'
                        : 'bg-aesthetic-error text-white'
                    }`}
                  >
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-aesthetic-medium">
                  {client.startDate instanceof Date
                    ? client.startDate.toLocaleDateString()
                    : client.startDate}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/clients/${client._id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                      <Eye className="h-4 w-4 text-aesthetic-accent" />
                      <span className="sr-only">View</span>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
