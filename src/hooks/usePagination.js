import { useState } from "react";

function usePagination(items, pageLimit) {
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(items.length / pageLimit);

  const changePage = (pageNum) => {
    if (pageNum === 0) {
      setPageNumber(pageNum);
    } else {
      if (pageNum > pageCount || pageNum < 0) {

      } else {
        setPageNumber(pageNum - 1);
      }
    }
  };

  const pageData = () => {
    const initEle = pageNumber * pageLimit;
    const endEle = initEle + pageLimit;
    const sliced = items.slice(initEle, endEle);
    return sliced;
  };

  const nextPage = () => {
    setPageNumber(Math.min(pageNumber + 1, pageCount - 1));
  };

  const previousPage = () => {
    setPageNumber(Math.max(pageNumber - 1, 0));
  };

  return {
    pageNumber,
    pageCount,
    changePage,
    pageData,
    nextPage,
    previousPage,
  };
}

export default usePagination;