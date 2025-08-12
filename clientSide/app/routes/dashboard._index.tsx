import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";




export default function DashboardIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      navigate("/login");
    } else {
      
      navigate(`/dashboard/${role}`);
    }
  }, [navigate]);

  return <p>Redirecting to your dashboard...</p>;
}