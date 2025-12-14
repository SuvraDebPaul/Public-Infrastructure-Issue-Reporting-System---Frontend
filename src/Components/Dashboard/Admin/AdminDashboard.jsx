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

export default function AdminDashboard() {
  const stats = [
    { title: "Total Issues", value: 245, icon: AlertCircle },
    { title: "Resolved Issues", value: 180, icon: CheckCircle },
    { title: "Pending Issues", value: 45, icon: AlertCircle },
    { title: "Rejected Issues", value: 20, icon: XCircle },
    { title: "Total Payments", value: "$12,450", icon: DollarSign },
  ];

  const chartData = [
    { name: "Jan", issues: 30 },
    { name: "Feb", issues: 50 },
    { name: "Mar", issues: 80 },
    { name: "Apr", issues: 60 },
  ];

  const latestIssues = [
    { id: "#101", title: "Road damage", status: "Pending" },
    { id: "#102", title: "Water leakage", status: "Resolved" },
    { id: "#103", title: "Street light issue", status: "Rejected" },
  ];

  const latestPayments = [
    { id: "TXN001", amount: "$120", date: "2025-01-12" },
    { id: "TXN002", amount: "$80", date: "2025-01-10" },
  ];

  const latestUsers = [
    { name: "Bablu", email: "bablu@gmail.com" },
    { name: "Rafi", email: "rafi@gmail.com" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="rounded-2xl shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <stat.icon className="w-8 h-8" />
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <h2 className="font-semibold mb-4">Monthly Issue Reports</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="issues" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Latest Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Latest Issues */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Latest Issues</h3>
            {latestIssues.map((issue) => (
              <div key={issue.id} className="flex justify-between text-sm py-1">
                <span>{issue.title}</span>
                <span>{issue.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Latest Payments */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Latest Payments</h3>
            {latestPayments.map((pay) => (
              <div key={pay.id} className="flex justify-between text-sm py-1">
                <span>{pay.id}</span>
                <span>{pay.amount}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Latest Users */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">New Users</h3>
            {latestUsers.map((user, idx) => (
              <div key={idx} className="text-sm py-1">
                <p>{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
