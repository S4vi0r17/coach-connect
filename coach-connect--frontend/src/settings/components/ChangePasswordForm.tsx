'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      [currentPassword, newPassword, confirmPassword].some(
        (field) => field.trim() === ''
      )
    ) {
      toast('Error', {
        description: 'Please fill in all fields before submitting.',
      });
      return;
    }

    if (currentPassword.length < 8) {
      toast('Error', {
        description: 'Current password must be at least 8 characters long.',
      });
      return;
    }

    if (newPassword.length < 8) {
      toast('Error', {
        description: 'New password must be at least 8 characters long.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast("Passwords don't match", {
        description: 'Please make sure your new passwords match.',
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      // In a real app, this would be an API call to change the password
      // For demo purposes, we'll simulate a successful password change
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast('Password updated', {
        description: 'Your password has been updated successfully.',
      });

      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast('Error', {
          description:
            error.response?.data?.message ||
            'Failed to change password. Please try again.',
        });
      }
    } finally {
      setIsChangingPassword(false);
    }
  };
  return (
    <Card className="aesthetic-card">
      <CardHeader>
        <CardTitle className="text-aesthetic-dark">Change Password</CardTitle>
        <CardDescription className="text-aesthetic-muted">
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-aesthetic-dark">
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="aesthetic-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-aesthetic-dark">
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="aesthetic-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-aesthetic-dark">
              Confirm New Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="aesthetic-input"
            />
          </div>
          <Button
            type="submit"
            disabled={isChangingPassword}
            className="bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
          >
            {isChangingPassword ? 'Changing Password...' : 'Change Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
