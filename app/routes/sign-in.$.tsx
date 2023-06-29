import { SignIn } from "@clerk/remix";
import LogoLight from "~/components/svg/LogoLight";



export default function SignInRoutes() {
  return (
    <div className="bg-light1 h-screen p-10 px-32 flex justify-between items-center">
      <div>
        <LogoLight />
      </div>
      {/* <SignIn routing={"path"} path={"/sign-in"} /> */}
      <SignIn redirectUrl="/test"/>
    </div>
  );
}
