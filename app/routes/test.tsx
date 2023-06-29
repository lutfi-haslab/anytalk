import React from "react";
import { useUser, useClerk } from "@clerk/remix";
import type { ActionArgs, ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createUser } from "~/models/user.server";
import { getAuth } from "@clerk/remix/ssr.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async (args) => {
  const { userId, user } = await getAuth(args);
  console.log(user)

  // const userData = createUser({
  //   username: user?.username,
  //   email: user?.emailAddresses,
  //   userId,
  //   imageUri: user?.imageUrl,
  // });

  return json({users: user});
};

const Test = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const {users} = useLoaderData()

  React.useEffect(() => {
    console.log(user);
    console.log(users)
  }, [user, users]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <div>
      {JSON.stringify(user, null, 2)}
      <button className="text-blue-500 underline" onClick={() => signOut()}>
        Log Out
      </button>
    </div>
  );
};

export default Test;
