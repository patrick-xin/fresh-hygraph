import { Handlers } from "$fresh/server.ts";
import { client } from "../../utils/client.ts";
import { PAGE_SIZE } from "../../src/constants/index.ts";
import { BLOG_QUERY } from "../../src/queries.ts";

export const handler: Handlers = {
  async POST(req) {
    const { cursor } = await req.json();

    const data = await client.request(BLOG_QUERY, {
      first: PAGE_SIZE,
      after: cursor,
    });

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
