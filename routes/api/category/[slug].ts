import { Handlers } from "$fresh/server.ts";
import { PAGE_SIZE } from "../../../src/constants/index.ts";
import { BLOG_ON_CATEGORY_QUERY } from "../../../src/queries.ts";
import { client } from "../../../utils/client.ts";

export const handler: Handlers = {
  async POST(req) {
    const { cursor, slug } = await req.json();

    const data = await client.request(BLOG_ON_CATEGORY_QUERY, {
      first: PAGE_SIZE,
      after: cursor,
      slug,
    });

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
