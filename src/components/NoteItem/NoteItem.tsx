//styles
import css from './NoteItem.module.css';
import type { Note } from '../../types/note';
interface NoteItemProps {
  note: Note;
  handleDeleteNote: (id: string) => void;
}

const NoteItem = ({
  note: { title, id, content, tag },
  handleDeleteNote,
}: NoteItemProps) => {
  const onClickDelete = () => {
    handleDeleteNote(id);
  };

  return (
    <>
      <h2 className={css.title}>{title}</h2>
      <p className={css.content}>{content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{tag}</span>
        <button className={css.button} onClick={onClickDelete}>
          Delete
        </button>
      </div>
    </>
  );
};

export default NoteItem;
