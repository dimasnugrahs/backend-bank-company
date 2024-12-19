import Form from "@/app/categoryblog/_components/form";
import Layout from "@/components/Layouts/Layout";
import { db } from "@/lib/db";

export default async function UpdateCategoryBlogPage({ params }) {
  const { categoryBlogId } = await params;
  const categoryBlog = await db.categoryBlog.findFirst({
    where: {
      id: categoryBlogId,
    },
  });

  return (
    <Layout>
      <Form categoryblogs={categoryBlog} />
    </Layout>
  );
}
