import React from "react";
import Layout from "@/components/Layouts/Layout";
import { db } from "@/lib/db";
import Table from "./_components/table";

export default async function CategoryBlog() {
  const categoryBlogs = await db.categoryBlog.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <Layout>
      <Table categoryBlogs={categoryBlogs} />
    </Layout>
  );
}
