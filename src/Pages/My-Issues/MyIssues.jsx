import React from "react";
import useAuth from "../../Hooks/useAuth";

const MyIssues = () => {
  const { user } = useAuth();

  return <div>My Issues Page</div>;
};

export default MyIssues;
