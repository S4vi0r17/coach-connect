import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data for recent clients
const recentClients = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active',
    startDate: 'Jan 15, 2023',
    imageUrl: '',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    status: 'active',
    startDate: 'Mar 22, 2023',
    imageUrl: '',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    status: 'inactive',
    startDate: 'May 10, 2023',
    imageUrl: '',
  },
  {
    id: '4',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    status: 'active',
    startDate: 'Jul 5, 2023',
    imageUrl: '',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    status: 'active',
    startDate: 'Sep 18, 2023',
    imageUrl: '',
  },
];

export function RecentClients() {
  return (
    <div className="space-y-4">
      {recentClients.map((client, index) => (
        <Link key={client.id} href={`/dashboard/clients/${client.id}`}>
          <div
            className="flex items-center rounded-md p-2 transition-colors hover:bg-aesthetic-muted-light animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={client.imageUrl || ''} alt={client.name} />
              <AvatarFallback className="bg-aesthetic-accent text-white">
                {client.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none text-aesthetic-dark">
                {client.name}
              </p>
              <p className="text-sm text-aesthetic-muted">{client.email}</p>
            </div>
            <div className="ml-auto flex flex-col items-end gap-1">
              <Badge
                className={`capitalize ${
                  client.status === 'active'
                    ? 'bg-aesthetic-accent text-white'
                    : 'bg-aesthetic-muted-light text-aesthetic-medium'
                }`}
              >
                {client.status}
              </Badge>
              <p className="text-xs text-aesthetic-muted">{client.startDate}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
