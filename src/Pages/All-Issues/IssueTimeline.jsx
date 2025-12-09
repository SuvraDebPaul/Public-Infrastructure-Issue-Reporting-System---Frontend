import React from "react";

const IssueTimeline = ({ timeline }) => {
  console.log(timeline);
  return (
    <li className="step text-left step-primary ">
      {timeline?.status} <br /> {timeline?.message} {timeline?.createdAt}
    </li>
  );
};

export default IssueTimeline;
