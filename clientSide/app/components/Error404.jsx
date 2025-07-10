import { Link } from "@remix-run/react";

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black">
      
      {/* Header */}
      <header className="w-full shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Exclusive</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <p className="text-sm text-gray-400 mb-2">Home / 404 Error</p>
        <h1 className="text-5xl font-bold mb-4">404 Not Found</h1>
        <p className="text-gray-600 mb-6">
          Your visited page not found. You may go home page.
        </p>
        <Link
          to="/"
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Back to home page
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-6 text-sm grid grid-cols-2 md:grid-cols-5 gap-6">
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

        <div>
          <h3 className="font-bold mb-2">Download App</h3>
          <img src="/qr.png" alt="QR" className="w-20 mb-2" />
          <div className="flex gap-2">
            <img src="/googleplay.png" alt="Google Play" className="w-24" />
            <img src="/appstore.png" alt="App Store" className="w-24" />
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-black text-white text-center py-3 text-xs">
        © Copyright Rimel 2022. All rights reserved.
      </div>
    </div>
  );
}
