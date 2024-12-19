import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export async function GET(req) {
  try {
    //Get all blogs
    const blogs = await db.blog.findMany({
      include: {
        categoryblog: true,
      },
      orderBy: {
        createdAt: "desc", // Mengurutkan dari yang terbaru
      },
    });

    //Check if category is found
    if (!blogs) {
      return new NextResponse("Blog Content Not Found", { status: 404 });
    }

    //Return category to client
    return NextResponse.json(blogs, { status: 201 });
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
    const { name, description, categoryId, userId, images } = await req.json();

    //Create product with prisma
    const blog = await db.blog.create({
      data: {
        name: name,
        description: description,
        categoryId: categoryId,
        userId: decoded.id,
        images: images,
      },
    });

    //Return category to the client
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error(error.message);
    //Return error response
    return new NextResponse("Internal server error", { status: 500 });
  }
}
