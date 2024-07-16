'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './ModalPortal.css';
import OutsideClickHandler from 'react-outside-click-handler';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export default function ModalPortal({ open, children, onClick }: ModalProps) {
  const innerRef = useRef<HTMLDialogElement>(null);
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById('modal-portal');
    console.log('here ' + ref.current);
    setMounted(true);
  }, []);

  useEffect(() => {
    const dialog = innerRef.current;
    if (open) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [open]);

  return mounted && ref.current
    ? createPortal(
        <dialog className="portal-dialog" ref={innerRef}>
          <OutsideClickHandler onOutsideClick={onClick}>
            <div className="portal-div">{children}</div>
          </OutsideClickHandler>
        </dialog>,
        ref.current,
      )
    : null;
}
