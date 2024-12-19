import React from "react";
import Form from "@/app/blog/_components/form";
import Layout from "@/components/Layouts/Layout";
import { db } from "@/lib/db";

export default async function CreateBlog() {
  const categoryblogs = await db.categoryBlog.findMany();

  return (
    <Layout>
      <Form categoryblogs={categoryblogs} />
    </Layout>
  );
}
