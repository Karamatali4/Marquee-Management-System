// app/routes/user.reset.jsx
import { Form, Link } from "@remix-run/react";


export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-blue-500 text-white p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-6">E-Commerce</h1>
          <div className="grid grid-cols-2 gap-4">
            <img src="/p1.jpg" className="rounded-xl w-full h-28 object-cover" />
            <img src="/p2.jpg" className="rounded-xl w-full h-28 object-cover" />
            <img src="/p3.jpg" className="rounded-xl w-full h-28 object-cover" />
            <img src="/p4.jpg" className="rounded-xl w-full h-28 object-cover" />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold mb-2">
            Reset <span className="text-blue-600">Password</span>
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your new password to reset it!!
          </p>
          <Form method="post" className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium">
                New Password
              </label>
              <input
                name="newPassword"
                type="password"
                placeholder="Enter New Password"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Enter Confirm Password"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Reset Password
            </button>
          </Form>

          <div className="mt-4 text-sm text-blue-600 text-center">
            
            <Link to="/forgot" className="text-blue-600 text-sm">
            Back to Forgot password
              </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}
