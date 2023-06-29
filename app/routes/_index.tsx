import { useUser } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { LeftProfile } from "~/components/card.components";
import { ModalProfiles2 } from "~/components/modal.components";
import { createUser, findUser } from "~/models/user.server";

type LoaderData = {
  userProfile: Awaited<ReturnType<typeof findUser>>;
};
export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  const userProfile = await findUser(userId || "");

  return json<LoaderData>({ userProfile });
};

export const action: ActionFunction = async (args) => {
  const { userId } = await getAuth(args);
  const formData = await args.request.formData();
  const intent = formData.get("intent");
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const img = formData.get("imgurl") as string;
  const fullName = formData.get("fullName") as string;
  const about = formData.get("about") as string;

  if (intent === "create") {
    await createUser({
      clerkUserId: userId || "",
      username,
      fullName,
      email,
      about,
      imageUri: img,
    });

    return redirect("/");
  }

  return null;
};

const IndexRoutes = () => {
  const { userProfile } = useLoaderData() as LoaderData;
  const [openModal, setOpenModal] = React.useState<string | undefined>();

  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <div>
      <div className="col-span-3 pt-10">
        <LeftProfile setOpenModal={setOpenModal} />
      </div>
      <ModalProfiles2 openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default IndexRoutes;
