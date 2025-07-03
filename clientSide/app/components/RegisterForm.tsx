// 📁 frontend/app/components/RegisterForm.tsx
import { Form } from "@remix-run/react";

interface ActionData {
  error?: string;
}

export default function RegisterForm({ error }: ActionData) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Form method="post" className="bg-white p-6 rounded shadow-md w-96 space-y-3">
        <h1 className="text-2xl font-bold mb-4">Registration</h1>

        <input
          name="username"
          placeholder="Username"
          className="w-full border p-2"
          required
        />

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full border p-2"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          required
        />

        <select name="gender" className="w-full border p-2" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className="w-full border p-2"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          required
        />

        <select name="role" className="w-full border p-2" required>
          <option value="">Select Role</option>
          <option value="admin">admin</option>
          <option value="staff">staff</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
          Register
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </Form>
    </div>
  );
}