import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import LoadingSpinner from "../../Util/LoadingSpinner";
import IssueCard from "../../Components/Dashboard/Issues/IssueCard";
import BoxContainer from "../../Util/BoxContainer";
import useDebounce from "../../Hooks/useDebounce";

const All_Issues = () => {
  // UI State
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [boosted, setBoosted] = useState(false);
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  const { isLoading, data } = useQuery({
    queryKey: [
      "all-issues",
      {
        search: debouncedSearch,
        category,
        status,
        priority,
        boosted,
        sort,
        page,
      },
    ],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/allIssues`,
        {
          params: {
            search: debouncedSearch,
            category,
            status,
            priority,
            boosted,
            sort,
            page,
            limit: 9,
          },
        }
      );
      return result.data;
    },
    keepPreviousData: true,
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

  if (isLoading) return <LoadingSpinner />;

  const { issues = [], totalPages } = data;
  //console.log(issues);
  const sortedIssues = [...issues].sort((a, b) => {
    if (a.priority === "High" && b.priority !== "High") return -1;
    if (a.priority !== "High" && b.priority === "High") return 1;
    return 0;
  });

  return (
    <BoxContainer>
      <h1 className="text-xl font-bold mb-4">All Issues</h1>

      {/* Filters */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title/category/location"
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="working">Working</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          className="select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Priority</option>
          <option value="High">High</option>
          <option value="normal">Normal</option>
        </select>

        <label className="label">
          <input
            className="checkbox checkbox-primary"
            type="checkbox"
            checked={boosted}
            onChange={(e) => setBoosted(e.target.checked)}
          />
          Boosted Only
        </label>

        <select
          className="select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="upvotes">Most Upvotes</option>
          <option value="boosted">Boosted First</option>
        </select>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-3 gap-10">
        {sortedIssues.map((issue) => (
          <IssueCard key={issue._id} issues={issue} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </BoxContainer>
  );
};

export default All_Issues;
