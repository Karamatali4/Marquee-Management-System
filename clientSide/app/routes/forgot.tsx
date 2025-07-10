import { Form, Link } from "@remix-run/react";


// app/routes/user.forgot.jsx

export default function ForgotPassword() {
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
              Forgot your <span className="text-blue-600">Password?</span>
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Please, enter your email address. You will receive a link to create a new password via email.
            </p>
  
            <Form method="post" className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </Form>
  
            <div className="mt-4 text-sm text-blue-600 text-center">
              
              <Link to="/login" className="text-blue-600 text-sm">
              Back to Login
                            </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  