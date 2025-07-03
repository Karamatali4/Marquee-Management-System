// 📁 frontend/app/routes/_index.jsx
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Marquee Management System</h1>
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link> 
        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded ms-5">register</Link>
      </div>
    </main>
  );
}