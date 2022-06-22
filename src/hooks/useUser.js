import { useEffect, useState, useRef } from "react";
import { fetchUser } from "../utils/fetch";

/**
 *
 * @param {string} username
 * @returns
 */
export function useUser(username) {
  const mounted = useRef(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mounted.current = true; // prevent render when component unmounts
    fetchUser(username)
      .then((r) => mounted.current && setData(r))
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
