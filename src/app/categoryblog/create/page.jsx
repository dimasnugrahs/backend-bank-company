import React from "react";
import Form from "@/app/categoryblog/_components/form";
import Layout from "@/components/Layouts/Layout";
import { db } from "@/lib/db";

export default async function CreateCategoryBlog() {
  return (
    <Layout>
      <Form />
    </Layout>
  );
}
