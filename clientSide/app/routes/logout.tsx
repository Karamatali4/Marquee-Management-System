import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { destroySession, getSession } from "~/session.server";

// --------------------
// Server: clear session but don't redirect yet
// --------------------
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  return json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    }
  );
};

// --------------------
// Client: show toast then redirect
// --------------------
export default function Logout() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (data.ok && !hasShownToast.current) {
      hasShownToast.current = true; // ✅ guard lagaya
      toast.success("You have been logged out!", {
        autoClose: 1000,
        onClose: () => navigate("/login"),
      });
    }
  }, [data, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Logging you out...</p>
    </div>
  );
}
