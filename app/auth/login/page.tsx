"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", general: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
   try {
      const { data: res, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message ?? 'Invalid email or password.');
        setIsSubmitting(false);
        return;
      }

      if (res) {
        toast.success('Logged in successfully!');
        router.push('/');
        router.refresh();
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    const demoEmail = "demo@skillpilot.com";
    const demoPassword = "demopassword";
    
    try {
      const { data: res, error } = await authClient.signIn.email({
        email: demoEmail,
        password: demoPassword,
      });

      if (error) {
        // If it fails, likely the demo user doesn't exist yet, so let's create it
        const { error: signUpError } = await authClient.signUp.email({
          email: demoEmail,
          password: demoPassword,
          name: "Demo User",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser&backgroundColor=6366f1",
        });

        if (!signUpError) {
          // Sign in again after creation
          const { data: retryRes } = await authClient.signIn.email({
            email: demoEmail,
            password: demoPassword,
          });
          
          if (retryRes) {
            toast.success('Logged in as Demo User!');
            router.push('/');
            router.refresh();
            return;
          }
        }
        toast.error('Failed to login to demo account.');
      } else if (res) {
        toast.success('Logged in as Demo User!');
        router.push('/');
        router.refresh();
      }
    } catch {
      toast.error('Something went wrong during demo login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-slate-100">Welcome Back</h1>
        <p className="text-sm text-slate-400">Sign in to access your roadmaps</p>
      </div>

      {errors.general && (
        <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full rounded-lg border bg-slate-800/80 px-4 py-2.5 text-slate-100 transition-colors focus:border-indigo-500 focus:outline-none ${errors.email ? 'border-red-500' : 'border-white/10'}`}
            placeholder="you@example.com"
            disabled={isLoading}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-300">Password</label>
            <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot password?</a>
          </div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`w-full rounded-lg border bg-slate-800/80 px-4 py-2.5 text-slate-100 transition-colors focus:border-indigo-500 focus:outline-none ${errors.password ? 'border-red-500' : 'border-white/10'}`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : "Sign In"}
        </button>
      </form>

      <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-white/10 after:mt-0.5 after:flex-1 after:border-t after:border-white/10">
        <p className="mx-4 mb-0 text-center text-sm font-medium text-slate-500">
          OR
        </p>
      </div>

      <div className="space-y-3">
        <button 
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 py-3 font-semibold text-indigo-100 transition hover:bg-indigo-500/20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Demo Login (Instant Access)
        </button>

        <button 
          type="button" 
          className="flex w-full items-center justify-center rounded-full border border-white/10 bg-slate-800/70 py-3 font-semibold text-slate-200 transition hover:border-indigo-400/40"
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link href="/auth/register" className="font-medium text-indigo-400 hover:text-indigo-300">
          Sign up
        </Link>
      </p>
    </div>
  );
}
