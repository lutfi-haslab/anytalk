import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { getTags } from "~/models/post.server";

export const loader = async ({ request }: LoaderArgs) => {
  const tags = await getTags();

  return json({ tags });
};
