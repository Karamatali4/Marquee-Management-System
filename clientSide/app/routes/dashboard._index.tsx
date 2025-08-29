import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { getSession } from "~/session.server";

// ✅ Server-side loader with redirect
export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const role = session.get("role");

  if (!role) {
    return redirect("/login");
  }

  return redirect(`/dashboard/${role}`);
};

export default function DashboardIndex() {
  const navigate = useNavigate();
  const { role } = useLoaderData<typeof loader>();

  useEffect(() => {
    navigate(`/dashboard/${role}`);
  }, [navigate, role]);

  return <p>Redirecting to your dashboard...</p>;
}