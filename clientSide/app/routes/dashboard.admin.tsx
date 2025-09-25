// app/routes/dashboard.admin.tsx
import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/session.server";
import Layout from "~/components/Layout";
import { ProCard } from '@ant-design/pro-components';
import { Statistic } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line,
  AreaChart, Area,
  RadarChart, PolarGrid, PolarRadiusAxis, PolarAngleAxis, Radar,
  ComposedChart,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';
import axios from "axios";

const { Divider } = ProCard;

type User = {
  _id: string;
  username: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  role: string;
};

type Booking = {
  _id: string;
  name: string;
  contact: string;
  bookingDate: Date;
  hallType: string;
  notes: string;
};

type Menu = {
  _id: string;
  customerName: string;
  address: string;
  hallType: string;
  decoration: boolean;
  totalCost: number;
};

type Grocery = {
  _id: string;
  date: string;
  itemName: string;
  quantity: number;
  cost: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const role = session.get("role");
  const token = session.get("token");

  if (!role || !token || role !== "admin") {
    return redirect("/login");
  }

  try {
    const api = axios.create({
      baseURL: "http://localhost:5000/api/admin",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const [usersRes, bookingsRes, menuRes, groceriesRes] = await Promise.all([
      api.get<User[]>("/users"),
      api.get<Booking[]>("/bookings"),
      api.get<Menu[]>("/menu"),
      api.get<Grocery[]>("/groceries"),
    ]);

    return {
      role,
      stats: {
        users: { count: usersRes.data.length },
        bookings: { count: bookingsRes.data.length },
        menu: { count: menuRes.data.length },
        groceries: { count: groceriesRes.data.length },
      },
    };
  } catch (error) {
    console.error("Axios loader error:", error);
    return redirect("/error");
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const styles: { scrollbar: React.CSSProperties } = {
  scrollbar: {
    overflowY: "scroll",
    scrollBehavior: "smooth",
    scrollbarColor:"#ff7e00"
    
  },
};
export default function AdminDashboard() {
  const { role, stats } = useLoaderData<{
    role: string;
    stats: {
      users: { count: number };
      bookings: { count: number };
      menu: { count: number };
      groceries: { count: number };
    };
  }>();

  const [isClient, setIsClient] = useState(false);
  const [responsive, setResponsive] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dataValues = [
    { name: 'Users', value: stats.users.count },
    { name: 'Bookings', value: stats.bookings.count },
    { name: 'Menu', value: stats.menu.count },
    { name: 'Groceries', value: stats.groceries.count },
  ];

  return (
    <Layout role={role}>
      <div className="flex flex-col h-auto sm:h-[90vh] sm:overflow-hidden">
        <motion.div
          initial={{ y: -1000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex-shrink-0"

        >
          {isClient ? (
            <RcResizeObserver
              key="resize-observer"
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <ProCard.Group className="m-5" title="Admin Dashboard" direction={responsive ? 'column' : 'row'}>
                <ProCard>
                  <Statistic className="bg-amber-500 font-semibold rounded-md text-center" valueStyle={{ color: "white" }} title="Users" value={stats.users.count} />
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard>
                  <Statistic className="bg-amber-500 rounded-md text-center" valueStyle={{ color: "white" }} title="Bookings" value={stats.bookings.count} />
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard>
                  <Statistic className="bg-amber-500 rounded-md text-center" valueStyle={{ color: "white" }} title="Menu" value={stats.menu.count} />
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard>
                  <Statistic className="bg-amber-500 rounded-md text-center" valueStyle={{ color: "white" }} title="Groceries" value={stats.groceries.count} />
                </ProCard>
              </ProCard.Group>
            </RcResizeObserver>
          ) : (
            <div className="text-amber-700">Loading...</div>
          )}
        </motion.div>

        {/* Scrollable Chart Section */}
        <div className="px-4 space-y-4 sm:flex-1 sm:overflow-y-auto custom-scroll" style={styles.scrollbar}>
          <PieChart width={450} height={300}>
            <Pie
              data={dataValues}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${((percent as number) * 100).toFixed(0)}%`}
            >
              {dataValues.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataValues}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataValues}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dataValues}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>

          <RadarChart outerRadius={90} width={450} height={300} data={dataValues}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Stats" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>

          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={dataValues}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="value" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}