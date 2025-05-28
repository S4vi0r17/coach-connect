'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClientDetails } from '@/components/clients/client-details';
import { ClientNotes } from '@/components/clients/client-notes';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import axiosClient from '@/config/axios.config';
import { ClientResponse } from '@/clients/interfaces/clients-response';
import axios from 'axios';

export default function ClientPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();

  const [client, setClient] = useState<ClientResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, fetch client data from API
    // For demo purposes, we'll use mock data
    const fetchClient = async () => {
      try {
        const { data } = await axiosClient.get<ClientResponse>(
          `/clients/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        setClient(data || null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast('Client not found', {
            description: error.response?.data?.message || 'Client not found',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.accessToken) {
      fetchClient();
    }
  }, [params.id, session?.accessToken]);

  const handleDelete = async () => {
    try {
      const {} = await axiosClient.delete(`/clients/${params.id}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      toast('Client deleted', {
        description: 'The client has been successfully deleted.',
      });

      router.push('/dashboard/clients');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast('Error deleting client', {
          description:
            error.response?.data?.message || 'Failed to delete client',
        });
      } else {
        toast('Error deleting client', {
          description:
            'An unexpected error occurred while deleting the client.',
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/clients">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-aesthetic-dark">
            Client Details
          </h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-40">
              <p className="text-aesthetic-muted">Loading client data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/clients">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-aesthetic-dark">
            Client Not Found
          </h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center h-40 gap-4">
              <p className="text-aesthetic-muted">
                The client you are looking for does not exist or has been
                deleted.
              </p>
              <Link href="/dashboard/clients">
                <Button className="bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90">
                  Return to Clients
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/clients">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-aesthetic-dark">
            {client.firstName} {client.lastName}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/clients/${params.id}/edit`}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 cursor-pointer"
            >
              <Pencil className="h-4 w-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="h-8 gap-1 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  client and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="details">
            Details
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="notes">
            Notes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <ClientDetails client={client} />
        </TabsContent>
        <TabsContent value="notes" className="mt-4">
          <ClientNotes clientId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
