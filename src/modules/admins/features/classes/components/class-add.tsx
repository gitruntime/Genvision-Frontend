import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Yup from "@/lib/utils";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useCreateClass, useUpdateClass } from "../store/hooks";

export const ClassAddComp = ({ classData = {}, modalAction }: any) => {
  const {
    mutate: createMutate,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    error: createError,
    isPending: isCreatePending,
  } = useCreateClass();

  const {
    mutate: updateMutate,
    isError: isEditError,
    isSuccess: isEditSuccess,
    error: editError,
    isPending: isEditPending,
  } = useUpdateClass(classData?.id);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: classData?.name || "",
        section: classData?.section || "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Name is required"),
        section: Yup.string().optional(),
      }),
      onSubmit: (values) => {
        if (!classData) {
          createMutate(values);
        } else {
          updateMutate(values);
        }
      },
    });

  useEffect(() => {
    if (isCreateError || isEditError) {
      const errorMessage = isCreateError
      // @ts-ignore
        ? createError?.response?.data?.message ||
          "Uh oh! Something went wrong during creation."
        : isEditError
        // @ts-ignore
        ? editError?.response?.data?.message ||
          "Uh oh! Something went wrong during editing."
        : "Uh oh! Something went wrong.";

      toast({
        variant: "destructive",
        // @ts-ignore
        title: errorMessage,
        description: "Try Again",
      });
    }

    if (isCreateSuccess || isEditSuccess) {
      modalAction(false);
      toast({
        variant: "success",
        title: `Class ${isCreateSuccess ? "created" : "updated"} Successfully.`,
      });
    }
  }, [isCreateError, isCreateSuccess, isEditError, isEditSuccess]);
  return (
    <>
      {(isCreatePending || isEditPending) && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      <DialogHeader>
        <DialogTitle>{`${!classData ? "Add" : "Edit"} Class`}</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <Input
          id="name"
          type="text"
          placeholder="Class Name"
          className="w-full"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          autoFocus={!!classData}
        />
        {touched.name && errors.name && (
          // @ts-ignore
          <div className="text-xs text-red-500">{errors.name}</div>
        )}
        <Input
          id="section"
          type="text"
          placeholder="Section"
          className="w-full"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.section}
        />
        <div className="flex justify-center gap-2">
          <Button type="submit" className="w-full">
            {`${!classData ? "Add" : "Edit"} Class`}
          </Button>
        </div>
      </form>
    </>
  );
};
