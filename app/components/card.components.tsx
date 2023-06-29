import { useClerk } from "@clerk/remix";
import { useProfileStore } from "~/utils/store";
import { Button } from "./button.components";

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
          <p className="font-semibold">1387</p>
          <p>Following</p>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <p className="font-semibold">300</p>
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
        <p>
          {profile.about ??
            "Add your description, like 'I want to be The next Elon Musk 😜'"}
        </p>
        <Button
          onClick={() => setOpenModal("dismissible")}
          variant="primary"
          className="px-3 py-2 w-full rounded-md text-xl text-white"
        >
          My Profile
        </Button>
        <button className="text-blue-500 underline" onClick={() => signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export const SinglePost = ({
  user,
  content,
  timestamp,
}: {
  user: any;
  content: string;
  timestamp: string;
}) => {
  return (
    <div className="grid grid-cols-10 gap-5 bg-white rounded-md p-5">
      <div className="col-span-1">
        <img
          src={user?.imageUrl ?? "/profile.png"}
          className="w-20 rounded-full"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col space-y-4 col-span-9">
        <div className="flex flex-col">
          <p className="font-semibold text-base">{user?.fullName}</p>
          <p className="text-sm font-normal">
            @{user?.username ?? user?.id.substring(0, 15)}
          </p>
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
    <div className="bg-blue-200 h-full p-2 flex space-x-2 items-center rounded-md">
      <div>
        <p className="text-4xl font-bold">#</p>
      </div>
      <div>
        <p className="font-bold text-lg">{tag}</p>
        <p>{count}</p>
      </div>
    </div>
  );
};
