// 📁 frontend/app/routes/login.tsx
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import axios from "axios";

import LoginForm from "~/components/LoginForm";

interface ActionData {
  error?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;

  const apiUrl = process.env.API_URL || "http://localhost:5000";

  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      username,
      password,
    });

    const token = response.data.token;

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  } catch (error: any) {
    const message =
      error.response?.data?.error || "Login failed. Please try again.";
    return json<ActionData>({ error: message });
  }
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  return (
<>

<LoginForm error={actionData?.error} />

</>
  );
  
  
}