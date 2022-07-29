/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { Author } from "../types/index.ts";
import { PublishDate } from "./PublishDate.tsx";

type AuthorAvatarProps = {
  author: Author;
  dir?: "row" | "col";
  publishedAt?: string;
  hasTime?: boolean;
  size?: "sm" | "md" | "lg";
  dateFormat?: "normal" | "distance";
};

export const AuthorAvatar = ({
  author,
  dir = "col",
  publishedAt,
  hasTime,
  size = "md",
  dateFormat = "normal",
}: AuthorAvatarProps) => {
  const directions = {
    row: "flex-row justify-between w-full",
    col: "flex-col",
  };
  const sizes = {
    img: {
      sm: "h-12 w-12",
      md: "h-20 w-20",
      lg: "h-32 w-32",
    },
    font: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-3xl",
    },
  };
  return (
    <div class={tw`flex items-center gap-3`}>
      <img
        src={author.avatar.url}
        class={tw`${sizes.img[size]} rounded-full object-cover`}
        alt=""
      />
      <div class={tw`flex ${directions[dir]} gap-1 flex-1`}>
        <div class={tw`text-gray-700`}>
          <a href={`/author/${author.slug}`} class={tw`${sizes.font[size]}`}>
            {author.firstName} {author.lastName}
          </a>
        </div>
        {publishedAt && (
          <PublishDate publishedAt={publishedAt} dateFormat={dateFormat} />
        )}
        {publishedAt && hasTime && (
          <PublishDate
            publishedAt={publishedAt}
            withHour
            dateFormat={dateFormat}
          />
        )}
      </div>
    </div>
  );
};
