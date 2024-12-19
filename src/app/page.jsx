import React from "react";
import Layout from "@/components/Layouts/Layout";
import { db } from "@/lib/db";
import CardDataStats from "@/components/CardDataStats";

export const metadata = {
  title: "Dashboard - BPR Lorem Ipsum",
  description: "Dashboard for BPR Lorem Ipsum",
};

export default async function Dashboard() {
  const products = await db.product.findMany();

  const totalProducts = products.length;

  const users = await db.user.findMany();

  const totalUsers = users.length;

  const blogs = await db.blog.findMany();

  const totalBlogs = blogs.length;

  const dashboardData = [
    {
      id: 1,
      title: "Products",
      subtitle: "Total Products",
      value: totalProducts,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 1024 1024"
          className="fill-blue-500"
        >
          <path
            fill=""
            d="M160 144h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V160c0-8.837 7.163-16 16-16m564.314-25.333l181.019 181.02c6.248 6.248 6.248 16.378 0 22.627l-181.02 181.019c-6.248 6.248-16.378 6.248-22.627 0l-181.019-181.02c-6.248-6.248-6.248-16.378 0-22.627l181.02-181.019c6.248-6.248 16.378-6.248 22.627 0M160 544h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V560c0-8.837 7.163-16 16-16m400 0h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H560c-8.837 0-16-7.163-16-16V560c0-8.837 7.163-16 16-16"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Blogs",
      subtitle: "Total Blogs",
      value: totalBlogs,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-blue-500"
        >
          <path
            fill=""
            d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm-4 4q-.825 0-1.412-.587T3 20V6h2v14h11v2z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Users",
      subtitle: "Total Users",
      value: totalUsers,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-blue-500"
        >
          <path
            fill=""
            d="M6.5 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M3 19a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v3H3z"
          />
        </svg>
      ),
    },
  ];
  return (
    <Layout>
      <div className="p-4 bg-white shadow rounded-sm mb-8">
        <h2 className="text-2xl font-bold mb-4">Welcome, Admin!</h2>
        <p className="text-gray-600">Here you can manage your application.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        {dashboardData.map((data) => (
          <CardDataStats
            key={data.id}
            title={data.title}
            subtitle={data.subtitle}
            total={data.value}
            levelUp
            levelDown={null}
            rate={null}
          >
            {data.icon}
          </CardDataStats>
        ))}
      </div>
    </Layout>
  );
}
