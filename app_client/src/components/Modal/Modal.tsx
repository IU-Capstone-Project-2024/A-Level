import './Modal.css';
import React, { forwardRef } from 'react';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ open, children }, ref) => {
    return <dialog ref={ref} open={open}>{children}</dialog>;
});

export default Modal;
