import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  className,
  type,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary";
}) => {
  return (
    <button
      className={clsx(
        className,
        variant === "primary"
          ? "bg-blue-600"
          : variant === "secondary"
          ? "bg-gray-600"
          : "bg-gray-400"
      )}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
