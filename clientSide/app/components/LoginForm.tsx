// 📁 frontend/app/components/LoginForm.tsx
import { Form, Link } from "@remix-run/react";

interface ActionData {
  error?: string;
}

export default function LoginForm({ error }: ActionData) {
  return (
    <>
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-amber-50 text-amber-50 p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold"><img src="/logo.png" alt="marquee managment system" /></h1>
          <div className="grid grid-cols-2 gap-4">
            <img src="/l1.png" className="rounded-xl w-40 h-40 object-cover" />
            <img src="/l2.png"className="rounded-xl w-full h-28 object-cover" />
            <img src="/l3.png" className="rounded-xl w-28 h-40 object-cover" />
            <img src="/l4.png" className="rounded-xl w-full h-28 object-cover" />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold mb-2 text-amber-700">
            Let’s <span className="text-amber-950">Sign In</span> 👇
          </h2>
          <p className="text-gray-500 mb-6">
            Hey, Enter your details to get sign in to your account.
          </p>
          <Form method="post" className="space-y-5">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input name="username" placeholder="Username" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="password" type="password" placeholder="Password" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="bg-amber-700 text-amber-50 px-4 py-2 w-72 lg:w-full rounded-sm">Login</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="text-amber-600">Don't have an account yet? <Link to={"/register"} className="text-amber-950 font-bold"> Register here. </Link></p>
      </Form>
        </div>
      </div>
    </div>

    </>
    
  );
}