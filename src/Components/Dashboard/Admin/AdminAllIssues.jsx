import React, { useState } from "react";
import { Card, CardContent } from "../../Ui/Card";
import { Button } from "../../Ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../Ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../../Ui/select";

export default function AdminAllIssues() {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Road damage",
      category: "Infrastructure",
      status: "Pending",
      priority: "High",
      assignedStaff: null,
      boosted: true,
    },
    {
      id: 2,
      title: "Water leakage",
      category: "Utilities",
      status: "Pending",
      priority: "Normal",
      assignedStaff: "Rafi",
      boosted: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  const staffList = ["Bablu", "Rafi", "Jahid"];

  const openAssignModal = (issue) => {
    setSelectedIssue(issue);
    setSelectedStaff("");
    setShowModal(true);
  };

  const assignStaff = () => {
    if (!selectedStaff) return;

    // update issue state locally
    setIssues((prev) =>
      prev.map((i) =>
        i.id === selectedIssue.id ? { ...i, assignedStaff: selectedStaff } : i
      )
    );

    // TODO: Save assignment to DB and add tracking record

    setShowModal(false);
  };

  const rejectIssue = (issueId) => {
    if (!confirm("Are you sure you want to reject this issue?")) return;
    setIssues((prev) =>
      prev.map((i) => (i.id === issueId ? { ...i, status: "Rejected" } : i))
    );
    // TODO: Update DB
  };

  // Boosted issues on top
  const sortedIssues = [...issues].sort((a, b) => b.boosted - a.boosted);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">All Issues</h1>
      <Card>
        <CardContent>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Priority</th>
                <th className="border p-2">Assigned Staff</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedIssues.map((issue) => (
                <tr key={issue.id} className="text-sm">
                  <td className="border p-2">{issue.title}</td>
                  <td className="border p-2">{issue.category}</td>
                  <td className="border p-2">{issue.status}</td>
                  <td className="border p-2">{issue.priority}</td>
                  <td className="border p-2">{issue.assignedStaff || "-"}</td>
                  <td className="border p-2 space-x-2">
                    {!issue.assignedStaff && (
                      <Button size="sm" onClick={() => openAssignModal(issue)}>
                        Assign Staff
                      </Button>
                    )}
                    {issue.status === "Pending" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => rejectIssue(issue.id)}
                      >
                        Reject
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Assign Staff Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Staff</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedStaff} onValueChange={setSelectedStaff}>
              <SelectTrigger className="w-full">
                {selectedStaff || "Select Staff"}
              </SelectTrigger>
              <SelectContent>
                {staffList.map((staff) => (
                  <SelectItem key={staff} value={staff}>
                    {staff}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={assignStaff}>Confirm Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
