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
import type { Group } from '@/lib/types';
import { users } from '@/lib/data';
import { ScrollArea } from '../ui/scroll-area';

export function MemberListSheet({
  group,
  children,
}: {
  group: Group;
  children: React.ReactNode;
}) {
  const groupMembers = group.members
    .map((memberId) => users.find((user) => user.id === memberId))
    .filter((user) => user !== undefined);

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
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
