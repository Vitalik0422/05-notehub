import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';
import { RotatingLines } from 'react-loader-spinner';

interface SeacrhBoxProps {
  searchValue: string;
  setSearchValue: (query: string) => void;
  setPage: (value: number) => void;
  isLoading: boolean;
}

const SearchBox = ({
  searchValue,
  setSearchValue,
  setPage,
  isLoading,
}: SeacrhBoxProps) => {
  const changeSearchNoteInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setPage(1);
  };

  return (
    <div className={css.formWrapper}>
      <input
        value={searchValue}
        className={css.input}
        type="text"
        placeholder="Search notes"
        onChange={changeSearchNoteInput}
      />
      <RotatingLines
        visible={isLoading}
        height="24"
        width="24"
        color="#0d6efd"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default SearchBox;
