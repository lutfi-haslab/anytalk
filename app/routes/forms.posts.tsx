import { ActionFunction, json, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { createPost } from "~/models/post.server";

export const action: ActionFunction = async (args) => {
  const formData = await args.request.formData();
  const intent = formData.get("intent");
  const content = formData.get("content") as string;
  const userId = formData.get("userId") as string;
  const authorId = formData.get("authorId") as string;
  if (intent === "create") {
    await createPost({
      userId,
      authorId,
      content,
    });

    return redirect("/");
  }

  return null;
};
