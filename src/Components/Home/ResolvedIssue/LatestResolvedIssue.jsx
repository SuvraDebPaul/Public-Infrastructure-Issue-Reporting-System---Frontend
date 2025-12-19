import React from "react";
import BoxContainer from "../../../Util/BoxContainer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../Util/LoadingSpinner";
import IssueCard from "../../Dashboard/Issues/IssueCard";
import { Link } from "react-router";

const LatestResolvedIssue = () => {
  const { isLoading, data: allIssues = [] } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/issues`);
      return result.data;
    },
  });
  const resolvedIssues = allIssues
    .filter((issue) => issue.status === "resolved")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);
  if (isLoading) return <LoadingSpinner />;
  return (
    <section className="bg-base-200">
      <BoxContainer className="py-10">
        <h2 className="text-4xl mb-10 font-bold text-center uppercase">
          Latest Ressolved Issues
        </h2>
        <div className="grid grid-cols-3 gap-5">
          {resolvedIssues.map((issues) => (
            <IssueCard key={issues._id} issues={issues} />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Link to="/all-issues" className="btn btn-primary my-10">
            All Issues
          </Link>
        </div>
      </BoxContainer>
    </section>
  );
};

export default LatestResolvedIssue;
