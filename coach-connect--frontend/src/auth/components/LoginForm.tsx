'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
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
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.ok) {
        toast('Login successful', {
          description: 'Welcome back to CoachConnect!',
        });
        router.push('/dashboard');
      } else {
        console.error('Login failed:', res?.error);
        toast('Login failed', {
          description: res?.error || 'Invalid credentials',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast('Login failed', {
        description: 'An unexpected error occurred',
      });
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
