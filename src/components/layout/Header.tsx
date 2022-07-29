// componets/layout/Header.tsx

/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import Search from "../../../islands/Search.tsx";
import { Category } from "../../types/index.ts";

export const Header = ({ categories }: { categories: Category[] }) => {
  return (
    <header class={tw`hidden h-0 lg:block lg:h-24 flex items-center`}>
      <div
        class={tw`max-w-7xl flex-1 text-xl hidden lg:flex justify-between items-center mx-auto`}
      >
        <div class={tw`text-3xl`}>
          <a href="/">NEwsPaper</a>
        </div>

        <div class={tw`flex gap-12`}>
          {categories.map((category) => (
            <div key={category.id}>
              <a href={`/category/${category.slug}`}>{category.name}</a>
            </div>
          ))}
        </div>

        <Search />
      </div>
    </header>
  );
};
