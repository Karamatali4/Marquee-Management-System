import { Link } from "@remix-run/react";
import React from "react";
import "../components/style.css";


export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  return (
    <>
      <footer className="bg-amber-700 text-amber-50 p-6 grid grid-cols-2 md:grid-cols-4 gap-16 text-sm mt-5">
        <div>
          <h3 className="font-bold mb-2">Exclusive</h3>
          <p>Get 10% off your first order</p>
          
        </div>

        <div>
          <h3 className="font-bold mb-2">Support</h3>
          <p>111 Bijoy sarani, Dhaka, BD</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Account</h3>
          <p>My Account</p>
          <p><Link to={"/login"} className="hover:text-amber-950"> Login </Link> / <Link to={"/register"} className="hover:text-amber-950"> Register</Link></p>
          
          <p>Wishlist</p>
          
        </div>

        <div>
          <h3 className="font-bold mb-2">Quick Link</h3>
          <p>Privacy Policy</p>
          <p>Terms Of Use</p>
          <p>FAQ</p>
          <p><Link to={"/contact"} className="hover:text-amber-950"> Contact</Link></p>
        </div>

        
      </footer>

      {/* Copyright */}
      <div className="bg-amber-100 text-amber-950 text-center py-3 text-xs">
        © Copyright M@QP😊😊N {currentYear}. All rights reserved.
      </div>
    </>
  );
}
