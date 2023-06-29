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
import {
  LeftProfile,
  SinglePost,
  Topics,
  Trends,
} from "~/components/card.components";
import { InputPost } from "~/components/input.components";
import { ModalProfiles2 } from "~/components/modal.components";
import { getPosts, getTags } from "~/models/post.server";
import { createUser } from "~/models/user.server";
import { formattedDate } from "~/utils/formater";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
  tags: Awaited<ReturnType<typeof getTags>>;
};
export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  const posts = await getPosts(userId || "");
  const tags = await getTags();
  if (!userId) {
    return redirect("/sign-in");
  }

  return json<LoaderData>({ posts, tags });
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
  const { posts, tags } = useLoaderData() as LoaderData;
  const [openModal, setOpenModal] = React.useState<string | undefined>();

  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <>
      <div className="grid grid-cols-12 bg-light1 h-screen gap-5 px-10 text-black">
        <div className="col-span-3 pt-10">
          <LeftProfile setOpenModal={setOpenModal} />
        </div>
        <div className="col-span-6 pt-10 overflow-auto h-screen [&::-webkit-scrollbar]:hidden">
          <InputPost />
          {/* POST */}
          <div className="mt-5 grid grid-cols-1 gap-5">
            {posts.map((item) => (
              <SinglePost
                key={item.id}
                user={user}
                content={item.content}
                timestamp={formattedDate(item.createdAt)}
              />
            ))}
          </div>
        </div>
        <div className="col-span-3 pt-10">
          {/* Topics */}
          <div className="bg-white p-5 rounded-md">
            <p className="text-xl font-bold">Topics</p>
            <Topics />
          </div>
          {/* Trends */}
          <div className="bg-white p-5 rounded-md mt-5">
            <p className="text-xl font-bold">Trends for you</p>
            {/* Trends Box */}
            <div className="flex flex-col space-y-3">
              {tags.map((item, i) => (
                <Trends key={i} tag={item?.name} count={item?._count?.Post} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ModalProfiles2 openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default IndexRoutes;
