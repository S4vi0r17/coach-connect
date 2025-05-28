import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClientResponse } from '@/clients/interfaces/clients-response';
import { formatShortDate } from '../helper/format-date';

interface Props {
  clients: ClientResponse[];
}

export function ClientsMobileList({ clients }: Props) {
  if (clients.length === 0) {
    return (
      <div className="text-center py-8 text-aesthetic-muted">
        No clients found.
      </div>
    );
  }

  return (
    <div className="space-y-4 md:hidden">
      {clients.map((client, index) => (
        <Card
          key={client._id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <h3 className="font-medium text-aesthetic-dark">
                  {client.firstName} {client.lastName}
                </h3>
                <p className="text-sm text-aesthetic-muted">{client.email}</p>
              </div>
              <Link href={`/dashboard/clients/${client._id}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                >
                  <Eye className="h-4 w-4 text-aesthetic-accent" />
                  <span className="sr-only">View</span>
                </Button>
              </Link>
            </div>
            <div className="mt-3 flex items-center justify-between">
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
              <span className="text-xs text-aesthetic-muted">
                {formatShortDate(client.startDate)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
