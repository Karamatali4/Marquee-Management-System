import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function DashboardIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const url = `/dashhboard/${role}` && `/${role}`
    
    if (!role) {
      navigate("/login");
    } else {
      navigate(url);
    }
  }, [navigate]);

  return <p>Redirecting to your dashboard...</p>;
}
