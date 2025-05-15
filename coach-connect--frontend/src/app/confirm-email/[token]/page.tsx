'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

export default function ConfirmEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useParams();

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { status } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/coach/confirm-email/${token}`
      );

      if (status !== 200) {
        setError('Failed to confirm email');
        toast('Error', { description: 'Failed to confirm email' });
        return;
      }

      setIsConfirmed(true);

      toast('Email confirmed', {
        description:
          'Your email has been successfully confirmed. You can now log in.',
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to confirm email'
      );
      toast('Error', {
        description:
          error instanceof Error ? error.message : 'Failed to confirm email',
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
            Confirm your email
          </h1>
        </div>

        {isConfirmed ? (
          <Card className="aesthetic-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <CheckCircle className="h-12 w-12 text-aesthetic-accent" />
                <h2 className="text-xl font-semibold text-aesthetic-dark">
                  Email Confirmed
                </h2>
                <Link href="/login">
                  <Button className="w-full bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer">
                    Go to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="aesthetic-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <XCircle className="h-12 w-12 text-red-500" />
                <h2 className="text-xl font-semibold text-red-600">Error</h2>
                <div className="text-sm text-aesthetic-muted">{error}</div>
                <Button
                  className="w-full bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90"
                  disabled={isLoading}
                  onClick={handleConfirm}
                >
                  {isLoading ? 'Retrying...' : 'Try Again'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="aesthetic-card border-0 shadow-lg">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-sm text-aesthetic-muted text-center">
                  Click below to confirm your email.
                </div>
                <Button
                  className="w-full bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
                  disabled={isLoading}
                  onClick={handleConfirm}
                >
                  {isLoading ? 'Confirming...' : 'Confirm Email'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
