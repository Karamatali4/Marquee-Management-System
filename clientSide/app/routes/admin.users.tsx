
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import axios from "axios";
import { getSession } from "~/session.server";
import "../components/style.css";
// --------------------
// User Type
// --------------------
type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  role: string;
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

    // throw new Response("Failed to fetch users", { status: 500 });
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

  const users = useLoaderData<User[]>();
  return (
    <Layout role="admin">
      <section className="bg-white py-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="max-w-full overflow-x-auto max-h-[50rem] lg:max-h-[50rem] xl:max-h-[50rem] 2xl:max-h-[50rem] overflow-y-auto shadow-xl rounded-xl custom-scroll" style={styles.scrollbar}>
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
                      <tr key={user.id} className="text-center text-amber-950 hover:bg-gray-100">
                        <td className="py-3 px-2 border">{index + 1}</td>
                        <td className="py-3 px-2 border">{user.username}</td>
                        <td className="py-3 px-2 border">{user.name}</td>
                        <td className="py-3 px-2 border">{user.email}</td>
                        <td className="py-3 px-2 border">{user.gender}</td>
                        <td className="py-3 px-2 border">{user.phone}</td>
                        <td className="py-3 px-2 border">{user.role.toUpperCase()}</td>
                        <td className="py-3 px-2 border">
                          <a
                            href={`/edit/${user.id}`}
                            className="bg-amber-500 text-white py-1 px-3 rounded hover:bg-amber-400"
                          >
                            Edit
                          </a>
                        </td>
                        <td className="py-3 px-2 border">
                          <button
                            onClick={() => alert(`Delete user: ${user.name}`)}
                            className="bg-amber-800 text-white py-1 px-3 rounded hover:bg-amber-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
