/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";
import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";

// DB
import { client } from "../utils/client.ts";

// Components
import { Layout } from "../src/components/layout/index.tsx";
import {
  Image,
  ArticleCard,
  GridContainer,
  AuthorAvatar,
} from "../src/components/index.ts";

// Constants && Types
import { HOME_PAGE_QUERY, HOME_TRENDING_QUERY } from "../src/queries.ts";
import type { Blog, Category } from "../src/types/index.ts";

type Props = {
  categories: Category[];
  latest: Blog[];
  trendings: Blog[];
};

export const handler: Handlers = {
  async GET(_req, ctx) {
    const data: { categories: Category[]; blogs: Blog[] } =
      await client.request(HOME_PAGE_QUERY, { first: 4 });
    const ids = data.blogs.map((blog) => blog.id);
    const trendings: { blogs: Blog[] } = await client.request(
      HOME_TRENDING_QUERY,
      { ids }
    );

    return ctx.render({
      categories: data.categories,
      latest: data.blogs,
      trendings: trendings.blogs,
    });
  },
};

export default function Home({ data }: PageProps<Props>) {
  const { latest, trendings, categories } = data;
  const container = apply`max-w-7xl lg:mx-auto mx-6`;

  return (
    <Layout
      categories={categories}
      {...{
        title: "Homepage - Your news daily",
        description: "Your news daily",
      }}
    >
      {/* Hero */}
      <section class={tw`h-[65vh] mt-20 lg:mt-0 lg:h-screen ${container}`}>
        <div class={tw`h-3/4 lg:h-full absolute inset-0 -z-10`}>
          <Image src={latest[0].coverImage} className="filter saturate-50" />
        </div>
        <div
          class={tw`max-w-3xl rounded h-3/4 backdrop-sepia p-10 bg-white bg-opacity-30`}
        >
          <div class={tw`space-y-6`}>
            <AuthorAvatar size="sm" author={latest[0].author} />
            <h1 class={tw`text-3xl lg:text-6xl font-bold`}>
              {latest[0].title}
            </h1>
            <p class={tw`lg:py-12 text-gray-700 max-w-xl`}>
              {latest[0].excerpt}
            </p>
          </div>
        </div>
      </section>
      {/* Latest */}
      <section class={tw`lg:my-12 ${container} `}>
        <h2 class={tw`text-4xl font-bold`}>Latest</h2>
        <div class={tw`my-6 lg:my-12`}>
          <GridContainer>
            {latest.slice(1).map((blog) => (
              <ArticleCard {...blog} dateFormat="distance" />
            ))}
          </GridContainer>
        </div>
      </section>
      {/* Trending */}
      <section class={tw`my-8 lg:my-12 ${container}`}>
        <h2 class={tw`text-4xl font-bold`}>What's trending</h2>
        <div class={tw`grid grid-cols-1 lg:grid-cols-2 gap-8 my-12`}>
          <div class={tw`lg:sticky lg:top-0 lg:h-screen`}>
            <ArticleCard {...trendings[0]} imgSize="auto" />
          </div>
          <div class={tw`grid grid-cols-1 md:grid-cols-2 gap-6`}>
            {trendings.map((blog) => (
              <ArticleCard {...blog} />
            ))}
          </div>
        </div>
      </section>
      {/* Explore */}
      <section class={tw`my-8 lg:my-12 ${container}`}>
        <h2 class={tw`text-4xl font-bold`}>Browser Topic</h2>
        <div
          className={tw`mx-auto inline-flex w-full gap-6 my-12 overflow-x-auto`}
        >
          {categories.map((category) => (
            <div key={category.slug} class={tw`flex-shrink-0`}>
              <a href={`/category/${category.slug}`}>
                <div className={tw`p-4 space-y-4 w-full`}>
                  <Image
                    src={category.image}
                    className="w-60 h-48 object-cover"
                  />

                  <h3 class={tw`text-2xl text-center`}>{category.name}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
