import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface FetchState<T> {
  data: T | null | T[];
  loading: boolean;
  error: string | null;
  setData: Dispatch<SetStateAction<T | null>>;
}

function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError("Error while fetching data");
        setLoading(false);
      }
    };

    {
      !url.includes("undefined") && !url.includes("?q=&")
        ? fetchData()
        : "null";
    }
  }, [url]);

  return { data, loading, error, setData };
}

export default useFetch;
