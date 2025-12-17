import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import AddStaffModal from "../../Modal/AddStaffModal";
import LoadingSpinner from "../../../Util/LoadingSpinner";
import axios from "axios";
import Swal from "sweetalert2";
import UpdateStaffModal from "../../Modal/UpdateStaffModal";

const ManageStaff = () => {
  const axiosSecure = useAxiosSecure();
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isUpdateStaffOpen, setIsUpdateStaffOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const queryClient = useQueryClient();
  const { isLoading: isUserLoading, data: allUser = [] } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });
  const allStaff = allUser.filter((user) => user.role === "staff");

  const deleteStaffMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/staff/${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staff"]);
      Swal.fire("Deleted!", "Staff has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete staff", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStaffMutation.mutate(id);
      }
    });
  };
  //console.log(allStaff);

  const closeAddStaffModal = () => {
    setIsAddStaffOpen(false);
  };
  const closeUpdateStaffModal = () => {
    setIsUpdateStaffOpen(false);
  };
  if (isUserLoading) return <LoadingSpinner />;
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Staff</h1>
      <button
        onClick={() => setIsAddStaffOpen(true)}
        className="btn btn-primary"
      >
        Add Staff
      </button>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allStaff.map((staff, i) => (
                <tr key={staff._id}>
                  <th>{i + 1}</th>
                  <th>{staff.name}</th>
                  <th>{staff.email}</th>
                  <th>{staff.phone}</th>
                  <th>
                    <img
                      className="w-10 h-10 rounded"
                      src={staff?.image}
                      alt={staff.name}
                      referrerPolicy="no-referrer"
                    />
                  </th>
                  <th className="space-x-2">
                    <button
                      onClick={() => {
                        setSelectedStaff(staff);
                        setIsUpdateStaffOpen(true);
                      }}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(staff._id)}
                      className="btn btn-error text-white"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <AddStaffModal isOpen={isAddStaffOpen} closeModal={closeAddStaffModal} />
      {/* Update Staff Modal */}
      <UpdateStaffModal
        isOpen={isUpdateStaffOpen}
        closeModal={closeUpdateStaffModal}
        staff={selectedStaff}
      />
    </div>
  );
};

export default ManageStaff;
