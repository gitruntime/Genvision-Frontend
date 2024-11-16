import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Yup from "@/lib/utils";
import { useFormik } from "formik";
import { Loader2, PlusCircle } from "lucide-react";

export const ClassAddComp = ({
  isModalOpen,
  setIsModalOpen,
  isPending,
  isEdit = false,
  classData,
}: any) => {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Name is required"),
      }),
      onSubmit: (values) => {
        console.log(values);
        //   teacherMutate({ ...values });
      },
    });
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {/* <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" /> Add Teacher
          </Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[550px]">
          {isPending && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}
          <DialogHeader>
            <DialogTitle>Add Class</DialogTitle>
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
            />
            {touched.name && errors.firstName ? (
              <div className="text-xs text-red-500">{errors.firstName}</div>
            ) : null}
            <Input
              id="name"
              type="text"
              placeholder="Section"
              className="w-full"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.section}
            />
            {touched.section && errors.section ? (
              <div className="text-xs text-red-500">{errors.section}</div>
            ) : null}
            <div className="flex justify-center gap-2">
              <Button type="submit" className="w-full">
                Add Class
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
