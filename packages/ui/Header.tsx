import * as React from "react";

export const Header = ({ text }: { text: string }) => {
  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl ">
        {text}
      </h1>
    </div>);
};
