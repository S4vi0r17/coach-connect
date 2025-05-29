import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  isSaving: boolean;
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProfileForm({
  firstName,
  lastName,
  email,
  phoneNumber,
  bio,
  isSaving,
  onChange,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4 my-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-aesthetic-dark">
              First Name
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
              required
              className="aesthetic-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-aesthetic-dark">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
              required
              className="aesthetic-input"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-aesthetic-dark">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onChange('email', e.target.value)}
              required
              className="aesthetic-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-aesthetic-dark">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => onChange('phoneNumber', e.target.value)}
              className="aesthetic-input"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio" className="text-aesthetic-dark">
            Bio
          </Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => onChange('bio', e.target.value)}
            placeholder="Tell your clients about yourself, your qualifications, and your coaching style"
            className="min-h-[150px] aesthetic-input"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
