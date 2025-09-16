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

// --------------------
// Booking Type
// --------------------
type Booking = {
  _id: string;
  name: string; 
  contact: string;
  bookingDate: Date;
  hallType: string;
  notes: string;
};

// --------------------
// Loader: Get booking by ID
// --------------------
export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!token) return redirect("/login");

  const res = await axios.get<Booking>(
    `http://localhost:5000/api/admin/bookings/${params.id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return json(res.data);
}

// --------------------
// Action: Update booking
// --------------------
export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  const formData = await request.formData();
  const name = formData.get("name");
  const contact = formData.get("contact");
  const bookingDate = formData.get("bookingDate");
  const hallType = formData.get("hallType");
  const notes = (formData.get("notes"));

  await axios.put(
    `http://localhost:5000/api/admin/bookings/${params.id}`,
    { name, contact,bookingDate, hallType, notes },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return redirect("/admin/booking");
}

// --------------------
// Component: Editbookings
// --------------------
export default function EditBooking() {
  const booking = useLoaderData<Booking>();
  const navigate = useNavigate();
  const [formIMG, setAnimationData] = useState(null);

  const [formData, setFormData] = useState({
    name: booking.name,
    contact: booking.contact,
    bookingDate: booking.bookingDate,
    hallType: booking.hallType,
    notes: booking.notes,
    
  });
console.log("booking data: ", booking);
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
            <p className="text-amber-700">Loading animation...</p>
          )}
        </div>

        <Form method="post" className="space-y-4 m-5 bg-amber-50 flex flex-col gap-3 shadow-lg w-full max-w-xl">
          <div>
            <label className="text-amber-950 block mb-1">Booking Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              defaultValue={booking.name}
              onChange={handleChange}
              className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded w-full px-3 py-2"
              placeholder="Enter Booking Name"
              required
            />
          </div>

          <div>
            <label className="text-amber-950 block mb-1">Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded w-full px-3 py-2"
              placeholder="Enter contact"
              required
            />
          </div>

          <div>
            <label className=" flex items-center gap-2">
              <input
                type="date"
                name="bookingDate"
                value={new Date(formData.bookingDate).toISOString().split("T")[0]}

                className="bg-amber-800"
                onChange={handleChange}
              />
              
            </label>
          </div>
          <div>
            <label className="text-amber-950 block mb-1">Hall Type:</label>
            <select
              name="hallType"
              
              value={formData.hallType}
              defaultValue={booking.hallType}
              onChange={handleChange}
              className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded w-full px-3 py-2"
              required
            >
              <option value="Banquet hall">Banquet hall</option>
              <option value="Marquees">Marquees</option>
              <option value="outdoor Gardens/Lawns">Outdoor Gardens/Lawns</option>
              <option value="Formhouses">Farmhouses</option>
            </select>
          </div>

          

          <div>
            <label className="text-amber-950 block mb-1">Notes:</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="text-amber-950 bg-transparent border border-amber-300 outline-none rounded w-full px-3 py-2"
              placeholder="Enter Notes"
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