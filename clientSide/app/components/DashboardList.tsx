// 📁 frontend/app/components/DashboardList.tsx
interface Booking {
  _id: string;
  name: string;
  bookingDate: string;
}

export default function DashboardList({ bookings }: { bookings: Booking[] }) {
  return (
    <ul>
      {bookings.map((booking) => (
        <li key={booking._id} className="border-b py-2">
          {booking.name} — {new Date(booking.bookingDate).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}