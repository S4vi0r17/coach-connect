import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatLongDate } from '@/clients/helper/format-date';

interface Props {
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    age?: number;
    gender?: string;
    healthNotes?: string;
    startDate?: Date;
    status: string;
  };
}

export function ClientDetails({ client }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                First Name
              </div>
              <div>{client.firstName}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Last Name
              </div>
              <div>{client.lastName}</div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Email
            </div>
            <div>{client.email}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Phone
            </div>
            <div>{client.phone || 'Not provided'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Address
            </div>
            <div>{client.address || 'Not provided'}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Age
              </div>
              <div>{client.age || 'Not provided'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Gender
              </div>
              <div className="capitalize">
                {client.gender || 'Not provided'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Coaching Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Status
            </div>
            <div>
              <Badge
                variant={
                  client.status === 'active'
                    ? 'default'
                    : client.status === 'inactive'
                    ? 'secondary'
                    : 'destructive'
                }
                className="capitalize mt-1"
              >
                {client.status}
              </Badge>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Start Date
            </div>
            <div>{formatLongDate(client.startDate) || 'Not provided'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Health Notes
            </div>
            <div className="mt-1 whitespace-pre-wrap">
              {client.healthNotes || 'No health notes provided.'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
