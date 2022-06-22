import { useState } from "react";
import { fetchUsers } from "../utils/fetch";
import { setParam } from "../utils/url-params";

/**
 * Declare our returned type
 *
 * @typedef {Object} SearchResultObject
 * @property {any} data
 * @property {Error|undefined} error
 * @property {boolean} isLoading
 * @property {(q:string, p:number)=>void} search
 */

const CACHE = {};

/**
 * @return {SearchResultObject}
 */
export function useSearch() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  const search = (query = "", page = 1) => {
    if (!query?.length || query?.length > 256) return;

    const cacheKey = `${query}:${page}`;
    if (!CACHE[cacheKey]) setLoading(true);
    else setData(CACHE[cacheKey]); // stale while revalidate
    setError(undefined);
    setParam("q", query);
    setParam("p", page);

    fetchUsers(query, page)
      .then((r) => {
        setData(r);
        CACHE[cacheKey] = r;
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return {
    data,
    error,
    search,
    isLoading,
  };
}
