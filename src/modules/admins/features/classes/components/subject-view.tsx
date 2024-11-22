import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye, Loader2 } from "lucide-react";
import { useListSubject, useUpdateSubject } from "../store/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import Yup from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const SubjectListSkeleton = () => {
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

const SubjectList = () => {
  const { data: subjects, isLoading: isSubjectListLoading } = useListSubject({
    page: 1,
    size: 10,
    sortBy: "id",
    sortOrder: "ASC",
  });

  const {
    mutate: updateMutate,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateSubject();

  const [subjectPreviewAction, setSubjectPreviewAction] = useState(null);
  const [subjectId, setSubjectId] = useState(null);

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      code: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Subject Name is required"),
      code: Yup.string().optional(),
    }),
    onSubmit: (values) => {
      updateMutate(subjectId, values);
    },
  });

  const handleSubjectForm = (data: any, action = "") => {
    setSubjectPreviewAction(action);
    setSubjectId(data.id);
    setValues({ name: data.name, code: data.code });
  };

  useEffect(() => {
    if (isUpdateError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title:
          updateError?.response?.data?.message ||
          "Uh oh! Something went wrong during creation.",
        description: "Try Again",
      });
    }

    if (isUpdateSuccess) {
      toast({
        variant: "success",
        title: "Subject updated Successfully.!",
      });
    }
  }, [isUpdateError, isUpdateSuccess]);

  return (
    <div className="flex">
      <div className="flex-1 overflow-y-scroll max-h-[500px] hide-scrollbar">
        {isSubjectListLoading ? (
          <SubjectListSkeleton />
        ) : subjects?.data && subjects.data.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Code</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.data.map((subject: any) => (
                <tr key={subject.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{subject.name}</td>
                  <td className="p-4">{subject.code}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSubjectForm(subject, "view")}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSubjectForm(subject, "edit")}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSubjectForm(subject, "delete")}
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

      {subjectPreviewAction ? (
        <div className="flex-1 flex items-center justify-center">
          {isUpdatePending && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}
          <form className="space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                id="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                disabled={subjectPreviewAction === "view" ? true : false}
                placeholder="Enter subject name"
              />
              {touched.name && errors.name && (
                <div className="text-xs text-red-500">
                  {/* @ts-ignore */}
                  {errors.name}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Subject Code</Label>
              <Input
                id="code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code}
                disabled={subjectPreviewAction === "view" ? true : false}
                placeholder="Enter subject code"
              />
            </div>
            {subjectPreviewAction === "edit" && (
              <Button type="submit" className="w-full">
                Update Subject
              </Button>
            )}
          </form>
        </div>
      ) : subjects?.data && subjects?.data.length > 0 ? (
        <div className="flex-1">
          <div
            className={
              "flex flex-1 items-center h-full justify-center rounded-lg border border-dashed shadow-sm"
            }
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">No Subjects</h3>
              <p className="text-sm text-muted-foreground">
                No Subjects where selected
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SubjectList;
