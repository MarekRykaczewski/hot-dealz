import { SetStateAction, useState } from "react";

const usePagination = (items: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginate = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    currentItems,
    totalPages,
    paginate,
  };
};

export default usePagination;
