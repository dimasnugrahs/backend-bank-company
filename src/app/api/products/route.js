import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export async function GET(req) {
  try {
    //Get all products
    const products = await db.product.findMany();

    //Check if category is found
    if (!products) {
      return new NextResponse("Product Content Not Found", { status: 404 });
    }

    //Return category to client
    return NextResponse.json(products, { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    // Mengambil header di post man dengan key authorization
    const token = req.headers.get("authorization");

    // Cek apakah ada token, jika tidak tampilkan unauthorized dengan status error 401
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (user.role !== "ADMIN") {
      return new NextResponse("This account is not ADMIN", {
        status: 401,
      });
    }

    //Get name on body
    const {
      title,
      subtitle,
      description,
      sellingPoint,
      productTerms,
      productGuide,
      userId,
      images,
    } = await req.json();

    //Create product with prisma
    const product = await db.product.create({
      data: {
        title: title,
        subtitle: subtitle,
        description: description,
        sellingPoint: sellingPoint,
        productTerms: productTerms,
        productGuide: productGuide,
        userId: decoded.id,
        images: images,
      },
    });

    //Return product to the client
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error.message);
    //Return error response
    return new NextResponse("Internal server error", { status: 500 });
  }
}
