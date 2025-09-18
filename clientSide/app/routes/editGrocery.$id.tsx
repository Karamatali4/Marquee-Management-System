import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form, Link, useNavigate } from "@remix-run/react";
import axios from "axios";
import Lottie from "lottie-react";
import Layout from "~/components/Layout";
import { getSession } from "~/session.server";
import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton } from "antd";

type Grocery = {
  _id: string;
  date: string; 
  itemName: string;
  quantity: number;
  cost: number;
};

// --------------------
// Loader: Get grocery by ID
// --------------------
export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!token) return redirect("/login");

  const res = await axios.get<Grocery>(`http://localhost:5000/api/admin/groceries/${params.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return json(res.data);
}

// --------------------
// Action: Update grocery
// --------------------
export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  const formData = await request.formData();
  const date = formData.get("date");
  const itemName = formData.get("itemName");
  const quantity = formData.get("quantity");
  const cost = formData.get("cost");
  

  await axios.put(
    `http://localhost:5000/api/admin/groceries/${params.id}`,
    { date,itemName, quantity, cost},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return redirect("/admin/grocery");
}

export default function Editgrocerys() {
  const grocery = useLoaderData<Grocery>();
 const navigate = useNavigate();
const [formIMG, setAnimationData] = useState(null);
const [isClient, setIsClient] = useState(false);

const [formData, setFormData] = useState({
  date: grocery.date,
  itemName: grocery.itemName,
  quantity: grocery.quantity,
  cost: grocery.cost,
});

 useEffect(() => {
  fetch("/LoginandSignup.json")
    .then((res) => res.json())
    .then((data) => setAnimationData(data))
    .catch((err) => console.error("Failed to load animation:", err));
}, []);

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  // Optional: Filter text-only for specific fields
  const filteredValue =
    name === "itemName"
      ? value.replace(/[^a-zA-Z\s]/g, '')
      : value;

  setFormData((prev) => ({
    ...prev,
    [name]: filteredValue,
  }));
};

useEffect(() => {
  setIsClient(true);
}, []);
  return (
    <Layout role="admin">
      
    <div className=" bg-amber-50 max-h-[100vh] lg:max-h-[70vh]  scroll-auto  rounded-s-2xl shadow flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-center gap-3 ">
      <div className="image">
     {formIMG ? (
  <Lottie animationData={formIMG} loop autoplay className="min-w-[10rem] lg:min-w-[30rem] md:max-w-[20rem]" />
) : isClient ? (
  <Skeleton avatar paragraph={{ rows: 4 }} />
) : (
  <div className="text-amber-700">Loading...</div>
)}

         
   
    
      </div>
      <Form method="post" className="space-y-4 m-5 bg-amber-50 flex flex-col gap-3 shadow-lg">
      {/* <h2 className="text-2xl font-bold mb-4 text-amber-900 underline decoration-wavy">Edit grocery: {grocery.g}</h2> */}

        <div>
          <input type="date" name="date" value={formData.date} defaultValue={new  Date(grocery.date).toLocaleDateString()} className="text-amber-950 bg-transparent border border-amber-300 outline-none  rounded  w-full px-3 py-2 mb-6" placeholder="Enter grocery  Date" />
          <input type="text" name="itemName"  onChange={handleChange} value={formData.itemName} className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded  w-full  px-3 py-2" placeholder="Enter Name" />
        </div>
        <div>
          <input type="number" className="text-amber-950 bg-transparent border border-amber-300 outline-none w-full  px-3 py-2 rounded " name="quantity" defaultValue={grocery.quantity} placeholder="Quantity"  />
        </div>
        <div>
          <input type="number" name="cost" defaultValue={grocery.cost} className="w-full text-amber-950 bg-transparent border border-amber-300 outline-none px-3 py-2 rounded " placeholder="Cost"  />
        </div>
        

        
        
         <button onClick={() => navigate(-1)} className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700 ">
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