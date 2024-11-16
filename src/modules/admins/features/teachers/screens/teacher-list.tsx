import { ListFilter, Loader2, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { NoListComponent } from "@/modules/admins/components/no-list";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TeacherListComponent } from "../components/teacher-list";
import { useCreateTeacher, useListTeacher } from "../store/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export const TeacherList: React.FC = () => {
  const {
    mutate: teacherMutate,
    isError: isPostError,
    isSuccess: isPostSuccess,
    error,
    isPending,
    data,
  } = useCreateTeacher();
  useEffect(() => {
    if (isPostSuccess) {
      toast({
        variant: "success",
        title: "Teacher created successfully!",
      });
    }

    if (isPostError) {
      toast({
        variant: "destructive",
        title: "Teacher not created",
        description:
          error?.message || "An error occurred while creating the teacher.",
      });
    }
  }, [isPostSuccess, isPostError]);
  const [position, setPosition] = useState("10");
  const [filterBy, setFilterBy] = useState("id");
  const {
    data: {
      currentPage = 1,
      data: teachers,
      message = "",
      size = 10,
      totalCount = 0,
      totalPages = 1,
    } = {},
    isError,
    isSuccess,
    isLoading: isListLoading,
  } = useListTeacher({
    page: 1,
    size: position,
    sortBy: filterBy,
    sortOrder: "ASC",
  });

  const [activeTab, setActiveTab] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isPostSuccess) {
      setIsModalOpen(false);
    }
  }, [isPostSuccess]);

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    resetForm,
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
    onSubmit: (values) => {
      console.log(values);
      teacherMutate({ ...values });
    },
  });
  const [passVisible, setPassVisible] = useState<boolean>(false);

  const generate: any = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFieldValue("password", "Password@123");
  };

  // useEffect(() => {
  //   const filtered = students.filter((student) => {
  //     if (activeTab === "active") return student.status === "Active";
  //     if (activeTab === "inactive") return student.status === "Inactive";
  //     return true; // For 'all'
  //   });
  //   console.log(filtered);
  //   setFilteredStudents(filtered);
  // }, [activeTab]);

  const start: number = (currentPage - 1) * size + 1;
  const end: number = Math.min(currentPage * size, totalCount);

  if (isListLoading) {
    return (
      <>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
        {teachers && teachers.length > 0 ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="all"
          >
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {[
                      { id: "id", label: "ID" },
                      { id: "firstName", label: "First Name" },
                      { id: "lastName", label: "Last Name" },
                      { id: "email", label: "Email" },
                    ].map((value) => (
                      <DropdownMenuCheckboxItem key={value.id}>
                        {value.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" /> Add Teacher
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    {isPending && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                      </div>
                    )}
                    <DialogHeader>
                      <DialogTitle>Add Teacher</DialogTitle>
                      <DialogDescription> </DialogDescription>
                    </DialogHeader>
                    <form
                      className="flex flex-col space-y-4"
                      onSubmit={handleSubmit}
                    >
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
                            {errors.password}
                          </div>
                        ) : null}
                        <Button
                          type="button"
                          onClick={() => setPassVisible(!passVisible)}
                        >
                          show
                        </Button>
                        <Button type="button" onClick={generate}>
                          Generate
                        </Button>
                      </div>
                      <div className="flex justify-center gap-2">
                        <Button type="submit" className="w-full">
                          Add Teacher & Send Onboarding Mail
                        </Button>
                        <Button type="submit" className="w-full">
                          Add Teacher
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <TabsContent value={activeTab}>
              {teachers.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Teachers</CardTitle>
                    <CardDescription>Manage your teachers.</CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-[350px] overflow-auto scrollbar">
                    <Table className=" overflow-scroll">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Full Name</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Joined
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="max-h-[400px] overflow-hidden">
                        <TeacherListComponent teachers={teachers} />
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="default">{position}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Page Size</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={position}
                            onValueChange={setPosition}
                          >
                            {["10", "20", "30", "40", "50"].map(
                              (size, index) => (
                                <DropdownMenuRadioItem key={index} value={size}>
                                  {size}
                                </DropdownMenuRadioItem>
                              )
                            )}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>{" "}
                      Showing <strong>{`${start} - ${end}`}</strong> of{" "}
                      <strong>{totalCount}</strong> teachers
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                <NoListComponent
                  className="h-[400px] lg:h-[510px]"
                  label="Teacher"
                />
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <NoListComponent label="Teacher" action={() => {}} />
        )}
      </main>
    </>
  );
};
