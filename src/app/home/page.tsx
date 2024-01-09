"use client";
import LeftProfile from "@/components/card/LeftProfile";
import InputPost from "@/components/card/InputPost";
import SinglePost from "@/components/card/SinglePost";
import SinglePost2 from "@/components/card/SinglePost2";
import Trends from "@/components/card/Trends";
import Topics from "@/components/card/Topics";

const page = () => {
  return (
    <div className="grid grid-cols-12 bg-light1 h-screen gap-5 px-10 text-black">
      <div className="col-span-3 pt-10">
        <LeftProfile />
      </div>
      <div className="col-span-6 pt-10 overflow-auto h-screen [&::-webkit-scrollbar]:hidden">
        <InputPost />
        {/* POST */}
        <div className="mt-5 grid grid-cols-1 gap-5">
          <SinglePost2 />
          <SinglePost />
          <SinglePost />
          <SinglePost />
          <SinglePost />
          <SinglePost />
          <SinglePost />
          <SinglePost />
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
            <Trends />
            <Trends />
            <Trends />
            <Trends />
            <Trends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
