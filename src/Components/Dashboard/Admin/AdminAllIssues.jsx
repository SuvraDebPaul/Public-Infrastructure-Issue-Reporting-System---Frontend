import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../Util/LoadingSpinner";
import { useState } from "react";
import AssignStaffModal from "../../Modal/AssignStaffModal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function AdminAllIssues() {
  const axiosSecure = useAxiosSecure();
  let [isAssignStaffOpen, setIsAssignStaffOpen] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const { isLoading, data: allIssues = [] } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/issues`);
      return result.data;
    },
  });
  const { isLoading: isUserLoading, data: allUser = [] } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });
  if (isLoading || isUserLoading) return <LoadingSpinner />;

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
              {/* head */}
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
                {allIssues.map((issue, i) => (
                  <tr key={issue._id}>
                    <th>{i + 1}</th>
                    <td className="capitalize">{issue.tittle}</td>
                    <td className="capitalize">{issue.category}</td>
                    <td className="capitalize">{issue.status}</td>
                    <td className="capitalize">{issue.priority}</td>
                    <td className="capitalize">Mr. {issue.assignedStaffId}</td>
                    <td className="capitalize">
                      <button
                        onClick={() => {
                          setIsAssignStaffOpen(true);
                          setSelectedIssueId(issue._id);
                        }}
                        className={`btn btn-primary mr-2 ${
                          issue.assignedStaffId !== null && "btn-disabled"
                        }`}
                      >
                        Assign Stuff
                      </button>
                      <button className="btn btn-secondary">Reject</button>
                    </td>
                  </tr>
                ))}
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
