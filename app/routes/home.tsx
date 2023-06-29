import React from "react";
import { Outlet } from "@remix-run/react";

const Home = () => {
  return (
    <div>
      Home Layout
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
