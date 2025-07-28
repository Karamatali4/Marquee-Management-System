// routes/admin._index.tsx
import { useEffect } from "react";

export default function AdminDashboard() {
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      window.location.href = "/login"; // or "/dashboard"
    }
  }, []);

  return (<>
  <h1>Welcome to Admin Dashboard</h1>;
  </>);
}