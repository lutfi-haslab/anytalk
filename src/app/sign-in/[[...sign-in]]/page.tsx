import { SignIn } from "@clerk/nextjs";
import React from "react";
import LogoLight from "@/components/svg/LogoLight";

export default function Page() {
  return (
    <div className="bg-light1 h-screen p-10 px-32 flex justify-between items-center">
      <div>
        <LogoLight />
      </div>
      <SignIn redirectUrl="/home"/>
    </div>
  );
}
