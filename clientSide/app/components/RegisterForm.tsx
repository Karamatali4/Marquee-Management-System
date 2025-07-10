// 📁 frontend/app/components/RegisterForm.tsx
import { Form, Link } from "@remix-run/react";

interface ActionData {
  error?: string;
}

export default function RegisterForm({ error }: ActionData) {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section - Images */}
        <div className="w-full lg:w-1/2 bg-amber-50 text-amber-50 p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-6"> <img src="/logo.png" alt="marquee managment system" /> </h1>
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <img
              src="/r1.png"
              alt="img1"
              className="rounded-xl w-full h-48 object-cover"
            />
            <img
              src="/r2.png"
              alt="img2"
              className="rounded-xl w-full h-28 object-cover"
            />
            <img
              src="/r3.png"
              alt="img3"
              className="rounded-xl w-full h-28 object-cover"
            />
            <img
              src="/r4.png"
              alt="img4"
              className="rounded-xl w-full h-48 object-cover"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2 text-amber-700">
            Let’s <span className="text-amber-950">Register</span> 👇
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your details to create your account.
          </p>

          

<Form method="post" className=" space-y-5">
        <h1 className="text-2xl font-bold mb-4">Registration</h1>

        <input
          name="username"
          placeholder="Username"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select name="gender" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select name="role" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          <option value="">Select Role</option>
          <option value="admin">admin</option>
          <option value="staff">staff</option>
        </select>

        <button type="submit" className="bg-amber-700 text-amber-50 px-4 py-2 w-full">
          Register
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="text-amber-600">I want to log in<Link to={"/login"} className="text-amber-950 font-bold"> Login here. </Link></p>

      </Form>


        </div>
      </div>
    </div>
    </>

  );
}