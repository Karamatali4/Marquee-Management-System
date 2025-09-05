import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form, Link, useNavigate } from "@remix-run/react";
import axios from "axios";
import Lottie from "lottie-react";
import Layout from "~/components/Layout";
import { getSession } from "~/session.server";
import { useEffect, useState } from "react";

type Salary = {
  _id: string;
  employeeName: string;
  designation: string;
  salaryAmount: string;
  paymentDate: string;
  phone: string;
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
  const employeeName= formData.get("salaryname");
  const designation = formData.get("name");
  const salaryAmount = formData.get("email");
  const paymentDate = formData.get("phone");
  const notes = formData.get("gender");


  


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


 useEffect(() => {
  fetch("/Microinteractions.json")
    .then((res) => res.json())
    .then((data) => setAnimationData(data))
    .catch((err) => console.error("Failed to load animation:", err));
}, []);



  return (
    <Layout role="admin">
    <div className=" bg-amber-50 p-6 rounded-s-2xl shadow flex justify-start items-center gap-3 ">
      <div className="image">
            {formIMG ? (
    <Lottie
      animationData={formIMG}
      loop
      autoplay
      className="w-[50rem] "
    />
  ) : (
    <p className="text-amber-700">Loading animation...</p>
  )}

         
   
    
      </div>
      <Form method="post" className="space-y-4 m-5 bg-amber-50 flex flex-col gap-3 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-amber-900 underline decoration-wavy">Edit salary: {salary.employeeName}</h2>

        <div>
          <input type="text" name="salaryname" defaultValue={salary.designation} className="text-amber-950 bg-transparent border border-amber-300 outline-none  rounded  w-full px-3 py-2 mb-6" placeholder="Enter salary  Name" />
          <input type="text" name="name" defaultValue={salary.salaryAmount} className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded  w-full  px-3 py-2" placeholder="Enter Name" />
        </div>
        <div>
          <input type="email" className="text-amber-950 bg-transparent border border-amber-300 outline-none w-full  px-3 py-2 rounded " name="email" defaultValue={salary.paymentDate} placeholder="Email"  />
        </div>
        <div>
          <input type="text" name="phone" defaultValue={salary.notes} className="w-full text-amber-950 bg-transparent border border-amber-300 outline-none px-3 py-2 rounded " placeholder="Phone"  />
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