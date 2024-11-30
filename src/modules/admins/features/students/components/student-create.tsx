import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Yup from "@/lib/utils";
import { useFormik } from "formik";
import { useCreateStudent } from "../store/hooks";
import { toast } from "@/hooks/use-toast";
import { FormEvent, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const StudentCreateComp = ({ modalAction }: any) => {
  const { mutate, isPending, isSuccess, error, isError } = useCreateStudent();
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().optional(),
      email: Yup.string().required("Email is required.!"),
      password: Yup.string()
        .required("Password is required.!")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[^a-zA-Z0-9]/,
          "Password must contain at least one special character"
        ),
    }),
    onSubmit: (values: any) => {
      console.log(values);

      mutate(values);
    },
  });

  const generate: any = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFieldValue("password", "Password@123");
  };

  useEffect(() => {
    if (isSuccess) {
      modalAction(false);
      toast({
        variant: "success",
        title: "Student created successfully!",
      });
    }

    if (isError) {
      toast({
        variant: "destructive",
        title: "Student not created",
        description:
        // @ts-ignore
          error?.response?.data.message ||
          "An error occurred while creating the student.",
      });
    }
  }, [isSuccess, isError]);

  const [passVisible, setPassVisible] = useState<boolean>(false);
  return (
    <DialogContent className="sm:max-w-[550px]">
      {isPending && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      <DialogHeader>
        <DialogTitle>Add Student</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <Input
          id="firstName"
          type="text"
          placeholder="First Name"
          className="w-full"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
        />
        {touched.firstName && errors.firstName ? (
          <div className="text-xs text-red-500">
            {/* @ts-ignore */}
            {errors.firstName}
          </div>
        ) : null}
        <Input
          id="lastName"
          type="text"
          placeholder="Last Name"
          className="w-full"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastName}
        />
        {touched.lastName && errors.lastName ? (
          <div className="text-xs text-red-500">
            {/* @ts-ignore */}
            {errors.lastName}
          </div>
        ) : null}
        <Input
          id="email"
          type="text"
          placeholder="Email"
          className="w-full"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
        {touched.email && errors.email ? (
          <div className="text-xs text-red-500">
            {/* @ts-ignore */}
            {errors.email}
          </div>
        ) : null}
        <div className="flex gap-2">
          <Input
            id="password"
            type={passVisible ? "text" : "password"}
            placeholder="Password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            className="w-full"
          />
          {touched.password && errors.password ? (
            <div className="text-xs text-red-500">
              {/* @ts-ignore */}
              {errors.password}
            </div>
          ) : null}
          <Button type="button" onClick={() => setPassVisible(!passVisible)}>
            show
          </Button>
          <Button type="button" onClick={generate}>
            Generate
          </Button>
        </div>
        <Button type="submit" className="w-full">
          Add Student
        </Button>
      </form>
    </DialogContent>
  );
};

export default StudentCreateComp;
