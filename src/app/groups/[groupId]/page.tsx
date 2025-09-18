'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import ChatLayout from '@/components/chat/chat-layout';
import { messages as allMessages, users } from '@/lib/data';
import { useGroupStore } from '@/hooks/use-group-store';
import { useEffect } from 'react';

export default function ChatPage() {
  const params = useParams<{ groupId: string }>();
  const router = useRouter();
  const { groups } = useGroupStore();
  const group = groups.find((g) => g.id === params.groupId);

  useEffect(() => {
    if (!group) {
      // If the group is not found, it might have been deleted.
      // Redirect to the discover page.
      router.push('/');
    }
  }, [group, router]);

  if (!group) {
    // Render nothing or a loading state while redirecting
    return null;
  }

  const groupMessages = allMessages.filter(
    (m) => m.groupId === params.groupId
  );
  
  const messagesWithUsers = groupMessages.map(message => {
    const user = users.find(u => u.id === message.userId);
    return { ...message, user };
  }).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return <ChatLayout group={group} initialMessages={messagesWithUsers} />;
}
