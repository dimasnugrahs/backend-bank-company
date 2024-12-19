import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export async function GET(req, { params }) {
  try {
    const { categoryBlogId } = await params;

    //Get category by id
    const categoryBlog = await db.categoryBlog.findFirst({
      where: {
        id: categoryBlogId,
      },
    });

    //Check if category is found
    if (!categoryBlog) {
      return new NextResponse("Category Not Found", { status: 404 });
    }

    //Return category to client
    return NextResponse.json(categoryBlog, { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

export async function PATCH(req, { params }) {
  try {
    // Mengambil header di post man dengan key authorization
    const token = req.headers.get("authorization");

    // Cek apakah ada token, jika tidak tampilkan unauthorized dengan status error 401
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const { categoryblogId } = await params;

    //Get category by id
    const categoryBlog = await db.categoryBlog.findFirst({
      where: {
        id: categoryblogId,
      },
    });

    //Check if category is found
    if (!categoryBlog) {
      return new NextResponse("Category Not Found", { status: 404 });
    }

    //Get name category from body
    const { name } = await req.json();

    //Update category
    const updateCategoryBlog = await db.categoryBlog.update({
      where: {
        id: categoryblogId,
      },
      data: {
        name: name,
      },
    });

    //Return category to client
    return NextResponse.json(updateCategoryBlog, { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const categoryBlog = await db.categoryBlog.findFirst({
      where: {
        id: params.categoryblogId,
      },
    });

    if (!categoryBlog) {
      return new NextResponse("Category not found", {
        status: 404,
      });
    }

    await db.categoryBlog.delete({
      where: {
        id: params.categoryblogId,
      },
    });

    return NextResponse.json({ data: null, success: true }, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
