import { NextResponse } from "next/server";
import { getSemesters } from "@/lib/database";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const cacheKey = "semesters";
    const cached = await redis.get(cacheKey);

    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

    const semesters = await getSemesters();
    await redis.set(cacheKey, JSON.stringify(semesters), "EX", 3600); // cache for 1 hour

    return NextResponse.json(semesters);
  } catch (error) {
    console.error("Failed to fetch semesters:", error);
    return NextResponse.json(
      { error: "Failed to fetch semesters" },
      { status: 500 }
    );
  }
}
