"use client";
import {
  FluentProvider,
  webLightTheme,
  Button,
} from "@fluentui/react-components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-red-200">
      <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
    </div>
  );
};

export default Layout;
