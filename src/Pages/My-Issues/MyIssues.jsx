import React, { useState } from "react";

/* ---------------------------------------------------
   STATUS + CATEGORY COLORS
-----------------------------------------------------*/
const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  "in-progress": "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-200 text-gray-700",
};

/* ---------------------------------------------------
   MAIN COMPONENT
-----------------------------------------------------*/
const MyIssues = () => {
  /* Dummy User Issues – Replace with API data */
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Street Light Broken",
      category: "Public Safety",
      status: "pending",
      location: "Dhanmondi 27",
      description: "Street light not working for 3 days.",
      date: "2025-01-02",
      upvotes: 10,
      image: "https://via.placeholder.com/350x200",
    },
    {
      id: 2,
      title: "Garbage Not Collected",
      category: "Sanitation",
      status: "in-progress",
      location: "Mirpur 10",
      description: "Garbage has piled up in the corner area.",
      date: "2025-01-05",
      upvotes: 42,
      image: "https://via.placeholder.com/350x200",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editingIssue, setEditingIssue] = useState(null); // modal state

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
    setIssues((prev) => prev.filter((i) => i.id !== id));
    // TODO: API CALL => await axios.delete(`/issue/${id}`);
  };

  /* ---------------------------------------------------
     HANDLE SAVE EDITED ISSUE (Instant UI update!)
  -----------------------------------------------------*/
  const saveIssue = () => {
    setIssues((prev) =>
      prev.map((item) => (item.id === editingIssue.id ? editingIssue : item))
    );
    // TODO: API CALL => axios.put(`/issue/${editingIssue.id}`, editingIssue);
    setEditingIssue(null);
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
            className="px-3 py-2 rounded-lg border"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          {/* Filter by Category */}
          <select
            className="px-3 py-2 rounded-lg border"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Public Safety">Public Safety</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Road Maintenance">Road Maintenance</option>
          </select>
        </div>
      </div>

      {/* Issue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="border rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-md transition"
          >
            <img
              src={issue.image}
              className="w-full h-40 object-cover"
              alt="issue"
            />

            <div className="p-4 space-y-3">
              <h2 className="text-lg font-semibold">{issue.title}</h2>

              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  statusColors[issue.status]
                }`}
              >
                {issue.status.toUpperCase()}
              </span>

              <p className="text-sm text-gray-600">📍 {issue.location}</p>
              <p className="text-sm text-gray-500">📅 {issue.date}</p>
            </div>

            {/* Buttons */}
            <div className="px-4 pb-4 flex justify-between gap-2">
              {/* Edit Button — ONLY if Pending */}
              {issue.status === "pending" && (
                <button
                  className="flex-1 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  onClick={() => setEditingIssue(issue)}
                >
                  Edit
                </button>
              )}

              {/* Delete */}
              <button
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => deleteIssue(issue.id)}
              >
                Delete
              </button>

              {/* View Details */}
              <button
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => (window.location.href = `/issue/${issue.id}`)}
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

      {/* ---------------------------------------------------
         EDIT MODAL (Pre-filled)
      -----------------------------------------------------*/}
      {editingIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4 shadow-lg">
            <h2 className="text-xl font-semibold">Edit Issue</h2>

            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingIssue.title}
              onChange={(e) =>
                setEditingIssue({ ...editingIssue, title: e.target.value })
              }
            />

            <textarea
              className="w-full border px-3 py-2 rounded"
              rows="4"
              value={editingIssue.description}
              onChange={(e) =>
                setEditingIssue({
                  ...editingIssue,
                  description: e.target.value,
                })
              }
            />

            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingIssue.location}
              onChange={(e) =>
                setEditingIssue({ ...editingIssue, location: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditingIssue(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={saveIssue}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;
