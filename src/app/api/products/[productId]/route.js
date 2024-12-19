import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

// Fungsi mengambil product berdasarkan id
export async function GET(req, { params }) {
  try {
    // Mengambil parameter
    const { productId } = await params;
    //Mengambil product berdasarkan id
    const product = await db.product.findFirst({
      where: {
        id: productId,
      },
    });

    //Pengecekan apakah Product tersedia
    if (!product) {
      return new NextResponse("Product Not Found", { status: 404 });
    }

    //Return product to client
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

// Fungsi untuk update product
export async function PATCH(req, { params }) {
  try {
    // Ambil token dari header
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifikasi token JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
      console.log("Token terverifikasi:", decoded);
    } catch (err) {
      console.error("Token tidak valid:", err.message);
      return new NextResponse("Invalid token", { status: 401 });
    }

    // Ambil productId dari params
    const { productId } = await params;

    // Cek apakah product ada
    const product = await db.product.findFirst({ where: { id: productId } });

    if (!product) {
      console.log("Product tidak ditemukan");
      return new NextResponse("Product Not Found", { status: 404 });
    }

    // Ambil data dari body request
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

    // Siapkan data untuk update
    const updateData = {
      title,
      subtitle,
      description,
      sellingPoint,
      productTerms,
      productGuide,
      userId,
      images,
    };
    if (images !== null) {
      updateData.images = images;
    }

    // Update product di database
    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: updateData,
    });

    // Return hasil update
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// Fungsi untuk hapus product
export async function DELETE(req, { params }) {
  try {
    // Mengambil header di post man dengan key authorization
    const token = req.headers.get("authorization");

    // Cek apakah ada token, jika tidak tampilkan unauthorized dengan status error 401
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const { productId } = await params;

    //Get product by id
    const product = await db.product.findFirst({
      where: {
        id: productId,
      },
    });

    //Check if product is found
    if (!product) {
      return new NextResponse("Product Not Found", { status: 404 });
    }

    //Delete product
    await db.product.delete({
      where: {
        id: productId,
      },
    });

    //Return category to client
    return NextResponse.json("Product deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}
