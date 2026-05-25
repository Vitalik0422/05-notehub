//styles
import css from './Modal.module.css';

import NoteForm from '../NoteForm/NoteForm';
import { createPortal } from 'react-dom';
import { useEffect, type MouseEvent } from 'react';
import type { GetNoteRequest } from '../../types/note';

interface ModalProps {
  onClose: () => void;
  submitNoteData: (data: GetNoteRequest) => Promise<void>;
}

const Modal = ({ onClose, submitNoteData }: ModalProps) => {
  useEffect(() => {
    const handleEscClick = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscClick);
    return () => document.removeEventListener('keydown', handleEscClick);
  }, [onClose]);

  const handleBackDropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackDropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <NoteForm submitNoteData={submitNoteData} onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
