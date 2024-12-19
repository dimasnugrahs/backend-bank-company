import { compareSync } from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validasi input
    if (!email || !password) {
      return new NextResponse("Email dan password wajib diisi.", {
        status: 400,
      });
    }

    // Cari pengguna berdasarkan email
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return new NextResponse("Pengguna tidak ditemukan.", { status: 404 });
    }

    if (!compareSync(password, user.password)) {
      return new NextResponse("Password is incorrect", { status: 401 });
    }

    if (user.role !== "ADMIN") {
      return new NextResponse("You are not authorized to access this route", {
        status: 401,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_KEY, {
      expiresIn: "7d",
    });

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        access_token: token,
      },
    });

    delete user.password;
    delete user.access_token;

    return NextResponse.json({
      ...user,
      token,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
