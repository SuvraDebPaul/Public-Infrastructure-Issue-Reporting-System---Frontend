import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const AssignStaffModal = ({ closeModal, isOpen, allUser, issueId }) => {
  const { user } = useAuth();
  //   console.log(allUser, issueId);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const updateStaffMutation = useMutation({
    mutationFn: async (updateStaff) => {
      return await axios.put(
        `${import.meta.env.VITE_API_URL}/issues/${issueId}`,
        updateStaff
      );
    },
    onSuccess: () => {
      toast.success("Staff Assigned Successfully");

      queryClient.invalidateQueries(["all-issues"]); // 🔥 <-- REFRESH UI
      closeModal();
    },
    onError: (error) => {
      console.log("ON ERROR", error);
    },
  });

  const onSubmit = (data) => {
    const { assignStaff } = data;
    const updateStaff = {
      assignedStaffId: assignStaff,
      assignedA: new Date(),
      timeline: {
        status: `Assigned`,
        message: `Staff Assigned to Mr. ${assignStaff}`,
        updatedBy: `${user.email}`,
      },
    };
    updateStaffMutation.mutate(updateStaff);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-indigo-600 text-white font-bold">
                    PIIRS
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                      Assign Staff For This Issue
                    </h1>
                  </div>
                </div>
              </DialogTitle>
              <div className="bg-linear-to-br from-base-100 to-base-200 pt-4 pb-10">
                <div className="p-8">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                  >
                    {/* Staff Name */}
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Staff Name</legend>
                      <select
                        defaultValue="Assign Staff"
                        className="select w-full"
                        {...register("assignStaff")}
                      >
                        <option disabled={true}>Assign Staff</option>
                        {allUser.map((user) => (
                          <option key={user._id}>{user.name}</option>
                        ))}
                      </select>
                    </fieldset>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      Assign
                    </button>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AssignStaffModal;
