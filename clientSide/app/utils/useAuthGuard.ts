import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";

export function useAuthGuard(allowedRole: string) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkRole() {
      try {
        const res = await fetch("/api/auth/role");
        const data = await res.json();

        if (!data.role || data.role !== allowedRole) {
          navigate("/login");
        } else {
          setIsAuthorized(true);
        }
      } catch (err) {
        console.error("Role check failed:", err);
        navigate("/login");
      }
    }

    checkRole();
  }, [allowedRole, navigate]);

  return isAuthorized;
}