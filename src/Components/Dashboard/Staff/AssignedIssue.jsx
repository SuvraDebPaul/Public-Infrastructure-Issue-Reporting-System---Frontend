import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../Util/LoadingSpinner";
import toast from "react-hot-toast";

const AssignedIssue = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const queryClient = useQueryClient();
  const { user, loading } = useAuth();
  const {
    isLoading,
    data: allIssues = [],
    refetch,
  } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/issues`);
      return result.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus, userName }) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/issues/${id}`,
        {
          status: newStatus,
          timeline: {
            status: newStatus,
            message: `Status changed to ${newStatus}`,
            updatedBy: userName,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-issues"]);
      // refetch();
      toast.success("Status Changed Successfully");
    },
  });

  if (isLoading || loading) return <LoadingSpinner />;

  const assignedIssue = allIssues
    .map((issue) => ({
      ...issue,
      status: issue.status
        ?.toLowerCase()
        .trim()
        .replace(/\u2013|\u2014/g, "-"),
    }))
    .filter((issue) => issue.assignedStaffId === user.displayName)
    .sort((a, b) => (b.isBoosted === true) - (a.isBoosted === true));

  const filteredIssues = assignedIssue.filter((issue) => {
    const statusMatch = statusFilter === "all" || issue.status === statusFilter;
    const priorityMatch =
      priorityFilter === "all" || issue.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const statusFlow = {
    pending: ["in-progress"],
    "in-progress": ["working"],
    working: ["resolved"],
    resolved: ["closed"],
    closed: [],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-10 font-bold capitalize">Assigned Issue</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue, i) => (
              <tr key={issue._id + "-" + issue.status}>
                <th>{i + 1}</th>
                <td>{issue.tittle}</td>
                <td>{issue.category}</td>
                <td>{issue.location}</td>
                <td className="capitalize">{issue.priority}</td>
                <td className="">
                  <select
                    className="select select-primary capitalize"
                    value={issue.status}
                    onChange={(e) =>
                      updateStatusMutation.mutate({
                        id: issue._id,
                        newStatus: e.target.value,
                        userName: user.displayName,
                      })
                    }
                  >
                    <option key={"current-" + issue.status} disabled>
                      {issue.status}
                    </option>

                    {(statusFlow[issue.status] ?? []).map((next) => (
                      <option key={next} value={next}>
                        {next}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedIssue;
