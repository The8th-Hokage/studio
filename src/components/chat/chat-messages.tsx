'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { User } from '@/lib/types';
import ChatMessage from './chat-message';

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

export default function ChatMessages({
  messages,
}: {
  messages: MessageWithUser[];
}) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1" viewportRef={viewportRef}>
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}
