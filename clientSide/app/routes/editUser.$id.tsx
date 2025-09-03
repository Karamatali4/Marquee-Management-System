import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form, Link, useNavigate } from "@remix-run/react";
import axios from "axios";
import Lottie, { useLottie } from "lottie-react";
import Layout from "~/components/Layout";
import { getSession } from "~/session.server";
import formFill from "../../public/LoginandSign up.json";
import { Player } from '@lottiefiles/react-lottie-player';

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
  const role = formData.get("role");

  await axios.put(
    `http://localhost:5000/api/admin/users/${params.id}`,
    { username,name, email, phone, gender,role },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return redirect("/admin/users");
}

export default function EditUsers() {
  const user = useLoaderData<User>();
 const navigate = useNavigate();

//  const options = {
//     animationData: formFill,
//     loop: true,
//     autoplay: true,
    
    
//   };

  // const { View } = useLottie(options);
  return (
    <Layout role="admin">
    <div className="mt-10 bg-amber-50 p-6 rounded-s-2xl shadow flex justify-start items-center gap-3 ">
      <div className="image">
            <Lottie 
            animationData={formFill}
            loop={true}
            autoplay={true}
            className="w-[50rem]"
            
          />
         
   
    
      </div>
      <Form method="post" className="space-y-4 m-5 bg-amber-50 flex flex-col gap-3 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-amber-900 underline decoration-wavy">Edit User: {user.username}</h2>

        <div>
          <input type="text" name="username" defaultValue={user.username} className="text-amber-950 bg-transparent border border-amber-300 outline-none  rounded  w-full px-3 py-2" placeholder="Enter User  Name" />
          <input type="text" name="name" defaultValue={user.name} className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded  w-full  px-3 py-2" placeholder="Enter Name" />
        </div>
        <div>
          <input type="email" className="text-amber-950 bg-transparent border border-amber-300 outline-none w-full  px-3 py-2 rounded " name="email" defaultValue={user.email} placeholder="Email"  />
        </div>
        <div>
          <input type="text" name="phone" defaultValue={user.phone} className="w-full text-amber-950 bg-transparent border border-amber-300 outline-none px-3 py-2 rounded " placeholder="Phone"  />
        </div>
        <div>
          <label className="text-amber-950 font-bold">Gender:</label>
          <select name="gender" defaultValue={user.gender} className="w-full text-amber-950 bg-transparent border border-amber-300 outline-none px-3 py-2 rounded ">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="text-amber-950 font-bold">Role:</label>
          <select name="role" defaultValue={user.role} className="w-full text-amber-950 bg-transparent border border-amber-300 outline-none px-3 py-2 rounded ">
            <option value="admin">ADMIN</option>
            <option value="staff">STAFF</option>
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