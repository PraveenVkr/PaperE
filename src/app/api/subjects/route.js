import { NextResponse } from "next/server";
import { getSubjectsBySemester } from "@/lib/database";
import redis from "@/lib/redis";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const semester = searchParams.get("semester");

  if (!semester) {
    return NextResponse.json(
      { error: "Semester parameter is required" },
      { status: 400 }
    );
  }

  const cacheKey = `subjects:${semester}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

    const subjects = await getSubjectsBySemester(parseInt(semester));
    await redis.set(cacheKey, JSON.stringify(subjects), "EX", 3600); // cache for 1 hour

    return NextResponse.json(subjects);
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}
