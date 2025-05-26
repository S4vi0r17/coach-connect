'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import axiosClient from '@/config/axios.config';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      [firstName, lastName, email, password, confirmPassword].some(
        (field) => field.trim() === ''
      )
    ) {
      toast('All fields are required', {
        description: 'Please fill in all fields to create your account.',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast("Passwords don't match", {
        description: 'Please make sure your passwords match.',
      });
      return;
    }

    setIsLoading(true);

    try {
      await axiosClient.post('/coach/register', {
        firstName,
        lastName,
        email,
        password,
      });

      toast('Registration successful', {
        description:
          'Please check your email to verify your account before logging in.',
      });

      // Redirect to dashboard
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const description =
          error.response?.data?.message || 'Please try again.';

        toast('Registration failed', {
          description,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName" className="text-aesthetic-dark">
              First name
            </Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="aesthetic-input"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName" className="text-aesthetic-dark">
              Last name
            </Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="aesthetic-input"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-aesthetic-dark">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="aesthetic-input"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-aesthetic-dark">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="aesthetic-input"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword" className="text-aesthetic-dark">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="aesthetic-input"
          />
        </div>
        <Button
          type="submit"
          className="w-full aesthetic-button bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </div>
    </form>
  );
}
