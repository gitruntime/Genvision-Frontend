import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Attendance, OverviewTab, Performance, Teacher, Marks, Documents } from "../components";

export const ParentView = () => {
  
  return (
    <main className="grid flex-1 items-start mt-3">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Parents Profile</h1>
          <Badge>Class Leader</Badge>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="marks">Marks</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="attendance">
           <Attendance />
          </TabsContent>

          <TabsContent value="teachers">
            <Teacher/>
          </TabsContent>

          <TabsContent value="performance">
            <Performance />
          </TabsContent>

          <TabsContent value="marks">
            <Marks />
          </TabsContent>

          <TabsContent value="documents">
            <Documents />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
