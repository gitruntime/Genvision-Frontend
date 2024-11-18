"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { FC, useEffect } from "react";
import * as Yup from "yup";
import { useUpdateTeacher } from "../store/hooks";
import { useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// This component is used for
export const TeacherEditComponent: FC = ({
  teacher,
  onUpdateChange,
  open,
}: any) => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  console.log(teacher);

  const { mutate, isError, isSuccess, error, isPending } = useUpdateTeacher(id as string);
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
      firstName: teacher?.firstName || "",
      lastName: teacher?.lastName || "",
      email: teacher?.email || "",
      username: teacher?.username || "",
      phoneNumber: teacher?.phoneNumber || "",
      dateOfBirth: teacher?.dataOfBirth || new Date(),
      bio: teacher?.bio || "",
      bloodGroup: teacher?.bloodGroup || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().optional(),
      email: Yup.string().required("Email is required.!"),
      phoneNumber: Yup.string()
        .matches(
          /^(?:\+?\d{1,2})?[ -]?\(?\d{1,4}\)?[ -]?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,4}$/,
          "Phone number is not valid"
        )
        .required("Phone number is required"),
      username: Yup.string().optional(),
      dateOfBirth: Yup.date().optional(),
      bio: Yup.string().optional(),
      bloodGroup: Yup.string().optional(),
    }),
    onSubmit: (values) => {
      console.log(values, "Form Submitted Successfully");

      mutate(values);
    },
  });

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Try Again",
      });
    }

    if (isSuccess) {
      onUpdateChange(!open);
      toast({
        variant: "success",
        title: "Teacher updated successfully",
      });
    }
  }, [isError, isSuccess]);
  return (
    <DialogContent className="sm:max-w-[550px]">
      {isPending && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      <DialogHeader>
        <DialogTitle>Edit Teacher</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            {" "}
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
              // @ts-ignore
              <div className="text-xs text-red-500">{errors.firstName}</div>
            ) : null}
          </div>
          <div className="flex flex-col w-1/2">
            {" "}
            <Input
              id="lastName"
              type="text"
              placeholder="Last Name"
              className="w-full"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
            />{" "}
            {touched.lastName && errors.lastName ? (
              // @ts-ignore
              <div className="text-xs text-red-500 mt-1">{errors.lastName}</div>
            ) : null}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
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
              // @ts-ignore
              <div className="text-xs text-red-500">{errors.email}</div>
            ) : null}
          </div>
          <div className="flex flex-col w-1/2">
            <Input
              id="phoneNumber"
              type="text"
              placeholder="Phone Number"
              className="w-full"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phoneNumber}
            />
            {touched.phoneNumber && errors.phoneNumber ? (
              // @ts-ignore
              <div className="text-xs text-red-500">{errors.phoneNumber}</div>
            ) : null}
          </div>
        </div>
        <div className="flex gap-4">
          <Input
            id="username"
            type="text"
            placeholder="User Name"
            className="w-full"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.username}
          />
          {touched.username && errors.username ? (
            // @ts-ignore
            <div className="text-xs text-red-500">{errors.username}</div>
          ) : null}
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !values.dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {values.dateOfBirth ? (
                    format(values.dateOfBirth, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={values.dateOfBirth}
                  onSelect={(value) => setFieldValue("dateOfBirth", value)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {touched.dateOfBirth && errors.dateOfBirth ? (
              // @ts-ignore
              <div className="text-xs text-red-500">{errors.dateOfBirth}</div>
            ) : null}
          </div>
          <div className="flex flex-col w-1/2">
            <Input
              id="bloodGroup"
              type="text"
              placeholder="Blood Group"
              className="w-full"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.bloodGroup}
            />
            {touched.bloodGroup && errors.bloodGroup ? (
              // @ts-ignore
              <div className="text-xs text-red-500">{errors.bloodGroup}</div>
            ) : null}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              value={values.bio}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Say something about the teacher."
              id="bio"
            />
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <Button type="submit" className="w-full">
            Edit Teacher
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
