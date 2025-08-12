import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";

export function useAuthGuard(allowedRole: string) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role || role !== allowedRole) {
      navigate("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [navigate, allowedRole]);

  return isAuthorized;
}