import React, { useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Yup from "@/lib/utils";
import { useFormik } from "formik";
import { useListExam } from "../../classes/store/hooks";
import { useSMarkCreateAPI } from "../store/hooks";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ExamGradeModal = ({ modalAction, studentId }:any) => {
  const { data: EXAMS_LIST } = useListExam({ studentId });

  // Helper function to get exam name by id
  const getExamNameById = (examId:any) => {
    if (!EXAMS_LIST?.data) return "";
    const exam = EXAMS_LIST.data.find((exam:any) => exam.id === Number(examId));
    return exam ? exam.name : "";
  };

  const {
    mutate: CREATE_MARK,
    isPending: isCreateMarkPending,
    isSuccess: isCreateMarkSuccess,
    isError: isCreateMarkError,
    error: createError,
  } = useSMarkCreateAPI(studentId);

  useEffect(() => {
    if (isCreateMarkError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title: createError?.response?.data.message,
        description: "Try Again",
      });
    }

    if (isCreateMarkSuccess) {
      modalAction(false);
      toast({
        variant: "success",
        title: `Mark created Successfully.`,
      });
    }
  }, [isCreateMarkError, isCreateMarkSuccess]);

  const formik = useFormik({
    initialValues: {
      examId: "",
      examSubjectId: "",
      marksObtained: "",
      grade: "",
    },
    validationSchema: Yup.object({
      examId: Yup.string().required("Exam is required"),
      examSubjectId: Yup.string().required("Subject is required"),
      marksObtained: Yup.number()
        .required("Marks are required")
        .min(0, "Marks cannot be negative")
        .max(100, "Marks cannot exceed 100"),
      grade: Yup.string().required("Grade is required"),
    }),
    onSubmit: async (values) => {
      console.log(values, "form values");
      CREATE_MARK(values);
    },
  });

  const grades = ["A", "B", "C", "D", "F"];

  // Modified function to get subjects for selected exam
  const getExamSubjects = () => {
    if (!formik.values.examId || !EXAMS_LIST?.data) return [];

    const selectedExam = EXAMS_LIST.data.find(
      (exam : any) => exam.id === Number(formik.values.examId)
    );

    console.log("Selected exam:", selectedExam);

    if (!selectedExam?.examSubjects) {
      console.log("No subjects found for exam");
      return [];
    }

    console.log("Exam subjects:", selectedExam.examSubjects);
    return selectedExam.examSubjects;
  };

  // Reset subject selection when exam changes
  React.useEffect(() => {
    if (formik.values.examId) {
      formik.setFieldValue("examSubjectId", "");
    }
  }, [formik.values.examId]);

  const subjects = getExamSubjects();

  return (
    <DialogContent className="sm:max-w-[425px]">
      {isCreateMarkPending && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      <DialogHeader>
        <DialogTitle>Add Grade</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="examId">Exam</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue("examId", value)}
            value={formik.values.examId}
          >
            <SelectTrigger
              className={`w-full ${
                formik.touched.examId && formik.errors.examId
                  ? "border-red-500"
                  : ""
              }`}
            >
              <SelectValue>
                {formik.values.examId
                  ? getExamNameById(formik.values.examId)
                  : "Select exam"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {EXAMS_LIST?.data?.length ? (
                EXAMS_LIST.data.map((exam : any) => (
                  <SelectItem key={exam.id} value={String(exam.id)}>
                    {exam.name}
                  </SelectItem>
                ))
              ) : (
                <p className="p-4 text-center text-gray-500">
                  No exam found for this student class
                </p>
              )}
            </SelectContent>
          </Select>
          {formik.touched.examId && formik.errors.examId && (
            <div className="text-sm text-red-500">{formik.errors.examId}</div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="examSubjectId">Subject</Label>
          <Select
            onValueChange={(value) =>
              formik.setFieldValue("examSubjectId", value)
            }
            value={formik.values.examSubjectId}
          >
            <SelectTrigger
              className={`w-full ${
                formik.touched.examSubjectId && formik.errors.examSubjectId
                  ? "border-red-500"
                  : ""
              }`}
            >
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.length > 0 ? (
                subjects.map((subject:any) => (
                  <SelectItem key={subject.id} value={String(subject.id)}>
                    {subject.Subject.name}
                  </SelectItem>
                ))
              ) : (
                <p className="p-4 text-center text-gray-500">
                  {formik.values.examId
                    ? "No subjects found for this exam"
                    : "Please select an exam first"}
                </p>
              )}
            </SelectContent>
          </Select>
          {formik.touched.examSubjectId && formik.errors.examSubjectId && (
            <div className="text-sm text-red-500">
              {formik.errors.examSubjectId}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="marksObtained">Marks</Label>
          <Input
            id="marksObtained"
            name="marksObtained"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.marksObtained}
            className={`w-full ${
              formik.touched.marksObtained && formik.errors.marksObtained
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.marksObtained && formik.errors.marksObtained && (
            <div className="text-sm text-red-500">
              {formik.errors.marksObtained}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue("grade", value)}
            value={formik.values.grade}
          >
            <SelectTrigger
              className={`w-full ${
                formik.touched.grade && formik.errors.grade
                  ? "border-red-500"
                  : ""
              }`}
            >
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formik.touched.grade && formik.errors.grade && (
            <div className="text-sm text-red-500">{formik.errors.grade}</div>
          )}
        </div>

        <DialogFooter>
          <Button type="submit" disabled={formik.isSubmitting}>
            Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ExamGradeModal;
