

// app/routes/dashboard.admin.tsx
import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/session.server";
import Layout from "~/components/Layout";
import { ProCard } from '@ant-design/pro-components';
import {  Statistic } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useEffect, useState } from 'react';
import TweenOne from 'rc-tween-one';


const { Divider } = ProCard;
type LoaderData = {
  role: string;
  user: User;
};

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


import axios from "axios";

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
    return redirect("/error"); // ya fallback stats object
  }
};


export default function AdminDashboard() {
  // const { role, user } = useLoaderData<{ role: string; user: User }>();
  const { role, stats } = useLoaderData<{
  role: string;
  stats: {
    users: { count: number };
    bookings: { count: number };
    menu: { count: number; max: number };
    groceries: { count: number };
  };
}>();

const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

  const [responsive, setResponsive] = useState(false);
  
  
  return (
    <Layout role={role}>
      

      <div className="h-screen overflow-y-auto">
        {/* <TweenOne
    animation={{ x: 0, opacity: 1, duration: 600 }}
    style={{ transform: 'translateX(-100%)', opacity: 0 }}
    className="bg-amber-500 text-white p-4 rounded-md"
  > */}

      {
        isClient ? (
  <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard.Group className="m-5" title="Admin Dashboard" direction={responsive ? 'column' : 'row'}>
        <ProCard>
          <Statistic className="bg-amber-500 font-semibold rounded-md text-center" valueStyle={{color:"white"}}  title="Users" value={stats.users.count}  />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic className="bg-amber-500 rounded-md text-center" valueStyle={{color:"white"}}  title="Bookings" value={stats.bookings.count}  />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic className="bg-amber-500 rounded-md text-center" valueStyle={{color:"white"}}  title="Menu" value={stats.menu.count}  />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic className="bg-amber-500 rounded-md text-center" valueStyle={{color:"white"}}  title="Groceries" value={stats.groceries.count} />
        </ProCard>
      </ProCard.Group>
    </RcResizeObserver>
) : (
  <div className="text-amber-700">Loading...</div>
)
      }
      {/* </TweenOne> */}
      </div>
      
    </Layout>
  );
}
