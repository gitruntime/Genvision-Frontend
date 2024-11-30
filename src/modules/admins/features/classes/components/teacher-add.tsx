import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useListTeacher } from "../../teachers/store/hooks";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  useAddTeacherssToClass,
  useGetSubjectsFromClass,
  useListSubject,
} from "../store/hooks";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const ROLES = [
  { id: "class", name: "Class Teacher" },
  { id: "subject", name: "Subject Teacher" },
];

const TeacherAddComponent = ({ classId, modalAction }: any) => {
  // Validation Schema
  const validationSchema = Yup.object({
    teacherId: Yup.string().required("Teacher is required"),
    subjectId: Yup.string().required("Subject is required"),
    teacherRole: Yup.string().required("Role is required"),
  });

  const { data: TEACHERS } = useListTeacher({
    page: 1,
    size: 20,
    sortBy: "id",
    sortOrder: "ASC",
  });

  const [classSubjects, setClassSubjects] = useState([]);

  const {
    data: CLASS_SUBJECTS,
    isSuccess: getSubjectsSuccess,
  } = useGetSubjectsFromClass(classId);

  const {
    data: subjectList,
    isSuccess: isSubjectListSuccess,
  } = useListSubject({
    page: 1,
    size: 20,
    sortBy: "id",
    sortOrder: "ASC",
  });

  const {
    mutate: isAddTeacherMutate,
    isPending: isAddTeacherPending,
    isSuccess: isAddTeacherSuccess,
    isError: isAddTeacherError,
    error: addTeacherError,
  } = useAddTeacherssToClass();

  useEffect(() => {
    if (getSubjectsSuccess && isSubjectListSuccess) {
      const subjects = subjectList?.data.filter((subject:any) =>
        CLASS_SUBJECTS?.subjectIds.includes(subject.id)
      );
      console.log(subjects, "hflsakjdsh");

      setClassSubjects(subjects);
    }
  }, [getSubjectsSuccess, isSubjectListSuccess]);

  // Formik Hook
  const {
    setFieldValue,
    handleSubmit,
    values,
    touched,
    errors,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      teacherId: "",
      subjectId: "",
      teacherRole: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      isAddTeacherMutate([classId, values]);
    },
  });

  useEffect(() => {
    // console.log("Form values updated:", values);
    if (isAddTeacherSuccess) {
      modalAction(false);
      toast({
        title: "Teacher added Successfully",
        variant: "success",
      });
    }
    if (isAddTeacherError) {
      toast({
        title:
        // @ts-ignore
          addTeacherError?.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
    }
  }, [toast, isAddTeacherError, isAddTeacherSuccess]);

  return (
    <DialogContent className="">
      <DialogHeader>Add Teacher</DialogHeader>

      {isAddTeacherPending && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Teacher</Label>
          <Select
            name="teacherId"
            value={values.teacherId}
            onValueChange={(value) => setFieldValue("teacherId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Teacher" />
            </SelectTrigger>
            <SelectContent>
              {TEACHERS?.data &&
                TEACHERS?.data.map((teacher) => (
                  <SelectItem key={teacher.id} value={String(teacher.id)}>
                    {teacher.fullName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {touched.teacherId && errors.teacherId && (
            <div className="text-red-500 text-sm mt-1">{errors.teacherId}</div>
          )}
        </div>

        <div>
          <Label>Subject</Label>
          <Select
            name="subjectId"
            value={values.subjectId}
            onValueChange={(value) => setFieldValue("subjectId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {classSubjects && classSubjects.length > 0 ? (
                classSubjects.map((subject: any) => (
                  <SelectItem key={subject.id} value={String(subject.id)}>
                    {subject.name + " " + subject.code}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-gray-500">
                  There is no Subject associated with this class
                </div>
              )}
            </SelectContent>
          </Select>

          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="mt-1">
              Ensure you have added subjects to your class
            </AlertTitle>
            {/* <AlertDescription>
              Ensure you have added subjects to your class
            </AlertDescription> */}
          </Alert>
          {touched.subjectId && errors.subjectId && (
            <div className="text-red-500 text-sm mt-1">{errors.subjectId}</div>
          )}
        </div>

        <div>
          <Label>Role</Label>
          <Select
            name="teacherRole"
            value={values.teacherRole}
            onValueChange={(value) => setFieldValue("teacherRole", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {touched.teacherRole && errors.teacherRole && (
            <div className="text-red-500 text-sm mt-1">
              {errors.teacherRole}
            </div>
          )}
        </div>

        <Button type="submit" disabled={!(isValid && dirty)}>
          Add Teacher
        </Button>
      </form>
    </DialogContent>
  );
};

export default TeacherAddComponent;
