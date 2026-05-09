import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/auth";
import { Hexagon } from "lucide-react";

interface AuthModalProps {
  onSuccess?: () => void;
}

export function AuthModal({ onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await authApi.login(signInData.email, signInData.password);
      onSuccess?.();
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const fullName = `${signUpData.firstName} ${signUpData.lastName}`.trim();
      await authApi.register(signUpData.email, signUpData.password, fullName);
      onSuccess?.();
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left side: Form */}
      <div className="flex w-full lg:w-1/2 flex-col px-8 sm:px-16 lg:px-24 py-12 justify-center">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12 text-foreground">
            <Hexagon className="h-6 w-6" fill="currentColor" strokeWidth={1.5} />
            <span className="text-xl font-bold tracking-tight">HoteliaOS</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-8 tracking-tight">
            {mode === "signup" ? "Create an account" : "Sign in"}
          </h1>

          {mode === "signup" ? (
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-bold text-foreground">
                    First Name
                  </label>
                  <input 
                    required
                    value={signUpData.firstName}
                    onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
                    className="w-full rounded-md border border-border bg-transparent px-3 py-3 text-sm outline-none transition-colors focus:border-primary text-foreground placeholder:text-muted-foreground/60" 
                    placeholder="e.g. Howard" 
                  />
                </div>
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-bold text-foreground">
                    Last Name
                  </label>
                  <input 
                    required
                    value={signUpData.lastName}
                    onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
                    className="w-full rounded-md border border-border bg-transparent px-3 py-3 text-sm outline-none transition-colors focus:border-primary text-foreground placeholder:text-muted-foreground/60" 
                    placeholder="e.g. Thurman" 
                  />
                </div>
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-bold text-foreground">
                  Email
                </label>
                <input 
                  required
                  type="email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                  className="w-full rounded-md border border-border bg-transparent px-3 py-3 text-sm outline-none transition-colors focus:border-primary text-foreground placeholder:text-muted-foreground/60" 
                  placeholder="e.g. howard.thurman@gmail.com" 
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-bold text-foreground">
                  Password
                </label>
                <input 
                  required
                  type="password"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                  className="w-full rounded-md border border-border bg-transparent px-3 py-3 text-sm outline-none transition-colors focus:border-primary text-foreground" 
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" disabled={isLoading} className="w-full h-12 text-[15px] font-semibold mt-2 rounded-lg bg-primary hover:bg-primary/90">
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>

              <p className="text-[13px] text-foreground mt-6 font-medium">
                Have an account?{" "}
                <button type="button" onClick={() => { setMode("signin"); setError(""); }} className="text-primary hover:underline">
                  Sign In
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-bold text-foreground">
                  Email
                </label>
                <input 
                  required
                  type="email"
                  value={signInData.email}
                  onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                  className="w-full rounded-md border border-border bg-transparent px-3 py-3 text-sm outline-none transition-colors focus:border-primary text-foreground placeholder:text-muted-foreground/60" 
                  placeholder="e.g. howard.thurman@gmail.com" 
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-bold text-foreground">
                  Password
                </label>
                <input 
                  required
                  type="password"
                  value={signInData.password}
                  onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                  className="w-full rounded-md border border-border bg-transparent px-3 py-3 text-sm outline-none transition-colors focus:border-primary text-foreground" 
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" disabled={isLoading} className="w-full h-12 text-[15px] font-semibold mt-2 rounded-lg bg-primary hover:bg-primary/90">
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <p className="text-[13px] text-foreground mt-6 font-medium">
                Don't have an account?{" "}
                <button type="button" onClick={() => { setMode("signup"); setError(""); }} className="text-primary hover:underline">
                  Sign Up
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Right side: Solid Primary Color */}
      <div className="hidden lg:block lg:w-1/2 bg-primary"></div>
    </div>
  );
}
