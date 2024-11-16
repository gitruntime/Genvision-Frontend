import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Attendance, OverviewTab, Performance, Teacher, Marks, Documents } from "../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/modules/Teachers/apiConfig/Interceptor";
import { Subjects } from "../components/subjects-tab";
import { Loader as LucideLoader } from "lucide-react";

export const StudentView = () => {
  const [userDetails, setUserDetails] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const { id } = useParams(); // Get the id from the URL

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setLoading(true); // Start loader
      try {
        const response = await api.get(`/teacher/students/${id}`);
        setUserDetails(response.data?.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchStudentDetails();
  }, [id]);

  return (
    <main className="grid flex-1 items-start mt-3">
      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <LucideLoader className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{userDetails?.fullName}</h1>
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

            <TabsContent value="subjects">
              <Subjects />
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
      )}
    </main>
  );
};
