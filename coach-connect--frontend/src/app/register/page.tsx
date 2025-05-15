'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';

export default function RegisterPage() {
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
      await axios.post(process.env.NEXT_PUBLIC_API_URL + '/coach/register', {
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
    <div className="min-h-screen flex items-center justify-center bg-aesthetic-light p-4">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center"
      >
        <div className="relative h-8 w-8 mr-2">
          <div className="absolute inset-0 bg-gradient-to-br from-aesthetic-accent to-aesthetic-accent-light rounded-md shadow-md"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
            CC
          </div>
        </div>
        <div className="flex items-center gap-0.5 font-bold text-xl">
          <span className="text-aesthetic-accent">Coach</span>
          <span className="text-aesthetic-dark">Connect</span>
        </div>
      </Link>
      <div className="w-full max-w-md animate-fade-in">
        <Card className="aesthetic-card aesthetic-shadow">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-aesthetic-dark">
              Create an account
            </CardTitle>
            <CardDescription className="text-center text-aesthetic-muted">
              Enter your information to create your coach account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-aesthetic-muted-light hover:bg-aesthetic-muted-light/20"
                type="button"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                  </g>
                </svg>
                <span>Sign up with Google</span>
              </Button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs text-aesthetic-muted">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
            </div>

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
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-aesthetic-muted text-center mt-2">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-aesthetic-accent hover:text-aesthetic-accent/80 transition-colors"
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
