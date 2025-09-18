'use client';

import { notFound, useParams } from 'next/navigation';
import ChatLayout from '@/components/chat/chat-layout';
import { messages as allMessages, users } from '@/lib/data';
import { useGroupStore } from '@/hooks/use-group-store';

export default function ChatPage() {
  const params = useParams<{ groupId: string }>();
  const { groups } = useGroupStore();
  const group = groups.find((g) => g.id === params.groupId);

  if (!group) {
    notFound();
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
