import { CircleChevronDown, Eye, ListFilter, PlusCircle } from "lucide-react";
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
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { NoListComponent } from "@/modules/admins/components/no-list";
import { Skeleton } from "@/components/ui/skeleton";
import { toast, useToast } from "@/hooks/use-toast";
import { useCreateClass, useListClass } from "../store/hooks";
import { ClassListComponent } from "../components/class-list";
import SubjectGridSelector from "../components/subject-list";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import StudentGridSelector from "../components/student-list";
import { ClassAddComp } from "../components/class-add";
import CreateExam from "../components/create-exams";
import SubjectList from "../components/subject-view";
import CreateSubject from "../components/subject-create";
import CreateEvent from "../components/create-event";
import EventList from "../components/view-event";
import ExamList from "../components/view-exams";

const TableSkeleton: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Skeleton className="h-4 w-24" /> {/* Header column */}
        <Skeleton className="h-4 w-40" /> {/* Header column */}
        <Skeleton className="h-4 w-32" /> {/* Header column */}
        <Skeleton className="h-4 w-20" /> {/* Header column */}
      </div>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 items-center mb-2 animate-pulse"
        >
          <Skeleton className="h-10 w-24 rounded" /> {/* Image or Avatar */}
          <Skeleton className="h-6 w-40 rounded" /> {/* Full Name */}
          <Skeleton className="h-6 w-32 rounded" /> {/* Joined Date */}
          <Skeleton className="h-6 w-20 rounded" /> {/* Actions */}
        </div>
      ))}
    </div>
  );
};

const ClassListSkeleton: React.FC = () => {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
        <Skeleton className="h-8 w-40" /> {/* Skeleton for header/title */}
        <Tabs defaultValue="all">
          <div className="flex items-center">
            {/* <TabsList> */}
            <Skeleton className="h-6 w-16 rounded gap-1" />{" "}
            {/* Skeleton for tab */}
            <Skeleton className="h-6 w-16 rounded" /> {/* Skeleton for tab */}
            <Skeleton className="h-6 w-16 rounded" /> {/* Skeleton for tab */}
            {/* </TabsList> */}
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-8 w-24 rounded" />{" "}
              {/* Skeleton for dropdown */}
            </div>
          </div>
          <TabsContent value="all">
            <Skeleton className="h-6 w-32" /> {/* Skeleton for card title */}
            <div className="max-h-[350px] overflow-auto">
              <TableSkeleton /> {/* Placeholder for table */}
            </div>
            <div className="text-xs text-muted-foreground">
              <Skeleton className="h-6 w-64" /> {/* Skeleton for pagination */}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export const ClassList: React.FC = () => {
  const {
    mutate,
    isError: isPostError,
    isSuccess: isPostSuccess,
    error,
    isPending,
    data,
  } = useCreateClass();

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
  //   const {
  //     data: {
  //       currentPage = 1,
  //       data: classes,
  //       message = "",
  //       size = 10,
  //       totalCount = 0,
  //       totalPages = 1,
  //     } = {},
  //     isError,
  //     isSuccess,
  //     isLoading: isListLoading,
  //   } = useListClass({
  //     page: 1,
  //     size: position,
  //     sortBy: filterBy,
  //     sortOrder: "ASC",
  //   });

  const [activeTab, setActiveTab] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const classes = [
    {
      id: 1,
      name: "Class 1A",
      studentCount: 30,
      subjectCount: 5,
      teacherCount: 3,
    },
    {
      id: 2,
      name: "Class 2B",
      studentCount: 28,
      subjectCount: 6,
      teacherCount: 4,
    },
    {
      id: 3,
      name: "Class 3C",
      studentCount: 25,
      subjectCount: 4,
      teacherCount: 2,
    },
    {
      id: 4,
      name: "Class 4D",
      studentCount: 32,
      subjectCount: 7,
      teacherCount: 5,
    },
    {
      id: 5,
      name: "Class 5E",
      studentCount: 29,
      subjectCount: 6,
      teacherCount: 3,
    },
    {
      id: 6,
      name: "Class 6F",
      studentCount: 31,
      subjectCount: 5,
      teacherCount: 4,
    },
    {
      id: 7,
      name: "Class 7G",
      studentCount: 26,
      subjectCount: 5,
      teacherCount: 3,
    },
    {
      id: 8,
      name: "Class 8H",
      studentCount: 27,
      subjectCount: 4,
      teacherCount: 2,
    },
    {
      id: 9,
      name: "Class 9I",
      studentCount: 33,
      subjectCount: 6,
      teacherCount: 5,
    },
    {
      id: 10,
      name: "Class 10J",
      studentCount: 30,
      subjectCount: 5,
      teacherCount: 4,
    },
  ];

  useEffect(() => {
    if (isPostSuccess) {
      setIsModalOpen(false);
    }
  }, [isPostSuccess]);

  const start: number = (1 - 1) * 10 + 1;
  const end: number = Math.min(1 * 10, 12);

  if (false) {
    return <ClassListSkeleton />;
  }

  const handleSubjectSelect = (selectedSubjects) => {
    // Handle the selected subjects
    console.log("Selected subjects:", selectedSubjects);
    // You can send this data to your backend
  };

  const handleStudentSelect = (selectedStudents) => {
    // Handle the selected subjects
    console.log("Selected subjects:", selectedStudents);
    // You can send this data to your backend
  };

  // Optional: Pass your own subjects data
  const customSubjects = [
    { id: 1, name: "Custom Subject 1", category: "Category A" },
    { id: 2, name: "Custom Subject 2", category: "Category B" },
    { id: 3, name: "Custom Subject 2", category: "Category B" },
    { id: 4, name: "Custom Subject 2", category: "Category B" },
    { id: 5, name: "Custom Subject 2", category: "Category B" },
    { id: 6, name: "Custom Subject 2", category: "Category B" },
    { id: 7, name: "Custom Subject 2", category: "Category B" },
    { id: 8, name: "Custom Subject 2", category: "Category B" },
    { id: 9, name: "Custom Subject 2", category: "Category B" },
    { id: 10, name: "Custom Subject 2", category: "Category B" },
    { id: 11, name: "Custom Subject 2", category: "Category B" },
    { id: 12, name: "Custom Subject 2", category: "Category B" },
    { id: 13, name: "Custom Subject 2", category: "Category B" },
    { id: 14, name: "Custom Subject 2", category: "Category B" },
    { id: 15, name: "Custom Subject 2", category: "Category B" },
    { id: 16, name: "Custom Subject 2", category: "Category B" },
    { id: 17, name: "Custom Subject 2", category: "Category B" },
    { id: 18, name: "Custom Subject 2", category: "Category B" },
    { id: 19, name: "Custom Subject 2", category: "Category B" },
    { id: 20, name: "Custom Subject 2", category: "Category B" },
    { id: 21, name: "Custom Subject 2", category: "Category B" },
    { id: 22, name: "Custom Subject 2", category: "Category B" },
    // ...more subjects
  ];

  // Optional: Pass initially selected subjects
  const initialSelected = [{ id: 1, name: "Mathematics", category: "Science" }];

  const initialStudentSelected = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "555-1234",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isClassAddModalOpen, setIsClassModalOpen] = useState(false);
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);
  const [isSubjectViewModalOpen, setIsSubjectViewModalOpen] = useState(false);
  const [isSubjectCreateModalOpen, setIsSubjectCreateModalOpen] =
    useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const [isViewExamModalOpen, setIsViewExamModalOpen] = useState(false);

  const handleClassAddModal = () => setIsClassModalOpen(true);

  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "555-1234",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "555-5678",
      profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  ];

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
        {classes && classes.length > 0 ? (
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
                <Button
                  onClick={handleClassAddModal}
                  size="sm"
                  className="h-8 gap-1"
                >
                  <PlusCircle className="h-3.5 w-3.5" /> Add Class
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"sm"}>
                      Subjects <CircleChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem
                      onClick={() => setIsSubjectCreateModalOpen(true)}
                      className="h-8 gap-1"
                    >
                      <PlusCircle className="h-3.5 w-3.5" /> Subjects
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setIsSubjectViewModalOpen(true)}
                      className="h-8 gap-1"
                    >
                      <Eye className="h-4 w-4" /> Subjects
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"sm"}>
                      Events <CircleChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem
                      onClick={() => setIsCreateEventModalOpen(true)}
                      className="h-8 gap-1"
                    >
                      <PlusCircle className="h-3.5 w-3.5" /> Events
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setIsViewEventModalOpen(true)}
                      className="h-8 gap-1"
                    >
                      <Eye className="h-4 w-4" /> Events
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"sm"}>
                      Exams <CircleChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem
                      onClick={() => setIsCreateExamModalOpen(true)}
                      className="h-8 gap-1"
                    >
                      <PlusCircle className="h-3.5 w-3.5" /> Exams
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setIsViewExamModalOpen(true)}
                      className="h-8 gap-1"
                    >
                      <Eye className="h-4 w-4" /> Exams
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value={activeTab}>
              {classes.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Classes</CardTitle>
                    <CardDescription>Manage your classes here.</CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-[350px] overflow-scroll hide-scrollbar">
                    <Table className=" overflow-scroll">
                      <TableHeader>
                        <TableRow>
                          {[
                            "Class Name",
                            "Student Count",
                            "Subject Count",
                            "Teacher Count",
                          ].map((value) => (
                            <>
                              <TableHead>{value}</TableHead>
                            </>
                          ))}
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="max-h-[400px] overflow-hidden">
                        <ClassListComponent
                          classes={classes}
                          setIsSubjectModalOpen={setIsSubjectModalOpen}
                          setIsStudentModalOpen={setIsStudentModalOpen}
                        />
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
                      <strong>{30}</strong> teachers
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
            <Dialog
              open={isSubjectModalOpen}
              onOpenChange={setIsSubjectModalOpen}
            >
              <DialogContent className="max-w-[90%] h-[550px]">
                <SubjectGridSelector
                  onSubjectSelect={handleSubjectSelect}
                  subjects={customSubjects}
                  initialSelectedSubjects={initialSelected}
                />
              </DialogContent>
            </Dialog>
            <Dialog
              open={isStudentModalOpen}
              onOpenChange={setIsStudentModalOpen}
            >
              <DialogContent className="max-w-[90%] h-[550px]">
                <StudentGridSelector
                  onStudentSelect={handleStudentSelect}
                  students={students}
                  initialSelectedSubjects={initialStudentSelected}
                />
              </DialogContent>
            </Dialog>
            <ClassAddComp
              isModalOpen={isClassAddModalOpen}
              setIsModalOpen={setIsClassModalOpen}
            />
            <Dialog
              open={isCreateExamModalOpen}
              onOpenChange={setIsCreateExamModalOpen}
            >
              <DialogContent className="max-w-[90%] max-h-[90%] overflow-y-scroll hide-scrollbar">
                <CreateExam />
              </DialogContent>
            </Dialog>
            <Dialog
              open={isSubjectViewModalOpen}
              onOpenChange={setIsSubjectViewModalOpen}
            >
              <DialogContent>
                <SubjectList />
              </DialogContent>
            </Dialog>
            <Dialog
              open={isSubjectCreateModalOpen}
              onOpenChange={setIsSubjectCreateModalOpen}
            >
              <DialogContent>
                <CreateSubject />
              </DialogContent>
            </Dialog>
            <Dialog
              open={isCreateEventModalOpen}
              onOpenChange={setIsCreateEventModalOpen}
            >
              <DialogContent>
                <CreateEvent />
              </DialogContent>
            </Dialog>
            <Dialog
              open={isViewEventModalOpen}
              onOpenChange={setIsViewEventModalOpen}
            >
              <DialogContent>
                <EventList />
              </DialogContent>
            </Dialog>
            <Dialog
              open={isViewExamModalOpen}
              onOpenChange={setIsViewExamModalOpen}
            >
              <DialogContent className="max-w-[90%] max-h-[90%]">
                <ExamList />
              </DialogContent>
            </Dialog>
          </Tabs>
        ) : (
          <NoListComponent label="Teacher" action={() => {}} />
        )}
      </main>
    </>
  );
};
