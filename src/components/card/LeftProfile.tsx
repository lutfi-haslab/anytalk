"use client";
import React from "react";
import Image from "next/image";
import Button from "../button/Button";

const LeftProfile = () => {
  return (
    <div className="bg-white rounded-md">
      <div className="bg-[url('/background-profile.png')] h-32 bg-cover bg-center flex justify-center items-center rounded-t-md">
        <Image
          src="/profile.png"
          alt="Profile"
          width={100}
          height={24}
          priority
          className="mt-32"
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
          <p className="font-semibold">Lutfi Ikbal Majid</p>
          <p>@Lutzfy.21</p>
        </div>
        {/* Description */}
        <p>
          Dunia memang gelap, tetapi mati adalah kegelapan sejati. Hiduplah
          dengan gembira!
        </p>
        <Button variant="primary" className="px-3 py-2 w-full rounded-md text-xl text-white">
          My Profile
        </Button>
      </div>
    </div>
  );
};

export default LeftProfile;
