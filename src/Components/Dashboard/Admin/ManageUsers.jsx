import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Util/LoadingSpinner";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user: adminUser } = useAuth();

  // Fetch all users
  const { isLoading: isUserLoading, data: allUser = [] } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });

  // Mutation for block/unblock
  const blockUnblockMutation = useMutation({
    mutationFn: async ({ status, email }) => {
      const updateUser = {
        email,
        isBlocked: !status,
        blockedBy: adminUser.email,
      };

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/block`,
        updateUser
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-user"]);
    },
  });

  // SweetAlert2 handler
  const handleBlockUnblock = (user) => {
    const action = user.isBlocked ? "Unblock" : "Block";

    Swal.fire({
      title: `${action} User?`,
      text: `Are you sure you want to ${action.toLowerCase()} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: user.isBlocked ? "#16a34a" : "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        blockUnblockMutation.mutate(
          {
            status: user.isBlocked,
            email: user.email,
          },
          {
            onSuccess: () => {
              Swal.fire({
                title: `${action}ed!`,
                text: `User has been ${action.toLowerCase()}ed successfully.`,
                icon: "success",
              });
            },
          }
        );
      }
    });
  };

  if (isUserLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allUser.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isPremium ? "Premium" : "Free"}</td>

                <td>
                  <span
                    className={`badge ${
                      user.isBlocked ? "badge-error" : "badge-success"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => handleBlockUnblock(user)}
                    className={`btn btn-sm ${
                      user.isBlocked ? "btn-success" : "btn-error"
                    }`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
