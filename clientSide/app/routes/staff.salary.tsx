import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData, Form, useNavigate } from "@remix-run/react";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import axios from "axios";
import Layout from "~/components/Layout";
import { useAuthGuard } from "~/utils/useAuthGuard";

interface ActionResponse {
  success?: boolean;
  error?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const data = {
    employeeName: form.get("employeeName"),
    designation: form.get("designation"),
    salaryAmount: Number(form.get("salaryAmount")),
    paymentDate: form.get("paymentDate"),
    notes: form.get("notes"),
  };

  const token = form.get("token");

  try {
    await axios.post("http://localhost:5000/api/salary", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return json({ success: true });
  } catch {
    return json({ error: "Failed to submit salary." });
  }
};

export default function SalaryForm() {
  const actionData = useActionData<ActionResponse>();
    const formRef = useRef<HTMLFormElement>(null);
  const isAuthorized = useAuthGuard("staff");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenInput = document.getElementById("token-field") as HTMLInputElement;
      if (tokenInput) tokenInput.value = token;
    }

    if (actionData?.success){
toast.success("Salary submitted!");
      formRef.current?.reset(); // Clears form on success

    } 
    if (actionData?.error) toast.error(actionData.error);
  }, [actionData]);


const containerStyle = {
  backgroundImage: "url('/bgs.jpg')", // Image path
  backgroundRepeat: "no-repeat",           // Prevents repeating the image
  backgroundSize: "cover",                 // Scales image to cover the container
  backgroundPosition: "center",            // Centers the image
  backgroundAttachment: "",           // Keeps background fixed during scroll
};

  

  if (!isAuthorized) {
    return <p>Checking access...</p>; // Or a spinner
  }


  return (

    <>
    <Layout role="staff">
    <section className='h-full w-[100%]  m-auto flex  justify-evenly items-center rounded-md' style={containerStyle}>
   
    <h1 className="text-amber-500 font-bold text-4xl bg-opacity-35">Please Fill Salary Form</h1>
   
    <Form method="post" className="space-y-4 p-10 bg-amber-50 bg-opacity-35 flex flex-col justify-center items-start rounded-md gap-8 shadow-2xl">
      <input name="employeeName" placeholder="Employee Name" className="outline-none rounded-s-md bg-amber-50 hover:bg-amber-100 text-amber-950 placeholder:text-amber-500 p-2" required />
      <input name="designation" placeholder="Designation" className="outline-none rounded-e-lg p-2 bg-amber-50 hover:bg-amber-100 text-amber-950 placeholder:text-amber-500" required />
      <input
        type="number"
        name="salaryAmount"
        placeholder="Salary Amount"
        className="outline-none rounded-s-md p-2 bg-amber-50 hover:bg-amber-100  text-amber-500 placeholder:text-amber-500"
        required
      />
      <input type="date" name="paymentDate" className="outline-none rounded-s-md p-2 bg-amber-50 hover:bg-amber-100 text-amber-500 placeholder:text-amber-400 focus:outline focus:ring-2 focus:ring-amber-800 focus:border-amber-800" required />
      <textarea name="notes" placeholder="Notes" className="outline-none rounded-e-md p-2 bg-amber-50 hover:bg-amber-100 text-amber-950 placeholder:text-amber-500 w-fit" />

      {/* 🔐 Hidden input for token */}
      <input type="hidden" name="token" className="outline-none rounded-e-md p-2 bg-amber-50  text-amber-950 placeholder:text-amber-500" id="token-field" />

      <button className="text-amber-50 px-6 py-2 bg-amber-700 rounded-md self-center hover:bg-amber-600 hover:text-amber-50" type="submit">Submit Salary</button>
    </Form>
    </section>
    </Layout>
    </>
    
  );
}