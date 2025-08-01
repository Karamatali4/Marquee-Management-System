import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData, useNavigate } from "@remix-run/react";
import axios from "axios";
import LoginForm from "~/components/LoginForm";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface ActionData {
  error?: string;
  token?: string;
  role?: string;
}

// 🚀 Server-side login logic (unchanged)
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

  // ✅ NEW: Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const expiresAt = Number(localStorage.getItem("expiresAt"));

    if (token && role && Date.now() < expiresAt) {
      toast.info("You're already logged in");
      navigate(`/dashboard/${role}`);
    }
  }, [navigate]);

  // ✅ Handle login result and store session
  useEffect(() => {
    if (!actionData) return;

    if (actionData.token && actionData.role) {
      const decoded: { exp: number } = jwtDecode(actionData.token);
      const expiry = decoded.exp * 1000;

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