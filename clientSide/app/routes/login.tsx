import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData, useNavigate } from "@remix-run/react";
import axios from "axios";
import LoginForm from "~/components/LoginForm";
import { useEffect } from "react";

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
    if (actionData?.token && actionData?.role) {
      localStorage.setItem("token", actionData.token);
      localStorage.setItem("role", actionData.role);

      // 🧭 Redirect user to role-based dashboard
      navigate(`/dashboard/${actionData.role}`);
    }
  }, [actionData, navigate]);

  return <LoginForm error={actionData?.error} />;
}
