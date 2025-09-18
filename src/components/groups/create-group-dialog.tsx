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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export function CreateGroupDialog({ children }: { children: React.ReactNode }) {
  const [selfDestructMinutes, setSelfDestructMinutes] = useState(30);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Create a new group</DialogTitle>
          <DialogDescription>
            Give your group a name and description to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="E.g. Weekend Hikers" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="What is this group about?"
              className="col-span-3"
            />
          </div>
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
        </div>
        <DialogFooter>
          <Button type="submit">Create Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
