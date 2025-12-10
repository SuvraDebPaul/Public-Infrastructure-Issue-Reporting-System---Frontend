import React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { signInWithGoogle, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    // UI-only: replace with real auth call when ready
    //  console.log({ email, password });

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success("User Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success("User Registration With Google Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-100 to-base-300 pt-2 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl ring-1 ring-slate-200 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-indigo-600 text-white font-bold">
              SB
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Welcome back
              </h1>
              <p className="text-sm text-slate-500">
                Sign in to continue to your account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                  placeholder="Enter your password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password?.type === "minLength" && (
                <p role="alert" className="text-red-500 text-sm">
                  Password Must Be 6 Character
                </p>
              )}
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-600">Remember me</span>
              </label>

              <a href="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Sign in"
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
              className="btn btn-secondary btn-block"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle size={16} />
              <span className="text-sm">Google</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link
              to="/auth/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <div className="bg-slate-50 p-4 text-center text-xs text-slate-500">
          Secure sign-in · Your data is never shared without consent
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
