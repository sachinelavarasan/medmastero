import { ReactElement } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';


interface ModalProps {
  button?: ReactElement;
  buttonLabel?: string;
  title: string;
  subTitle?: string;
  bodyContent: ReactElement;
}

export function Modal({ button ,buttonLabel, title , subTitle , bodyContent}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {button ? button : <Button variant="outline">{buttonLabel}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded">
        <DialogHeader>
          <DialogTitle className='text-left'>{title}</DialogTitle>
          {subTitle ? 
          <DialogDescription>{subTitle}</DialogDescription>
          :null}
        </DialogHeader>
        <div className="flex items-center justify-center">
          {bodyContent}
        </div>
        <DialogFooter className="flex justify-end flex-col items-end">
          <DialogClose asChild>
            <Button type="button" variant="cancel" className='max-w-fit'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
