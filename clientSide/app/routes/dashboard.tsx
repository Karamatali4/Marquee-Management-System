// 📁 frontend/app/routes/dashboard.tsx
import { useEffect, useState } from "react";
import DashboardList from "../components/DashboardList";

interface Booking {
  _id: string;
  name: string;
  bookingDate: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<Booking[] | null>(null);

  useEffect(() => {
    const token = document.cookie.split("token=")[1];
    fetch("http://localhost:5000/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      {userData ? <DashboardList bookings={userData} /> : <p>Loading bookings...</p>}
    </div>
  );
}
