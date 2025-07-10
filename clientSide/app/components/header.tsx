import React from "react";
import "../components/style.css";
import { Link, NavLink } from "@remix-run/react";
import { Search, ShoppingCart } from "lucide-react";
export default function Header() {
  return (
    <>
      <header className="header  lg:h-15 lg:bg-amber-700 text-amber-50 flex flex-col lg:justify-center lg:items-center w-[100%]">
        <p className="hidden lg:flex">
          Summer Sale For All Swim Suits and Free Express Delivery - OFF 50%!
        </p>

        <nav className="flex w-[100%]  text-amber-950 lg:h-16 lg:justify-around lg:items-center lg:gap-5 bg-amber-50 border-b-8">
          <h1 className=" font-extrabold text-lg"> <Link to={"/"}> <img src="/mainlogo.png" className="w-10" alt="" /></Link></h1>

          {/* navlink */}
          <ul className="flex justify-around items-center lg:gap-5">
            
            <li className="hover:text-amber-950">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-amber-950 font-bold" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li className="hover:text-amber-950">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-amber-950 font-bold" : ""
                }
              >
                Contact
              </NavLink>
            </li>
            <li className="hover:text-amber-950">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-amber-950 font-bold" : ""
                }
              >
                About
              </NavLink>
            </li>
            <li className="hover:text-amber-950">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-amber-950 font-bold" : ""
                }
              >
                Sign up
              </NavLink>
            </li>
          </ul>

         
          
        </nav>
      </header>
    </>
  );
}
