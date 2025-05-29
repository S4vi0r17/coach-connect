'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosClient from '@/config/axios.config';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import {
  ProfileAvatar,
  ProfileForm,
  ProfileHeader,
} from '@/profile/components';
import { ProfileResponse } from './interfaces/profile-response.interface';

export default function ProfilePage() {
  const { data: session } = useSession();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const [originalProfile, setOriginalProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    bio: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const { data } = await axiosClient.get<ProfileResponse>(
          '/coach/profile',
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber || '');
        setBio(data.bio || '');
        setPhotoUrl(data.photoUrl || '');

        setOriginalProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber || '',
          bio: data.bio || '',
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast('Error', {
            description:
              error.response?.data?.message || 'Failed to load profile data.',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.accessToken) {
      fetchCoach();
    }
  }, [session]);

  const handleChange = (field: string, value: string) => {
    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'bio':
        setBio(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      firstName === originalProfile.firstName &&
      lastName === originalProfile.lastName &&
      email === originalProfile.email &&
      phoneNumber === originalProfile.phoneNumber &&
      bio === originalProfile.bio
    ) {
      toast('No changes detected', {
        description: 'You have not made any changes to your profile.',
      });
      return;
    }

    setIsSaving(true);

    try {
      await axiosClient.put(
        '/coach/profile',
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      toast('Profile updated', {
        description: 'Your profile information has been updated successfully.',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast('Error', {
          description:
            error.response?.data?.message || 'Failed to update profile.',
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <ProfileHeader />
        <Card className="aesthetic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-40">
              <p className="text-aesthetic-muted">Loading profile data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader />
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card className="aesthetic-card">
          <CardHeader>
            <CardTitle className="text-aesthetic-dark">
              Profile Picture
            </CardTitle>
            <CardDescription className="text-aesthetic-muted">
              Update your profile picture.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <ProfileAvatar
              photoUrl={photoUrl}
              firstName={firstName}
              lastName={lastName}
            />
          </CardContent>
        </Card>
        <Card className="aesthetic-card">
          <CardHeader>
            <CardTitle className="text-aesthetic-dark">
              Personal Information
            </CardTitle>
            <CardDescription className="text-aesthetic-muted">
              Update your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm
              firstName={firstName}
              lastName={lastName}
              email={email}
              phoneNumber={phoneNumber}
              bio={bio}
              isSaving={isSaving}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
