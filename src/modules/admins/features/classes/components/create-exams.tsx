import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useListClass } from "../store/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CreateExamPreview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Exam Preview</h1>
      <div className="flex justify-center">
        <CreateExam />
      </div>
    </div>
  );
};

const ClassCard = ({ className, selected, onClick }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md 
      ${
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-blue-200"
      }`}
  >
    <div className="text-sm font-medium">{className}</div>
    {selected && (
      <div className="absolute top-2 right-2 text-blue-500">
        <Check className="w-4 h-4" />
      </div>
    )}
  </button>
);

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ClassCardSkeleton = () => (
  <div className="relative p-4 rounded-lg border-2 border-gray-200 bg-gray-50 transition-all duration-200 hover:shadow-md">
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="absolute top-2 right-2 h-4 w-4 rounded-full" />
  </div>
);

interface Subject {
  name: string;
  dueDate: string;
  startTime: string;
  endTime: string;
}

interface ClassSchedule {
  name: string;
  subjects: Subject[];
}

const ExamInfo = () => {
  const {
    data: classes,
    isPending: isClassPending,
    isSuccess: isClassSuccess,
  } = useListClass({ page: 1, size: 10, sortBy: "id", sortOrder: "ASC" });
  const [selectedClasses, setSelectedClasses] = useState<any>([]);

  const toggleClass = (className: any) => {
    setSelectedClasses((prev: any) =>
      prev.includes(className.id)
        ? prev.filter((id: any) => id !== className.id)
        : [...prev, className.id]
    );
  };
  return (
    <form className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section: Basic Form Data */}
        <div className="flex-[40%] space-y-4 p-4 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="examName">Exam Name</Label>
            <Input
              id="examName"
              placeholder="Enter exam name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              placeholder="Start Date"
              type="date"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              placeholder="End Date"
              type="date"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex-[60%] space-y-4 p-4 rounded-lg">
          {classes?.data && classes?.data.length > 0 && (
            <div className="space-y-4">
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search classes..."
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-lg">Select Classes</Label>
                <div className="text-sm text-gray-500">
                  {selectedClasses.length} classes selected
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {isClassPending &&
                  [...Array(5)].map((_, index) => (
                    <ClassCardSkeleton key={index} />
                  ))}
                {classes?.data.map((className) => (
                  <ClassCard
                    key={className.id}
                    className={className.name + " " + className.section}
                    selected={selectedClasses.includes(className.id)}
                    onClick={() => toggleClass(className)}
                  />
                ))}
              </div>

              {selectedClasses.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500 mr-2">Selected:</span>
                  {selectedClasses.map((classId) => {
                    const classObj = classes?.data.find(
                      (cls) => cls.id === classId
                    );
                    return (
                      <span
                        key={classId}
                        className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                      >
                        {classObj?.name || "Unknown Class"}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {classes?.data && classes.data.length === 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Create Classes before creating Exams
              </AlertDescription>
            </Alert>
          )}

          <Button
            className="w-full mt-4"
            disabled={selectedClasses.length === 0}
          >
            Create Exam with ({selectedClasses.length} classes)
          </Button>
        </div>
      </div>
    </form>
  );
};

const CreateExam = () => {
  return (
    <>
      <ExamInfo />
      {/* <ScheduleInfo /> */}
    </>
  );
};

export default CreateExam;
