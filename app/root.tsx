import { ClerkApp, ClerkCatchBoundary, useUser } from "@clerk/remix";
import { getAuth, rootAuthLoader } from "@clerk/remix/ssr.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { LoaderFunction, json } from "@remix-run/node";
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
import { findUser } from "./models/user.server";
import { useProfileStore } from "./utils/store";

type LoaderData = {
  userProfile: Awaited<ReturnType<typeof findUser>>;
};

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(args, async ({ request }) => {
    // const { sessionId, userId, getToken } = request.auth;
    const { userId } = await getAuth(args);
    const userProfile = await findUser(userId || "");

    return json<LoaderData>({ userProfile });
  });
};
export const CatchBoundary = ClerkCatchBoundary();

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
];

function App() {
  const { userProfile } = useLoaderData() as LoaderData;
  const { setProfile } = useProfileStore();
  const { user } = useUser();

  React.useEffect(() => {
    if (userProfile) {
      setProfile({
        userName: userProfile?.username,
        fullName: userProfile?.fullName,
        email: userProfile?.email,
        imgUrl: userProfile?.imageUri,
        about: userProfile?.about,
        id: userProfile.id,
        clerkUserId: userProfile.clerkUserId,
      });
    } else {
      setProfile({
        userName: `@${user?.username ?? user?.id.substring(0, 15)}`,
        fullName: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imgUrl: user?.imageUrl,
        about: user?.publicMetadata.about,
        clerkUserId: user?.id,
      });
    }
  }, [user, userProfile]);

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
