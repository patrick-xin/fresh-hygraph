/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";

export const MobileNav = () => {
  return (
    <div class={tw`bg-green-300 w-screen h-96 absolute inset-0 top-20`}>
      MobileNav
      <a href="/">home</a>
    </div>
  );
};
