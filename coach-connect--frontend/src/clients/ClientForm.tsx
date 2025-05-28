'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import axiosClient from '@/config/axios.config';
import axios from 'axios';

export function ClientForm() {
  const router = useRouter();

  const { data: session } = useSession();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [healthNotes, setHealthNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if ([firstName, lastName, email, phone, age, gender].includes('')) {
      toast('Error', {
        description: 'Please fill in all required fields.',
      });
    }

    try {
      // In a real app, this would be an API call to create a client
      // For demo purposes, we'll simulate a successful creation
      const {} = await axiosClient.post(
        '/clients',
        {
          firstName,
          lastName,
          email,
          phone,
          address,
          age,
          gender,
          healthNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      // Redirect to clients list
      router.push('/dashboard/clients');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>Client Information</CardTitle>
        <CardDescription>Enter the details of your new client.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 my-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
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
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </Label>
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="age">
              Age <span className="text-red-500">*</span>
            </Label>
            <Input
              id="age"
              type="number"
              min={0}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">
              Gender <span className="text-red-500">*</span>
            </Label>
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
        <Link href="/dashboard/clients">
          <Button
            className="cursor-pointer"
            variant="outline"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Link>
        <Button className="cursor-pointer" type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Client'}
        </Button>
      </CardFooter>
    </form>
  );
}
