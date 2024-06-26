import './Modal.css';
import { ReactNode } from 'react';

interface ModalProps{
    children: ReactNode;
    open: boolean;
    ref: React.LegacyRef<HTMLDialogElement>|null;
}


export default function Modal({children, open, ref}: ModalProps){
    return <dialog ref={ref} open={open}>{children}</dialog>;
}