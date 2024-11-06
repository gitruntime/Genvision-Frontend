import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Attendance,
  OverviewTab,
  Performance,
  Teacher,
  Marks,
  Documents,
} from "../components";
import { FC } from "react";
import AnatomyDashboard from "../components/ai-tab";

const StudentView: FC = () => {
  return (
    <main className="grid flex-1 items-start mt-3">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Thouseef Hamza T P's Profile</h1>
          <Badge>Class Leader</Badge>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            {[
              "AI",
              "Overview",
              "Teachers",
              "Attendance",
              "Subjects",
              "Marks",
              "Performance",
              "Documents",
            ].map((tab, idx) => (
              <TabsTrigger key={idx} value={tab.toLowerCase()}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="ai">
            <AnatomyDashboard />
          </TabsContent>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="attendance">
            <Attendance />
          </TabsContent>

          <TabsContent value="teachers">
            <Teacher />
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

export default StudentView;
