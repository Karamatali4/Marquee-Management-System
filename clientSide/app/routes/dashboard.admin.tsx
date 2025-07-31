import Layout from "~/components/Layout";
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/login");
  }, [navigate]);

  return (
    <Layout role="admin">
      <h1 className="text-2xl font-bold text-amber-950">Admin Dashboard</h1>
      <p className="text-amber-950">Admin-only view. View bookings, menu, salary, etc.</p>
    </Layout>
  );
}
