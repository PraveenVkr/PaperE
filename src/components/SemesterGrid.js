"use client";
import Link from "next/link";
import Card from "./ui/Card";

export default function SemesterGrid({ semesters }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 8 }, (_, i) => i + 1).map((semester) => {
        const isAvailable = semesters.includes(semester);

        return (
          <Card
            key={semester}
            className={`text-center ${!isAvailable ? "opacity-50" : ""}`}
          >
            {isAvailable ? (
              <Link
                href={`/explore/${semester}`}
                className="block p-4 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {semester}
                </div>
                <div className="text-gray-700">Semester {semester}</div>
              </Link>
            ) : (
              <div className="p-4">
                <div className="text-3xl font-bold text-gray-400 mb-2">
                  {semester}
                </div>
                <div className="text-gray-400">No Papers</div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
