import React, { useState } from "react";
import { Card, CardContent } from "../../Ui/Card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../../Ui/select";

export default function AllPayments() {
  const [payments, setPayments] = useState([
    {
      id: "TXN001",
      user: "Bablu",
      amount: 120,
      date: "2025-01-12",
      status: "Success",
    },
    {
      id: "TXN002",
      user: "Rafi",
      amount: 80,
      date: "2025-02-10",
      status: "Failed",
    },
    {
      id: "TXN003",
      user: "Jahid",
      amount: 50,
      date: "2025-01-25",
      status: "Success",
    },
  ]);

  const [filterMonth, setFilterMonth] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredPayments = filterMonth
    ? payments.filter(
        (p) =>
          new Date(p.date).toLocaleString("default", { month: "long" }) ===
          filterMonth
      )
    : payments;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Payments</h1>

      <Card>
        <CardContent>
          <div className="mb-4 w-1/3">
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger>{filterMonth || "Filter by Month"}</SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Transaction ID</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="text-sm">
                  <td className="border p-2">{payment.id}</td>
                  <td className="border p-2">{payment.user}</td>
                  <td className="border p-2">${payment.amount}</td>
                  <td className="border p-2">{payment.date}</td>
                  <td className="border p-2">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Optional: Chart for payments by month can be added here */}
    </div>
  );
}
