import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Simple health check response
    return NextResponse.json(
      {
        status: "API is working",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/register error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async () => {
  try {
    // Simple health check response
    return NextResponse.json(
      {
        status: "API is working",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/register error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
