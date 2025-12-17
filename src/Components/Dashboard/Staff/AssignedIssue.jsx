import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssignedIssue = () => {
  const { user, loading } = useAuth();
  const { isLoading, data: allIssues = [] } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/issues`);
      return result.data;
    },
  });
  if (isLoading || loading) return <LoadingSpinner />;

  const assignedIssue = allIssues.filter(
    (issue) => issue.assignedStaffId === user.displayName
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-10 font-bold capitalize">Assigned Issue</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assignedIssue.map((issue) => (
          <div key={issue._id} className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                className="w-full h-[350px]"
                src={
                  issue.image > 0
                    ? issue.image
                    : "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
                }
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {issue.tittle}
                <div
                  className={`badge ${
                    issue.priority === "High"
                      ? "badge-secondary"
                      : "badge-info text-white capitalize"
                  } `}
                >
                  {issue.priority}
                </div>
              </h2>
              <div className="card-actions justify-start">
                <div className="badge badge-outline">
                  Location: {issue.location}
                </div>
                <div className="badge badge-outline">
                  Category: {issue.category}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedIssue;
