/** @jsx h */
import { h, FunctionComponent } from "preact";
import { apply, tw } from "@twind";

// Hooks
import { useFetch } from "../src/hooks/index.ts";

// Components
import { ArticleCard, ListCard } from "../src/components/index.ts";

type Props = {
  endCursor: string;
  path: string;
  slug?: string;
  type: "author" | "category";
  initialHasNextPage: boolean;
};

const FetchMore: FunctionComponent<Props> = ({
  endCursor,
  path,
  slug,
  type,
  initialHasNextPage,
}) => {
  const { hasNextPage, fetchMore, data, isLoading, error } = useFetch({
    endCursor,
    path,
    slug,
    initialHasNextPage,
  });

  const container = apply`max-w-6xl lg:mx-auto mx-6`;
  const render = () => {
    if (type === "category")
      return (
        <div class={tw`${container}`}>
          {data.map((d, index) => (
            <div
              key={index}
              class={tw`grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
            >
              {d.blogsConnection.edges.map(({ node }) => (
                <ArticleCard key={node.id} {...node} hasAuthor />
              ))}
            </div>
          ))}
        </div>
      );
    if (type === "author")
      return (
        <div>
          {data.map((d, index) => (
            <div key={index} class={tw`divide-y divide-gray-200`}>
              {d.blogsConnection.edges.map(({ node }) => (
                <ListCard key={node.id} {...node} />
              ))}
            </div>
          ))}
        </div>
      );
  };
  return (
    <div className={tw`w-full mx-auto my-4`}>
      {render()}
      <div class={tw`flex justify-center w-full`}>
        {hasNextPage && (
          <button
            disabled={!hasNextPage}
            class={tw`btn-black my-6 lg:my-8 disabled:cursor-not-allowed`}
            onClick={fetchMore}
          >
            {isLoading ? "loading..." : "Load more"}
          </button>
        )}

        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default FetchMore;
