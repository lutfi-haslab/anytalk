import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { findUser } from "~/models/user.server";

export const loader = async ({ params }: LoaderArgs) => {
  const user = await findUser(String(params.id));

  return json({ user });
};
