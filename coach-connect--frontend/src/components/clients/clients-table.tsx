'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axiosClient from '@/config/axios.config';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ClientsTableFilters,
  ClientsDesktopTable,
  ClientsMobileList,
} from '@/clients';
import { ClientsResponse } from '@/clients/interfaces/clients-response';

export function ClientsTable() {
  const { data: session } = useSession();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clients, setClients] = useState<ClientsResponse[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      if (!session?.accessToken) {
        return;
      }

      const { data } = await axiosClient.get<ClientsResponse[]>('/clients', {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      setClients(data);
    };

    fetchClients();
  }, [session?.accessToken]);

  const filteredClients = clients.filter((client) => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'all' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Mobile view for clients list
  const renderMobileClientsList = () => {
    return <ClientsMobileList clients={filteredClients} />;
  };

  // Desktop view for clients table
  const renderDesktopClientsTable = () => {
    return <ClientsDesktopTable clients={filteredClients} />;
  };

  return (
    <Card className="aesthetic-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-aesthetic-dark">Clients</CardTitle>
        <CardDescription className="text-aesthetic-muted">
          Manage your clients and their information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ClientsTableFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <div className="mt-4">
          {renderMobileClientsList()}
          {renderDesktopClientsTable()}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-aesthetic-muted">
          Showing {filteredClients.length} of {clients.length} clients
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled
            className="rounded-md text-aesthetic-medium border-aesthetic-muted-light"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="rounded-md text-aesthetic-medium border-aesthetic-muted-light"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
