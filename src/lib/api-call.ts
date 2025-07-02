import axios, { AxiosRequestConfig, Method } from "axios";

export async function apiCall<T = unknown>(
  method: Method,
  url: string,
  data?: unknown
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
    validateStatus: () => true, // We'll handle errors manually
  };

  const response = await axios.request<T>(config);

  if (response.status < 200 || response.status >= 300) {
    const errorMsg = (response.data as { message: string, [key: string]: unknown })?.message || "API request failed";
    throw new Error(errorMsg);
  }

  return response.data;
} 