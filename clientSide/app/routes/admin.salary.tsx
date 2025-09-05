
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import axios from "axios";
import { getSession } from "~/session.server";
import "../components/style.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
// --------------------
// Salary Type
// --------------------
type Salary = {
  _id: string;
  employeeName: string;
  designation: string;
  salaryAmount: string;
  paymentDate: string;
  phone: string;
  notes: string;
};



export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const salaryId = formData.get("id");
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!token || !salaryId) return json({ status: "error" });

  if (intent === "delete") {
    try {
      await axios.delete(`http://localhost:5000/api/admin/salaries/${salaryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return json({ status: "deleted" });
    } catch (error) {
      console.error("Delete failed:", error);
      return json({ status: "error" });
    }
  }

  return json({ status: "error" });
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

  
    const res = await axios.get<Salary[]>("http://localhost:5000/api/admin/salaries", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data || "";
  } catch (error) {
    console.log("Error fetching salary:", error);

    throw new Response("Failed to fetch salary", { status: 500 });
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
export default function AdminSalary() {
const fetcher = useFetcher();
const { Form: FetcherForm } = fetcher;

  const salaries = useLoaderData<Salary[]>();
   console.log("salaries data: ",salaries)
  useEffect(() => {
    if ((fetcher.data as { status?: string })?.status === "deleted") {
  toast.success("Salary deleted successfully!");
}
if ((fetcher.data as { status?: string })?.status === "error") {
  toast.error("Failed to delete Salary.");
}
    
  }, [fetcher.data]);

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
                        "employeeName",
                        "designation",
                        "salaryAmount",
                        "paymentDate",
                        "notes",
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
                    {salaries.map((salary, index) => (
                      <tr key={salary._id} className="text-center text-amber-950 hover:bg-gray-100">
                        <td className="py-3 px-2 border">{index + 1}</td>
                        <td className="py-3 px-2 border">{salary.employeeName}</td>
                        <td className="py-3 px-2 border">{salary.designation}</td>
                        <td className="py-3 px-2 border">{salary.salaryAmount}</td>
                        <td className="py-3 px-2 border">{salary.paymentDate}</td>
                        <td className="py-3 px-2 border">{salary.notes}</td>
                        <td className="py-3 px-2 border">
                          

                          <Link
  to={`/editSalary/${salary._id}`}
  className="bg-amber-500 text-white py-1 px-3 rounded hover:bg-amber-400"
>
  Edit
</Link>

                        </td>
                        <td className="py-3 px-2 border">
                          
                          <FetcherForm method="post" action="">
  <input type="hidden" name="id" value={salary._id} />
  <button
    type="submit"
    name="intent"
    value="delete"
    className="bg-amber-800 text-white py-1 px-3 rounded hover:bg-amber-700"
  >
    Delete
  </button>
</FetcherForm>


                          
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
