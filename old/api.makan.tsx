import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader = async ({ request }: LoaderArgs) => {
  // handle "GET" request

  return json({ makan: true }, 200);
};
