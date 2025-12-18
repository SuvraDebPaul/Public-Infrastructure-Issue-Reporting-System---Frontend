import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import LoadingSpinner from "../../Util/LoadingSpinner";
import { fotmateDate } from "../../Utilities";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import EditModal from "../../Components/Modal/EditModal";
import { FaLocationDot } from "react-icons/fa6";
import { GoDiscussionOutdated } from "react-icons/go";

/* ---------------------------------------------------
   STATUS + CATEGORY COLORS
-----------------------------------------------------*/
const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  "in-progress": "bg-blue-100 text-blue-700",
  working: "bg-indigo-100 text-indigo-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-200 text-gray-700",
  rejected: "bg-red-100 text-red-700",
};

/* ---------------------------------------------------
   MAIN COMPONENT
-----------------------------------------------------*/
const MyIssues = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    isLoading,
    data: issues = [],
    refetch,
  } = useQuery({
    queryKey: ["issues", user.email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/all-issues/${user.email}`
      );
      return result.data;
    },
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/issues/categories`
      );
      return res.data;
    },
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  if (isLoading) return <LoadingSpinner />;
  /* ---------------------------------------------------
     FILTER LOGIC
  -----------------------------------------------------*/
  const filteredIssues = issues.filter((issue) => {
    const byStatus = filterStatus === "all" || issue.status === filterStatus;
    const byCat = filterCategory === "all" || issue.category === filterCategory;
    return byStatus && byCat;
  });

  /* ---------------------------------------------------
     HANDLE DELETE ISSUE
  -----------------------------------------------------*/
  const deleteIssue = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/issues/${id}`);
          Swal.fire("Deleted!", "Issue removed successfully.", "success");
          refetch();
        } catch (error) {
          Swal.fire("Error", "Unable to delete issue.", error);
        }
      }
    });
  };

  /* ---------------------------------------------------
     HANDLE SAVE EDITED ISSUE (Instant UI update!)
  -----------------------------------------------------*/
  const openEditModal = (issue) => {
    setSelectedIssue(issue);
    setIsEditOpen(true);
  };

  /* ---------------------------------------------------
        UI START
  -----------------------------------------------------*/
  return (
    <div className="p-6 space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <h1 className="text-2xl font-bold">My Issues</h1>

        <div className="flex gap-3">
          {/* Filter by Status */}
          <select
            className="select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="working">Working</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Filter by Category */}
          <select
            className="select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Issue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIssues.map((issue) => (
          <div
            key={issue._id}
            className="shadow-sm rounded-xl bg-white overflow-hidden transition p-2"
          >
            <img
              src={issue.image}
              className="w-full h-70 object-cover rounded-xl"
              alt="issue"
            />
            <div className="p-2 space-y-1">
              <h2 className="text-lg font-semibold">{issue.tittle}</h2>

              <span
                className={`px-2 py-1 text-xs rounded font-semibold ${
                  statusColors[issue.status]
                }`}
              >
                {issue.status.toUpperCase()}
              </span>
              <div className="flex justify-between items-center my-2">
                <p className="text-sm  text-gray-700 flex items-center gap-1">
                  <FaLocationDot /> {issue.location}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <GoDiscussionOutdated color="black" />
                  {fotmateDate(issue.createdAt)}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="px-4 pb-4 flex justify-between gap-2">
              {/* Edit Button — ONLY if Pending */}
              {issue.status === "pending" && (
                <button
                  className="flex-1 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  onClick={() => openEditModal(issue)}
                >
                  Edit
                </button>
              )}

              {/* Delete */}
              {issue.status === "pending" && (
                <button
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => deleteIssue(issue._id)}
                >
                  Delete
                </button>
              )}
              {/* View Details */}
              <button
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => navigate(`/issues/${issue._id}`)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredIssues.length === 0 && (
        <div className="text-center py-10 text-gray-500 text-lg">
          No issues found.
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && (
        <EditModal
          isOpen={isEditOpen}
          closeModal={() => setIsEditOpen(false)}
          issue={selectedIssue}
        />
      )}
    </div>
  );
};

export default MyIssues;
