'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useGroupStore } from '@/hooks/use-group-store';
import { useRouter } from 'next/navigation';
import { currentUser } from '@/lib/data';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

export function CreateGroupDialog({ children }: { children: React.ReactNode }) {
  const [selfDestructMinutes, setSelfDestructMinutes] = useState(30);
  const [teamsEnabled, setTeamsEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const addGroup = useGroupStore((state) => state.addGroup);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newGroupId = `group-${Date.now()}`;
    addGroup({
      id: newGroupId,
      name: values.name,
      description: values.description,
      avatarUrl: `https://picsum.photos/seed/${newGroupId}/200/200`,
      members: [{ userId: currentUser.id, team: null }],
      creatorId: currentUser.id,
      teamsEnabled: teamsEnabled,
    });
    form.reset();
    setOpen(false);
    router.push(`/groups/${newGroupId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Create a new room</DialogTitle>
          <DialogDescription>
            Give your room a name and description to get started.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="E.g. Weekend Hikers" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-start gap-4">
                  <FormLabel className="text-right pt-2">Description</FormLabel>
                  <FormControl className="col-span-3">
                    <Textarea
                      placeholder="What is this room about?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="self-destruct" className="text-right pt-2">
                Self-destruct
              </Label>
              <div className="col-span-3 space-y-2">
                <Slider
                  id="self-destruct"
                  defaultValue={[selfDestructMinutes]}
                  min={10}
                  max={90}
                  step={5}
                  onValueChange={(value) => setSelfDestructMinutes(value[0])}
                />
                <p className="text-sm text-muted-foreground text-center">
                  {selfDestructMinutes} minutes
                </p>
              </div>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teams-enabled" className="text-right">
                Enable Teams
              </Label>
              <div className="col-span-3">
                <Switch
                  id="teams-enabled"
                  checked={teamsEnabled}
                  onCheckedChange={setTeamsEnabled}
                />
              </div>
            </div>
            <DialogFooter>
               <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create Room</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
