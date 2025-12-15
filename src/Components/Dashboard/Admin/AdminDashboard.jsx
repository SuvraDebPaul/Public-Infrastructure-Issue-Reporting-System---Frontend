import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../../Ui/Card";
import {
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import LoadingSpinner from "../../../Util/LoadingSpinner";
import SmallCard from "../Shared/SmallCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function AdminDashboard() {
  const axiosSecure = useAxiosSecure();


  const { isLoading, data: allIssues = [] } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/issues`);
      return result.data;
    },
  });
  const { isLoading: isPaymentLoading, data: allPayments = [] } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/payments`
      );
      return result.data;
    },
  });

  const { isLoading: isUserLoading, data: allUsers = [] } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });

  if (isLoading || isPaymentLoading || isUserLoading) return <LoadingSpinner />;

  const totalIssue = allIssues.length;
  const resolvedIssues = allIssues.filter(
    (issue) => issue.status === "resolved"
  );
  const resolvedIssue = resolvedIssues.length;

  const pendingIssues = allIssues.filter((issue) => issue.status === "pending");
  const pendingIssue = pendingIssues.length;

  const rejectedIssues = allIssues.filter(
    (issue) => issue.status === "rejected"
  );
  const rejectedIssue = rejectedIssues.length;

  const totalPayments = allPayments.reduce((sum, { amount }) => {
    return sum + amount;
  }, 0);

  const issues = [
    { title: "Total Issues", value: totalIssue, icon: AlertCircle },
    { title: "Resolved Issues", value: resolvedIssue, icon: CheckCircle },
    { title: "Pending Issues", value: pendingIssue, icon: AlertCircle },
    { title: "Rejected Issues", value: rejectedIssue, icon: XCircle },
    { title: "Total Payments", value: totalPayments, icon: DollarSign },
  ];

  const chartData = [
    { name: "Total Issues", issues: totalIssue },
    { name: "Resolved Issues", issues: resolvedIssue },
    { name: "Pending Issues", issues: pendingIssue },
    { name: "Rejected Issues", issues: rejectedIssue },
  ];

  const latestIssues = [...allIssues]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const latestPayments = [...allPayments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const latestUsers = [...allUsers]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);



  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {issues.map((issue) => (
          <SmallCard key={issue._id} issue={issue}></SmallCard>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6">
          <h2 className="font-semibold mb-4">Issue Reports</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="issues" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Latest Issues */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-4">
            <h3 className="font-semibold mb-3">Latest Issues</h3>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>SL No.</th>
                    <th>Title</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestIssues.map((issue, i) => (
                    <tr key={issue._id}>
                      <th>{i + 1}</th>
                      <td className="capitalize">{issue.tittle}</td>
                      <td className="capitalize">{issue.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Latest Payments */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-4">
            <h3 className="font-semibold mb-3">Latest Payments</h3>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>SL No.</th>
                    <th>Tnx Id</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {latestPayments.map((payment, i) => (
                    <tr key={payment._id}>
                      <th>{i + 1}</th>
                      <td className="capitalize">{payment.transectionId}</td>
                      <td className="capitalize">{payment.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Latest Users */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-4">
            <h3 className="font-semibold mb-3">Latest Users</h3>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>SL No.</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {latestUsers.map((user, i) => (
                    <tr key={user._id}>
                      <th>{i + 1}</th>
                      <td className="capitalize">{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
