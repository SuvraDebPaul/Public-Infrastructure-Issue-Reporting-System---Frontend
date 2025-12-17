import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import SmallCard from "../Shared/SmallCard";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import { parseDate } from "../../../Utilities";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import LoadingSpinner from "../../../Util/LoadingSpinner";

const StaffDashboard = () => {
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

  const resolvedIssue = assignedIssue.filter(
    (issue) => issue.status === "resolved"
  );

  const todaysTask = assignedIssue.filter((issue) => {
    const assignedDate = parseDate(issue.assignedAt); // convert stored value to Date
    // console.log(assignedDate);
    if (!assignedDate) return false;
    const today = new Date();
    // console.log(today);

    return (
      assignedDate.getDate() === today.getDate() &&
      assignedDate.getMonth() === today.getMonth() &&
      assignedDate.getFullYear() === today.getFullYear()
    );
  });
  // console.log(todaysTask);

  // Issues by priority
  const priorityData = [
    {
      name: "High",
      value: assignedIssue.filter((i) => i.priority === "High").length,
    },
    {
      name: "Normal",
      value: assignedIssue.filter((i) => i.priority === "normal").length,
    },
  ];
  const COLORS = ["#FF4D4F", "#36CFC9"];

  // Issues by category
  const categoryCount = {};
  assignedIssue.forEach((issue) => {
    if (!categoryCount[issue.category]) {
      categoryCount[issue.category] = 1;
    } else {
      categoryCount[issue.category]++;
    }
  });

  const categoryData = Object.keys(categoryCount).map((cat) => ({
    name: cat,
    value: categoryCount[cat],
  }));

  return (
    <div>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`bg-white rounded-2xl shadow-sm`}>
            <div className="p-4 flex items-center gap-4">
              <MdOutlineAssignmentInd className="w-8 h-8" />
              <div>
                <p className="text-md text-muted-foreground">
                  Assigned Issue Count
                </p>
                <p className="text-xl font-semibold">{assignedIssue.length}</p>
              </div>
            </div>
          </div>
          <div className={`bg-white rounded-2xl shadow-sm`}>
            <div className="p-4 flex items-center gap-4">
              <MdOutlineAssignmentTurnedIn className="w-8 h-8" />
              <div>
                <p className="text-md text-muted-foreground">
                  Resolved Issue Count
                </p>
                <p className="text-xl font-semibold">{resolvedIssue.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold mb-4">Today's Task</h1>
          <div className="overflow-x-auto bg-white shadow-sm rounded-xl">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {todaysTask.map((task, i) => (
                  <tr key={task._id}>
                    <th>{i + 1}</th>
                    <td>{task?.tittle}</td>
                    <td>{task?.category}</td>
                    <td>{task?.location}</td>
                    <td>{task?.priority}</td>
                    <td>{task.image > 0 ? task.image : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Issues by Priority</h2>
            <PieChart width={350} height={300}>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50} // makes it a doughnut
                fill="#8884d8"
                dataKey="value"
                label
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Issues by Category</h2>
            <BarChart width={500} height={300} data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
