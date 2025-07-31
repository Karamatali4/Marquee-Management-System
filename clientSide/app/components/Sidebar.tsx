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
        className="md:hidden absolute top-4 left-4 z-50 bg-amber-700 p-2 rounded shadow"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full "
        } md:translate-x-0 fixed md:static sm:w-48 lg:w-56 bg-amber-600 text-amber-100 rounded-e-lg h-screen p-4 shadow-md transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-xl font-bold mb-4 capitalize mt-10">{role} Menu</h2>
        <ul className="space-y-3 text-amber-50 ">
          <li>
            <Link to={`/dashboard/${role}`} className="hover:text-amber-200">Home</Link>
          </li>

          {role === "admin" && (
            <>
              <li><Link to="/admin/bookings" className="hover:text-amber-200">Bookings</Link></li>
              <li><Link to="/admin/menu" className="hover:text-amber-200">Menu</Link></li>
              <li><Link to="/admin/grocery" className="hover:text-amber-200">Grocery</Link></li>
              <li><Link to="/admin/salary" className="hover:text-amber-200">Salary</Link></li>
              <li><Link to="/admin/users" className="hover:text-amber-200">Users</Link></li>
            </>
          )}

          {role === "staff" && (
            <>
              <li><Link to="/staff/bookings" className="hover:text-amber-200">Bookings</Link></li>
              <li><Link to="/staff/menu" className="hover:text-amber-200">Menu</Link></li>
              <li><Link to="/staff/grocery" className="hover:text-amber-200">Grocery</Link></li>
              <li><Link to="/staff/salary" className="hover:text-amber-200">Salary</Link></li>
            </>
          )}

          {role === "user" && (
            <>
              <li><Link to="/user/bookings" className="hover:text-amber-200">My Bookings</Link></li>
              <li><Link to="/user/menu" className="hover:text-amber-200">View Menu</Link></li>
            </>
          )}

          <li><Link to="/profile" className="hover:text-amber-200">Profile</Link></li>
          <li><Link to="/logout" className="hover:text-amber-200">Logout</Link></li>
        </ul>
      </div>
    </div>
  );
}
