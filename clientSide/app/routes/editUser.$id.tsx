import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form, Link, useNavigate } from "@remix-run/react";
import axios from "axios";
import Layout from "~/components/Layout";
import { getSession } from "~/session.server";

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
// Loader: Get user by ID
// --------------------
export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!token) return redirect("/login");

  const res = await axios.get<User>(`http://localhost:5000/api/admin/users/${params.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("params data:", params.id )
  return json(res.data);
}

// --------------------
// Action: Update user
// --------------------
export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  const formData = await request.formData();
  const username = formData.get("username");
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const gender = formData.get("gender");
  const role = formData.get("gender");

  await axios.put(
    `http://localhost:5000/api/admin/users/${params.id}`,
    { name, email, phone, gender },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return redirect("/admin/users");
}

export default function EditUsers() {
  const user = useLoaderData<User>();
 const navigate = useNavigate();
  return (
    <Layout role="admin">
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit User: {user.username}</h2>
      <Form method="post" className="space-y-4">
        <div>
          <input type="text" name="name" defaultValue={user.name} className="text-amber-50 rounded  w-full border px-3 py-2" placeholder="Enter Name" />
        </div>
        <div>
          <input type="email" className="text-amber-50 w-full border px-3 py-2 rounded " name="email" defaultValue={user.email} placeholder="Email"  />
        </div>
        <div>
          <input type="text" name="phone" defaultValue={user.phone} className="w-full border px-3 py-2 rounded " placeholder="Phone"  />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" defaultValue={user.gender} className="w-full border px-3 py-2 rounded ">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
         <button onClick={() => navigate(-1)} className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700 me-3">
          Cancel
        </button>
        <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500">
          Save Changes
        </button>
      </Form>
    </div>
    </Layout>
  );
}