'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Globe, MessageSquare, PlusCircle } from 'lucide-react';
import { currentUser } from '@/lib/data';
import { CreateGroupDialog } from '../groups/create-group-dialog';
import { UserNav } from './user-nav';
import Image from 'next/image';
import { useGroupStore } from '@/hooks/use-group-store';

export default function AppSidebar() {
  const pathname = usePathname();
  const { groups } = useGroupStore();

  const joinedGroups = groups.filter((group) =>
    group.members.some((m) => m.userId === currentUser.id)
  );

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-sidebar-primary" />
          <h2 className="text-xl font-bold text-sidebar-foreground font-headline">
            <span className="font-logo text-3xl text-sidebar-primary">V</span>Auctions
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/'}
                tooltip={{ children: 'Discover' }}
              >
                <Link href="/">
                  <Globe />
                  <span>Discover</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <CreateGroupDialog>
                <SidebarMenuButton tooltip={{ children: 'Create Room' }}>
                  <PlusCircle />
                  <span>Create Room</span>
                </SidebarMenuButton>
              </CreateGroupDialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Your Communities</SidebarGroupLabel>
          <SidebarMenu>
            {joinedGroups.map((group) => (
              <SidebarMenuItem key={group.id}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === `/groups/${group.id}`}
                  tooltip={{ children: group.name }}
                >
                  <Link href={`/groups/${group.id}`}>
                    <Image
                      src={group.avatarUrl}
                      width={20}
                      height={20}
                      alt={group.name}
                      className="rounded-sm"
                      data-ai-hint="group icon"
                    />
                    <span>{group.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </>
  );
}
