import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { BookOpen, Search, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">Papers Explorer</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover and access academic papers organized by semester and subject.
          Your gateway to comprehensive educational resources.
        </p>
        <Link href="/explore">
          <Button className="text-lg px-8 py-3">
            <Search className="h-5 w-5 mr-2" />
            Start Exploring
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Organized Papers</h3>
          <p className="text-gray-600">
            Papers are systematically organized by semester and subject for easy
            navigation.
          </p>
        </Card>

        <Card className="text-center">
          <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
          <p className="text-gray-600">
            Quickly find papers by selecting your semester and browsing
            subjects.
          </p>
        </Card>

        <Card className="text-center">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Student Focused</h3>
          <p className="text-gray-600">
            Designed with students in mind for seamless academic resource
            access.
          </p>
        </Card>
      </div>

      {/* Stats Section */}
      <Card className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Platform Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl font-bold text-blue-600">147</div>
            <div className="text-gray-600">Total Papers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">7</div>
            <div className="text-gray-600">Semesters</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">Multiple</div>
            <div className="text-gray-600">Subjects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">24/7</div>
            <div className="text-gray-600">Access</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
