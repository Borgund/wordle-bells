import { useEffect, useState } from "react";
import { client } from "../pocketbase";

export function useSubscription<Record>(collection: string) {
  const [data, setData] = useState<Record>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const col = client.collection(collection);
    async function subscribe() {
      const resultList = await col
        .subscribe("*", ({ record }: { record: Record }) => {
          setLoading(false);
          setData(record);
        })
        .catch(setError)
        .finally(() => setLoading(false));
      return resultList;
    }
    subscribe();

    async function unsubscribe() {
      return await col.unsubscribe("*");
    }

    return () => {
      unsubscribe();
    };
  }, [collection]);

  return { data, error, loading };
}
