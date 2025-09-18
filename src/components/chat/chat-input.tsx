'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Delete, Hash, Keyboard } from 'lucide-react';
import { sendChatMessage } from '@/actions/chat';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

export default function ChatInput({
  onSendMessage,
  groupId,
}: {
  onSendMessage: (text: string) => void;
  groupId: string;
}) {
  const { toast } = useToast();
  const [currentNumber, setCurrentNumber] = useState('');
  const [textMessage, setTextMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputMode, setInputMode] = useState<'keypad' | 'text'>('keypad');

  const handleNumberClick = (number: string) => {
    setCurrentNumber((prev) => prev + number);
  };

  const handleBackspace = () => {
    if (inputMode === 'keypad') {
      setCurrentNumber((prev) => prev.slice(0, -1));
    }
  };

  const handleSend = async () => {
    const message = inputMode === 'keypad' ? currentNumber : textMessage;
    if (message.length === 0) return;

    setIsSubmitting(true);
    const result = await sendChatMessage({
      message,
      groupId,
    });
    setIsSubmitting(false);

    if (result.success) {
      onSendMessage(message);
      setCurrentNumber('');
      setTextMessage('');
    } else {
      toast({
        variant: 'destructive',
        title: 'Message blocked',
        description: result.reason,
      });
    }
  };
  
  const isSendDisabled = isSubmitting || (inputMode === 'keypad' ? currentNumber.length === 0 : textMessage.length === 0)

  return (
    <div className="p-4 border-t bg-background">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        {inputMode === 'keypad' ? (
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={currentNumber}
              placeholder="Enter a number..."
              className="flex-1 text-right text-lg font-mono"
            />
            <Button onClick={handleBackspace} variant="outline" size="icon">
              <Delete />
              <span className="sr-only">Backspace</span>
            </Button>
          </div>
        ) : (
          <Input
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder="Type a message..."
            className="text-base"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !isSendDisabled) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
        )}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            {inputMode === 'keypad' && (
              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <Button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    variant="outline"
                    className="h-12 text-xl"
                  >
                    {num}
                  </Button>
                ))}
                <div />
                <Button
                  onClick={() => handleNumberClick('0')}
                  variant="outline"
                  className="h-12 text-xl"
                >
                  0
                </Button>
                <div />
              </div>
            )}
          </div>
           <div className="flex flex-col gap-2">
             <Button onClick={() => setInputMode(inputMode === 'keypad' ? 'text' : 'keypad')} variant="outline" size="icon">
                {inputMode === 'keypad' ? <Keyboard /> : <Hash />}
                <span className="sr-only">Switch Input Mode</span>
            </Button>
            <Button onClick={handleSend} size="icon" disabled={isSendDisabled}>
                <SendHorizonal />
                <span className="sr-only">Send Message</span>
            </Button>
           </div>
        </div>
      </div>
    </div>
  );
}