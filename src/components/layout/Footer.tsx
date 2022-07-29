// componets/layout/Footer.tsx

/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "preact";
import { tw } from "@twind";

export const Footer = () => {
  return (
    <footer
      class={tw`py-12 px-6 lg:py-32 lg:px-24 bg-smoky h-[80vh] text-gray-200 mt-24`}
    >
      <div
        class={tw`grid grid-cols-1 lg:grid-cols-3 lg:place-items-center lg:items-start place-content-between gap-20`}
      >
        <div class={tw`space-y-6`}>
          <h4 class={tw`text-2xl`}>NewPaper.</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit quod
            quae distinctio. Sunt sed quisquam reprehenderit aspernatur officiis
            ducimus mollitia!
          </p>
        </div>
        <div>
          <h4 class={tw`text-xl`}>Company</h4>
          <div class={tw`w-full h-0.5 bg-text mt-4`} />
          <div class={tw`flex flex-col gap-2 mt-6`}>
            <a href="">about</a>
            <a href="">blog</a>
            <a href="">about</a>
          </div>
        </div>
        <div>
          <h4 class={tw`text-xl`}>Category</h4>
          <div class={tw`w-full h-0.5 bg-text mt-4`} />
          <div class={tw`flex flex-col gap-2 mt-6`}>
            <a href="">about</a>
            <a href="">blog</a>
            <a href="">about</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
