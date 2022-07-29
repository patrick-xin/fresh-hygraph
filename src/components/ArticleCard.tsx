/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { Blog } from "../types/index.ts";
import { Image } from "./Image.tsx";
import { AuthorAvatar } from "./AuthorAvatar.tsx";

type FeaturedArticleProps = Pick<
  Blog,
  "title" | "author" | "coverImage" | "excerpt" | "slug" | "createdAt"
>;

type Props = {
  hasAuthor?: boolean;
  imgSize?: "auto";
  dateFormat?: "normal" | "distance";
} & FeaturedArticleProps;

export const ArticleCard = ({
  title,
  coverImage,
  author,
  excerpt,
  slug,
  createdAt,
  hasAuthor = true,
  imgSize,
  dateFormat,
}: Props) => {
  return (
    <div class={tw`rounded-t-lg rounded-b-lg border border-gray-300 shadow-sm`}>
      <div
        class={tw`w-full  ${imgSize === "auto" ? "h-auto" : "h-72 lg:h-64"}`}
      >
        <Image src={coverImage} />
      </div>
      <div class={tw`space-y-4 p-4`}>
        <h2 class={tw`font-semibold lg:min-h-[4rem] text-2xl`}>
          <a class={tw`link-title`} href={`/article/${slug}`}>
            {title}
          </a>
        </h2>
        {hasAuthor && (
          <AuthorAvatar
            author={author}
            publishedAt={createdAt}
            size="sm"
            dateFormat={dateFormat}
          />
        )}

        <p class={tw`text-base lg:text-lg text-gray-700 my-2`}>
          {excerpt.slice(0, 100)}
        </p>

        <div>
          <a href={`/article/${slug}`} class={tw`link`}>
            Read More...
          </a>
        </div>
      </div>
    </div>
  );
};
