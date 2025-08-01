import Layout from "~/components/Layout";
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { toast } from "react-toastify"; // 🆕 Optional: notify user when session expires

export default function StaffDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const expiresAt = Number(localStorage.getItem("expiresAt"));

    // ✅ Redirect if not staff
    if (role !== "staff") {
      navigate("/login");
      return;
    }

    // ✅ Redirect if token has expired
    if (Date.now() > expiresAt) {
      toast.error("Session expired. Please log in again."); // Optional feedback
      localStorage.clear();
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <Layout role="staff">
      <section className="mainSection mt-8">
        <h1 className="text-2xl text-amber-950 font-bold">Staff Dashboard</h1>
        <p className="text-amber-950">
          Staff-specific dashboard view. Access tasks, schedule, inventory, and more.
        </p>
      </section>
    </Layout>
  );
}