// 📁 frontend/app/routes/register.tsx
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import axios from "axios";
import RegisterForm from "~/components/RegisterForm";

interface ActionData {
  error?: string;
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

    const isProduction = process.env.NODE_ENV === "production";
    const cookie = `token=${token}; Path=/; HttpOnly; ${
      isProduction ? "Secure; SameSite=Strict" : ""
    }`;

    return redirect("/login", {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error: any) {
    const message =
      error.response?.data?.error || "Registration failed. Please try again.";
    return json<ActionData>({ error: message });
  }
};

export default function Register() {
  const actionData = useActionData<ActionData>();
  return <RegisterForm error={actionData?.error} />;
}