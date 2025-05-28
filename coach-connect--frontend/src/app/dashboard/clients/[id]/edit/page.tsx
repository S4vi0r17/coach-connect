'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import axiosClient from '@/config/axios.config';
import { ClientResponse } from '@/clients/interfaces/clients-response';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function EditClientPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [healthNotes, setHealthNotes] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
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

        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhone(data.phone || '');
        setAddress(data.address || '');
        setAge(data.age.toString() || '');
        setGender(data.gender);
        setHealthNotes(data.healthNotes[0]);
        setStatus(data.status);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const {} = await axiosClient.patch<ClientResponse>(
        `/clients/${params.id}`,
        {
          firstName,
          lastName,
          email,
          phone: phone,
          address: address,
          age: parseInt(age, 10),
          gender,
          healthNotes,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      toast('Client updated', {
        description: `${firstName} ${lastName}'s information has been updated.`,
      });

      // Redirect to client details
      router.push(`/dashboard/clients/${params.id}`);
    } catch (error) {
      console.log('Error updating client:', error);
      if (axios.isAxiosError(error)) {
        toast('Error updating client', {
          description:
            error.response?.data?.message || 'Failed to update client',
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/clients/${params.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Edit Client</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-40">
              <p>Loading client data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/clients/${params.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Client</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>
              Update the details of your client.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 my-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="male">
                      Male
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="female">
                      Female
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="other">
                      Other
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer"
                      value="prefer-not-to-say"
                    >
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="active">
                      Active
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="inactive">
                      Inactive
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="suspended">
                      Suspended
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="healthNotes">Health Notes</Label>
              <Textarea
                id="healthNotes"
                value={healthNotes}
                onChange={(e) => setHealthNotes(e.target.value)}
                placeholder="Any health conditions, injuries, or other notes"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Link href={`/dashboard/clients/${params.id}`}>
              <Button
                variant="outline"
                disabled={isSaving}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSaving}
              className="cursor-pointer"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
