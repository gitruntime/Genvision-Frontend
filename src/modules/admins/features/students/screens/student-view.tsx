import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Attendance,
  OverviewTab,
  Teacher,
  Marks,
  Documents,
} from "../components";
import { FC } from "react";
import AnatomyDashboard from "../components/ai-tab";
import { useParams } from "react-router-dom";

const StudentView: FC = () => {
  const { id: studentId } = useParams();

  console.log(studentId,"studenid");
  

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
              "Attendance",
              // "Subjects",
              "Marks",
              "Performance",
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
            {studentId && <OverviewTab studentId={studentId} />}
          </TabsContent>

          <TabsContent value="attendance" className="h-[10%]">
            {studentId && <Attendance studentId={studentId} />}
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
