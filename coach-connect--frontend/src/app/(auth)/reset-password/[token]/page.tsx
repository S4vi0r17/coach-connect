'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import axiosClient from '@/config/axios.config';
import axios from 'axios';
import type React from 'react';
import { AuthHeader } from '@/auth/components';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isResetComplete, setIsResetComplete] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Call the check-reset-token endpoint
        const { status } = await axiosClient.get(
          `coach/reset-password/${token}`
        );

        if (status === 200) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
          toast('Invalid or expired token', {
            description:
              'This password reset link is no longer valid. Please request a new one.',
          });
        }
      } catch (error) {
        setIsValidToken(false);
        if (axios.isAxiosError(error)) {
          toast('Error', {
            description:
              error.response?.data?.message ||
              'Failed to validate reset token. Please try again.',
          });
        } else {
          toast('Error', {
            description: 'An unexpected error occurred. Please try again.',
          });
        }
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast("Passwords don't match", {
        description: 'Please make sure your passwords match.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Call the reset-password endpoint
      const { data, status } = await axiosClient.post(
        `coach/reset-password/${token}`,
        {
          newPassword,
        }
      );

      if (status !== 201) {
        toast('Error', {
          description:
            data?.message || 'Failed to reset password. Please try again.',
        });
        return;
      }

      setIsResetComplete(true);

      toast('Password reset successful', {
        description:
          'Your password has been reset. You can now log in with your new password.',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast('Error', {
          description:
            error.response?.data?.message ||
            'Failed to reset password. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isValidating) {
      return (
        <Card className="aesthetic-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="text-sm">Validating your reset link...</div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (!isValidToken) {
      return (
        <Card className="aesthetic-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <XCircle className="h-12 w-12 text-destructive" />
              <h2 className="text-xl font-semibold text-aesthetic-dark">
                Invalid Reset Link
              </h2>
              <div className="text-sm text-aesthetic-muted">
                This password reset link is invalid or has expired. Please
                request a new one.
              </div>
              <Link href="/forgot-password">
                <Button className="w-full bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90">
                  Request New Link
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (isResetComplete) {
      return (
        <Card className="aesthetic-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <CheckCircle className="h-12 w-12 text-aesthetic-accent" />
              <h2 className="text-xl font-semibold text-aesthetic-dark">
                Password Reset Complete
              </h2>
              <div className="text-sm text-aesthetic-muted">
                Your password has been reset successfully. You can now log in
                with your new password.
              </div>
              <Link href="/login">
                <Button className="w-full bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer">
                  Go to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="aesthetic-card border-0 shadow-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="newPassword" className="text-aesthetic-dark">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="aesthetic-input"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-aesthetic-dark"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="aesthetic-input"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
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
        <AuthHeader
          title="Reset your password"
          subtitle="Enter your new password below."
        />
        {renderContent()}
      </div>
    </div>
  );
}
