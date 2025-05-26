'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import axiosClient from '@/config/axios.config';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axiosClient.post('/coach/login', {
        email,
        password,
      });

      toast('Login successful', {
        description: 'Welcome back to CoachConnect!',
      });

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast('Login failed', {
          description: error.response?.data.message || 'Invalid credentials',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
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
            required
            className="aesthetic-input"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-aesthetic-dark">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-sm text-aesthetic-accent hover:text-aesthetic-accent/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="aesthetic-input"
          />
        </div>
        <Button
          type="submit"
          className="w-full aesthetic-button bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </div>
    </form>
  );
}
