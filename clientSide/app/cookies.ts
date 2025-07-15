// 📁 frontend/app/cookies.ts
import { createCookie } from "@remix-run/node";

// Create a cookie to store login status, readable on client side
export const loginStatusCookie = createCookie("loginStatus", {
  path: "/",
  httpOnly: false, // Client-side readable for dashboard toast
  sameSite: "strict",
  secure: true,     // Use false if you're testing locally over HTTP
});