import { getSemesters } from "@/lib/database";
import SemesterGrid from "@/components/SemesterGrid";
import Card from "@/components/ui/Card";

export default async function Explore() {
  const semesters = await getSemesters();
  const semesterNumbers = semesters.map((s) => s.semester);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Explore Papers by Semester
        </h1>
        <p className="text-xl text-gray-600">
          Select a semester to view available subjects and papers
        </p>
      </div>

      <Card className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Choose Your Semester
        </h2>
        <SemesterGrid semesters={semesterNumbers} />
      </Card>

      <div className="text-center text-gray-600">
        <p>
          Click on any available semester to browse subjects and access papers.
          Papers require institutional credentials for access. But you don't
          need to worry about that ^-^
        </p>
      </div>
    </div>
  );
}
