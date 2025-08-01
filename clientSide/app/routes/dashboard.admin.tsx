import Layout from "~/components/Layout";
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { toast } from "react-toastify"; // 🆕 Add this if you want feedback to the user

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const expiresAt = Number(localStorage.getItem("expiresAt"));

    // ✅ Redirect if not admin
    if (role !== "admin") {
      navigate("/login");
      return;
    }

    // ✅ Redirect if token has expired
    if (Date.now() > expiresAt) {
      toast.error("Session expired. Please log in again."); // Optional user message
      localStorage.clear(); // Clear outdated token data
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <Layout role="admin">
      <h1 className="text-2xl font-bold text-amber-950">Admin Dashboard</h1>
      <p className="text-amber-950">Admin-only view. View bookings, menu, salary, etc.</p>
    </Layout>
  );
}