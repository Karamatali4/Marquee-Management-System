import { Form } from "@remix-run/react";
import { Mail, Phone } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between">
      
      {/* Header Navigation */}
      
    <Header/>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 px-6 py-4">Home / Contact</div>

      {/* Main Section */}
      <main className="flex flex-col lg:flex-row gap-6 px-6 pb-12">

        {/* Contact Info */}
        <div className="w-full lg:w-1/3 bg-white border rounded-lg p-6 space-y-6 shadow">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              <Phone size={20} /> Call To Us
            </div>
            <p className="text-sm mt-1">We are available 24/7, 7 days a week.</p>
            <p className="text-sm mt-1">Phone: +8801611112222</p>
          </div>

          <hr />

          <div>
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              <Mail size={20} /> Write To Us
            </div>
            <p className="text-sm mt-1">Fill out our form and we will contact you within 24 hours.</p>
            <p className="text-sm mt-1">customer@exclusive.com</p>
            <p className="text-sm mt-1">support@exclusive.com</p>
          </div>
        </div>

        {/* Form */}
        <Form method="post" className="w-full lg:w-2/3 bg-white border rounded-lg p-6 shadow space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" name="name" required placeholder="Your Name *" className="w-full border p-2 rounded" />
            <input type="email" name="email" required placeholder="Your Email *" className="w-full border p-2 rounded" />
            <input type="tel" name="phone" required placeholder="Your Phone *" className="w-full border p-2 rounded" />
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            required
            className="w-full border p-2 rounded"
          ></textarea>
          <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition">
            Send Message
          </button>
        </Form>
      </main>

      {/* Footer */}

      <Footer/>
      
    </div>
  );
}
