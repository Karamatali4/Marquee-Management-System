import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

// ✅ Use `type` instead of `interface`
type Role = "staff" | "admin";
type Page = "menu" | "salary" | "grocery";

// ✅ Correct mapped type declaration
type UrlMapping = {
  [role in Role]: {
    [page in Page]: string;
  };
};





// URL domain object with type safety
const urlDomain: UrlMapping = {
  staff: {
    menu: "/dashboard/staff/menu",
    salary: "/dashboard/staff/salary",
    grocery: "/dashboard/staff/grocery"
  },
  admin: {
    menu: "/dashboard/admin/menu",
    salary: "/dashboard/admin/salary",
    grocery: "/dashboard/admin/grocery"
  }
};

// Helper function to validate role
const isValidRole = (role: string): role is Role => {
  return ["staff", "admin", "manager"].includes(role);
};

export default function DashboardIndex() {
  const navigate = useNavigate();
  const defaultPage: Page = "menu"; // You can change this dynamically

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role || !isValidRole(role)) {
      navigate("/login");
    } else {
      navigate(urlDomain[role][defaultPage]);
    }
  }, [navigate]);

  return <p>Redirecting to your dashboard...</p>;
}