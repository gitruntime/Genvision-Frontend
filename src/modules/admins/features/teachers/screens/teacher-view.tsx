import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OverviewTab } from "../components/overview-tab";
import { ExperienceTab } from "../components/experience-tab";
import { EducationTab } from "../components/education-tab";
import { CertificateTab } from "../components/certificate-tab";

export const TeacherView: React.FC = () => {
  return (
    <>
      <main className="grid flex-1 items-start mt-3">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Thouseef Hamza T P's Profile</h1>
            {/* <Badge>Class Leader</Badge> */}
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="educations">Educations</TabsTrigger>
              <TabsTrigger value="salary">Salary</TabsTrigger>
              <TabsTrigger value="classDetails">Class Details</TabsTrigger>
              <TabsTrigger value="designation">Designation</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

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
