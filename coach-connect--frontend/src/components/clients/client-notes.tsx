'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Mock notes data - in a real app, this would come from an API
const mockNotes = [
  {
    id: '1',
    content:
      'Client is making good progress with strength training. Increased weights by 10% this week.',
    createdAt: new Date('2023-12-15T10:30:00'),
  },
  {
    id: '2',
    content:
      'Discussed nutrition plan. Client is struggling with meal prep on weekends. Provided simpler alternatives.',
    createdAt: new Date('2023-12-10T14:45:00'),
  },
  {
    id: '3',
    content:
      'Knee pain has improved. Continuing with modified exercises for lower body.',
    createdAt: new Date('2023-12-05T09:15:00'),
  },
];

interface Props {
  clientId: string;
}

export function ClientNotes({ clientId }: Props) {
  const [notes, setNotes] = useState(mockNotes);
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to add a note
      // For demo purposes, we'll simulate a successful addition
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newNoteObj = {
        id: Date.now().toString(),
        content: newNote,
        createdAt: new Date(),
      };

      setNotes([newNoteObj, ...notes]);
      setNewNote('');

      toast('Note added', {
        description: 'Your note has been added successfully.',
      });
    } catch (error) {
      toast('Error', {
        description: 'There was an error adding your note. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Note</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your notes about this client..."
            className="min-h-[100px]"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleAddNote}
            disabled={isSubmitting || !newNote.trim()}
          >
            {isSubmitting ? 'Adding...' : 'Add Note'}
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No notes yet. Add your first note above.
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="p-4">
                <div className="mb-2 text-sm text-muted-foreground">
                  {note.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  at{' '}
                  {note.createdAt.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="whitespace-pre-wrap">{note.content}</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
