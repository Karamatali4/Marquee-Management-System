// 📁 frontend/app/components/LoginForm.tsx
import { Form, Link, useActionData } from "@remix-run/react";

interface ActionData {
  error?: string;
}

export default function LoginForm({ error }: ActionData) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Form method="post" className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input name="username" placeholder="Username" className="mb-2 w-full border p-2" />
        <input name="password" type="password" placeholder="Password" className="mb-2 w-full border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">Login</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p>Don't have an account yet? <Link to={"/register"} className="text-blue-700"> Register here. </Link></p>
      </Form>
    </div>
  );
}