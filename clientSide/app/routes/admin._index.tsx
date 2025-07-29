import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <h1 className="text-amber-950">Welcome to Admin Dashboard</h1>
  );
}
