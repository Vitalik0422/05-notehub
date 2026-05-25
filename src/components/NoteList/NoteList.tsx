// styles
import css from './NoteList.module.css';
//types
import type { Note } from '../../types/note';
import NoteItem from '../NoteItem/NoteItem';

interface NotesListProps {
  notes?: Note[];
  handleDeleteNote: (id: string) => void;
}

const NoteList = ({ notes, handleDeleteNote }: NotesListProps) => {
  return (
    <ul className={css.list}>
      {notes?.map((note) => (
        <li className={css.listItem} key={note.id}>
          <NoteItem handleDeleteNote={handleDeleteNote} note={note} />
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
