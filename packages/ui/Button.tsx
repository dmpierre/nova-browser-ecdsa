"use client";

import * as React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <button className="hover:bg-violet-100 border-2 rounded-md px-2 py-1" onClick={onClick}>{text}</button>;
};
