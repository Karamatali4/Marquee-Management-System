// 📁 frontend/app/routes/_index.jsx
import { Link } from "@remix-run/react";
import Footer from "~/components/footer";
import Header from "~/components/header";

export default function Index() {
  return (
    <>
    <Header/>
    <main className="flex items-center justify-center pt-10 pb-24 min-h-full 2xl:min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4"><img src="/logo.png" alt="" /></h1>
        
        <Link to="/login" className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-600">Login</Link> 
        <Link to="/register" className="bg-amber-700 text-white px-4 py-2 rounded ms-5 hover:bg-amber-600">register</Link>
      </div>
    </main>
    <Footer/>
    </>
    
  );
}