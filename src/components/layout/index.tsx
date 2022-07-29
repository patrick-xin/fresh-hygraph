// componets/layout/index.tsx

/** @jsx h */
/** @jsxFrag Fragment */
import { ComponentChildren, Fragment, h } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";

// Components
import MobileHeader from "../../../islands/MobileHeader.tsx";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";

// Constants && Types
import type { Category } from "../../types/index.ts";

export type Props = {
  children: ComponentChildren;
  title?: string;
  name?: string;
  description?: string;
  categories: Category[];
};

export const Layout = ({ children, categories, ...customMeta }: Props) => {
  return (
    <>
      <div className={tw`flex flex-col min-h-screen`}>
        <Seo {...customMeta} />
        <div>
          <Header categories={categories} />
          <MobileHeader />
        </div>

        <main className={tw`flex-1 h-full mt-20`}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

const Seo = ({ ...customMeta }) => {
  const meta = {
    title: "New title",
    description: "description",
    type: "website",
    ...customMeta,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
