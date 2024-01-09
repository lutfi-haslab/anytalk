import { ActionFunction, json, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { createPost } from "~/models/post.server";

export const action: ActionFunction = async (args) => {
  const formData = await args.request.formData();
  const intent = formData.get("intent");
  const content = formData.get("content") as string;
  const userId = formData.get("userId") as string;
  const clerkUserId = formData.get("clerkUserId") as string;
  if (intent === "create") {
    await createPost({
      userId,
      clerkUserId,
      content,
    });

    return redirect("/");
  }

  return null;
};
