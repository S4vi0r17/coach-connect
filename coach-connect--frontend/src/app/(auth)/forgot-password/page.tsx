'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import axiosClient from '@/config/axios.config';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === '') {
      toast('Error', {
        description: 'Please enter a valid email address.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Call the forgot-password endpoint
      const { status } = await axiosClient.post('/coach/forgot-password', {
        email,
      });

      if (status !== 201) {
        toast('Error', {
          description: 'Failed to send reset email. Please try again.',
        });
        return;
      }

      setIsSubmitted(true);

      toast('Reset email sent', {
        description:
          'Check your email for instructions to reset your password.',
      });
    } catch (error) {
      toast('Error', {
        description:
          error instanceof Error ? error.message : 'Failed to send reset email',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-aesthetic-light p-4">
      <Link href="/login" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to login</span>
        </Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center">
            <div className="relative h-10 w-10 mr-2">
              <div className="absolute inset-0 bg-gradient-to-br from-aesthetic-accent to-aesthetic-accent-light rounded-md shadow-md"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                CC
              </div>
            </div>
            <div className="flex items-center gap-0.5 font-bold text-xl">
              <span className="text-aesthetic-accent">Coach</span>
              <span className="text-aesthetic-dark">Connect</span>
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-aesthetic-dark">
            Reset your password
          </h1>
          <p className="text-sm text-aesthetic-muted">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <Card className="aesthetic-card border-0 shadow-lg">
          <CardContent>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="text-sm text-aesthetic-muted">
                  We&apos;ve sent a password reset link to{' '}
                  <strong>{email}</strong>. Please check your email.
                </div>
                <Link href="/login">
                  <Button className="w-full bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer">
                    Return to login
                  </Button>
                </Link>
              </div>
            ) : (
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
                  <Button
                    type="submit"
                    className="w-full bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send reset link'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-aesthetic-muted text-center">
              Remember your password?{' '}
              <Link
                href="/login"
                className="text-aesthetic-accent hover:underline"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
