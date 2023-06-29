import React from "react";
import clsx from "clsx";

export const Button = ({
  children,
  className,
  type,
  variant,
  onClick,
  name,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  name?: string;
  value?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        variant === "primary"
          ? "bg-blue-600"
          : variant === "secondary"
          ? "bg-gray-600"
          : "bg-gray-400"
      )}
      type={type}
      name={name}
      value={value}
    >
      {children}
    </button>
  );
};
