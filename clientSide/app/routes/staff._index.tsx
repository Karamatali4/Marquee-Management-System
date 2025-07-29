import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function StaffDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "staff" && role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="text-amber-950 ">Welcome to Staff Dashboard</div>
  );
}
