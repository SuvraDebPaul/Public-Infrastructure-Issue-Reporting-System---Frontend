import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* -------------------------
   Utility: className joiner 
-------------------------- */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* -------------------------
   Internal Card Components 
-------------------------- */
const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-xl border bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

/* -------------------------
   Dashboard Component
-------------------------- */
const Dashboard = () => {
  const stats = {
    totalIssues: 120,
    pending: 35,
    inProgress: 40,
    resolved: 45,
    payments: 25000,
  };

  const issueChartData = [
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved },
  ];

  const paymentData = [
    { name: "Payments", value: stats.payments },
    { name: "Remaining", value: 50000 - stats.payments },
  ];

  const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#6366f1"];

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-semibold">Total Issues</h3>
            <p className="text-3xl font-bold">{stats.totalIssues}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-3xl font-bold">{stats.pending}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-semibold">In Progress</h3>
            <p className="text-3xl font-bold">{stats.inProgress}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-semibold">Resolved</h3>
            <p className="text-3xl font-bold">{stats.resolved}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-semibold">Total Payments</h3>
            <p className="text-3xl font-bold">${stats.payments}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Status Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={450} height={280} data={issueChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </CardContent>
        </Card>

        {/* Payments Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart width={350} height={280}>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {paymentData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
