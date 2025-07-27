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
                Papers Explorer was created with a simple goal: to make
                accessing college papers easier for students like us. We noticed
                how hard it was to navigate our college’s DSpace portal, and
                decided to build something better — a faster, cleaner, and more
                user-friendly alternative. Our mission is to help students save
                time and frustration while studying.
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
                I'm a solo developer working on this project, but the idea was
                born through discussions with two of my friends. Together, we
                were frustrated by the clunky and outdated UI of our college’s
                DSpace portal — so we brainstormed a better way. I took the lead
                on building it, with their input shaping the vision.
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
                We want to improve how academic resources are accessed —
                starting with our own college. Over time, we hope to expand this
                platform and make it available to students in other institutions
                facing similar problems. The goal is simple: make study
                materials easier to find and more accessible to everyone who
                needs them.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
