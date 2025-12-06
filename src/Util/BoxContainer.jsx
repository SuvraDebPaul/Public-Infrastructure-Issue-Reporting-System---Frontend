import React from "react";

const BoxContainer = ({ children, className }) => {
  return <div className={`${className} w-11/12 mx-auto`}>{children}</div>;
};

export default BoxContainer;
