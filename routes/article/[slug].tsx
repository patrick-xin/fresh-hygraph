// routes/article/[slug].tsx

/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { format, parseISO } from "date-fns";
import { apply, tw } from "twind";
import { css } from "twind/css";

// DB
import { client } from "../../utils/client.ts";

// Components
import { Layout } from "../../src/components/layout/index.tsx";
import { AuthorAvatar } from "../../src/components/AuthorAvatar.tsx";

// Constants && Types
import { ARTICLE_QUERY, UPDATE_BLOG_VIEWS } from "../../src/queries.ts";
import type { Blog, Category } from "../../src/types/index.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    const article: { blog: Blog; categories: Category[] } =
      await client.request(ARTICLE_QUERY, {
        slug,
      });

    const oldViews = article.blog.views;
    await client.request(UPDATE_BLOG_VIEWS, { slug, views: oldViews + 1 });
    return ctx.render({
      article: article.blog,
      categories: article.categories,
    });
  },
};

export default function ArticlePage({
  data,
}: PageProps<{ article: Blog; categories: Category[] }>) {
  const {
    title,
    coverImage,
    author,
    createdAt,
    views,
    content: { html },
  } = data.article;

  const container = apply`max-w-3xl lg:mx-auto mx-6`;
  const prose = css(apply`${container}`, {
    p: apply`my-5 text-gray-700 ${container}`,
    blockquote: apply`text-3xl block font-bold pl-4 border-l border-l-4 border-text italic lg:py-8 max-w-full`,
    ul: apply`list-disc list-inside font-semibold space-y-2`,
  });

  return (
    <Layout categories={data.categories}>
      {/* Head */}
      <div class={tw`${container} space-y-4`}>
        <time>{format(parseISO(createdAt), "dd, MMMM yyyy")}</time>
        <h1 class={tw`text-5xl lg:text-6xl font-bold`}>{title}</h1>
        <div class={tw`flex justify-between items-center`}>
          <AuthorAvatar author={author} />

          {views}
        </div>
      </div>
      {/* Cover */}
      <div class={tw`h-[50vh] my-12`}>
        <img
          src={coverImage.url}
          class={tw`w-full lg:w-2/3 h-full object-cover`}
          alt={`${title}-cover-image`}
        />
      </div>
      {/* Body */}
      <div class={tw`${prose}`}>
        <p>
          We told our people – in case they need any additional financial
          support, just ping us and we’d send cash (on top of salary) to help
          out. ‍{" "}
        </p>
        <ul>
          <li>list1</li>
          <li>list1</li>
          <li>list1</li>
        </ul>
        <p>
          We quickly built up a team of psychologists to help with PTSD and
          covered 100% of these expenses. ‍ We introduced unlimited covered
          days-off, so that people would be able to take care of themselves &
          their families as much as they needed. We introduced a “Send Gift”
          button as a new feature in our product, which allows customers to
          directly send $$$ donations to designers.
        </p>
        <blockquote>This is a blockquote </blockquote>
        <p>
          So far, almost $30k has been donated to our designers (a huge thanks
          to our generous customers).
        </p>
        <p>
          It took us the whole of March to relocate everyone. The biggest
          problem was with those who were trapped in Russian-occupied cities. We
          were especially worried about our women. 64% of Awesomics (our people)
          are females. Some of them were forced to hide underground for weeks
          from Russian soldiers, because of the high risk of rape. Despite these
          horrific circumstances, they continued working on their tasks,
          designing new visuals, powering on through the chaos. I asked them to
          rest and take care of themselves & their relatives, but they told me
          that work kept them mentally stable. ‍ Thankfully, we are relieved to
          say all 168 of our folks are in safe locations right now. ‍
        </p>
        <p>
          But our help couldn’t just stop at ensuring their safety. We had to do
          more. We were determined to provide as much assistance as we could for
          our people. We rolled out a number of emergency measures to help:
        </p>
        {/* <div class="markdown-body" dangerouslySetInnerHTML={{ __html: html }} /> */}
      </div>
      {/* About */}
      <section class={tw`p-6 shadow-md bg-text lg:w-1/2 mx-auto my-12`}>
        <h3 class={tw`text-2xl`}>About author</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
          dignissimos tempore necessitatibus laudantium illum nesciunt
          repudiandae corporis nobis possimus aliquid.
        </p>
      </section>
      {/* Recent */}
      <section class={tw`${container}`}>
        <h4 class={tw`text-xl inline-flex gap-2`}>
          <span>Recent Articles from</span>

          <span className={tw`font-bold text-xl`}>{author.firstName}</span>
          <span className={tw`font-bold text-xl`}>{author.lastName}</span>
        </h4>
        <div class={tw`divide-y divide-text`}>
          {author.recentPosts.map((post) => (
            <div key={post.id} class={tw`py-6 space-y-4`}>
              <div class={tw`py-2 space-y-4`}>
                <time>{format(parseISO(createdAt), "dd, MMMM yyyy")}</time>
                <h2 className={tw`text-2xl lg:text-3xl font-bold`}>
                  {post.title}
                </h2>
              </div>

              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                  quis deserunt assumenda labore, cumque inventore facere
                  repudiandae earum ullam possimus?
                </p>
              </div>
              <a href="" class={tw`link my-4 inline-block`}>
                Read More...
              </a>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
