'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import { sendChatMessage } from '@/actions/chat';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  message: z.string().min(1, { message: 'Message cannot be empty.' }),
});

export default function ChatInput({
  onSendMessage,
  groupId,
}: {
  onSendMessage: (text: string) => void;
  groupId: string;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await sendChatMessage({ message: data.message, groupId });

    if (result.success) {
      onSendMessage(data.message);
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Message blocked',
        description: result.reason,
      });
    }
  }

  return (
    <div className="p-4 border-t bg-background">
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start gap-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Type your message..."
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              disabled={form.formState.isSubmitting}
            >
              <SendHorizonal />
              <span className="sr-only">Send Message</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
