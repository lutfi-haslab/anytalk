import {
  ClerkApp,
  ClerkCatchBoundary,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/remix";
import { getAuth, rootAuthLoader } from "@clerk/remix/ssr.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { LoaderFunction, json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import React from "react";
import stylesheet from "~/tailwind.css";
import { findUser, getClerkUser } from "./models/user.server";
import { useProfileStore } from "./utils/store";

type LoaderData = {
  userData: Awaited<ReturnType<typeof findUser>> | any;
  user: any;
  userProfile: any;
};

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(args, async ({ request }) => {
    // const { sessionId, userId, getToken } = request.auth;
    const { userId } = await getAuth(args);
    const user = await getClerkUser(String(userId));
    const userProfile = await findUser(String(userId));
    if (user?.public_metadata?.profileId) {
      return json<LoaderData>({
        userData: {
          userName: userProfile?.username,
          fullName: userProfile?.fullName,
          email: userProfile?.email,
          imgUrl: userProfile?.imageUri,
          following: userProfile?.followingCount,
          follower: userProfile?.followerCount,
          about: userProfile?.about,
          id: userProfile.id,
          clerkUserId: userProfile.clerkUserId,
        },
        userProfile,
        user,
      });
    } else if (userId) {
      return json<LoaderData>({
        userData: {
          userName: user?.username,
          fullName: user?.first_name + " " + user?.last_name,
          email: user?.email_addresses[0]?.email_address,
          imgUrl: user?.image_url,
          following: 0,
          follower: 0,
          about:
            "Add your description, like 'I want to be The next Elon Musk 😜'",
          id: null,
          clerkUserId: user.id,
        },
        userProfile,
        user,
      });
    } else {
      return json<LoaderData>({
        userData: {
          userName: "",
          fullName: "",
          email: "",
          imgUrl: "",
          following: "",
          follower: "",
          id: "",
          clerkUserId: "",
        },
        userProfile,
        user,
      });
    }
  });
};
export const CatchBoundary = ClerkCatchBoundary();

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
];

function App() {
  const { userData, user, userProfile } = useLoaderData() as LoaderData;
  const { setProfile } = useProfileStore();
  // const { user } = useUser();

  React.useEffect(() => {
    if (user?.public_metadata?.profileId) {
      setProfile({
        userName: userProfile?.username,
        fullName: userProfile?.fullName,
        email: userProfile?.email,
        imgUrl: userProfile?.imageUri,
        following: userProfile?.followingCount,
        follower: userProfile?.followerCount,
        about: userProfile?.about,
        id: userProfile.id,
        clerkUserId: userProfile.clerkUserId,
      });
    } else if (user.id) {
      setProfile({
        userName: user?.username,
        fullName: user?.first_name + " " + user?.last_name,
        email: user?.email_addresses[0]?.email_address,
        imgUrl: user?.image_url,
        following: 0,
        follower: 0,
        about:
          "Add your description, like 'I want to be The next Elon Musk 😜'",
        id: null,
        clerkUserId: user.id,
      });
    } else {
      setProfile({
        userName: "",
        fullName: "",
        email: "",
        imgUrl: "",
        following: "",
        follower: "",
        id: "",
        clerkUserId: "",
      });
    }

    // if (userProfile)
    //   setProfile({
    //     userName: userProfile?.username,
    //     fullName: userProfile?.fullName,
    //     email: userProfile?.email,
    //     imgUrl: userProfile?.imageUri,
    //     about: userProfile?.about,
    //     following: userProfile?.followingCount,
    //     follower: userProfile?.followerCount,
    //     id: userProfile.id,
    //     clerkUserId: userProfile.clerkUserId,
    //   });

    // setProfile({
    //   userName: `@${user?.username ?? user?.id.substring(0, 15)}`,
    //   fullName: user?.first_name + " " + user?.last_name,
    //   email: user?.email_addresses[0].email_address,
    //   imgUrl: user?.image_url,
    //   about: user?.public_metadata.about,
    //   clerkUserId: user?.id,
    // });
  }, [userData, user, userProfile]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App);
