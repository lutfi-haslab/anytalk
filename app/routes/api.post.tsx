import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createPostExample } from "~/models/post.server";

export const action = async ({ request }: ActionArgs) => {
  const data = await createPostExample();
  return json({ data });
};
