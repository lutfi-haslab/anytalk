import { useClerk } from "@clerk/remix";
import React from "react";
import { useProfileStore } from "~/utils/store";
import { Button } from "./button.components";
import clsx from "clsx";
import { User } from "@prisma/client";
import { formattedDate } from "~/utils/formater";
import { Link } from "@remix-run/react";
import { TwitterTweetEmbed } from "react-twitter-embed";

export const LeftProfile = ({ setOpenModal }: any) => {
  const { profile } = useProfileStore();

  const { signOut } = useClerk();
  return (
    <div className="bg-white rounded-md">
      <div className="bg-[url('/background-profile.png')] h-32 bg-cover bg-center flex justify-center items-center rounded-t-md">
        <img
          src={profile.imgUrl ?? "/profile.png"}
          className="mt-32 w-24 rounded-full"
        />
      </div>
      {/* Content */}
      <div className="grid grid-cols-3 text-center w-full mt-5">
        <div className="col-span-1">
          <p className="font-semibold">{profile.following}</p>
          <p>Following</p>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <p className="font-semibold">{profile.follower}</p>
          <p>Follower</p>
        </div>
      </div>
      <div className="p-5 flex flex-col justify-center text-center space-y-4">
        {/* Identity */}
        <div>
          <p className="font-semibold">{profile.fullName}</p>
          <p>{profile.userName}</p>
        </div>
        {/* Description */}
        <p>{profile.about}</p>
        <Button
          onClick={() => setOpenModal("dismissible")}
          variant="primary"
          className="px-3 py-2 w-full rounded-md text-xl text-white"
        >
          My Profile
        </Button>
        <Link to={String(profile.id)}>
          <Button
            variant="primary"
            className="px-3 py-2 w-full rounded-md text-xl text-white"
          >
            My Dashboard
          </Button>
        </Link>

        <button className="text-blue-500 underline" onClick={() => signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export const SinglePost = ({
  id,
  content,
  timestamp,
  comments,
}: {
  id: string;
  content: string;
  timestamp: string;
  comments: any[];
}) => {
  const [user, setUser] = React.useState<User>();

  const getUser = async () => {
    const res = await fetch(`/api/user/${id}`);
    const data = await res.json();
    console.log(data.user);
    setUser(data.user);
  };

  React.useEffect(() => {
    console.log(comments);
    getUser();
    console.log(user);
  }, []);

  const renderComments = (comments: any[]) => {
    return comments.map((comment: any, index: number) => (
      <React.Fragment key={index}>
        <PostComments
          id={comment.clerkUserId}
          content={comment.content}
          timestamp={formattedDate(comment.createdAt)}
        />
        {comment.comments && renderComments(comment.comments)}
      </React.Fragment>
    ));
  };

  return (
    <div className="bg-white rounded-md p-5">
      <div className="grid grid-cols-10 gap-5 ">
        <div className="col-span-1">
          <img
            src={user?.imageUri ?? "/profile.png"}
            className="w-20 rounded-full"
          />
        </div>
        {/* Content */}
        <div className="flex flex-col space-y-4 col-span-9">
          <div className="flex flex-col">
            <p className="font-semibold text-base">{user?.fullName}</p>
            <p className="text-sm font-normal">{user?.username}</p>
          </div>

          <p>{content}</p>
          <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
      </div>
      <TwitterTweetEmbed tweetId={"1675673679697420289"} />
      {/* Comments */}
      {renderComments(comments)}
    </div>
  );
};

// export const SinglePost = ({
//   id,
//   content,
//   timestamp,
//   comments,
// }: {
//   id: string;
//   content: string;
//   timestamp: string;
//   comments: any[];
// }) => {
//   const [user, setUser] = React.useState<User>();

//   const getUser = async () => {
//     const res = await fetch(`/api/user/${id}`);
//     const data = await res.json();
//     console.log(data.user);
//     setUser(data.user);
//   };

//   React.useEffect(() => {
//     console.log(comments)
//     getUser();
//     console.log(user);
//   }, []);

//   return (
//     <div className="bg-white rounded-md p-5">
//       <div className="grid grid-cols-10 gap-5 ">
//         <div className="col-span-1">
//           <img
//             src={user?.imageUri ?? "/profile.png"}
//             className="w-20 rounded-full"
//           />
//         </div>
//         {/* Content */}
//         <div className="flex flex-col space-y-4 col-span-9">
//           <div className="flex flex-col">
//             <p className="font-semibold text-base">{user?.fullName}</p>
//             <p className="text-sm font-normal">{user?.username}</p>
//           </div>

//           <p>{content}</p>
//           <p className="text-sm text-gray-500">{timestamp}</p>
//         </div>
//       </div>
//       {/* Comments */}
//       {comments &&
//         comments.map((item: any, i: any) => (
//           <React.Fragment key={i}>
//             <PostComments
//               id={item.clerkUserId}
//               content={item.content}
//               timestamp={formattedDate(item.createdAt)}
//             />

//             {/* Child comments */}
//             {item.comments &&
//               item.comments.map((childItem: any, j: any) => (
//                 <PostComments
//                   key={j}
//                   id={childItem.clerkUserId}
//                   content={childItem.content}
//                   timestamp={formattedDate(childItem.createdAt)}
//                 />
//               ))}
//           </React.Fragment>
//         ))}
//     </div>
//   );
// };

export const PostComments = ({
  id,
  content,
  timestamp,
}: {
  id: string;
  content: string;
  timestamp: string;
}) => {
  const [user, setUser] = React.useState<User>();

  const getUser = async () => {
    const res = await fetch(`/api/user/${id}`);
    const data = await res.json();
    console.log(data.user);
    setUser(data.user);
  };

  React.useEffect(() => {
    getUser();
    console.log(user);
  }, []);

  return (
    <div className="grid grid-cols-10 gap-5 bg-white rounded-md p-5">
      <div className="col-span-1">
        <img
          src={user?.imageUri ?? "/profile.png"}
          className="w-20 rounded-full"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col space-y-4 col-span-9">
        <div className="flex flex-col">
          <p className="font-semibold text-base">{user?.fullName}</p>
          <p className="text-sm font-normal">{user?.username}</p>
        </div>

        <p>{content}</p>
        <p className="text-sm text-gray-500">{timestamp}</p>
      </div>
    </div>
  );
};

export const Topics = () => {
  return (
    <div className="bg-blue-200 h-full p-2 flex space-x-2 items-center rounded-md">
      <div>
        <p className="text-4xl font-bold">#</p>
      </div>
      <div>
        <p className="font-bold text-lg">Jokowi</p>
        <p>1000</p>
      </div>
    </div>
  );
};

export const Trends = ({ tag, count }: { tag: string; count: number }) => {
  return (
    <div className="bg-blue-200 h-full p-2 flex justify-around space-x-2 items-center rounded-md">
      <p className={clsx("font-bold", tag.length > 7 ? "text-xl" : "text-4xl")}>
        {tag}
      </p>
      <p className="text-2xl font-bold text-gray-500">{count}</p>
    </div>
  );
};
