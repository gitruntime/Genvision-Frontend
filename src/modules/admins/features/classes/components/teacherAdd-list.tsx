import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye, Loader2, AlertCircle } from "lucide-react";
import {
  useAddTeacherssToClass,
  useDeleteTeacherFromClass,
  useGetSubjectsFromClass,
  useGetTeachersFromClass,
  useListSubject,
  useUpdateSubject,
} from "../store/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import Yup from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useListTeacher } from "../../teachers/store/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";

const TeacherAddListSkeleton = () => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="border-b">
          <th className="text-left p-4 font-medium">
            <Skeleton className="w-24 h-6" />
          </th>
          <th className="text-left p-4 font-medium">
            <Skeleton className="w-16 h-6" />
          </th>
          <th className="text-left p-4 font-medium">
            <Skeleton className="w-32 h-6" />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array(5) // Simulate 5 rows as loading
          .fill(0)
          .map((_, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">
                <Skeleton className="w-1/2 h-6" />
              </td>
              <td className="p-4">
                <Skeleton className="w-1/4 h-6" />
              </td>
              <td className="p-4">
                <div className="flex space-x-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const ROLES = [
  { id: "class", name: "Class Teacher" },
  { id: "subject", name: "Subject Teacher" },
];

const TeacherAddList = ({ classId, modalAction }: any) => {
  const {
    data: TEACHERS_ADD_LIST,
    isLoading: isTeachersLoading,
    isSuccess: isTeachersSuccess,
  } = useGetTeachersFromClass(classId);

  const {
    mutate: addTeacherMutate,
    isPending: isAddTeacherPending,
    isSuccess: isAddTeacherSuccess,
    isError: isAddTeacherError,
    error: addTeacherError,
  } = useAddTeacherssToClass();

  const {
    mutate: deleteTeacherMutate,
    isPending: isDeleteTeacherPending,
    isSuccess: isDeleteTeacherSuccess,
    isError: isDeleteTeacherError,
    error: deleteTeacherError,
  } = useDeleteTeacherFromClass(classId);

  const {
    data: CLASS_SUBJECTS,
    isLoading: isClassSubjectsLoading,
    isSuccess: isClassSubjectsSuccess,
  } = useGetSubjectsFromClass(classId);

  const {
    data: subjectList,
    isLoading: isSubjectLoading,
    isSuccess: isSubjectListSuccess,
  } = useListSubject({
    page: 1,
    size: 20,
    sortBy: "id",
    sortOrder: "ASC",
  });

  const { data: TEACHERS } = useListTeacher({
    page: 1,
    size: 20,
    sortBy: "id",
    sortOrder: "ASC",
  });

  const [classSubjects, setClassSubjects] = useState([]);

  useEffect(() => {
    if (isSubjectListSuccess && isClassSubjectsSuccess) {
      const subjects = subjectList?.data.filter((subject) =>
        CLASS_SUBJECTS?.subjectIds.includes(subject.id)
      );
      console.log(subjects, "hflsakjdsh");

      setClassSubjects(subjects);
    }
  }, [isSubjectListSuccess, isClassSubjectsSuccess]);

  const validationSchema = Yup.object({
    teacherId: Yup.string().required("Teacher is required"),
    subjectId: Yup.string().required("Subject is required"),
    teacherRole: Yup.string().required("Role is required"),
  });

  const {
    setFieldValue,
    handleSubmit,
    values,
    touched,
    errors,
    isValid,
    dirty,
    setValues,
  } = useFormik({
    initialValues: {
      teacherId: "",
      subjectId: "",
      teacherRole: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addTeacherMutate([classId, values]);
    },
  });

  const [subjectPreviewAction, setSubjectPreviewAction] = useState(null);
  const [subjectId, setSubjectId] = useState(null);

  const handleSubjectForm = (data: any, action = "") => {
    if (action === "delete") {
      deleteTeacherMutate(data.id);
    }
    setValues({
      teacherId: data.Teacher.accountId,
      teacherRole: data.teacherRole,
      subjectId: data.subjectId,
    });
    setSubjectPreviewAction(action);
    // setSubjectId(data.id);
  };

  useEffect(() => {
    if (isAddTeacherSuccess) {
      toast({
        variant: "success",
        title: "Teacher updated successfully!",
      });
    }

    if (isDeleteTeacherSuccess) {
      toast({
        variant: "success",
        title: "Teacher deleted successfully!",
      });
    }

    if (isAddTeacherError) {
      toast({
        variant: "destructive",
        title: "Teacher not created",
        description:
          addTeacherError?.response?.data?.message ||
          "An error occurred while creating the teacher.",
      });
    }

    if (isDeleteTeacherError) {
      toast({
        variant: "destructive",
        title: "Teacher not deleted",
        description:
          deleteTeacherError?.response?.data?.message ||
          "An error occurred while deleting the teacher.",
      });
    }
  }, [
    isAddTeacherError,
    isAddTeacherSuccess,
    isDeleteTeacherSuccess,
    isDeleteTeacherError,
  ]);
  return (
    <DialogContent className="max-w-[90%] max-h-[95%] overflow-y-scroll hide-sidebar">
      <DialogHeader>Class Participants</DialogHeader>
      <div className="flex">
        <div className="flex-1 overflow-y-scroll max-h-[500px] hide-scrollbar">
          {isTeachersLoading ? (
            <TeacherAddListSkeleton />
          ) : TEACHERS_ADD_LIST?.data && TEACHERS_ADD_LIST?.data.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Teacher</th>
                  <th className="text-left p-4 font-medium">Subject</th>
                  <th className="text-left p-4 font-medium">Role</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {TEACHERS_ADD_LIST?.data.map((teacher: any) => (
                  <tr key={teacher.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      {teacher.Teacher.accountDetails.fullName}
                    </td>
                    <td className="p-4">
                      {teacher.Subject.name + " " + teacher.Subject.code}
                    </td>
                    <td className="p-4">{teacher.teacherRole}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSubjectForm(teacher, "view")}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSubjectForm(teacher, "edit")}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSubjectForm(teacher, "delete")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // If no subjects, display a message
            <div className="p-4 text-center text-sm text-gray-500">
              No subjects available
            </div>
          )}
        </div>

        {subjectPreviewAction && values.teacherId ? (
          <div className="flex-1 flex items-center justify-center">
            {(isAddTeacherPending || isDeleteTeacherPending) && (
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
                  disabled={subjectPreviewAction === "view"}
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
                  <div className="text-red-500 text-sm mt-1">
                    {errors.teacherId}
                  </div>
                )}
              </div>

              <div>
                <Label>Subject</Label>
                {false ? (
                  <div className="skeleton-wrapper">
                    {/* Skeleton for Select Trigger */}
                    <div className="skeleton select-trigger-skeleton"></div>

                    {/* Skeleton for Select Content */}
                    <div className="skeleton select-content-skeleton">
                      {[...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className="skeleton select-item-skeleton"
                        ></div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Select
                    name="subjectId"
                    value={values.subjectId}
                    onValueChange={(value) => setFieldValue("subjectId", value)}
                    disabled={subjectPreviewAction === "view"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {classSubjects &&
                        classSubjects.map((subject: any) => (
                          <SelectItem
                            key={subject.id}
                            value={String(subject.id)}
                            // className={`${
                            //   addedTeachers.includes(subject.id) ? "bg-blue-300" : ""
                            // }`}
                          >
                            {subject.name + " " + subject.code}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}

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
                  <div className="text-red-500 text-sm mt-1">
                    {errors.subjectId}
                  </div>
                )}
              </div>

              <div>
                <Label>Role</Label>
                <Select
                  name="teacherRole"
                  value={values.teacherRole}
                  onValueChange={(value) => setFieldValue("teacherRole", value)}
                  disabled={subjectPreviewAction === "view"}
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

              {subjectPreviewAction === "edit" && (
                <Button type="submit" disabled={!(isValid && dirty)}>
                  Edit Teacher
                </Button>
              )}
            </form>
          </div>
        ) : TEACHERS_ADD_LIST?.data && TEACHERS_ADD_LIST?.data.length > 0 ? (
          <div className="flex-1">
            <div
              className={
                "flex flex-1 items-center h-full justify-center rounded-lg border border-dashed shadow-sm"
              }
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  No Subjects
                </h3>
                <p className="text-sm text-muted-foreground">
                  No Subjects where selected
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </DialogContent>
  );
};

export default TeacherAddList;
