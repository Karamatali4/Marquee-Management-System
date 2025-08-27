import { json } from "@remix-run/node";
import { getSession } from "~/session.server";

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const role = session.get("role");

  return json({ role });
};