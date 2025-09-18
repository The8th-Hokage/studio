import { groups, messages as allMessages, users } from '@/lib/data';
import { notFound } from 'next/navigation';
import ChatLayout from '@/components/chat/chat-layout';

export default function ChatPage({ params }: { params: { groupId: string } }) {
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
