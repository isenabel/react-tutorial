import { useEffect } from "react";
import usePagination from "./hooks/usePagination.js";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Pagination = ({ data, pageLimit, setPageItems }) => {
  const { pageNumber, pageCount, changePage, pageData, nextPage, previousPage } =
    usePagination(data, pageLimit);

  useEffect(() => {
    setPageItems(pageData());
    // eslint-disable-next-line
  }, [pageNumber]);

  return (
    <div className="pagination">
      <div className="prev" onClick={previousPage}><ArrowBackIosNewIcon /></div>
      <div className="pageNumber-cont">
        <input
          value={pageNumber + 1}
          onChange={(e) => {
            changePage(e.target.valueAsNumber);
          }}
          type="number"
          className="pagination-input"
        />
        <p>/ {pageCount}</p>
      </div>
      <div className="next" onClick={nextPage}><ArrowForwardIosIcon /></div>
    </div>
  );
};

export default Pagination;