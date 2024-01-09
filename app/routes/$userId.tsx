import { useUser } from "@clerk/remix";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
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
import { useRevalidateOnFocus } from "~/hooks/useRevalidate";
import { createPost, getAllPostWithCommentsWithId, getTags } from "~/models/post.server";
import { formattedDate } from "~/utils/formater";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getAllPostWithCommentsWithId>>;
  tags: Awaited<ReturnType<typeof getTags>>;
};
export const loader: LoaderFunction = async (args) => {
  const userId = args.params.userId;
  const posts = await getAllPostWithCommentsWithId(String(userId));
  const tags = await getTags();
  if (!userId) {
    return redirect("/sign-in");
  }

  return json<LoaderData>({ posts, tags });
};

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

    return redirect(args.request.url);
  }

  return null;
};

const IndexRoutes = () => {
  useRevalidateOnFocus({
    enabled: true,
  });
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
                id={String(item?.clerkUserId)}
                content={item.content}
                timestamp={formattedDate(item.createdAt)}
                comments={item.comments}
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
