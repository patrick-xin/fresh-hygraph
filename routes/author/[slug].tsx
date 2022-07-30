// routes/author/[slug].tsx

/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

// DB
import { client } from "../../utils/client.ts";

// Components
import { Layout } from "../../src/components/layout/index.tsx";
import {
  GridContainer,
  ArticleCard,
  ListCard,
} from "../../src/components/index.ts";
import FetchMore from "../../islands/FetchMore.tsx";

// Constants && Types
import type {
  Author,
  BlogsConnection,
  Category,
  Edge,
} from "../../src/types/index.ts";
import { BLOG_ON_AUTHOR_QUERY } from "../../src/queries.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    const data: {
      categories: Category[];
      blogsConnection: BlogsConnection;
      author: Author;
    } = await client(BLOG_ON_AUTHOR_QUERY, {
      first: 5,
      slug,
    });
    const mostRecentArticles = data.blogsConnection.edges.slice(0, 3);
    const endCursor = data.blogsConnection.pageInfo.endCursor;
    const initialHasNextPage = data.blogsConnection.pageInfo.hasNextPage;
    return ctx.render({
      categories: data.categories,
      mostRecentArticles,
      articles: data.blogsConnection.edges.slice(3),
      slug,
      endCursor,
      initialHasNextPage,
      author: data.author,
    });
  },
};

export default function ArticlePage({
  data,
}: PageProps<{
  mostRecentArticles: Edge[];
  articles: Edge[];
  categories: Category[];
  slug: string;
  endCursor: string;
  initialHasNextPage: boolean;
  author: Author;
}>) {
  const {
    articles,
    categories,
    endCursor,
    slug,
    initialHasNextPage,
    author,
    mostRecentArticles,
  } = data;
  const container = apply`max-w-6xl lg:mx-auto lg:px-12 mx-6 md:mx-10`;

  return (
    <Layout categories={categories}>
      <div class={tw`${container} space-y-6`}>
        <section class={tw`p-6`}>
          <div class={tw`flex-col items-center gap-6 lg:gap-12`}>
            <div class={tw`flex justify-center my-4`}>
              <img
                src={author.avatar.url}
                class={tw`h-40 w-40 rounded-full object-cover`}
                alt=""
              />
            </div>
            <div class={tw`space-y-4 max-w-lg mx-auto`}>
              <div class={tw`lg:text-5xl font-semibold text-3xl text-center`}>
                {author.firstName} {author.lastName}
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad amet
                voluptate sed sequi nemo rerum incidunt rem cumque tenetur.
                Earum.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 class={tw`font-semibold text-2xl lg:text-3xl my-6`}>
            Recent articles
          </h3>
          <GridContainer>
            {mostRecentArticles.map(({ node }) => (
              <ArticleCard {...node} key={node.id} hasAuthor={false} />
            ))}
          </GridContainer>
        </section>

        <section class={tw`divide-y divide-gray-200`}>
          {articles.map(({ node }) => (
            <ListCard {...node} />
          ))}
          {initialHasNextPage && (
            <FetchMore
              endCursor={endCursor}
              path={`/api/author/${slug}`}
              slug={slug}
              type="author"
              initialHasNextPage={initialHasNextPage}
            />
          )}
        </section>
      </div>
    </Layout>
  );
}
