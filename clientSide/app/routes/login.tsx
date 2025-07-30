import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData, useNavigate } from "@remix-run/react";
import axios from "axios";
import LoginForm from "~/components/LoginForm";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ActionData {
  error?: string;
  token?: string;
  role?: string;
}

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
      // Save in localStorage
      localStorage.setItem("token", actionData.token);
      localStorage.setItem("role", actionData.role);

      // Show success toast and redirect
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
