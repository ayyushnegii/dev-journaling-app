import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-center mb-8">
            <GitFork className="text-primary h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold tracking-tight">ThoughtFlow</h1>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-muted-foreground text-center mb-8">
            Sign in to continue your journey of thought.
        </p>
        
        <AuthForm mode="login" />

        <p className="text-center text-sm text-muted-foreground mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
