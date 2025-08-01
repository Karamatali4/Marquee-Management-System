import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData, useNavigate } from "@remix-run/react";
import axios from "axios";
import LoginForm from "~/components/LoginForm";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode"; // ✅ NEW

interface ActionData {
  error?: string;
  token?: string;
  role?: string;
}

// 💡 This is unchanged
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;

  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      username,
      password,
    });

    const { token, role } = response.data;

    return json<ActionData>({ token, role });
  } catch (error: any) {
    const message =
      error.response?.data?.error || "Login failed. Please try again.";
    return json<ActionData>({ error: message });
  }
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!actionData) return;

    if (actionData.token && actionData.role) {
      // ✅ Decode token to get expiry
      const decoded: { exp: number } = jwtDecode(actionData.token);
      const expiry = decoded.exp * 1000; // convert to ms

      // ✅ Store token, role, and expiry in localStorage
      localStorage.setItem("token", actionData.token);
      localStorage.setItem("role", actionData.role);
      localStorage.setItem("expiresAt", expiry.toString());

      toast.success("Login successful!", {
        autoClose: 1000,
        onClose: () => navigate(`/dashboard/${actionData.role}`),
      });
    } else if (actionData.error) {
      toast.error(actionData.error);
    }
  }, [actionData, navigate]);

  return <LoginForm error={actionData?.error} />;
}