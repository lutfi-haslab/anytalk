

const SinglePost = ({
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

export default SinglePost;
