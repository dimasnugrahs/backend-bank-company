import React from "react";
import Layout from "@/components/Layouts/Layout";
import { db } from "@/lib/db";
import Table from "./_components/table";

export default async function Blog() {
  const blogs = await db.blog.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      categoryblog: true,
    },
  });

  return (
    <Layout>
      <Table blogs={blogs} />
    </Layout>
  );
}
