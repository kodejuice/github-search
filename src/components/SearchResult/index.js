import { useMemo } from "react";
import commaNumber from "comma-number";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserListItem } from "../index";
import { getParam } from "../../utils/url-params";
import "./style.css";

function Loading({ n }) {
  const count = [...Array(n | 0)];
  return (
    <div className="list-wrapper">
      <Skeleton width="7em" height="0.7em" count={1} baseColor="#adbac7" />

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

const defaultPage = getParam("q") || 1;
export function SearchResult({ data, query, isLoading, error, search }) {
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

  if (error) {
    return (
      <p className="fetch-error-message">
        {error?.message || "Failed to fetch"}
      </p>
    );
  }

  if (!Array.isArray(data?.items) && !isLoading) return null;

  return (
    <div className="search-result">
      {isLoading ? <Loading n={data?.items?.length || 7} /> : Result}
      {/* <pagination componene/> */}
      <div>q: {query}</div>
    </div>
  );
}
