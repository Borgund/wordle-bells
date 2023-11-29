import { useState, useEffect } from "react";
import { client } from "../pocketbase";

function useCollection<T>({
  collection,
  filter,
}: {
  collection: string;
  filter?: string;
}) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const col = client.collection(collection);
    if (!filter) {
      setIsLoading(true);

      col
        .getFullList()
        .then((res) => {
          setData(res as T);
          setIsLoading(false);
          setError(false);
        })
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    }
    if (filter) {
      setIsLoading(true);
      col
        .getFirstListItem(filter)
        .then((res) => {
          setData(res as T);
          setIsLoading(false);
          setError(false);
        })
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    }
  }, [collection, filter]);

  return { data, isLoading, error };
}

export default useCollection;
