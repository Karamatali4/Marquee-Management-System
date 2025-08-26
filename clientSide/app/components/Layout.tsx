
import Sidebar from "./Sidebar";

export default function Layout({ children, role }: { children: React.ReactNode; role: string }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-64 shadow-black">
        <Sidebar role={role} />
      </div>

      {/* Main content */}
      <main className="flex-1 min-h-screen bg-white p-6 ">
        {children}
      </main>
    </div>
  );
}
