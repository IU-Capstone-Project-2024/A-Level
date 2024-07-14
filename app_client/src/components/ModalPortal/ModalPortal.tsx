import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const dialog = innerRef.current;
    if (open) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="portal-dialog" ref={innerRef}>
      <OutsideClickHandler onOutsideClick={onClick}>
        <div className="portal-div">{children}</div>
      </OutsideClickHandler>
    </dialog>,
    document.getElementById('modal-portal') as Element,
  );
}
