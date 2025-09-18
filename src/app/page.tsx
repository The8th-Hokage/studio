'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { GroupCard } from '@/components/groups/group-card';
import { useGroupStore } from '@/hooks/use-group-store';

export default function DiscoverPage() {
  const { groups } = useGroupStore();

  return (
    <div className="flex flex-col h-full">
      <header className="bg-background/95 backdrop-blur-sm p-4 border-b">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold font-headline">Discover Groups</h1>
          <p className="text-muted-foreground mt-1">
            Browse and join public chat groups.
          </p>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input placeholder="Search groups..." className="pl-10" />
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
