/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { Blog } from "../types/index.ts";
import Image from "./Image.tsx";
import { AuthorAvatar } from "./AuthorAvatar.tsx";
import { PublishDate } from "./PublishDate.tsx";

type Props = Pick<
  Blog,
  "title" | "author" | "coverImage" | "excerpt" | "slug" | "createdAt"
>;

export const ListCard = ({
  title,
  coverImage,
  author,
  excerpt,
  slug,
  createdAt,
}: Props) => {
  return (
    <div class={tw`py-6 space-y-4`}>
      <h2 class={tw`font-semibold text-2xl`}>{title}</h2>
      <p class={tw`text-gray-700 text-sm md:text-base text-gray-500 my-2`}>
        {excerpt}
      </p>
      <PublishDate publishedAt={createdAt} />
    </div>
  );
};
