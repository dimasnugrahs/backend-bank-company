import Layout from "@/components/Layouts/Layout";
import Form from "@/app/user/_components/form";
import { db } from "@/lib/db";

export default async function UpdateUserPage({ params }) {
  const { userId } = await params;
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  return (
    <Layout>
      <Form user={user} />
    </Layout>
  );
}
