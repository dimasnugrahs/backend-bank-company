import Form from "@/app/blog/_components/form";
import Layout from "@/components/Layouts/Layout";
import { db } from "@/lib/db";

export default async function UpdateBlogPage({ params }) {
  const { blogId } = await params;
  const blog = await db.blog.findFirst({
    where: {
      id: blogId,
    },
  });

  const categoryblog = await db.categoryBlog.findMany();

  return (
    <Layout>
      <Form blog={blog} categoryblogs={categoryblog} />
    </Layout>
  );
}
