import Layout from "~/components/Layout";

export default function UserDashboard() {
  return (
    <Layout role="user">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <p>Accessible without login</p>
    </Layout>
  );
}
