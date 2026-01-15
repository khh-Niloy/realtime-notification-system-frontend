import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Eye, EyeOff, ArrowLeft } from "lucide-react";
import registerBg from "@/assets/images/register.jpg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/user/user.api";
import toast from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation();

  const registerSchema = z
    .object({
      name: z.string().min(2, "Full name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type RegisterSchema = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const { confirmPassword, ...registerData } = data;
      const res = await registerUser(registerData).unwrap();
      if (res.success) {
        toast.success("Account created successfully! Please login.");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(
        error.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url(${registerBg})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-gray-900/30 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-white text-center">
          <Link
            to="/"
            className="absolute top-12 left-12 flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-white p-2.5 rounded-lg">
                <Bell className="w-6 h-6 text-black" />
              </div>
            </div>
            <span className="text-2xl font-bold">NotifyHub</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Create Account
            </h2>
            <p className="text-muted-foreground">
              Join our community of professionals today.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                NAME
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/20 outline-none transition-all"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/20 outline-none transition-all"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground"
                >
                  CONFIRM
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-black hover:bg-gray-800 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Join the Community"}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-foreground hover:underline font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground">
            By joining, you agree to our{" "}
            <Link
              to="/terms"
              className="underline hover:text-foreground transition-colors"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="underline hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
