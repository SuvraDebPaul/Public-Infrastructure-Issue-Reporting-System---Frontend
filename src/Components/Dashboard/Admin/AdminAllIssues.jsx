import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../Util/LoadingSpinner";
import { useState } from "react";
import AssignStaffModal from "../../Modal/AssignStaffModal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

export default function AdminAllIssues() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isAssignStaffOpen, setIsAssignStaffOpen] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  // Fetch all issues
  const { isLoading, data: allIssues = [] } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/issues`);
      return result.data;
    },
  });

  // Fetch all users (staff)
  const { isLoading: isUserLoading, data: allUser = [] } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });

  if (isLoading || isUserLoading) return <LoadingSpinner />;

  // Sort boosted issues first (frontend only)
  const sortedIssues = [...allIssues].sort((a, b) => {
    return (b.boosted === true) - (a.boosted === true);
  });

  // Reject handler
  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this issue.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedData = {
          status: "rejected",
          timeline: {
            status: "Rejected",
            message: `Issue Rejected By ${user.displayName}`,
            createdAt: new Date().toISOString(),
            updatedBy: user.displayName,
          },
        };

        await axiosSecure.put(`/issues/${id}`, updatedData);
        // Refresh table
        queryClient.invalidateQueries(["all-issues"]);

        Swal.fire({
          title: "Rejected",
          text: "The issue has been rejected successfully.",
          icon: "success",
        });
      }
    });
  };

  const closeAssignStaffModal = () => {
    setIsAssignStaffOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm m-2 p-2">
        <div className="p-4">
          <h3 className="text-2xl font-bold mb-3">All Issues</h3>

          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assigned Staff</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedIssues.map((issue, i) => {
                  return (
                    <tr key={issue._id}>
                      <th>{i + 1}</th>
                      <td className="capitalize">{issue.tittle}</td>
                      <td className="capitalize">{issue.category}</td>
                      <td className="capitalize">{issue.status}</td>
                      <td className="capitalize">{issue.priority}</td>

                      {/* Show staff name if assigned */}
                      <td className="capitalize">
                        {issue.assignedStaffId ? issue.assignedStaffId : "—"}
                      </td>

                      <td className="capitalize flex gap-2">
                        {/* Assign Staff button only when unassigned */}

                        <button
                          onClick={() => {
                            setIsAssignStaffOpen(true);
                            setSelectedIssueId(issue._id);
                          }}
                          className={`btn btn-primary ${
                            !issue.assignedStaffId ? "" : "btn-disabled"
                          }`}
                        >
                          Assign Staff
                        </button>

                        {/* Reject button only when status = pending */}

                        <button
                          className={`btn btn-secondary ${
                            issue.status === "pending" ? "" : "btn-disabled"
                          }`}
                          onClick={() => handleReject(issue._id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assign Staff Modal */}
      <AssignStaffModal
        closeModal={closeAssignStaffModal}
        isOpen={isAssignStaffOpen}
        allUser={allUser}
        issueId={selectedIssueId}
      />
    </>
  );
}
