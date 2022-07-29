/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { CoverImage } from "../types/index.ts";

type Props = {
  src: CoverImage;
  className?: string;
};

export const Image = ({ src, className }: Props) => {
  return (
    <picture>
      <source srcset={src.thumbnail} media="(max-width: 768px)" />
      <source srcset={src.medium} media="(max-width: 1024px)" />
      <img
        src={src.url}
        alt=""
        class={tw`object-cover h-full w-full ${className}`}
      />
    </picture>
  );
};
