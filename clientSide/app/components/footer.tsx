import { Link } from "@remix-run/react";
import React from "react";
import "../components/style.css";
export default function Footer() {
  return (
    <>
      <footer className="bg-black text-white p-6 grid grid-cols-2 md:grid-cols-4 gap-16 text-sm">
        <div>
          <h3 className="font-bold mb-2">Exclusive</h3>
          <p>Get 10% off your first order</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-2 px-3 py-1 rounded text-black"
          />
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
          <p>Login / Register</p>
          <p>Cart</p>
          <p>Wishlist</p>
          <p>Shop</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Quick Link</h3>
          <p>Privacy Policy</p>
          <p>Terms Of Use</p>
          <p>FAQ</p>
          <p>Contact</p>
        </div>

        
      </footer>

      {/* Copyright */}
      <div className="bg-black text-white text-center py-3 text-xs">
        © Copyright Rimel 2022. All rights reserved.
      </div>
    </>
  );
}
