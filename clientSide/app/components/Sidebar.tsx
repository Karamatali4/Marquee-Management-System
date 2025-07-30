import { Link } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar({ role }: { role: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // ✅ Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 left-4 z-50 bg-gray-100 p-2 rounded shadow"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static w-64 bg-gray-100 text-amber-950 h-screen p-4 shadow-md transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-xl font-bold mb-4 capitalize mt-10">{role} Menu</h2>
        <ul className="space-y-3">
          <li>
            <Link to={`/dashboard.${role}`}>Home</Link>
          </li>

          {role === "admin" && (
            <>
              <li><Link to="/admin/bookings">Bookings</Link></li>
              <li><Link to="/admin/menu">Menu</Link></li>
              <li><Link to="/admin/grocery">Grocery</Link></li>
              <li><Link to="/admin/salary">Salary</Link></li>
              <li><Link to="/admin/users">Users</Link></li>
            </>
          )}

          {role === "staff" && (
            <>
              <li><Link to="/staff/bookings">Bookings</Link></li>
              <li><Link to="/staff/menu">Menu</Link></li>
              <li><Link to="/staff/grocery">Grocery</Link></li>
              <li><Link to="/staff/salary">Salary</Link></li>
            </>
          )}

          {role === "user" && (
            <>
              <li><Link to="/user/bookings">My Bookings</Link></li>
              <li><Link to="/user/menu">View Menu</Link></li>
            </>
          )}

          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </div>
  );
}
