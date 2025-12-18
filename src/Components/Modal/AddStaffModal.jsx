import React, { useState } from "react";
import toast from "react-hot-toast";
import { imageURL } from "../../Utilities";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ImageIcon, Lock, Mail, User } from "lucide-react";
import { TbFidgetSpinner } from "react-icons/tb";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const AddStaffModal = ({ isOpen, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const addStaffMutation = useMutation({
    mutationFn: async (newStaff) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/staff`,
        newStaff
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-user"]);
      toast.success("Staff Added Successful");

      closeModal();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add staff");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let { name, email, password, photo } = data;
    email = email.toLowerCase();
    try {
      const photoURL = await imageURL(photo);

      const newStaff = { name, email, phone: "", image: photoURL, password };
      //Save User in DB
      addStaffMutation.mutate(newStaff);
    } catch (error) {
      console.log(error);
    }
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
                        Create a Staff Account
                      </h1>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <label className="block">
                      <span className="text-sm text-slate-600">Full Name</span>
                      <div className="mt-1 relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <User size={16} className="text-slate-400" />
                        </div>
                        <input
                          type="text"
                          className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                          placeholder="Your Name"
                          {...register("name", { required: true })}
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
                        />
                      </div>
                      {errors.email?.type === "required" && (
                        <p role="alert" className="text-red-500 text-sm">
                          Email is required
                        </p>
                      )}
                    </label>

                    {/* Password */}
                    <label className="block">
                      <span className="text-sm text-slate-600">Password</span>
                      <div className="mt-1 relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <Lock size={16} className="text-slate-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          {...register("password", {
                            required: true,
                            minLength: 6,
                          })}
                          className="w-full pl-10 pr-10 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                          placeholder="Create a password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      {errors.password?.type === "required" && (
                        <p role="alert" className="text-red-500 text-sm">
                          Password is required
                        </p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p role="alert" className="text-red-500 text-sm">
                          Password Must Be 6 Character
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
                      Create Staff Account
                    </button>
                  </form>
                </div>
              </div>
            </DialogTitle>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddStaffModal;
