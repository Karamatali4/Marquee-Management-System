
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import axios from "axios";
import { getSession } from "~/session.server";
import "../components/style.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
// --------------------
// User Type
// --------------------
type User = {
  _id: number;
  username: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  role: string;
};



export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const userId = formData.get("id");
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!token || !userId) return json({ status: "error" });

  if (intent === "delete") {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return json({ status: "deleted" });
    } catch (error) {
      console.error("Delete failed:", error);
      return json({ status: "error" });
    }
  }

  return json({ status: "error" });
};

// --------------------
// Loader (server-side)
// --------------------
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const role = session.get("role");
try {
  // Agar login hi nahi hai → login page
  if (!token || !role) {
    return redirect("/login");
  }

  // Agar role admin nahi hai → unauthorized
  if (role !== "admin") {
    return redirect("/unauthorized"); // ya login pe bhej do
  }

  
    const res = await axios.get<User[]>("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data || "";
  } catch (error) {
    console.log("Error fetching users:", error);

    throw new Response("Failed to fetch users", { status: 500 });
  }
};



const styles: { scrollbar: React.CSSProperties } = {
  scrollbar: {
    overflowY: "scroll",
    scrollBehavior: "smooth",
    
  },
};



// --------------------
// Component (client)
// --------------------
export default function AdminUsers() {
const fetcher = useFetcher();

  const users = useLoaderData<User[]>();
  
  useEffect(() => {
    if ((fetcher.data as { status?: string })?.status === "deleted") {
  toast.success("User deleted successfully!");
}
if ((fetcher.data as { status?: string })?.status === "error") {
  toast.success("Failed to delete user.");
}
    
  }, [fetcher.data]);

  return (
    <Layout role="admin">
      <section className="bg-white ">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="max-w-full overflow-x-auto  max-h-[70vh] lg:max-h-auto xl:max-h-auto 2xl:max-h-auto overflow-y-auto shadow-xl rounded-xl custom-scroll" style={styles.scrollbar} >
                <div
  className="overflow-y-auto shadow-xl rounded-xl custom-scroll"
>

                <table className="table-auto w-full border border-gray-200">
                  <thead className="sticky top-0 z-10 ">
                    <tr className="bg-amber-800 text-amber-50 pb-5 mb-5">
                      {[
                        "Sr No",
                        "Username",
                        "Name",
                        "Email",
                        "Gender",
                        "Phone",
                        "Role",
                        "Edit",
                        "Delete",
                      ].map((heading, index) => (
                        <th
                          key={index}
                          className="min-w-[120px] text-lg font-semibold text-white py-4 px-3 border border-gray-200"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id} className="text-center text-amber-950 hover:bg-gray-100">
                        <td className="py-3 px-2 border">{index + 1}</td>
                        <td className="py-3 px-2 border">{user.username}</td>
                        <td className="py-3 px-2 border">{user.name}</td>
                        <td className="py-3 px-2 border">{user.email}</td>
                        <td className="py-3 px-2 border">{user.gender}</td>
                        <td className="py-3 px-2 border">{user.phone}</td>
                        <td className="py-3 px-2 border">{user.role?.toUpperCase()}</td>
                        <td className="py-3 px-2 border">
                          

                          <Link
  to={`/editUser/${user._id}`}
  className="bg-amber-500 text-white py-1 px-3 rounded hover:bg-amber-400"
>
  Edit
</Link>

                        </td>
                        <td className="py-3 px-2 border">
                          {/* <button
                            onClick={() => alert(`Delete user: ${user.name}`)}
                            className="bg-amber-800 text-white py-1 px-3 rounded hover:bg-amber-700"
                          >

                            Delete
                          </button> */}
                          <fetcher.Form method="post">
  <input type="hidden" name="id" value={user._id} />
  <button
    type="submit"
    name="intent"
    value="delete"
    className="bg-amber-800 text-white py-1 px-3 rounded hover:bg-amber-700"
  >
    Delete
  </button>
</fetcher.Form>


                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
