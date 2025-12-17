import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Util/LoadingSpinner";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user: adminUser } = useAuth();
  const { isLoading: isUserLoading, data: allUser = [] } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });
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
                <td>{(user.isPremium && "Premium") || "Free"}</td>
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
                    onClick={() =>
                      blockUnblockMutation.mutate({
                        status: user.isBlocked,
                        email: user.email,
                      })
                    }
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
