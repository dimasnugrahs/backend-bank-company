import Form from "@/app/product/_components/form";
import Layout from "@/components/Layouts/Layout";
import { db } from "@/lib/db";

export default async function UpdateProductPage({ params }) {
  const { productId } = await params;
  const product = await db.product.findFirst({
    where: {
      id: productId,
    },
  });

  return (
    <Layout>
      <Form product={product} />
    </Layout>
  );
}
