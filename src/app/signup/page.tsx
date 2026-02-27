import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { GitFork } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-center mb-8">
            <GitFork className="text-primary h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold tracking-tight">ThoughtFlow</h1>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Create Your Account</h2>
        <p className="text-muted-foreground text-center mb-8">
            Start capturing and connecting your ideas today.
        </p>
        
        <AuthForm mode="signup" />

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
