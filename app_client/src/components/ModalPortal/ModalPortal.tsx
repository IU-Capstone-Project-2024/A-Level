import { useEffect, useRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import './ModalPortal.css';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const ModalPortal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ open, children, onClick }, ref) => {
    const innerRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      const dialog =
        (ref as React.RefObject<HTMLDialogElement>).current || innerRef.current;
      if (open) {
        dialog?.showModal();
      } else {
        dialog?.close();
      }
    }, [open, ref]);

    return createPortal(
      <dialog onClick={onClick} className="portal-dialog" ref={ref || innerRef}>
        <div className="portal-div">{children}</div>
      </dialog>,
      document.getElementById('modal-portal') as Element,
    );
  },
);

export default ModalPortal;
