import { ActionFunction, json, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { createUser, updateUserClerk } from "~/models/user.server";

export const action: ActionFunction = async (args) => {
  const { userId } = await getAuth(args);
  const formData = await args.request.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const img = formData.get("imgurl") as string;
  const fullName = formData.get("fullName") as string;
  const about = formData.get("about") as string;

  const users = await createUser({
    clerkUserId: userId || "",
    username,
    fullName,
    email,
    about,
    imageUri: img,
  });

  await updateUserClerk({
    clerkUserId: userId,
    profileId: users.id,
    about: users.about,
  });

  return redirect("/");
};
