import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashSync } from "bcrypt";

// Get by id
export async function GET(req, { params }) {
  const { userId } = await params;
  try {
    //Get user by id
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    //Check if user is found
    if (!user) {
      return new NextResponse("User not found.", { status: 404 });
    }

    //Return user to client
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
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

    // Ambil ID user dari parameter URL
    const { userId } = await params;

    // Ambil data yang akan diupdate dari body request
    const body = await req.json();
    const { name, email, password, role } = body;

    // Hash password
    const hashedPassword = hashSync(password, 10);

    // Update data user di database menggunakan Prisma
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        password: hashedPassword, // Bisa gunakan hashSync untuk hashing password jika diperlukan
        role,
      },
    });

    // Hapus password dari respon untuk keamanan
    delete updatedUser.password;

    // Kirimkan respon user yang berhasil diupdate
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error(err);

    // Jika user tidak ditemukan
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Tangani error lainnya
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete user by id
export async function DELETE(req, { params }) {
  try {
    const token = req.headers.get("authorization");
    console.log("Token received:", token);

    if (!token) {
      return new NextResponse("Unauthorized: No token provided", {
        status: 401,
      });
    }

    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_ACCESS_KEY);
    console.log("Decoded token:", decoded);

    const { userId } = params;
    console.log("User ID:", userId);

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    await db.user.delete({ where: { id: userId } });
    return new NextResponse("User deleted successfully", { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
