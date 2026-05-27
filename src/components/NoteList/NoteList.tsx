// styles
import css from './NoteList.module.css';
//types
import type { Note } from '../../types/note';
import NoteItem from '../NoteItem/NoteItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import toast from 'react-hot-toast';

interface NoteListProps {
  notes?: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: ['note'] });
      toast.success(`Note with id: ${note.title} was deleted`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

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
