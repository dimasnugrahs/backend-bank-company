import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req, res) {
  try {
    // Get data from body request
    const { name, email, password, role } = await req.json();

    // Create new user
    const user = await db.user.create({
      data: {
        name,
        password: hashSync(password, 10),
        email,
        role,
      },
    });

    // Delete password from object user for hiding password
    delete user.password;

    // Return user
    return NextResponse.json({
      ...user,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return new NextResponse("User already exists", { status: 400 });
    } else if (err instanceof PrismaClientValidationError) {
      return new NextResponse("User validation error", { status: 400 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
