import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import LoadingSpinner from "../../Util/LoadingSpinner";
import IssueCard from "../../Components/Dashboard/Issues/IssueCard";
import BoxContainer from "../../Util/BoxContainer";

const All_Issues = () => {
  const { isLoading, data: allIssues = [] } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/issues`);
      return result.data;
    },
  });

  // console.log(allIssues);

  if (isLoading) return <LoadingSpinner />;
  return (
    <BoxContainer>
      All Issues Page
      <div className="grid grid-cols-3 gap-10">
        {allIssues.map((issues) => (
          <IssueCard key={issues._id} issues={issues} />
        ))}
      </div>
    </BoxContainer>
  );
};

export default All_Issues;
