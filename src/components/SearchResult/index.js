import { useCallback, useMemo } from "react";
import commaNumber from "comma-number";
import ReactPaginate from "react-paginate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserListItem } from "../index";
import { getParam } from "../../utils/url-params";
import "./style.css";

function Loading({ n, t }) {
  const count = [...Array(n | 0)];
  return (
    <div className="list-wrapper">
      {t > 0 ? (
        <p className="total-result-text">{commaNumber(t)} users</p>
      ) : (
        <Skeleton width="7em" height="0.7em" count={1} baseColor="#adbac7" />
      )}

      <ul className="list">
        {count.map((_, i) => (
          <li key={i} className="list-item">
            <div className="list-item-img-wrap">
              <Skeleton circle width={74} height={74} baseColor="#adbac7" />
            </div>
            <div className="list-item-content">
              <Skeleton width="17em" height="3em" baseColor="#adbac7" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const defaultPage = +getParam("p") - 1 || 0;
export function SearchResult({ data, query, isLoading, error, paginate }) {
  const resultPerPage = 10;

  const Result = useMemo(() => {
    if (!Array.isArray(data?.items)) return null;
    const { total_count, items } = data;
    return (
      <>
        <div className="list-wrapper">
          <p className="total-result-text">{commaNumber(total_count)} users</p>
          <ul className="list">
            {items.map((o) => (
              <UserListItem key={o.id} data={o} />
            ))}
          </ul>
        </div>
      </>
    );
  }, [data]);

  const handlePageClick = useCallback(
    ({ selected }) => {
      paginate(selected + 1);
    },
    [paginate]
  );

  if (error) {
    return (
      <p className="fetch-error-message">
        {error?.message || "Failed to fetch"}
      </p>
    );
  }

  if (!Array.isArray(data?.items) && !isLoading) return null;

  const pageCount = data?.total_count
    ? Math.min(Math.ceil(data?.total_count / resultPerPage), 100)
    : 0;

  return (
    <div className="search-result">
      {isLoading ? (
        <Loading t={data?.total_count} n={data?.items?.length || 7} />
      ) : (
        Result
      )}

      {data && data?.total_count > resultPerPage && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          forcePage={defaultPage}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          pageRangeDisplayed={7}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          pageClassName={"pagination__item"}
          previousClassName={"pagination__link_end"}
          nextClassName={"pagination__link_end"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      )}
    </div>
  );
}
