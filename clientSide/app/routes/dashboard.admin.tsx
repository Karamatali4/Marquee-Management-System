// import Layout from "~/components/Layout";
// import { useEffect } from "react";
// import { useNavigate } from "@remix-run/react";
// import { toast } from "react-toastify"; // 🆕 Add this if you want feedback to the user

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     const expiresAt = Number(localStorage.getItem("expiresAt"));

//     // ✅ Redirect if not admin
//     if (role !== "admin") {
//       navigate("/login");
//       return;
//     }

//     // ✅ Redirect if token has expired
//     if (Date.now() > expiresAt) {
//       toast.error("Session expired. Please log in again."); // Optional user message
//       localStorage.clear(); // Clear outdated token data
//       navigate("/login");
//       return;
//     }
//   }, [navigate]);

//   return (
//     <Layout role="admin">
//       <h1 className="text-2xl font-bold text-amber-950">Admin Dashboard</h1>
//       <p className="text-amber-950">Admin-only view. View bookings, menu, salary, etc.</p>
//     </Layout>
//   );
// }





// app/routes/dashboard.admin.tsx
import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/session.server";
import Layout from "~/components/Layout";

type LoaderData = {
  role: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const role = session.get("role");
  const token = session.get("token");

  // ✅ Agar login hi nahi hai
  if (!role || !token) {
    return redirect("/login");
  }

  // ✅ Agar admin nahi hai
  if (role !== "admin") {
    return redirect("/login");
  }

  return { role };
};

export default function AdminDashboard() {
  const { role } = useLoaderData<LoaderData>();

  return (
    <Layout role={role}>
      <h1 className="text-2xl font-bold text-amber-950">Admin Dashboard</h1>
      <p className="text-amber-950">
        Admin-only view. View bookings, menu, salary, etc.
      </p>
    </Layout>
  );
}
