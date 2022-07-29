/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { format, parseISO, formatDistance } from "date-fns";

type Props = {
  publishedAt: string;
  withHour?: boolean;
  dateFormat?: "normal" | "distance";
};

export const PublishDate = ({
  publishedAt,
  withHour = false,
  dateFormat,
}: Props) => {
  return (
    <time class={tw`text-sm text-gray-600`}>
      {dateFormat === "distance" ? (
        <span>
          published in{" "}
          {formatDistance(parseISO(publishedAt), new Date(), {
            addSuffix: true,
          })}
        </span>
      ) : withHour ? (
        format(parseISO(publishedAt), "dd, MMMM yyyy h:mm aaa")
      ) : (
        format(parseISO(publishedAt), "dd, MMMM yyyy")
      )}
    </time>
  );
};
