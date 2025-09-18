'use client';

import { MoreVertical, Trash2, Users, Trophy, RotateCcw } from 'lucide-react';
import type { Group, Team } from '@/lib/types';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useGroupStore } from '@/hooks/use-group-store';
import { currentUser, users } from '@/lib/data';
import { cn } from '@/lib/utils';
import { MemberListSheet } from './member-list-sheet';

export default function ChatHeader({ group }: { group: Group }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { removeUserFromGroup, updateUltimateNumber, resetUltimateNumber, declareWinner } = useGroupStore();

  useEffect(() => {
    if (group.gameEndTime && !group.winnerId) {
      const timer = setTimeout(() => {
        if (Date.now() >= group.gameEndTime!) {
          declareWinner(group.id);
        }
      }, group.gameEndTime - Date.now());
      return () => clearTimeout(timer);
    }
  }, [group.gameEndTime, group.id, group.winnerId, declareWinner]);


  const handleLeaveGroup = () => {
    setDialogOpen(false);
    router.push('/');
    removeUserFromGroup(group.id, currentUser.id);
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

  const isGameActive = group.ultimateNumber !== undefined && !group.winnerId;
  const canIncrease = isGameactive && group.ultimateUserId !== currentUser.id;

  const handleUltimateNumberClick = () => {
    if (group.ultimateNumber !== undefined && canIncrease) {
      updateUltimateNumber(group.id, group.ultimateNumber + 50, currentUser.id);
    } else if (isGameActive && !canIncrease) {
      toast({
        variant: 'destructive',
        title: 'Not your turn!',
        description: 'Wait for another user to increase the number.',
      });
    }
  };

  const isCreator = group.creatorId === currentUser.id;
  const winner = users.find(u => u.id === group.winnerId);

  const groupMembers = group.members
    .map((member) => {
        const user = users.find((user) => user.id === member.userId);
        return user ? { ...user, team: member.team } : null;
    })
    .filter((user): user is (typeof users[0] & { team: Team }) => user !== null);

  const teamA = groupMembers.filter(m => m.team === 'A');
  const teamB = groupMembers.filter(m => m.team === 'B');

  return (
    <header className="p-4 border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-headline">{group.name} {isCreator && '(Admin)'}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <p className="line-clamp-1 flex-1">{group.description}</p>
              <MemberListSheet group={group}>
                <div className="flex items-center gap-1.5 flex-shrink-0 cursor-pointer hover:text-foreground transition-colors">
                  <Users className="h-4 w-4" />
                  <span>{group.members.length} Members</span>
                </div>
              </MemberListSheet>
            </div>
          </div>
          {winner ? (
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 p-2 rounded-lg">
              <Trophy className="h-6 w-6 text-green-500" />
              <div className="text-center">
                <div className="font-bold text-sm">Winner!</div>
                <div className="text-xs">{winner.name} with {group.ultimateNumber}</div>
              </div>
            </div>
          ) : group.ultimateNumber !== undefined && (
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

        <div className="flex justify-around gap-4">
          <div className="flex-1 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50">
            <h3 className="font-bold text-red-800 dark:text-red-300 mb-2 text-center">Team A</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <TooltipProvider>
                {teamA.map(member => (
                  <Tooltip key={member.id}>
                    <TooltipTrigger>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{member.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
              {teamA.length === 0 && <p className="text-xs text-muted-foreground">No members yet</p>}
            </div>
          </div>
          <div className="flex-1 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 text-center">Team B</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <TooltipProvider>
                {teamB.map(member => (
                  <Tooltip key={member.id}>
                    <TooltipTrigger>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{member.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
              {teamB.length === 0 && <p className="text-xs text-muted-foreground">No members yet</p>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}