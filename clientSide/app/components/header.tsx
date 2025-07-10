import React from "react";
import "../components/style.css";
import { Link, NavLink } from "@remix-run/react";
import { Search, ShoppingCart } from "lucide-react";
export default function Header() {
  return (
    <>
      <header className="header  lg:h-15 lg:bg-black flex flex-col lg:justify-center lg:items-center w-[100%]">
        <p className="hidden lg:flex">
          Summer Sale For All Swim Suits and Free Express Delivery - OFF 50%!
        </p>

        <nav className="flex w-[100%]  text-gray-950 lg:h-16 lg:justify-around lg:items-center lg:gap-5 bg-white border-b-8">
          <h1 className=" font-extrabold text-lg">Exclusive</h1>

          {/* navlink */}
          <ul className="flex justify-around items-center lg:gap-5">
            
            <li className="hover:text-blue-600">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li className="hover:text-blue-600">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : ""
                }
              >
                Contact
              </NavLink>
            </li>
            <li className="hover:text-blue-600">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : ""
                }
              >
                About
              </NavLink>
            </li>
            <li className="hover:text-blue-600">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : ""
                }
              >
                Sign up
              </NavLink>
            </li>
          </ul>

          {/* search and cart logo */}
          <ul className="lg:flex gap-5  ">
            <li className="lg:flex bg-gray-200 lg:justify-center lg:items-center lg:px-3">
              <input
                type="search"
                name=""
                id=""
                className="rounded-sm p-1 bg-gray-200"
                placeholder="what are you loking for?"
              />
              <Search size={20} />
            </li>

            <li>
              {" "}
              <Link to="">
                {" "}
                <ShoppingCart size={28} strokeWidth={1.75} />{" "}
              </Link>{" "}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
