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

export default function ManageStaff() {
  const [staffList, setStaffList] = useState([
    { id: 1, name: "Bablu", email: "bablu@staff.com", phone: "0123456789" },
    { id: 2, name: "Rafi", email: "rafi@staff.com", phone: "0987654321" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'update'
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    password: "",
  });

  const openAddModal = () => {
    setModalType("add");
    setStaffForm({ name: "", email: "", phone: "", photo: "", password: "" });
    setShowModal(true);
  };

  const openUpdateModal = (staff) => {
    setModalType("update");
    setSelectedStaff(staff);
    setStaffForm({ ...staff, password: "" });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setStaffForm({ ...staffForm, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    if (modalType === "add") {
      // TODO: create staff in Firebase Auth & DB
      setStaffList([...staffList, { id: Date.now(), ...staffForm }]);
    } else if (modalType === "update") {
      setStaffList(
        staffList.map((s) =>
          s.id === selectedStaff.id ? { ...s, ...staffForm } : s
        )
      );
      // TODO: update staff in DB
    }
    setShowModal(false);
  };

  const deleteStaff = (staff) => {
    setSelectedStaff(staff);
    setConfirmDelete(true);
  };

  const confirmDeleteStaff = () => {
    setStaffList(staffList.filter((s) => s.id !== selectedStaff.id));
    // TODO: delete staff from DB
    setConfirmDelete(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Staff</h1>
      <Button onClick={openAddModal}>Add Staff</Button>

      <Card>
        <CardContent>
          <table className="w-full table-auto border-collapse mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id} className="text-sm">
                  <td className="border p-2">{staff.name}</td>
                  <td className="border p-2">{staff.email}</td>
                  <td className="border p-2">{staff.phone}</td>
                  <td className="border p-2 space-x-2">
                    <Button size="sm" onClick={() => openUpdateModal(staff)}>
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteStaff(staff)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add/Update Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === "add" ? "Add Staff" : "Update Staff"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={staffForm.name}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={staffForm.email}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={staffForm.phone}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              value={staffForm.photo}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={staffForm.password}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={submitForm}>
              {modalType === "add" ? "Add Staff" : "Update Staff"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Staff</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to delete{" "}
            <strong>{selectedStaff?.name}</strong>?
          </div>
          <DialogFooter>
            <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteStaff}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
