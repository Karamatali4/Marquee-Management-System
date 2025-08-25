// app/routes/users.tsx
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import axios from "axios";

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
  password: string;
  role: string;
};

// --------------------
// COMPONENT
// --------------------
export default function UserDataTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // 👈 localStorage se token lena
    if (!token) {
      console.error("Token not found in localStorage");
      setLoading(false);
      return;
    }

    axios
      .get<User[]>("http://localhost:5000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 token dynamic use
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-lg">Loading users...</p>;

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            {/* Horizontal + Vertical Scroll */}
            <div className="max-w-full overflow-x-auto max-h-[500px] overflow-y-auto shadow-lg rounded-lg">
              <table className="table-auto w-full border border-gray-200">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-primary text-center">
                    {[
                      "Sr No",
                      "Username",
                      "Name",
                      "Email",
                      "Gender",
                      "Phone",
                      "Password",
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
                    <tr key={user.id} className="text-center hover:bg-gray-100">
                      <td className="py-3 px-2 border">{index + 1}</td>
                      <td className="py-3 px-2 border">{user.username}</td>
                      <td className="py-3 px-2 border">{user.name}</td>
                      <td className="py-3 px-2 border">{user.email}</td>
                      <td className="py-3 px-2 border">{user.gender}</td>
                      <td className="py-3 px-2 border">{user.phone}</td>
                      <td className="py-3 px-2 border">{user.password}</td>
                      <td className="py-3 px-2 border">{user.role}</td>
                      <td className="py-3 px-2 border">
                        <Link
                          to={`/edit/${user.id}`}
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="py-3 px-2 border">
                        <button
                          onClick={() => alert(`Delete user: ${user.name}`)}
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
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
  );
}
