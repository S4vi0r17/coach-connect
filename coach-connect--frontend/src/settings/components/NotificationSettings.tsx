'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSaveNotificationSettings = async () => {
    try {
      // In a real app, this would be an API call to update notification settings
      // For demo purposes, we'll simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast('Settings updated', {
        description: 'Your notification settings have been updated.',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast('Error', {
        description: 'There was an error updating your settings.',
      });
    }
  };
  return (
    <Card className="aesthetic-card">
      <CardHeader>
        <CardTitle className="text-aesthetic-dark">Notifications</CardTitle>
        <CardDescription className="text-aesthetic-muted">
          Manage how you receive notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label
            htmlFor="email-notifications"
            className="flex flex-col items-start space-y-1"
          >
            <span className="text-aesthetic-dark">Email Notifications</span>
            <span className="font-normal text-sm text-aesthetic-muted">
              Receive emails about your client activity and updates.
            </span>
          </Label>
          <Switch
            id="email-notifications"
            className="cursor-pointer"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label
            htmlFor="marketing-emails"
            className="flex flex-col items-start space-y-1"
          >
            <span className="text-aesthetic-dark">Marketing Emails</span>
            <span className="font-normal text-sm text-aesthetic-muted">
              Receive emails about new features and promotions.
            </span>
          </Label>
          <Switch
            id="marketing-emails"
            className="cursor-pointer"
            checked={marketingEmails}
            onCheckedChange={setMarketingEmails}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSaveNotificationSettings}
          className="bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
        >
          Save Notification Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
