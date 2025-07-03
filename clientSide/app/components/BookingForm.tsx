// 📁 frontend/app/components/BookingForm.tsx
import { useState } from "react";

interface BookingForm {
  name: string;
  contact: string;
  bookingDate: string;
  hallType: string;
  notes: string;
}

export default function BookingFormComponent() {
  const [formData, setFormData] = useState<BookingForm>({
    name: "",
    contact: "",
    bookingDate: "",
    hallType: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const apiUrl = process.env.API_URL || "http://localhost:5000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = document.cookie.split("token=")[1];
    await fetch(`${apiUrl}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    alert("Booking saved");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input name="name" placeholder="Customer Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="contact" placeholder="Contact" onChange={handleChange} className="border p-2 w-full" />
      <input name="bookingDate" type="date" onChange={handleChange} className="border p-2 w-full" />
      <input name="hallType" placeholder="Hall Type" onChange={handleChange} className="border p-2 w-full" />
      <textarea name="notes" placeholder="Notes" onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Submit</button>
    </form>
  );
}
