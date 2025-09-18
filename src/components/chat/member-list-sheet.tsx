'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Group, Team } from '@/lib/types';
import { currentUser, users } from '@/lib/data';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGroupStore } from '@/hooks/use-group-store';

export function MemberListSheet({
  group,
  children,
}: {
  group: Group;
  children: React.ReactNode;
}) {
  const { switchTeam, groups } = useGroupStore();
  const currentGroup = groups.find(g => g.id === group.id) || group;

  const groupMembers = currentGroup.members
    .map((member) => {
      const user = users.find((user) => user.id === member.userId);
      return user ? { ...user, team: member.team } : null;
    })
    .filter((user) => user !== undefined);
  
  const handleTeamChange = (userId: string, team: string) => {
    // The Select component returns 'null' as a string, so we parse it back
    const newTeam = team === 'null' ? null : (team as Team);
    switchTeam(group.id, userId, newTeam);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Group Members</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-4rem)]">
          <div className="space-y-4 py-4">
            {groupMembers.map((user) => {
              if (!user) return null;
              const isCreator = user.id === group.creatorId;
              return (
                <div key={user.id} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {user.bio}
                    </p>
                  </div>
                  {isCreator && (
                    <Badge variant="secondary">Creator</Badge>
                  )}
                  {user.team && <Badge variant="outline">Team {user.team}</Badge>}
                  <Select
                    defaultValue={user.team || 'null'}
                    onValueChange={(value) => handleTeamChange(user.id, value)}
                    disabled={user.id !== currentUser.id && currentUser.id !== group.creatorId}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">No Team</SelectItem>
                      <SelectItem value="A">Team A</SelectItem>
                      <SelectItem value="B">Team B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
