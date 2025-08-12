import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export function useAuthGuard(allowedRole: string) {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role || role !== allowedRole) {
      navigate("/login");
    }
  }, [navigate, allowedRole]);
}