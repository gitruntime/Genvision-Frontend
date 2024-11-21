import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OverviewTab } from "../components/overview-tab";
import { ExperienceTab } from "../components/experience-tab";
import { EducationTab } from "../components/education-tab";
import { CertificateTab } from "../components/certificate-tab";
import TeacherAI from "../components/ai";

export const TeacherView: React.FC = () => {
  return (
    <>
      <main className="grid flex-1 items-start mt-3">
        <div className="container mx-auto p-4 lg:overflow-scroll lg:max-h-[550px] lg:hide-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Thouseef Hamza T P's Profile</h1>
            {/* <Badge>Class Leader</Badge> */}
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              {[
                { value: "ai", label: "AI" },
                { value: "overview", label: "Overview" },
                { value: "experience", label: "Experience" },
                { value: "certificates", label: "Certificates" },
                { value: "educations", label: "Educations" },
                { value: "salary", label: "Salary" },
                { value: "classDetails", label: "Class Details" },
                { value: "designation", label: "Designation" },
                { value: "performance", label: "Performance" },
                { value: "documents", label: "Documents" },
              ].map((value, index) => (
                <TabsTrigger key={index} value={value.value}>
                  {value.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="ai" className="hide-scrollbar">
              <TeacherAI />
            </TabsContent>

            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>

            <TabsContent value="experience">
              <ExperienceTab />
            </TabsContent>

            <TabsContent value="educations">
              <EducationTab />
            </TabsContent>

            <TabsContent value="certificates">
              <CertificateTab />
            </TabsContent>

            <TabsContent value="performance">
              {/* <Performance /> */}
            </TabsContent>

            <TabsContent value="marks">{/* <Marks /> */}</TabsContent>

            <TabsContent value="documents">{/* <Documents /> */}</TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};
