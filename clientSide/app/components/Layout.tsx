import Sidebar from "./Sidebar";

export default function Layout({ children, role }: { children: React.ReactNode; role: string }) {
  return (
    <div className="flex">
      <Sidebar role={role} />
      <main className="flex-1 bg-white p-6">
        {children}
      </main>
    </div>
  );
}
