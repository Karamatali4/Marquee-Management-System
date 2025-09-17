import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@remix-run/node";
import {
  useLoaderData,
  Form,
  useNavigate,
} from "@remix-run/react";
import axios from "axios";
import Lottie from "lottie-react";
import Layout from "~/components/Layout";
import { getSession } from "~/session.server";
import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton } from "antd";

// --------------------
// Type Definition
// --------------------
type Menu = {
  _id: string;
  customerName: string;
  address: string;
  hallType: string;
  decoration: boolean;
  totalCost: number;
};

// --------------------
// Loader: Get menu by ID
// --------------------
export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!token) return redirect("/login");

  const res = await axios.get<Menu>(
    `http://localhost:5000/api/admin/menu/${params.id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return json(res.data);
}

// --------------------
// Action: Update menu
// --------------------
export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  const formData = await request.formData();
  const customerName = formData.get("customerName");
  const address = formData.get("address");
  const hallType = formData.get("hallType");
  const decoration = formData.get("decoration") === "on";
  const totalCost = Number(formData.get("totalCost"));

  await axios.put(
    `http://localhost:5000/api/admin/menu/${params.id}`,
    { customerName, address, hallType, decoration, totalCost },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return redirect("/admin/menu");
}

// --------------------
// Component: Editmenus
// --------------------
export default function Editmenus() {
  const menu = useLoaderData<Menu>();
  const navigate = useNavigate();
  const [formIMG, setAnimationData] = useState(null);

  const [formData, setFormData] = useState({
    customerName: menu.customerName,
    address: menu.address,
    hallType: menu.hallType,
    decoration: menu.decoration,
    totalCost: menu.totalCost,
  });

  useEffect(() => {
    fetch("/LoginandSignup.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  let newValue: string | number | boolean;

  if (type === "checkbox" && e.target instanceof HTMLInputElement) {
    newValue = e.target.checked;
  } else if (type === "number") {
    newValue = Number(value);
  } else {
    newValue = value;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};

  return (
    <Layout role="admin">
      <div className="bg-amber-50 max-h-[100vh] lg:max-h-[70vh] scroll-auto rounded-s-2xl shadow flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-center gap-3">
        <div className="image">
          {formIMG ? (
            <Lottie
              animationData={formIMG}
              loop
              autoplay
              className="lg:min-w-[50rem] md:max-w-[40rem]"
            />
          ) : (
            // <p className="text-amber-700">Loading animation...</p>
            <Skeleton avatar paragraph={{ rows: 4 }} />

          )}
        </div>

        <Form method="post" className="space-y-4 m-5 bg-amber-50 flex flex-col gap-3 shadow-lg w-full max-w-xl">
          <div>
            <label className="text-amber-950 block mb-1">Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded w-full px-3 py-2"
              placeholder="Enter Customer Name"
              required
            />
          </div>

          <div>
            <label className="text-amber-950 block mb-1">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded w-full px-3 py-2"
              placeholder="Enter Address"
              required
            />
          </div>

          <div>
            <label className="text-amber-950 block mb-1">Hall Type:</label>
            <select
              name="hallType"
              value={formData.hallType}
              onChange={handleChange}
              className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded w-full px-3 py-2"
              required
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          <div>
            <label className="text-amber-950 flex items-center gap-2">
              <input
                type="checkbox"
                name="decoration"
                checked={formData.decoration}
                onChange={handleChange}
              />
              Decoration Required
            </label>
          </div>

          <div>
            <label className="text-amber-950 block mb-1">Total Cost:</label>
            <input
              type="number"
              name="totalCost"
              value={formData.totalCost}
              onChange={handleChange}
              className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded w-full px-3 py-2"
              placeholder="Enter Total Cost"
              required
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}