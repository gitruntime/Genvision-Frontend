import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  useCreateExam,
  useGetSubjectDataUsingClass,
  useListClass,
} from "../store/hooks";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const CreateExamPreview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Exam Preview</h1>
      <div className="flex justify-center">
        <CreateExam modalAction={"anything"} />
      </div>
    </div>
  );
};

// const ClassCard = ({ className, selected, onClick }: any) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md 
//       ${
//         selected
//           ? "border-blue-500 bg-blue-50"
//           : "border-gray-200 hover:border-blue-200"
//       }`}
//   >
//     <div className="text-sm font-medium">{className}</div>
//     {selected && (
//       <div className="absolute top-2 right-2 text-blue-500">
//         <Check className="w-4 h-4" />
//       </div>
//     )}
//   </button>
// );

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import { toast } from "@/hooks/use-toast";

// const ClassCardSkeleton = () => (
//   <div className="relative p-4 rounded-lg border-2 border-gray-200 bg-gray-50 transition-all duration-200 hover:shadow-md">
//     <Skeleton className="h-4 w-3/4 mb-2" />
//     <Skeleton className="absolute top-2 right-2 h-4 w-4 rounded-full" />
//   </div>
// );

// const classesData = [
//   { id: 1, name: "Class 10" },
//   { id: 2, name: "Class 11" },
//   { id: 3, name: "Class 12" },
// ];

// interface Subject {
//   name: string;
//   dueDate: string;
//   startTime: string;
//   endTime: string;
// }

// interface ClassSchedule {
//   name: string;
//   subjects: Subject[];
// }

const CreateExam = ({ modalAction }: any) => {
  const {
    data: classes,
  } = useListClass({ page: 1, size: 10, sortBy: "id", sortOrder: "ASC" });

  // const [selectedClasses, setSelectedClasses] = useState<any>([]);

  // const toggleClass = (className: any) => {
  //   setSelectedClasses((prev: any) =>
  //     prev.includes(className.id)
  //       ? prev.filter((id: any) => id !== className.id)
  //       : [...prev, className.id]
  //   );
  // };

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [pendingClassChange, setPendingClassChange] = useState<string | null>(
    null
  );
  const [examValues, setExamValues] = useState<any>(null);

  const {
    mutate: createExamMutate,
    isPending: isCreateExamPending,
    isError: isCreateExamError,
    isSuccess: isCreateExamSuccess,
    error: createExamError,
  } = useCreateExam();

  const { values, setFieldValue, handleChange } =
    useFormik({
      initialValues: {
        name: "",
        classId: "",
        endDate: "",
        startDate: "",
        subjects: [],
      },
      onSubmit: (values) => {
        console.log("Form submitted:", values);
      },
    });

  const {
    data: subjectsData,
    isPending: isSubjectsLoading,
    refetch: refetchSubjects,
  } = useGetSubjectDataUsingClass(values.classId);

  useEffect(() => {
    if (values.classId) {
      refetchSubjects();
    }
  }, [values.classId, refetchSubjects]);

  useEffect(() => {
    if (isCreateExamError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title: createExamError.response?.data.message,
        description: "Try Again",
      });
    }

    if (isCreateExamSuccess) {
      modalAction(false);
      toast({
        variant: "success",
        title: `Exam created Successfully.`,
      });
    }
  }, [isCreateExamSuccess, isCreateExamError]);

  const handleClassChangeAttempt = (value: string) => {
    if (values.subjects.length > 0) {
      setIsAlertOpen(true);
      setPendingClassChange(value);
    } else {
      handleClassChange(value);
    }
  };

  const handleClassChange = (value: string) => {
    setFieldValue("classId", value);
    setFieldValue("subjects", []);
    setIsAlertOpen(false);
    setPendingClassChange(null);
    if (value) {
      setTimeout(() => refetchSubjects(), 0);
    }
  };

  const handleAlertConfirm = () => {
    if (pendingClassChange) {
      handleClassChange(pendingClassChange);
    }
  };

  const handleAlertCancel = () => {
    setIsAlertOpen(false);
    setPendingClassChange(null);
  };

  const handleAddSubject = (subjectId: number) => {
    const existingSchedule = values.subjects;
    const isSubjectExists = existingSchedule.some(
      (schedule: any) => schedule.subjectId === subjectId
    );

    if (!isSubjectExists) {
      setFieldValue("subjects", [
        ...existingSchedule,
        {
          subjectId,
          examDate: "",
          startTime: "",
          endTime: "",
        },
      ]);
    }
  };

  const getSubjectName = (subjectId:any) => {
    if (!subjectsData?.data) return "Subject not found";
    const subject = subjectsData.data.find(
      (subject:any) => subject.id === subjectId
    );
    return subject ? subject.name : "Subject not found";
  };

  const handleRemoveSubject = (subjectId: number) => {
    const updatedSchedule = values.subjects.filter(
      (schedule: any) => schedule.subjectId !== subjectId
    );
    setFieldValue("subjects", updatedSchedule);
  };

  const handleSave = (publish: boolean) => {
    const formData = {
      ...values,
      isPublished: publish,
    };

    if (publish) {
      setExamValues(formData);
      setIsPublishModalOpen(true);
    } else {
      createExamMutate(formData);
    }
  };

  const handlePublishConfirm = () => {
    if (examValues) {
      createExamMutate(examValues);
      setIsPublishModalOpen(false);
      setExamValues(null);
    }
  };

  return (
    <>
      {isCreateExamPending && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="examName">Exam Name</Label>
          <Input
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter exam name"
            className="w-full"
          />
        </div>

        <div className="space-y-2 flex">
          <div className="space-y-2 flex-1 p-1">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              value={values.startDate}
              id="startDate"
              onChange={handleChange}
              placeholder="Start Date"
              type="date"
              className="w-full"
            />
          </div>

          <div className="flex-1 p-1">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              value={values.endDate}
              onChange={handleChange}
              placeholder="End Date"
              type="date"
              className="w-full"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Select Class</Label>
          <Select
            onValueChange={handleClassChangeAttempt}
            value={values.classId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              {classes?.data.map((classItem:any) => (
                <SelectItem key={classItem.id} value={classItem.id.toString()}>
                  {classItem.name + " " + classItem?.section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {values.classId && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {isSubjectsLoading ? (
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : subjectsData?.data?.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No Subjects Found</AlertTitle>
                  <AlertDescription>
                    There are no subjects available for this class.
                  </AlertDescription>
                </Alert>
              ) : (
                subjectsData?.data.map((subject: any) => (
                  <Button
                    key={subject.id}
                    type="button"
                    variant={
                      values.subjects.some(
                        (schedule: any) => schedule.subjectId === subject.id
                      )
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => handleAddSubject(subject.id)}
                    className="w-full"
                  >
                    {subject.name}
                  </Button>
                ))
              )}
            </div>

            {values.subjects.map((schedule: any) => (
              <Card key={schedule.subjectId}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <Label>Subject</Label>
                      <div className="mt-2">
                        {getSubjectName(schedule.subjectId)}
                      </div>
                    </div>
                    <div>
                      <Label>Max Score</Label>
                      <Input
                        type="number"
                        value={schedule.maxScore}
                        onChange={(e) =>
                          setFieldValue(
                            "subjects",
                            values.subjects.map((s: any) =>
                              s.subjectId === schedule.subjectId
                                ? { ...s, maxScore: e.target.value }
                                : s
                            )
                          )
                        }
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={schedule.examDate}
                        onChange={(e) =>
                          setFieldValue(
                            "subjects",
                            values.subjects.map((s: any) =>
                              s.subjectId === schedule.subjectId
                                ? { ...s, examDate: e.target.value }
                                : s
                            )
                          )
                        }
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={schedule.startTime}
                        onChange={(e) =>
                          setFieldValue(
                            "subjects",
                            values.subjects.map((s: any) =>
                              s.subjectId === schedule.subjectId
                                ? { ...s, startTime: e.target.value }
                                : s
                            )
                          )
                        }
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={schedule.endTime}
                        onChange={(e) =>
                          setFieldValue(
                            "subjects",
                            values.subjects.map((s: any) =>
                              s.subjectId === schedule.subjectId
                                ? { ...s, endTime: e.target.value }
                                : s
                            )
                          )
                        }
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveSubject(schedule.subjectId)}
                    className="mt-4"
                  >
                    Remove Subject
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="flex">
          <Button
            type="button"
            onClick={() => handleSave(false)}
            disabled={(classes?.data && subjectsData ) && subjectsData?.data.length === 0}
            className="w-full flex-1 mx-2"
          >
            Save Exam
          </Button>
          <Button
            type="button"
            onClick={() => handleSave(true)}
            disabled={(classes?.data && subjectsData ) && subjectsData?.data.length === 0}
            className="w-full flex-1 mx-2"
          >
            Save Exam & Publish
          </Button>
        </div>  
      </form>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Changing the class will remove all current exam schedule data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleAlertCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAlertConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isPublishModalOpen}
        onOpenChange={setIsPublishModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Publication</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to publish this exam? Once published, the
              exam details cannot be modified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsPublishModalOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handlePublishConfirm}>
              Publish Exam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateExam;
