import { apiCall } from "@/lib/api-call";

export async function loginWithEmailPassword(email: string, password: string) {
  const data = await apiCall<{ access: string }>(
    "POST",
    "/auth/verify-otp",
    { email, password }
  );
  if (!data.access) throw new Error("No token returned from server.");
  localStorage.setItem("access", data.access);
  return data;
}

export function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}
