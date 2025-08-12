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
    
    // background: 'linear-gradient( #FFC123, #FFF4D6)',
  };

  useAuthGuard("staff");

  return (

    <>
    <Layout role="staff">
    <section className='h-full w-[100%]  m-auto flex flex-col justify-center items-center rounded-md bg-gradient-to-r from-amber-100 via-amber-600 to-amber-700 ...' style={containerStyle}>
   <nav className="">
    <img src="" alt="" />

   </nav>
    <Form method="post" className="space-y-4 p-10 bg-amber-50 flex flex-col justify-center items-start rounded-md gap-10 ">
      <input name="employeeName" placeholder="Employee Name" className="outline-none rounded-s-md  text-amber-50 placeholder:text-amber-50 p-2" required />
      <input name="designation" placeholder="Designation" className="outline-none rounded-e-lg p-2  text-amber-50 placeholder:text-amber-50" required />
      <input
        type="number"
        name="salaryAmount"
        placeholder="Salary Amount"
        className="outline-none rounded-s-md p-2  text-amber-50 placeholder:text-amber-50"
        required
      />
      <input type="date" name="paymentDate" className="outline-none rounded-s-md p-2 text-amber-50 placeholder:text-amber-50" required />
      <textarea name="notes" placeholder="Notes" className="outline-none rounded-e-md p-2  text-amber-50 placeholder:text-amber-50 w-fit" />

      {/* 🔐 Hidden input for token */}
      <input type="hidden" name="token" className="outline-none rounded-e-md p-2  text-amber-50 placeholder:text-amber-50" id="token-field" />

      <button type="submit">Submit Salary</button>
    </Form>
    </section>
    </Layout>
    </>
    
  );
}