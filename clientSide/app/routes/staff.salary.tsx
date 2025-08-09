import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import Layout from "~/components/Layout";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenInput = document.getElementById("token-field") as HTMLInputElement;
      if (tokenInput) tokenInput.value = token;
    }

    if (actionData?.success) toast.success("Salary submitted!");
    if (actionData?.error) toast.error(actionData.error);
  }, [actionData]);


  const containerStyle = {
    
    background: 'linear-gradient(to right, #FFC123, #FFF4D6)',
  };

  return (

    <>
    <Layout role="staff">
    <section className='h-[35rem] w-[20rem]  m-auto flex flex-col justify-center items-center rounded-md' style={containerStyle}>
   <nav className="">
    <img src="" alt="" />

   </nav>
    <Form method="post" className="space-y-4 p-4">
      <input name="employeeName" placeholder="Employee Name" className="outline-none bg-transparent text-amber-950 placeholder:text-amber-100" required />
      <input name="designation" placeholder="Designation" required />
      <input
        type="number"
        name="salaryAmount"
        placeholder="Salary Amount"
        required
      />
      <input type="date" name="paymentDate" required />
      <textarea name="notes" placeholder="Notes" />

      {/* 🔐 Hidden input for token */}
      <input type="hidden" name="token" id="token-field" />

      <button type="submit">Submit Salary</button>
    </Form>
    </section>
    </Layout>
    </>
    
  );
}