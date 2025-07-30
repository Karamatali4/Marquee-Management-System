import { Link } from "@remix-run/react";

export default function Sidebar({ role }: { role: string }) {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">{role} Menu</h2>
      <ul className="space-y-3">
        <li><Link to={`/dashboard.${role}`}>Home</Link></li>
        {role === "admin" && (
          <>
            <li><Link to="/admin/bookings">Bookings</Link></li>
            <li><Link to="/admin/menu">Menu</Link></li>
          </>
        )}
        {role === "staff" && (
          <>
            <li><Link to="/staff/tasks">Tasks</Link></li>
          </>
        )}
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
}
