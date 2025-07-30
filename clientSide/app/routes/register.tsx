import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData, useNavigate } from "@remix-run/react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import RegisterForm from "~/components/RegisterForm";

interface ActionData {
  error?: string;
  success?: boolean;
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const username = form.get("username") as string;
  const name = form.get("name") as string;
  const email = form.get("email") as string;
  const gender = form.get("gender") as string;
  const phone = form.get("phone") as string;
  const password = form.get("password") as string;
  const role = form.get("role") as string;

  // Password validation
  if (password.length < 8) {
    return json<ActionData>({ error: "Password must be at least 8 characters" });
  }

  const apiUrl = process.env.API_URL || "http://localhost:5000";

  try {
    const response = await axios.post(`${apiUrl}/api/auth/register`, {
      username,
      name,
      email,
      gender,
      phone,
      password,
      role,
    });

    const token = response.data.token;

    // Save token if needed later (e.g., in cookie or localStorage via client)
    return json<ActionData>({ success: true });
  } catch (error: any) {
    const message =
      error.response?.data?.error || "Registration failed. Please try again.";
    return json<ActionData>({ error: message });
  }
};

export default function Register() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!actionData) return;

    if (actionData.success) {
      toast.success("Successfully Registered!", {
        autoClose: 1000,
        onClose: () => navigate("/login"),
      });
    } else if (actionData.error) {
      toast.error(actionData.error);
    }
  }, [actionData, navigate]);

  return <RegisterForm error={actionData?.error} />;
}
