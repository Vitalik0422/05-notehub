// styles
import css from './App.module.css';
//hooks
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import { useState, type ChangeEvent } from 'react';

//components
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Button from '../UI/Button/Button';
import NoteList from '../NoteList/NoteList';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import { useDebounce } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import InfoMessage from '../InformMessage/InfoMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NoteForm from '../NoteForm/NoteForm';

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [search] = useDebounce(searchQuery, 1000);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['note', search, page],
    queryFn: () => fetchNotes(search, page),
    placeholderData: keepPreviousData,
  });

  const handleSearchNoteInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.trim());
    setPage(1);
  };

  const openModal = () => {
    setIsVisibleModal(true);
  };

  const closeModal = () => {
    setIsVisibleModal(false);
  };
  //boolean const
  const isSearchFetching = searchQuery.length > 0 && isFetching;
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          searchValue={searchQuery}
          handleSearchNoteInput={handleSearchNoteInput}
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
          <NoteList notes={data?.notes} />
        ) : (
          <InfoMessage />
        )}
        {error && <ErrorMessage message={error.message} />}
      </main>
      {isVisibleModal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default App;
