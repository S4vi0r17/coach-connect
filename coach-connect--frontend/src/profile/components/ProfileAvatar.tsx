import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Props {
  photoUrl: string;
  firstName: string;
  lastName: string;
}

export function ProfileAvatar({ photoUrl, firstName, lastName }: Props) {
  return (
    <>
      <Avatar className="h-32 w-32">
        <AvatarImage src={photoUrl || ''} alt={`${firstName} ${lastName}`} />
        <AvatarFallback className="bg-aesthetic-accent text-white text-2xl">
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <Button
        variant="outline"
        className="border-aesthetic-muted-light text-aesthetic-medium cursor-pointer mt-4"
      >
        Upload New Picture
      </Button>
    </>
  );
}
