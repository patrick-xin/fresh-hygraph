// components/GridContainer.tsx

/** @jsx h */
import { ComponentChildren, h } from "preact";
import { tw } from "@twind";

type Props = {
  className?: string;
  children: ComponentChildren;
};

export const GridContainer = ({ children, className }: Props) => {
  return (
    <div
      class={tw` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 ${className}`}
    >
      {children}
    </div>
  );
};
