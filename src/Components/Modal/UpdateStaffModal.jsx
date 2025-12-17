import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { imageURL } from "../../Utilities";
import { ImageIcon, Mail, User } from "lucide-react";

const UpdateStaffModal = ({ isOpen, closeModal, staff }) => {
  const queryClient = useQueryClient();
  console.log(staff);
  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm({
    defaultValues: {
      name: staff?.name,
      email: staff?.email,
      phone: staff?.phone,
    },
  });

  const updateStaffMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/staff/${staff._id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-user"]);
      toast.success("Staff updated successfully");
      closeModal();
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to update staff");
    },
  });

  const onSubmit = async (data) => {
    let photoURL = staff.image;

    if (data.photo && data.photo.length > 0) {
      photoURL = await imageURL(data.photo);
    }

    const updatedStaff = {
      name: data.name,
      email: data.email,
      image: photoURL,
    };
    console.log(updatedStaff);
    updateStaffMutation.mutate(updatedStaff);
  };

  return (
    <>
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
                <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 pt-4 pb-10">
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-indigo-600 text-white font-bold">
                        PIIRS
                      </div>
                      <div>
                        <h1 className="text-2xl font-semibold text-slate-900">
                          Update Staff Information
                        </h1>
                      </div>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <label className="block">
                        <span className="text-sm text-slate-600">
                          Full Name
                        </span>
                        <div className="mt-1 relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <User size={16} className="text-slate-400" />
                          </div>
                          <input
                            type="text"
                            className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                            placeholder="Your Name"
                            {...register("name", { required: true })}
                            defaultValue={staff?.name}
                          />
                        </div>
                        {errors.name?.type === "required" && (
                          <p role="alert" className="text-red-500 text-sm">
                            Name is required
                          </p>
                        )}
                      </label>

                      {/* Email */}
                      <label className="block">
                        <span className="text-sm text-slate-600">Email</span>
                        <div className="mt-1 relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Mail size={16} className="text-slate-400" />
                          </div>
                          <input
                            type="email"
                            className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                            placeholder="you@example.com"
                            {...register("email", { required: true })}
                            defaultValue={staff?.email}
                          />
                        </div>
                        {errors.email?.type === "required" && (
                          <p role="alert" className="text-red-500 text-sm">
                            Email is required
                          </p>
                        )}
                      </label>

                      {/* Photo Upload */}
                      <label className="block">
                        <span className="text-sm text-slate-600">
                          Profile Photo
                        </span>
                        <div className="mt-1 flex items-center gap-3 p-3 border rounded-lg border-slate-200">
                          <ImageIcon size={20} className="text-slate-400" />
                          <input
                            type="file"
                            accept="image/*"
                            className="text-sm"
                            {...register("photo")}
                          />
                        </div>
                      </label>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      >
                        Update Staff Information
                      </button>
                    </form>
                  </div>
                </div>
              </DialogTitle>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateStaffModal;
