// app/routes/contact.tsx
import { Form, useActionData } from "@remix-run/react";
import { Mail, Phone } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { json, type ActionFunction } from "@remix-run/node";
import axios from "axios";

export interface ActionData {
  error?: string;
  success?: boolean;
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const name = form.get("name")?.toString();
  const email = form.get("email")?.toString();
  const phone = form.get("phone")?.toString();
  const message = form.get("message")?.toString();

  const apiUrl = process.env.API_URL || "http://localhost:5000";

  try {
    await axios.post(`${apiUrl}/api/contact`, {
      name,
      email,
      phone,
      message,
    });

    return json<ActionData>({ success: true });
  } catch (error: any) {
    const message = error.response?.data?.error || "Message failed. Please try again.";
    return json<ActionData>({ error: message });
  }
};

export default function ContactPage() {
  const actionData = useActionData<ActionData>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionData?.success) {
      toast.success(" Message sent successfully!", {
        autoClose: 3000,
        theme: "light",
      });
      formRef.current?.reset(); // Clears form on success
    }

    if (actionData?.error) {
      toast.error(actionData.error, {
        autoClose: 3000,
        theme: "light",
      });
    }
  }, [actionData]);

  return (
    <div className="min-h-screen bg-amber-50 text-amber-950 flex flex-col justify-between">
      <ToastContainer />
      <Header />

      <div className="text-sm text-gray-500 px-6 py-4">Home / Contact</div>

      <main className="flex flex-col lg:flex-row gap-6 px-6 pb-12">
        {/* Contact Info */}
        <div className="w-full lg:w-1/3 bg-amber-50 border rounded-lg p-6 space-y-6 shadow">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-semibold">
              <Phone size={20} /> Call To Us
            </div>
            <p className="text-sm mt-1">We are available 24/7, 7 days a week.</p>
            <p className="text-sm mt-1">Phone: +8801611112222</p>
          </div>
          <hr />
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-semibold">
              <Mail size={20} /> Write To Us
            </div>
            <p className="text-sm mt-1">Fill out our form and we will contact you within 24 hours.</p>
            <p className="text-sm mt-1">customer@exclusive.com</p>
            <p className="text-sm mt-1">support@exclusive.com</p>
          </div>
        </div>

        {/* Form */}
        <Form method="post" className="w-full lg:w-2/3 bg-white text-amber-50 border rounded-lg p-6 shadow space-y-4" ref={formRef}>
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" name="name" required placeholder="Your Name *" className="w-full border p-2 rounded" />
            <input type="email" name="email" required placeholder="Your Email *" className="w-full border p-2 rounded" />
            <input type="tel" name="phone" required placeholder="Your Phone *" className="w-full border p-2 rounded" />
          </div>
          <textarea name="message" placeholder="Your Message" rows={6} required className="w-full border p-2 rounded"></textarea>
          <button type="submit" className="bg-amber-700 text-white px-6 py-2 rounded hover:bg-amber-600 transition">
            Send Message
          </button>
        </Form>
      </main>

      <Footer />
    </div>
  );
}