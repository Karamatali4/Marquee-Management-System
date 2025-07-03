// 📁 frontend/app/routes/bookings.tsx
import BookingFormComponent from "../components/BookingForm";

export default function Bookings() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">New Booking</h2>
      <BookingFormComponent />
    </div>
  );
}