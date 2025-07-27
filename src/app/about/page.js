import Card from "@/components/ui/Card";
import { Users, Target, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-xl text-gray-600">
          Learn more about Papers Explorer and our mission
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <div className="flex items-start space-x-4">
            <Target className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This is a template About Us page. You can customize this content
                to describe your organization's mission, values, and goals.
                Replace this placeholder text with information about your
                institution, team, or purpose.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-4">
            <Users className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Our Team
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Add information about your team members, contributors, or the
                people behind this platform. You can include their roles,
                expertise, and contributions to the project.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-4">
            <Lightbulb className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Describe your vision for the future of academic resource
                sharing, your goals for the platform, or how you plan to expand
                and improve the service for users.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
