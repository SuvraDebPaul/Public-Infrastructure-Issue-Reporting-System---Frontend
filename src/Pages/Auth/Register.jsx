import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaGoogle } from "react-icons/fa";
import { imageURL, saveOrUpdateUser } from "../../Utilities";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;
    //console.log({ name, email, password, photo });

    try {
      //1. User Registrarion
      await createUser(email, password);

      //2. Generate ImageURL From Selected File
      const photoURL = await imageURL(photo);
      //3. Update Profile image and name
      await updateUserProfile(name, photoURL);
      // console.log(result);
      //Save User in DB
      await saveOrUpdateUser({
        name,
        email,
        image: photoURL,
      });

      navigate(from, { replace: true });
      toast.success("User Registration Successful");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      //Save User In DB
      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });
      navigate(from, { replace: true });
      toast.success("User Registration With Google Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 pt-4 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-indigo-600 text-white font-bold">
              PIIRS
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Create an account
              </h1>
              <p className="text-sm text-slate-500">Join us and get started</p>
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
                  {...register("password", { required: true, minLength: 6 })}
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
              <span className="text-sm text-slate-600">Profile Photo</span>
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
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <div className="text-xs text-slate-400">Or continue with</div>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-secondary w-full"
            >
              <FaGoogle size={16} />
              <span className="text-sm">Google</span>
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-slate-50 p-4 text-center text-xs text-slate-500">
          Your information is securely stored and never shared
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
