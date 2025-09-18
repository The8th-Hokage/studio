'use server';

import { moderateChatMessage } from '@/ai/flows/moderate-chat-message';
import { z } from 'zod';

const sendChatMessageSchema = z.object({
  message: z.string(),
  groupId: z.string(),
});

type SendChatMessageInput = z.infer<typeof sendChatMessageSchema>;

export async function sendChatMessage(input: SendChatMessageInput) {
  const { message, groupId } = sendChatMessageSchema.parse(input);

  const moderationResult = await moderateChatMessage({ message });

  if (!moderationResult.isSafe) {
    return {
      success: false,
      reason: moderationResult.reason || 'This message was flagged as inappropriate and has been blocked.',
    };
  }

  // In a real app, you would save the message to the database here.
  // For now, we just simulate success.
  console.log(`Message in group ${groupId} was safe: "${message}"`);

  return { success: true };
}
