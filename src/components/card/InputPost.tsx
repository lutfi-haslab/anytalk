import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../button/Button";
import Image from "next/image";
import { ImageAdd24Regular } from "@fluentui/react-icons";

const InputPost = () => {
  return (
    <div className="bg-white  p-10 rounded-md">
      <div className="flex justify-between items-center space-x-4">
        <Image
          src="/profile.png"
          alt="Profile"
          width={55}
          height={55}
          priority
        />
        <TextareaAutosize
          minRows={1}
          maxRows={7}
          placeholder="What's happening?"
          className="w-full resize-none bg-blue-200 outline-none hover:border-0 [&::-webkit-scrollbar]:hidden py-4 px-3 rounded-md text-black"
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <div className="flex justify-between mt-3">
        {/* Icon Actions */}
        <div className="pl-20">
          <ImageAdd24Regular className="text-blue-600" />
        </div>
        <Button
          variant="primary"
          className="rounded-md px-3 py-2 text-md text-white"
        >
          Add Post
        </Button>
      </div>
    </div>
  );
};

export default InputPost;
