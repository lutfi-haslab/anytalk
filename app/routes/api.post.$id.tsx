import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  createPostExample,
  getAllPostWithComments,
  getAllPostWithCommentsWithId,
} from "~/models/post.server";

export const action = async ({ request }: ActionArgs) => {
  const data = await createPostExample();
  return json({ data });
};

export const loader = async ({ params }: LoaderArgs) => {
  const id = params.id;
  const posts = await getAllPostWithCommentsWithId(String(id));

  return json({ posts });
};
