import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateSubject } from "../store/hooks";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import Yup from "@/lib/utils";

export const CreateSubjectPreview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Subject Preview</h1>
      <div className="flex justify-center">
        <CreateSubject />
      </div>
    </div>
  );
};

const CreateSubject = ({ modalAction, subjectData = {} }: any) => {
  const {
    mutate: createMutate,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = useCreateSubject();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        code: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Subject Name is required"),
        code: Yup.string().optional(),
      }),
      onSubmit: (values: any) => {
        createMutate(values);
      },
    });

  useEffect(() => {
    if (isCreateError) {
      toast({
        variant: "destructive",
        title:
        // @ts-ignore
          createError?.response?.data?.message ||
          "Uh oh! Something went wrong during creation.",
        description: "Try Again",
      });
    }

    if (isCreateSuccess) {
      modalAction(false);
      toast({
        variant: "success",
        title: `Subject ${
          isCreateSuccess ? "created" : "updated"
        } Successfully.`,
      });
    }
  }, [isCreateError, isCreateSuccess]);
  return (
    <>
      {isCreatePending && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      <DialogHeader>
        <DialogTitle>{`${!subjectData ? "Add" : "Edit"} Subjects`}</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Subject Name</Label>
          <Input
            id="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
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
            placeholder="Enter subject code"
          />
        </div>
        <Button className="w-full">Create Subject</Button>
      </form>
    </>
  );
};

export default CreateSubject;
