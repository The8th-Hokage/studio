'use client';

import { MoreVertical, Trash2, Users, Trophy, RotateCcw } from 'lucide-react';
import type { Group } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useGroupStore } from '@/hooks/use-group-store';
import { currentUser } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function ChatHeader({ group }: { group: Group }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { removeUserFromGroup, updateUltimateNumber, resetUltimateNumber } = useGroupStore();

  const handleLeaveGroup = () => {
    setDialogOpen(false);
    removeUserFromGroup(group.id, currentUser.id);
    router.push('/');
    toast({
      title: 'You have left the group',
      description: `You are no longer a member of ${group.name}.`,
    });
  };

  const handleResetUltimateNumber = () => {
    resetUltimateNumber(group.id);
    toast({
      title: 'Ultimate Number Reset',
      description: 'The game has been reset by the admin.',
    });
  };

  const canIncrease = group.ultimateUserId !== currentUser.id;

  const handleUltimateNumberClick = () => {
    if (group.ultimateNumber !== undefined && canIncrease) {
      updateUltimateNumber(group.id, group.ultimateNumber + 50, currentUser.id);
    } else if (!canIncrease) {
      toast({
        variant: 'destructive',
        title: 'Not your turn!',
        description: 'Wait for another user to increase the number.',
      });
    }
  };

  const isCreator = group.creatorId === currentUser.id;

  return (
    <header className="p-4 border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-headline">{group.name} {isCreator && '(Admin)'}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <p className="line-clamp-1 flex-1">{group.description}</p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Users className="h-4 w-4" />
              <span>{group.members.length} Members</span>
            </div>
          </div>
        </div>
        {group.ultimateNumber !== undefined && (
          <div
            className={cn(
              'flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 p-2 rounded-lg transition-colors',
              canIncrease
                ? 'cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-900'
                : 'cursor-not-allowed opacity-70'
            )}
            onClick={handleUltimateNumberClick}
            title={canIncrease ? 'Click to increase by 50' : "Wait for another user's turn"}
          >
            <Trophy className="h-6 w-6 text-yellow-500" />
            <div className="text-center">
              <div className="font-bold text-lg leading-none">{group.ultimateNumber}</div>
              <div className="text-xs">Set by {group.ultimateUser}</div>
            </div>
          </div>
        )}
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               {isCreator && group.ultimateNumber !== undefined && (
                <>
                  <DropdownMenuItem onClick={handleResetUltimateNumber}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    <span>Reset ULTIMATE NUMBER</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
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
              </-AlertDialogDescription>
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
