import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  createPostExample,
  getAllPostWithComments,
} from "~/models/post.server";

export const action = async ({ request }: ActionArgs) => {
  const data = await createPostExample();
  return json({ data });
};

export const loader = async ({ params }: LoaderArgs) => {
  const posts = await getAllPostWithComments();

  return json({ posts });
};