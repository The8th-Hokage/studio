'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types';
import { format } from 'date-fns';
import { currentUser } from '@/lib/data';
import { useState, useEffect } from 'react';

type MessageWithUser = {
  id: string;
  userId: string;
  text: string;
  timestamp: Date;
  user: User | undefined;
};

export default function ChatMessage({ message }: { message: MessageWithUser }) {
  const isCurrentUser = message.userId === currentUser.id;
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    if (message.timestamp) {
      setFormattedTime(format(new Date(message.timestamp), 'h:mm a'));
    }
  }, [message.timestamp]);

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isCurrentUser && 'flex-row-reverse'
      )}
    >
      <Avatar className="h-9 w-9">
        <AvatarImage src={message.user?.avatarUrl} alt={message.user?.name} data-ai-hint="person portrait" />
        <AvatarFallback>
          {message.user?.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'flex flex-col gap-1',
          isCurrentUser ? 'items-end' : 'items-start'
        )}
      >
        <div className="flex items-baseline gap-2">
          <p className="font-semibold text-sm">{message.user?.name}</p>
          <time className="text-xs text-muted-foreground">
            {formattedTime}
          </time>
        </div>
        <div
          className={cn(
            'p-3 rounded-lg max-w-md',
            isCurrentUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          )}
        >
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    </div>
  );
}
