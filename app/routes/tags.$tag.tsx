import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useUser,
  useAuth,
} from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import type { V2_MetaFunction } from "@remix-run/node";
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import React from "react";
import {
  LeftProfile,
  SinglePost,
  Topics,
  Trends,
} from "~/components/card.components";
import { InputPost } from "~/components/input.components";
import { ModalProfiles2 } from "~/components/modal.components";
import { createPost, getPosts, getTags } from "~/models/post.server";
import { useLoaderData } from "@remix-run/react";
import { formattedDate } from "~/utils/formater";
import { useParams } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
  tags: Awaited<ReturnType<typeof getTags>>;
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  const posts = await getPosts(userId || "");
  const tags = await getTags();

  return json<LoaderData>({ posts, tags });
};

export const action: ActionFunction = async (args) => {
  const { userId } = await getAuth(args);
  const formData = await args.request.formData();
  const intent = formData.get("intent");
  const content = formData.get("content") as string;
  if (intent === "create") {
    await createPost({
      userId: userId || "",
      content,
    });

    return redirect("/");
  }

  return null;
};

const IndexRoutes = () => {
  const { posts, tags } = useLoaderData() as LoaderData;
  const [openModal, setOpenModal] = React.useState<string | undefined>();
  const { isLoaded, isSignedIn, user } = useUser();
  const { userId } = useAuth();
  const param = useParams()

  React.useEffect(() => {
    console.log(user);
    console.log(tags);
    console.log(param.tag)
    if (!userId) {
      window.location.pathname = "/sign-in";
    }
  }, [user, userId]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-12 bg-light1 h-screen gap-5 px-10 text-black">
        <div className="col-span-3 pt-10">
          <LeftProfile setOpenModal={setOpenModal} user={user} />
        </div>
        <div className="col-span-6 pt-10 overflow-auto h-screen [&::-webkit-scrollbar]:hidden">
          <InputPost user={user} />
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
                <Trends key={i} tag={item.tags} count={item._count.tags} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ModalProfiles2
        openModal={openModal}
        setOpenModal={setOpenModal}
        user={user}
      />
    </>
  );
};

export default IndexRoutes;