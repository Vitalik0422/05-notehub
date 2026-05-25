import css from './Pagination.module.css';

import type { ComponentType } from 'react';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';

interface PaginationProps {
  page: number;
  setPage: (value: number) => void;
  totalPages: number | 1;
}

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={({ selected }) => setPage(selected + 1)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={page - 1}
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
