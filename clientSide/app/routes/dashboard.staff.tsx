// app/routes/dashboard.staff.tsx
import type { LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { getSession } from "~/session.server";

// Loader: server-side auth check using cookies
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const role = session.get("role");
  const token = session.get("token");

  if (!token || role !== "staff") {
    // ❌ Not logged in or not staff
    return redirect("/login");
  }

  // ✅ return role if valid
  return json({ role });
};

export default function StaffDashboard() {
  const { role } = useLoaderData<{ role: string }>();

  return (
    <Layout role={role}>
      <section className="mainSection mt-8">
        <h1 className="text-2xl text-amber-950 font-bold">Staff Dashboard</h1>
        <p className="text-amber-950">
          Staff-specific dashboard view. Access tasks, schedule, inventory, and more.
        </p>
      </section>
    </Layout>
  );
}
