import './Modal.css';
import { ReactNode } from 'react';

interface ModalProps{
    children: ReactNode;
    open: boolean;
}


export default function Modal({children, open}: ModalProps){
    return <dialog open={open}>{children}</dialog>;
}