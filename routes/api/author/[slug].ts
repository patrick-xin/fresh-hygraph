import { Handlers } from "$fresh/server.ts";

import { BLOG_ON_AUTHOR_QUERY } from "../../../src/queries.ts";
import { client } from "../../../utils/client.ts";

export const handler: Handlers = {
  async POST(req) {
    const { cursor, slug } = await req.json();

    const data = await client(BLOG_ON_AUTHOR_QUERY, {
      first: 3,
      after: cursor,
      slug,
    });

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
