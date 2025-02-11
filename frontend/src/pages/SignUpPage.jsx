import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errorValidation, setErrorValidation] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  function validateForm(name, value) {
    setErrorValidation((prev) => ({
      ...prev,
      [name]:
        name === "fullName" && value.trim().length < 3
          ? "Full name must be at least 3 characters long"
          : name === "email" && value.trim().length < 3
          ? "Email must be at least 3 characters long"
          : name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Email must be valid"
          : name === "password" && value.length < 6
          ? "Password must be at least 6 characters long"
          : "",
    }));
  }

  const { isSigningUp, signup } = useAuthStore();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() === "") {
      setErrorValidation((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function onBlur(e) {
    const { name, value } = e.target;
    validateForm(name, value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="tex-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium mb-1">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  name="fullName"
                  type="text"
                  className={`input_form input-bordered  w-full pl-10`}
                  placeholder="Jahne Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={onBlur}
                />
              </div>
              {errorValidation.fullName && (
                <p className="text-red-500 text-xs">
                  {errorValidation.fullName}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium mb-1">E-mail</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  name="email"
                  type="email"
                  className={`input_form input-bordered  w-full pl-10`}
                  placeholder="johndoe@wp.pl"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={onBlur}
                />
              </div>
              {errorValidation.email && (
                <p className="text-red-500 text-xs">{errorValidation.email}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium mb-1">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`input_form input-bordered  w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={onBlur}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center "
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {errorValidation.password && (
                <p className="text-red-500 text-xs ">
                  {errorValidation.password}
                </p>
              )}
            </div>
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin">Loading...</Loader2>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">Already have a account? </p>
            <Link to={"/login"} className="link link-primary">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex">
        <video
          className="h-screen w-full object-contain"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/2.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
}
