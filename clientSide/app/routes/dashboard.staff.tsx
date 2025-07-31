import Layout from "~/components/Layout";
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function StaffDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "staff") navigate("/login");
  }, [navigate]);

  return (
    <Layout role="staff">
      <section className="mainSection mt-8">
        <h1 className="text-2xl text-amber-950 font-bold">Staff Dashboard</h1>
      <p className="text-amber-950">Staff-specific dashboard view text-amber-950</p>
      </section>
      
    </Layout>
  );
}
