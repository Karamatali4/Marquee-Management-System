// routes/dashboard._index.tsx
import { useEffect } from "react";

export default function DashboardIndex() {
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      window.location.href = "/login";
      return;
    }

    if (role === "admin") {
      window.location.href = "/admin";
    } else if (role === "staff") {
      window.location.href = "/staff";
    } else {
      window.location.href = "/user";
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