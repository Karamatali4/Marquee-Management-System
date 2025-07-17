// app/routes/$.tsx
import { json } from "@remix-run/node";
import {  useRouteError } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  throw json({ message: "Page not found" }, { status: 404 });
};

export default function CatchAllRoute() {
  return <div>You shouldn't see this!</div>;
}



export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div className="p-4 text-red-500">
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="mt-2">{(error as Error).message}</p>
    </div>
  );
}