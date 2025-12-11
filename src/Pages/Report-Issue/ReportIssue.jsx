import React from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, Image as ImageIcon } from "lucide-react";
import { imageURL } from "../../Utilities";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../../Util/LoadingSpinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const ReportIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    isLoading,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => {
      return await axios.post(
        `${import.meta.env.VITE_API_URL}/report-issue`,
        payload
      );
    },
    onSuccess: () => {
      //console.log("ON SUCCESS", data);
      //show toast
      toast.success("Issues Submitted Successfully");
      mutationReset();
      navigate("/dashboard/my-issues");
      //show query key invalidate
    },
    onError: (error) => {
      console.log("ON ERROR", error);
    },
    // onMutate: (payload) => {
    //   console.log("I Will Post This Data", payload);
    // },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { tittle, category, location, description, issueImage } = data;
    const issueImageURL = await imageURL(issueImage);
    console.log(issueImageURL);
    const newIssue = {
      tittle,
      category,
      location,
      description,
      image: issueImageURL,
      status: "pending",
      priority: "normal",
      boosted: false,
      boostPaidBy: null,
      upvotes: 0,
      upvotedBy: [],
      createdBy: user?.displayName,
      userEmail: user?.email,
      assignedStaffId: null,
      timeline: [
        {
          status: "pending",
          message: "Issue created by user",
          createdAt: new Date(),
          updatedBy: user?.email,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await mutateAsync(newIssue);

    reset();
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 pt-4 pb-10">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-indigo-600 text-white font-bold">
            PIIRS
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Create an Issue
            </h1>
            <p className="text-sm text-slate-500">
              Your Complain Helps Us To Improve the City
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
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
                {...register("location", { required: true })}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                placeholder="Location"
              />
            </div>
            {errors.location?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm">
                Location is required
              </p>
            )}
          </label>

          {/* Photo Upload */}
          <label className="block">
            <span className="text-sm text-slate-600">Issue Image</span>
            <div className="mt-1 flex items-center gap-3 p-3 border rounded-lg border-slate-200">
              <ImageIcon size={20} className="text-slate-400" />
              <input
                type="file"
                accept="image/*"
                className="text-sm"
                {...register("issueImage")}
              />
            </div>
          </label>

          {/* Description */}
          <label className="col-span-2">
            <span className="text-sm text-slate-600">Description</span>
            <textarea
              {...register("description")}
              className="w-full pl-4 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
              placeholder="Description"
            />
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {isLoading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Submit Your Issue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
