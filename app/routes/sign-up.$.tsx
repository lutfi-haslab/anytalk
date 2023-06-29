import { SignUp } from "@clerk/remix";
import LogoLight from "~/components/svg/LogoLight";

export default function SignUpRoutes() {
  return (
    <div className="bg-light1 h-screen p-10 px-32 flex justify-between items-center">
      <div>
        <LogoLight />
      </div>
      {/* <SignUp redirectUrl="/home"/> */}
      <SignUp routing={"path"} path={"/sign-up"} />
    </div>
  );
}
