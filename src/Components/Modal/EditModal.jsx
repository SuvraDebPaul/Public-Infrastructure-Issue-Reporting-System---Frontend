import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import axios from "axios";
import { ImageIcon, Lock, Mail, User } from "lucide-react";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const EditModal = ({ closeModal, isOpen, issue }) => {
  console.log(issue);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editMutation = useMutation({
    mutationFn: async (updatedIssue) => {
      return await axios.put(
        `${import.meta.env.VITE_API_URL}/issues/${issue._id}`,
        updatedIssue
      );
    },
    onSuccess: () => {
      toast.success("Issue Updated Successfully");
      queryClient.invalidateQueries(["issue"]); // 🔥 <-- REFRESH UI
      closeModal();
    },
    onError: (error) => {
      console.log("ON ERROR", error);
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    const { tittle, category, location, description } = data;
    const updatedIssue = {
      tittle,
      category,
      location,
      description,
      updatedAt: new Date(),
    };
    editMutation.mutate(updatedIssue);
  };
  return (
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
            className="w-full max-w-3xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
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
                    Edit The Issue
                  </h1>
                  <p className="text-sm text-slate-500">
                    Your Complain Helps Us To Improve the City
                  </p>
                </div>
              </div>
            </DialogTitle>
            <div className="bg-linear-to-br from-base-100 to-base-200 pt-4 pb-10">
              <div className="p-8">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  {/* Issue Title */}
                  <label className="block">
                    <span className="text-sm text-slate-600">Issue Title</span>
                    <div className="mt-1 relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <User size={16} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                        placeholder="Issue Title"
                        defaultValue={issue.tittle}
                        {...register("tittle", { required: true })}
                      />
                    </div>
                    {errors.tittle?.type === "required" && (
                      <p role="alert" className="text-red-500 text-sm">
                        Title For the Issue is required
                      </p>
                    )}
                  </label>

                  {/* Category */}
                  <label className="block">
                    <span className="text-sm text-slate-600">Category</span>
                    <div className="mt-1 relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <Mail size={16} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                        placeholder="Issue Category"
                        defaultValue={issue.category}
                        {...register("category", { required: true })}
                      />
                    </div>
                    {errors.category?.type === "required" && (
                      <p role="alert" className="text-red-500 text-sm">
                        Issue Category is required
                      </p>
                    )}
                  </label>

                  {/* Location */}
                  <label className="block">
                    <span className="text-sm text-slate-600">Location</span>
                    <div className="mt-1 relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <Lock size={16} className="text-slate-400" />
                      </div>
                      <input
                        className="w-full pl-10 pr-10 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                        placeholder="Location"
                        defaultValue={issue.location}
                        {...register("location", { required: true })}
                      />
                    </div>
                    {errors.location?.type === "required" && (
                      <p role="alert" className="text-red-500 text-sm">
                        Location is required
                      </p>
                    )}
                  </label>
                  {/* Description */}
                  <label className="col-span-2">
                    <span className="text-sm text-slate-600">Description</span>
                    <textarea
                      className="w-full pl-4 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                      placeholder="Description"
                      defaultValue={issue.description}
                      {...register("description")}
                    />
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    {/* <TbFidgetSpinner className="animate-spin m-auto" /> */}
                    Re-submit Your Issue
                  </button>
                </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditModal;
