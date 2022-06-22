import { useEffect, useState, useRef } from "react";
import { fetchUser } from "../utils/fetch";

const CACHE = {};

/**
 *
 * @param {string} username
 * @returns
 */
export function useUser(username) {
  const mounted = useRef(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!CACHE[username]) setLoading(true);
    else setData(CACHE[username]); // stale while revalidate

    mounted.current = true; // prevent render when component unmounts
    fetchUser(username)
      .then((r) => {
        if (!mounted.current) return;
        CACHE[username] = r;
        setData(r);
      })
      .catch((err) => mounted.current && setError(err))
      .finally(() => mounted.current && setLoading(false));

    return () => (mounted.current = false);
  }, [username]);

  return {
    data,
    error,
    isLoading,
  };
}
