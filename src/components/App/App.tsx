// styles
import css from './App.module.css';
//hooks
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createNote, deleteNote, fetchNotes } from '../../services/noteService';
import { useState } from 'react';

//components
import SearchBox from '../SeacrhBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Button from '../UI/Button/Button';
import NoteList from '../NoteList/NoteList';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import type { GetNoteRequest } from '../../types/note';
import { useDebounce } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';
import InfoMessage from '../InformMessage/InfoMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const App = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSetSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [search] = useDebounce(searchQuery, 1000);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['note', search, page],
    queryFn: () => fetchNotes(search, page),
    placeholderData: keepPreviousData,
  });

  const createNoteMutation = useMutation({
    mutationFn: async (data: GetNoteRequest) => createNote(data),
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: ['note'] });
      toast.success(`Note ${note.title} was created`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => deleteNote(id),
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: ['note'] });
      toast.success(`Note with id: ${note.id} was deleted`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getFormData = async (data: GetNoteRequest) => {
    await createNoteMutation.mutateAsync(data);
  };

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  const openModal = () => {
    setIsVisibleModal(true);
  };

  const closeModal = () => {
    setIsVisibleModal(false);
  };
  //boolean const
  const isSearchFetching = search.length > 0 && isFetching;
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          searchValue={searchQuery}
          setSearchValue={setSetSearchQuery}
          setPage={setPage}
          isLoading={isSearchFetching}
        />

        {totalPages > 1 && (
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        )}
        <Button variant={css.button} handleClick={openModal}>
          Створити нотатку +
        </Button>
      </header>
      <main>
        {isLoading && isFetching && <Loader />}
        {data?.notes.length !== 0 ? (
          <NoteList notes={data?.notes} handleDeleteNote={handleDeleteNote} />
        ) : (
          <InfoMessage />
        )}
        {error && <ErrorMessage message={error.message} />}
      </main>
      {isVisibleModal && (
        <Modal onClose={closeModal} submitNoteData={getFormData} />
      )}

      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default App;
