'use client';

import React, { useState } from 'react';
import type { Group, User } from '@/lib/types';
import ChatHeader from './chat-header';
import ChatMessages from './chat-messages';
import ChatInput from './chat-input';
import { currentUser } from '@/lib/data';
import { useGroupStore } from '@/hooks/use-group-store';

type MessageWithUser = {
    id: string;
    groupId: string;
    userId: string;
    text: string;
    timestamp: Date;
    isSafe?: boolean | undefined;
    reason?: string | undefined;
    user: User | undefined;
}

export default function ChatLayout({
  group: initialGroup,
  initialMessages,
}: {
  group: Group;
  initialMessages: MessageWithUser[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const { groups, updateUltimateNumber } = useGroupStore();
  const group = groups.find((g) => g.id === initialGroup.id) || initialGroup;

  const handleSendMessage = (text: string) => {
    const number = parseInt(text, 10);
    if (!isNaN(number)) {
      if (group.creatorId === currentUser.id && group.ultimateNumber === undefined) {
        updateUltimateNumber(group.id, number, currentUser.id);
      } else if (number > (group.ultimateNumber ?? -1)) {
        updateUltimateNumber(group.id, number, currentUser.id);
      }
    }
    
    const newMessage: MessageWithUser = {
      id: `msg-${Date.now()}`,
      groupId: group.id,
      userId: currentUser.id,
      text,
      timestamp: new Date(),
      user: currentUser,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader group={group} />
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} groupId={group.id} />
    </div>
  );
}
