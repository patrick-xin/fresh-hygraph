/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useState } from "preact/hooks";

import { MobileNav } from "../src/components/index.ts";

export default function MobileHeader() {
  const [isOpen, setOpen] = useState(false);

  const header = tw`mx-auto max-w-screen-lg bg-white shadow h-20 flex justify-between items-center`;
  const sidebarButton = tw`px-4 py-4 lg:hidden flex items-center`;
  return (
    <div class={tw`relative lg:hidden fixed w-full`}>
      <header class={header}>
        <div class={tw`p-4 flex`}>
          <a href="/">logo</a>
        </div>
        <button
          onClick={() => {
            if (!isOpen) {
              setOpen(true);
            } else {
              setOpen(false);
            }
          }}
          class={sidebarButton}
        >
          <svg
            class={tw`h-6 w-6`}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            ></path>
          </svg>
        </button>
      </header>
      {isOpen && <MobileNav />}
    </div>
  );
}
