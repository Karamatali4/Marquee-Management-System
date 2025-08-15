import { Link } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { BiFoodMenu, BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiHome } from "react-icons/ci";
import { TbBrandBooking } from "react-icons/tb";

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
        } md:translate-x-0 fixed md:static sm:w-48 lg:w-56 bg-white text-amber-950 rounded-e-lg h-screen p-4 shadow-2xl  transition-transform duration-300 ease-in-out z-40 border-e-2`}
      >
        <h2 className="text-xl font-bold mb-4 capitalize mt-10 ">{role.toUpperCase()} MENU</h2>
        <ul className="space-y-3 text-amber-950">
          <li className="flex justify-center items-center gap-3"> <span><CiHome className="text-amber-900 text-xl" />
</span>
            <Link to={`/dashboard/${role}`} className="hover:text-amber-200 text-lg">Home</Link>
          </li>

          {role === "admin" && (
            <>
              <li className="flex justify-center items-center gap-3"><Link to="/admin/bookings" className="hover:text-amber-200">Bookings</Link></li>
              <li className="flex justify-center items-center gap-3"><Link to="/admin/menu" className="hover:text-amber-200">Menu</Link></li>
              <li className="flex justify-center items-center gap-3"><Link to="/admin/grocery" className="hover:text-amber-200">Grocery</Link></li>
              <li  className="flex justify-center items-center gap-3"><Link to="/admin/salary" className="hover:text-amber-200">Salary</Link></li>
              <li className="flex justify-center items-center gap-3"><Link to="/admin/users" className="hover:text-amber-200">Users</Link></li>
            </>
          )}

          {role === "staff" && (
            <>
              <li className="flex justify-center items-center gap-1"> <span><TbBrandBooking className="text-amber-900 text-xl"/>
</span><Link to="/staff/bookings" className="hover:text-amber-200 text-lg">Bookings</Link></li>
              <li className="flex justify-center items-center gap-3"> <span><BiFoodMenu className="text-amber-900 text-xl" />
</span><Link to="/staff/menu" className="hover:text-amber-200 text-lg">Menu</Link></li>

              <li className="flex justify-center items-center gap-3"><Link to="/staff/grocery" className="hover:text-amber-200 text-lg">Grocery</Link></li>
              <li className="flex justify-center items-center gap-3"><Link to="/staff/salary" className="hover:text-amber-200 text-xl">Salary</Link></li>
            </>
          )}

          {role === "user" && (
            <>
              <li className="flex justify-center items-center gap-3"><Link to="/user/bookings" className="hover:text-amber-200 text-xl">My Bookings</Link></li>
              <li className="flex justify-center items-center gap-3"><Link to="/user/menu" className="hover:text-amber-200">View Menu</Link></li>
            </>
          )}

          <li className="flex justify-center items-center gap-3"><CgProfile className="text-amber-900 text-xl"/><Link to="/profile" className="hover:text-amber-200 text-lg">Profile</Link></li>
          <li className="flex justify-center items-center gap-3"> <span><BiLogOutCircle className="text-amber-900 text-xl" /></span> <Link to="/logout" className="hover:text-amber-200 text-lg ">Logout</Link></li>
        </ul>
      </div>
    </div>
  );
}
