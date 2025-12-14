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

export default function ManageUsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Bablu",
      email: "bablu@gmail.com",
      subscription: "Premium",
      blocked: false,
    },
    {
      id: 2,
      name: "Rafi",
      email: "rafi@gmail.com",
      subscription: "Free",
      blocked: true,
    },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(""); // 'block' or 'unblock'

  const toggleBlock = (user) => {
    setSelectedUser(user);
    setActionType(user.blocked ? "unblock" : "block");
    setShowConfirm(true);
  };

  const confirmToggle = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, blocked: !u.blocked } : u
      )
    );
    // TODO: Update DB for block/unblock
    setShowConfirm(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Users</h1>

      <Card>
        <CardContent>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Subscription</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-sm">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.subscription}</td>
                  <td className="border p-2">
                    {user.blocked ? "Blocked" : "Active"}
                  </td>
                  <td className="border p-2">
                    <Button
                      variant={user.blocked ? "default" : "destructive"}
                      size="sm"
                      onClick={() => toggleBlock(user)}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "block" ? "Block User" : "Unblock User"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to {actionType}{" "}
            <strong>{selectedUser?.name}</strong>?
          </div>
          <DialogFooter>
            <Button onClick={() => setShowConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmToggle}>
              {actionType === "block" ? "Block" : "Unblock"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
