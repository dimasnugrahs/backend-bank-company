import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

// Fungsi mengambil blog berdasarkan id
export async function GET(req, { params }) {
  try {
    // Mengambil parameter
    const { blogId } = await params;
    //Mengambil blog berdasarkan id
    const blog = await db.blog.findFirst({
      where: {
        id: blogId,
      },
    });

    //Pengecekan apakah content blog tersedia
    if (!blog) {
      return new NextResponse("Blog Content Not Found", { status: 404 });
    }

    //Return product to client
    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}

// Fungsi untuk update blog
// export async function PATCH(req, { params }) {
//   try {
//     // Mengambil header di post man dengan key authorization
//     const token = req.headers.get("authorization");

//     // Cek apakah ada token, jika tidak tampilkan unauthorized dengan status error 401
//     if (!token) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Verifikasi token JWT
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
//     } catch (err) {
//       return new NextResponse("Invalid token", { status: 401 });
//     }

//     const { blogId } = await params;

//     //Get blog by id
//     const blog = await db.blog.findFirst({
//       where: {
//         id: blogId,
//       },
//     });

//     //Check if blog is found
//     if (!blog) {
//       return new NextResponse("Blog Content Not Found", { status: 404 });
//     }

//     // Siapkan data untuk update
//     const updateData = { name, description, categoryId, userId };
//     if (images !== null) {
//       updateData.images = images;
//     }

//     // Update blog di database
//     const updateBlog = await db.blog.update({
//       where: { id: blogId },
//       data: updateData,
//     });

//     //Return category to client
//     return NextResponse.json(updateBlog, { status: 200 });
//   } catch (err) {
//     return new NextResponse("Internal server error", {
//       status: err.status || 500,
//     });
//   }
// }

// Fungsi untuk update blog
export async function PATCH(req, { params }) {
  try {
    console.log("Memulai PATCH request...");
    // Ambil token dari header
    const token = req.headers.get("authorization");
    console.log("Token:", token);

    if (!token) {
      console.log("Token tidak ditemukan");
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

    // Ambil blogId dari params
    const { blogId } = await params;
    console.log("Blog ID:", blogId);

    // Cek apakah blog ada
    const blog = await db.blog.findFirst({ where: { id: blogId } });
    console.log("Blog ditemukan:", blog);

    if (!blog) {
      console.log("Blog tidak ditemukan");
      return new NextResponse("Blog Content Not Found", { status: 404 });
    }

    // Ambil data dari body request
    const { name, description, categoryId, userId, images } = await req.json();
    console.log("Data yang diterima:", {
      name,
      description,
      categoryId,
      userId,
      images,
    });

    // Siapkan data untuk update
    const updateData = { name, description, categoryId, userId };
    if (images !== null) {
      updateData.images = images;
    }
    console.log("Data untuk update:", updateData);

    // Update blog di database
    const updatedBlog = await db.blog.update({
      where: { id: blogId },
      data: updateData,
    });
    console.log("Blog berhasil diupdate:", updatedBlog);

    // Return hasil update
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (err) {
    console.error("Error saat melakukan PATCH:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// Fungsi untuk hapus blog
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

    const { blogId } = await params;

    //Get blog by id
    const blog = await db.blog.findFirst({
      where: {
        id: blogId,
      },
    });

    //Check if blog is found
    if (!blog) {
      return new NextResponse("Blog Not Found", { status: 404 });
    }

    //Delete blog
    await db.blog.delete({
      where: {
        id: blogId,
      },
    });

    //Return category to client
    return NextResponse.json("Blog deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Internal server error", {
      status: err.status || 500,
    });
  }
}
