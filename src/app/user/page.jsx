import React from "react";
import Layout from "@/components/Layouts/Layout";
import Table from "./_components/table";
import { db } from "@/lib/db";

export default async function User() {
  const users = await db.user.findMany({
    orderBy: {
      created_at: "asc",
    },
  });

  return (
    <Layout>
      <Table users={users} />
    </Layout>
  );
}
