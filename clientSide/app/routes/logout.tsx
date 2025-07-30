import { useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";
import { toast } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (hasLoggedOut.current) return;
    hasLoggedOut.current = true;

    // Clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Show toast
    toast.success("You have been logged out!", {
  autoClose: 1000,
  onClose: () => navigate("/login"),
});
  }, [navigate]);

  
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Logging you out...</p>
    </div>
  );
}
