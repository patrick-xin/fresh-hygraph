// island/Search.tsx

/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { useState } from "preact/hooks";

const Search = () => {
  const [q, setQ] = useState("");

  return (
    <div class={tw`flex gap-4`}>
      <form
        class={tw`m-4 flex`}
        onSubmit={(e) => {
          e.preventDefault();

          window.location.replace(`/search?q=${q}`);
        }}
      >
        <input
          type="text"
          value={q}
          onInput={(e) => {
            setQ(e.currentTarget.value);
          }}
          class={tw`border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-300 mr-0 text-gray-700 bg-transparent`}
          placeholder="search..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Search;
