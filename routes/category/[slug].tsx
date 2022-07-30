// routes/category/[slug].tsx

/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

// DB
import { client } from "../../utils/client.ts";

// Components
import { Layout } from "../../src/components/layout/index.tsx";
import {
  ArticleCard,
  Image,
  AuthorAvatar,
} from "../../src/components/index.ts";
import FetchMore from "../../islands/FetchMore.tsx";

// Constants && Types
import { PAGE_SIZE } from "../../src/constants/index.ts";
import type { BlogsConnection, Category, Edge } from "../../src/types/index.ts";
import { BLOG_ON_CATEGORY_QUERY } from "../../src/queries.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    const data: { categories: Category[]; blogsConnection: BlogsConnection } =
      await client(BLOG_ON_CATEGORY_QUERY, {
        first: PAGE_SIZE,
        slug,
      });
    const newest = data.blogsConnection.edges[0];
    const endCursor = data.blogsConnection.pageInfo.endCursor;
    const initialHasNextPage = data.blogsConnection.pageInfo.hasNextPage;
    return ctx.render({
      categories: data.categories,
      newest,
      articles: data.blogsConnection.edges.slice(1),
      slug,
      endCursor,
      initialHasNextPage,
    });
  },
};

export default function ArticlePage({
  data,
}: PageProps<{
  articles: Edge[];
  categories: Category[];
  slug: string;
  newest: Edge;
  endCursor: string;
  initialHasNextPage: boolean;
}>) {
  const { articles, categories, slug, newest, endCursor, initialHasNextPage } =
    data;
  const container = apply`max-w-6xl lg:mx-auto mx-6`;

  return (
    <Layout categories={categories}>
      <h1 class={tw`text-6xl font-bold text-center my-12 uppercase`}>{slug}</h1>
      <section class={tw`max-w-6xl mx-auto relative mb-40`}>
        <div className={tw`h-[50vh] z-10`}>
          <Image src={newest.node.coverImage} />
        </div>
        <div
          class={tw`absolute -bottom-16 p-8 z-20 right-0 left-0 mx-auto bg-white bg-opacity-90 shadow w-5/6 flex justify-center`}
        >
          <div class={tw`space-y-6`}>
            <h2 class={tw`text-4xl font-bold`}>
              <a
                class={tw`hover:underline`}
                href={`/article/${newest.node.slug}`}
              >
                {newest.node.title}
              </a>
            </h2>
            <p>{newest.node.excerpt}</p>
            <AuthorAvatar
              author={newest.node.author}
              publishedAt={newest.node.createdAt}
            />
          </div>
        </div>
      </section>
      <div
        class={tw`${container} grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12`}
      >
        {articles.map(({ node }) => (
          <ArticleCard {...node} />
        ))}
      </div>
      <FetchMore
        endCursor={endCursor}
        path={`/api/category/${slug}`}
        slug={slug}
        type="category"
        initialHasNextPage={initialHasNextPage}
      />
    </Layout>
  );
}
