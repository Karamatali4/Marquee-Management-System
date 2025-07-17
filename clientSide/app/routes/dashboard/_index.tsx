// app/routes/dashboard._index.tsx
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  // 1. Get token from cookies
  const cookie = request.headers.get("Cookie") || "";
  const token = cookie.split("token=")[1]?.split(";")[0];

  if (!token) {
    return redirect("/login");
  }

  // 2. Verify token with backend
  try {
    const response = await fetch("http://localhost:5000/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Invalid token");
    }

    const userData = await response.json();
    return json({ user: userData });
  } catch (error) {
    return redirect("/login");
  }
};

export default function DashboardIndex() {
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      window.location.href = "/login";
      return;
    }

    if (role === "admin") {
      window.location.href = "/dashboard/admin";
    } else if (role === "staff") {
      window.location.href = "/dashboard/staff";
    } else {
      window.location.href = "/dashboard/user";
    }
  }, []);

  return <p>Redirecting to correct dashboard...</p>;
}

export function ErrorBoundary() {
  return (
    <div className="p-4 text-red-500">
      <h1 className="text-xl font-bold">Dashboard Error</h1>
      <p>Failed to load dashboard data</p>
    </div>
  );
}