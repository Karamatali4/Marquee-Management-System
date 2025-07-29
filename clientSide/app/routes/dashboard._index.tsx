// routes/dashboard._index.tsx
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export default function DashboardIndex() {
    const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
        navigate("/login")
      return;
    }

    if (role === "admin") {
        navigate("/admin")

    } else if (role === "staff") {
        navigate("/staff")

    } else {
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