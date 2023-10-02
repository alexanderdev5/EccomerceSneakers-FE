import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-screen-xl mx-auto px-2 md: lg:h-[500px] xl:h-[600px]  ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
