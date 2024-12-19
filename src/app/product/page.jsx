import React from "react";
import Layout from "@/components/Layouts/Layout";
import { db } from "@/lib/db";
import Table from "./_components/table";

export default async function Product() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <Layout>
      <Table products={products} />
    </Layout>
  );
}
