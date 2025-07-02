"use client";
import { useState } from "react";
import { Button } from "@/components/ui2/button";
import { Input } from "@/components/ui2/input";
import { Label } from "@/components/ui2/label";
import { Separator } from "@/components/ui2/separator";
import { Alert, AlertDescription } from "@/components/ui2/alert";
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { emailValidate, passwordValidate } from "@/lib/validate";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export default function AuthForm({ onSubmit, loading = false, error = null }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<{message: string, type: string} | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

      const emailError = emailValidate(email) as string;
      const passwordError = passwordValidate(password) as string;
      if (emailError) {
        setLocalError({message: emailError, type: "email"});
        return;
      }
      if (passwordError) {
        setLocalError({message: passwordError, type: "password"});
        return;
      }
    await onSubmit(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
        <p className="text-muted-foreground">Sign in to your admin account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
          {localError && localError.type === "email" && (
            <Alert variant="error" className="p-0 text-xs">
              <AlertDescription className="text-xs p-0">
                {localError.message}
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {!showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {localError && localError.type === "password" && (
            <Alert variant="error" className="p-0 text-xs">
              <AlertDescription className="text-xs p-0">
                {localError.message}
              </AlertDescription>
            </Alert>
          )}
        </div>
        {(error) && (
          <Alert variant="error" className="p-0 flex justify-center">
            <AlertDescription className="flex items-center gap-2 align-center">
              <AlertCircle className="h-4 w-4" /> {error}
            </AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Protected by Sahej Life
          </span>
        </div>
      </div>
    </div>
  );
}
