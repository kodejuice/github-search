/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { SearchResult } from "../../components";
import { useSearch } from "../../hooks";
import { getParam } from "../../utils/url-params";
import "./style.css";

function Home() {
  const [query, setQuery] = useState(getParam("q"));
  const { data, error, isLoading, search } = useSearch();

  // run on page load
  // if theres a search param q or p
  useEffect(() => {
    search(query, getParam("p") || 1);
  }, []);

  const onSubmit = useCallback(
    (ev) => {
      ev.preventDefault();
      search(query);
    },
    [query]
  );

  const paginate = useCallback(
    (page) => {
      search(query, page);
    },
    [query]
  );

  return (
    <div className="main">
      <div className="container">
        <h2 className="search-title">🔍️ Search Github</h2>
        <form id="search_form" action="/" method="get" onSubmit={onSubmit}>
          <div className="search-input">
            <input
              name="q"
              type="text"
              placeholder="Search user"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <input type="hidden" name="p" value={"1"} />
            <button className="btn">Search</button>
          </div>
        </form>

        <SearchResult
          data={data}
          query={query}
          error={error}
          paginate={paginate}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default Home;
