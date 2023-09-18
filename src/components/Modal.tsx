import * as React from 'react';

import { cn } from '@/utils/cn';
import * as Ariakit from '@ariakit/react';

import { Icons } from './Image';

import '@/styles/modal.css';

const ModalTrigger = React.forwardRef<
  HTMLButtonElement,
  { className?: string; onClick: any; children: React.ReactNode }
>(({ className, onClick, children, ...props }, ref) => {
  return (
    <Ariakit.Button onClick={onClick} className={cn('', className)} {...props} ref={ref}>
      {children}
    </Ariakit.Button>
  );
});
ModalTrigger.displayName = 'ModalTrigger';

const ModalHeading = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <Ariakit.DialogHeading className={cn('heading', className)} {...props} ref={ref}>
      {children}
    </Ariakit.DialogHeading>
  );
});
ModalHeading.displayName = 'ModalHeading';

const ModalDescription = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn('description', className)} {...props} ref={ref}>
      {children}
    </div>
  );
});
ModalDescription.displayName = 'ModalDescription';

const Modal = React.forwardRef<
  HTMLDivElement,
  { className?: string; trigger: any; children: React.ReactNode }
>(({ className, trigger, children }, ref) => {
  return (
    <>
      <Ariakit.Dialog
        store={trigger}
        backdrop={<div className="backdrop" />}
        className={cn('dialog', className)}
        ref={ref}
      >
        <div className="absolute top-3 right-3">
          <Ariakit.DialogDismiss>
            <Icons.cross />
          </Ariakit.DialogDismiss>
        </div>
        {children}
      </Ariakit.Dialog>
    </>
  );
});
Modal.displayName = 'Modal';

export { Modal, ModalDescription, ModalHeading, ModalTrigger };
