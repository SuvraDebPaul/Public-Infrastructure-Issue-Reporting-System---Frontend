import React from "react";

const IssueTimeline = ({ timeline }) => {
  console.log(timeline);
  return (
    <li data-content="✓" className="step text-left step-neutral">
      {timeline?.status} <br /> {timeline?.message} {timeline?.createdAt}
    </li>
  );
};

export default IssueTimeline;
