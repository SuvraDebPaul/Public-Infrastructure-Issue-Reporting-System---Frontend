import { useQuery } from "@tanstack/react-query";
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
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import LoadingSpinner from "../../Util/LoadingSpinner";

const CitizenDashboard = () => {
  const { user } = useAuth();

  const { isLoading, data: issues = [] } = useQuery({
    queryKey: ["issues", user.email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/all-issues/${user.email}`
      );
      return result.data;
    },
  });

  const { isPending, data: allPayments = [] } = useQuery({
    queryKey: ["allPayment", user.email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/payments/${user.email}`
      );
      return result.data;
    },
  });

  if (isLoading || isPending) return <LoadingSpinner />;
  console.log(allPayments);
  console.log(issues.length);
  const pendingIssues = issues.filter((issue) => issue.status === "pending");
  const inProgressIssues = issues.filter(
    (issue) => issue.status === "in-progress"
  );
  const resolvedIssues = issues.filter((issue) => issue.status === "resolved");
  const totalPayment = allPayments.reduce((sum, issue) => {
    return sum + Number(issue.amount) || 0;
  }, 0);
  console.log(totalPayment);
  const issueChartData = [
    { name: "Pending", value: Number(pendingIssues.length) },
    { name: "In Progress", value: Number(inProgressIssues.length) },
    { name: "Resolved", value: Number(resolvedIssues.length) },
  ];

  // const paymentData = [
  //   { name: "Payments", value: stats.payments },
  //   { name: "Remaining", value: 50000 - stats.payments },
  // ];

  const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#6366f1"];

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="rounded-xl border bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold">Total Issues</h3>
            <p className="text-4xl font-bold">{issues.length}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
          <div className="pt-6 text-center">
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-3xl font-bold">{pendingIssues.length}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
          <div className="pt-6 text-center">
            <h3 className="text-lg font-semibold">In Progress</h3>
            <p className="text-3xl font-bold">{inProgressIssues.length}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
          <div className="pt-6 text-center">
            <h3 className="text-lg font-semibold">Resolved</h3>
            <p className="text-3xl font-bold">{resolvedIssues.length}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
          <div className="pt-6 text-center">
            <h3 className="text-lg font-semibold">Total Payments</h3>
            <p className="text-3xl font-bold">${totalPayment}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="">
        {/* Issue Status Bar Chart */}
        <div>
          <h2 className="text-3xl font-bold mb-4 mt-10">
            Issue Status Overview
          </h2>
        </div>
        <div>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={issueChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payments Pie Chart */}
        {/* <Card>
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
        </Card> */}
      </div>
    </div>
  );
};

export default CitizenDashboard;
