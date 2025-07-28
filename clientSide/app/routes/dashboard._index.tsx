// routes/dashboard._index.tsx
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export default function DashboardIndex() {
    const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
        navigate("/login")
    //   window.location.href = "/login";
      return;
    }

    if (role === "admin") {
    //   window.location.href = "/admin";
        navigate("/admin")

    } else if (role === "staff") {
    //   window.location.href = "/staff";
        navigate("/staff")

    } else {
    //   window.location.href = "/user";
        navigate("/user")

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