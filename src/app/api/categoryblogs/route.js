import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export async function POST(request) {
  try {
    const token = await request.headers.get("authorization");

    if (!token) {
      return new NextResponse("Token not provided", { status: 401 });
    }

    // Proses verifikasi token JWT
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

    // Tangkap nilai di body
    const body = await request.json();

    // Insert new data to categories
    const categoryBlogs = await db.categoryBlog.create({
      data: {
        name: body.name,
      },
    });

    // Return to client
    return NextResponse.json(
      {
        data: categoryBlogs,
        success: true,
        message: "Category created",
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", {
        status: 500,
      });
    }
  }
}

export async function GET(request) {
  try {
    // Get all categories
    const categoryBlogs = await db.categoryBlog.findMany();

    return NextResponse.json({
      data: categoryBlogs,
      success: true,
      message: "Get all categories",
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(err?.message || "Internal Server Error", {
      status: 500,
    });
  }
}
