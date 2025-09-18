import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form, Link, useNavigate } from "@remix-run/react";
import axios from "axios";
import Lottie from "lottie-react";
import Layout from "~/components/Layout";
import { getSession } from "~/session.server";
import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton } from "antd";

type Salary = {
  _id: string;
  employeeName: string;
  designation: string;
  salaryAmount: string;
  paymentDate: string;
  notes: string;
};

// --------------------
// Loader: Get salary by ID
// --------------------
export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!token) return redirect("/login");

  const res = await axios.get<Salary>(`http://localhost:5000/api/admin/salaries/${params.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return json(res.data);
}

// --------------------
// Action: Update salary
// --------------------
export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  const formData = await request.formData();
  const employeeName= formData.get("employeeName");
  const designation = formData.get("designation");
  const salaryAmount = formData.get("salaryAmount");
  const paymentDate = formData.get("paymentDate");
  const notes = formData.get("notes");


  


  await axios.put(
    `http://localhost:5000/api/admin/salaries/${params.id}`,
    { employeeName,designation, salaryAmount, paymentDate, notes },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return redirect("/admin/salary");
}

export default function EditSalary() {
  const salary = useLoaderData<Salary>();
 const navigate = useNavigate();
const [formIMG, setAnimationData] = useState(null);
const [isClient, setIsClient] = useState(false);

const [formData, setFormData] = useState({
  employeeName: salary.employeeName,
  designation: salary.designation,
  salaryAmount: salary.salaryAmount,
  paymentDate: salary.paymentDate,
  notes: salary.notes,
});

 useEffect(() => {
  fetch("/salary.json")
    .then((res) => res.json())
    .then((data) => setAnimationData(data))
    .catch((err) => console.error("Failed to load animation:", err));
}, []);



const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  // Optional: Filter text-only for specific fields
  const filteredValue =
    name === "employeeName" || name === "designation"
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
    <div className=" bg-amber-50 max-h-[70vh] rounded-s-2xl shadow flex flex-col lg:flex-row justify-center items-center gap-6 mt-5">
      <div className="image">
            {formIMG ? (
  <Lottie animationData={formIMG} loop autoplay className="lg:min-w-[50rem] md:max-w-[40rem]" />
) : isClient ? (
  <Skeleton avatar paragraph={{ rows: 4 }} />
) : (
  <div className="text-amber-700">Loading...</div>
)}

         
   
    
      </div>
      <Form method="post" className="space-y-4 m-5 bg-amber-50  flex flex-col gap-3 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-amber-900 underline decoration-wavy">Edit salary: {salary.employeeName}</h2>

        <div>
          <input type="text" name="employeeName" onChange={handleChange} value={formData.employeeName}
 defaultValue={salary.employeeName} className="text-amber-950 bg-transparent border border-amber-300 outline-none  rounded  w-full px-3 py-2 mb-6" placeholder="Enter Employee Name" />
          <input type="text" onChange={handleChange}
 name="designation" defaultValue={salary.designation} value={formData.designation} className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded  w-full  px-3 py-2" placeholder="Enter Designation" />
        </div>
        <div>
          <input type="number" className="text-amber-950 bg-transparent border border-amber-300 outline-none w-full  px-3 py-2 rounded " name="salaryAmount" defaultValue={salary.salaryAmount} placeholder="Enter Salary Amount"  />
        </div>
        <div>
          <input type="date" name="paymentDate" defaultValue={salary.paymentDate} className="w-full text-amber-950 bg-transparent border border-amber-300 outline-none px-3 py-2 rounded " placeholder="date"  />
        </div>
        
<div>
          <input type="text" name="notes" defaultValue={salary.notes} className="w-full text-amber-950 bg-transparent border border-amber-300 outline-none px-3 py-2 rounded " placeholder="Notes"  />
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