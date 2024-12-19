import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashSync } from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json(); // Get data by body request
    const { name, email, password, access_token, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = hashSync(password, 10);

    // Insert user to database
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    delete user.password;

    //Return category to the client
    return NextResponse.json({
      ...user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menambahkan user.", error },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    //Get all users
    const users = await db.user.findMany();

    //Return users to client
    return NextResponse.json(users, { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
