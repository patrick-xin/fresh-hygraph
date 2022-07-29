import { useState } from "preact/hooks";
import { Root } from "../types/index.ts";

export const useFetch = ({
  endCursor,
  path,
  slug,
  initialHasNextPage,
}: {
  endCursor: string;
  path: string;
  slug?: string;
  initialHasNextPage: boolean;
}) => {
  const [data, setData] = useState<Root[]>([]);
  const [cursor, setCursor] = useState(endCursor);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const fetchMore = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${path}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cursor, path, slug }),
      });

      const data: Root = await res.json();
      setIsLoading(false);
      setHasNextPage(data.blogsConnection.pageInfo.hasNextPage);
      setCursor(data.blogsConnection.pageInfo.endCursor);
      setData((d) => [...d, data]);
    } catch (_error) {
      setIsLoading(false);
      setError("Error fetching data");
    }
  };
  return { fetchMore, data, hasNextPage, isLoading, error };
};
