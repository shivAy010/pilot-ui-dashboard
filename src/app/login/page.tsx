"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/custompages/auth/auth-form";
import { useToast } from "@/hooks/use-toast";
import { loginWithEmailPassword } from "@/services/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      await loginWithEmailPassword(email, password);
      navigate("/");
      toast({
        title: "Login successful",
        description: "Welcome to Sahej Life!",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm onSubmit={handleSubmit} loading={loading} error={error} />
  );
}
