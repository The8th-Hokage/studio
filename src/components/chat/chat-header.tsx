import { Users } from 'lucide-react';
import type { Group } from '@/lib/types';

export default function ChatHeader({ group }: { group: Group }) {
  return (
    <header className="p-4 border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold font-headline">{group.name}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
          <p className="line-clamp-1 flex-1">{group.description}</p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Users className="h-4 w-4" />
            <span>{group.members.length} Members</span>
          </div>
        </div>
      </div>
    </header>
  );
}
