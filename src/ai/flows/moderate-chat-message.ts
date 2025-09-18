'use server';

/**
 * @fileOverview AI-powered content moderation for chat messages.
 *
 * - moderateChatMessage - A function that moderates a given chat message.
 * - ModerateChatMessageInput - The input type for the moderateChatMessage function.
 * - ModerateChatMessageOutput - The return type for the moderateChatMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateChatMessageInputSchema = z.object({
  message: z.string().describe('The chat message to be moderated.'),
});
export type ModerateChatMessageInput = z.infer<typeof ModerateChatMessageInputSchema>;

const ModerateChatMessageOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the message is safe or not.'),
  reason: z.string().describe('The reason why the message was flagged as unsafe, if applicable.'),
});
export type ModerateChatMessageOutput = z.infer<typeof ModerateChatMessageOutputSchema>;

export async function moderateChatMessage(input: ModerateChatMessageInput): Promise<ModerateChatMessageOutput> {
  return moderateChatMessageFlow(input);
}

const moderateChatMessagePrompt = ai.definePrompt({
  name: 'moderateChatMessagePrompt',
  input: {schema: ModerateChatMessageInputSchema},
  output: {schema: ModerateChatMessageOutputSchema},
  prompt: `You are a content moderation expert. You will receive a chat message and must determine if it is safe and appropriate for a public chat room.

  Message: {{{message}}}

  Respond with a JSON object that contains two fields:
  - isSafe: a boolean value, true if the message is safe, false if it is not.
  - reason: a string explaining why the message is unsafe. If the message is safe, this should be an empty string.

  Consider the following:
  - Is the message abusive, hateful, or discriminatory?
  - Does the message contain profanity or sexually explicit content?
  - Does the message threaten or harass other users?
  - Does the message reveal personal information about other users?
  - Does the message promote illegal activities?

  If the message violates any of these rules, it is unsafe.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const moderateChatMessageFlow = ai.defineFlow(
  {
    name: 'moderateChatMessageFlow',
    inputSchema: ModerateChatMessageInputSchema,
    outputSchema: ModerateChatMessageOutputSchema,
  },
  async input => {
    const {output} = await moderateChatMessagePrompt(input);
    return output!;
  }
);
