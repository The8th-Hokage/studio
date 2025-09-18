import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import type { Group } from '@/lib/types';

export function GroupCard({ group }: { group: Group }) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="items-center">
        <Image
          src={group.avatarUrl}
          width={80}
          height={80}
          alt={group.name}
          className="rounded-lg"
          data-ai-hint="group icon"
        />
      </CardHeader>
      <CardContent className="flex-1 text-center">
        <CardTitle className="text-lg font-headline">{group.name}</CardTitle>
        <CardDescription className="mt-1 line-clamp-2">
          {group.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          {group.members.length} members
        </div>
        <Button className="w-full">Join Group</Button>
      </CardFooter>
    </Card>
  );
}
