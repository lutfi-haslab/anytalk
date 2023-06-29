import { Form, useNavigation } from "@remix-run/react";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./button.components";

export const InputPost = ({ user }: any) => {
  const { state } = useNavigation();
  let isAdding = state === "submitting";
  let formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
    }
  }, [isAdding]);

  return (
    <div className="bg-white  p-10 rounded-md">
      <Form method="post" ref={formRef}>
        <div className="flex justify-between items-center space-x-4">
          <img
            src={user?.imageUrl ?? "/profile.png"}
            className="w-20 rounded-full"
          />
          <TextareaAutosize
            minRows={1}
            maxRows={7}
            name="content"
            placeholder="What's happening?"
            className="w-full resize-none bg-blue-200 outline-none hover:border-0 [&::-webkit-scrollbar]:hidden py-4 px-3 rounded-md text-black"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-3">
          {/* Icon Actions */}
          <div className="pl-20">
            {/* <ImageAdd24Regular className="text-blue-600" /> */}
          </div>
          <Button
            type="submit"
            variant="primary"
            name="intent"
            value="create"
            className="rounded-md px-3 py-2 text-md text-white"
          >
            Add Post
          </Button>
        </div>
      </Form>
    </div>
  );
};
