import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import db from "@/libs/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 400 }
    );
  }
}

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { email, password } = body;

//     // Validate input
//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     // Check if user exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 400 }
//       );
//     }

//     // Hash password (if using bcrypt)
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await prisma.user.create({
//       data: {
//         email,
//         hashedPassword,
//       },
//     });

//     return NextResponse.json(user, { status: 201 });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
