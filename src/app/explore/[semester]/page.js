import { getSubjectsBySemester } from "@/lib/database";
import Card from "@/components/ui/Card";
import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

export default async function SubjectPage({ params }) {
  params = await params;
  const semester = parseInt(params.semester);
  const subjects = await getSubjectsBySemester(semester);

  if (subjects.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            No Papers Found
          </h1>
          <p className="text-gray-600 mb-6">
            No papers are available for Semester {semester} at this time.
          </p>
          <Link
            href="/explore"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Explore
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/explore"
          className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
        >
          ← Back to Explore
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Semester {semester} Papers
        </h1>
        <p className="text-xl text-gray-600">
          {subjects.length} subjects available
        </p>
      </div>

      <div className="grid gap-4">
        {subjects.map((subject, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {subject.subject}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Semester {semester} • PDF Document
                  </p>
                </div>
              </div>
              <a
                href={subject.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Access Paper</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-600 rounded-full p-1 mt-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              Access Information
            </h3>
            <p className="text-blue-800 text-sm">
              Papers require institutional credentials to access. Links will
              open in a new tab and We'll take care of the authentication
              process for you.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
