'use client';

import { MoreVertical, Trash2, Users } from 'lucide-react';
import type { Group } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ChatHeader({ group }: { group: Group }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleLeaveGroup = () => {
    console.log(`Left group: ${group.name}`);
    toast({
      title: 'You have left the group',
      description: `You are no longer a member of ${group.name}.`,
    });
    setDialogOpen(false);
    // Here you would typically redirect the user or update the UI
    // For now, we just show a toast.
  };

  return (
    <header className="p-4 border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-headline">{group.name}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <p className="line-clamp-1 flex-1">{group.description}</p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Users className="h-4 w-4" />
              <span>{group.members.length} Members</span>
            </div>
          </div>
        </div>
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Leave Group</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to leave the group "{group.name}". You will need
                to be invited back to rejoin.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLeaveGroup}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Leave
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}
