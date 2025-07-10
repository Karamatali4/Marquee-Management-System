// 📁 frontend/app/routes/_index.jsx
import { Link } from "@remix-run/react";
import Footer from "~/components/footer";
import Header from "~/components/header";

export default function Index() {
  return (
    <>
    <Header/>
    <main className="flex items-center justify-center mt-10 mb-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4"><img src="/logo.png" alt="" /></h1>
        
        <Link to="/login" className="bg-amber-700 text-white px-4 py-2 rounded">Login</Link> 
        <Link to="/register" className="bg-amber-700 text-white px-4 py-2 rounded ms-5">register</Link>
      </div>
    </main>
    <Footer/>
    </>
    
  );
}