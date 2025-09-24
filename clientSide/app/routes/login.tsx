
import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import axios from "axios";
import LoginForm from "~/components/LoginForm";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getSession, commitSession } from "~/session.server";

interface ActionData {
  error?: string;
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

    const { token, role, user } = response.data; // 👈 directly pick user object

    const session = await getSession(request.headers.get("Cookie"));
    session.set("token", token);
    session.set("role", role);
    session.set("userId", user._id);
    session.set("user", user); // ✅ sirf user ka object save karna hai

    console.log("user data",user)
    return redirect(`/dashboard/${role}`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error: any) {
    const message =
      error.response?.data?.error || "Login failed. Please try again.";
    return json<ActionData>({ error: message }, { status: 400 });
  }
};


export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const role = session.get("role");

  // ✅ Redirect if user is already logged in
  if (token && role) {
    return redirect(`/dashboard/${role}`);
  }

  return null; // Allow access to login page if not authenticated
};


export default function Login() {
  const actionData = useActionData<ActionData>();
const [params] = useSearchParams();
  const expired = params.get("expired");

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
    
  }, [actionData]);
useEffect(() => {
    if (expired) {
      toast.info("Session expired. Please login again.");
    }
  }, [expired]);

  
  return <LoginForm error={actionData?.error} />;
}
