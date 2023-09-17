'use client';
import { Button } from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog';
import React from 'react';

interface Props {
  open?: boolean;
  setOpen?: (arg: boolean) => void;
}

const CharacterDetailsModal: React.FC<Props> = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">
          Assign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Assign Chat</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDetailsModal;
