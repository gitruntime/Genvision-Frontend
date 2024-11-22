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
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useListClass } from "../store/hooks";
import { ClassListComponent } from "../components/class-list";
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
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 items-center mb-2 animate-pulse"
        >
          <Skeleton className="h-10 w-24 rounded" />
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-6 w-32 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
        </div>
      ))}
    </div>
  );
};

const ClassListSkeleton: React.FC = () => {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
        <Skeleton className="h-8 w-40" />
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <Skeleton className="h-6 w-16 rounded gap-1" />{" "}
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-6 w-16 rounded" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-8 w-24 rounded" />{" "}
            </div>
          </div>
          <TabsContent value="all">
            <Skeleton className="h-6 w-32" />
            <div className="max-h-[350px] overflow-auto">
              <TableSkeleton />
            </div>
            <div className="text-xs text-muted-foreground">
              <Skeleton className="h-6 w-64" />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export const ClassList: React.FC = () => {
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  // @ts-ignore
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isClassAddModalOpen, setIsClassModalOpen] = useState(false);
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);
  const [isSubjectViewModalOpen, setIsSubjectViewModalOpen] = useState(false);
  // const [isSubjectCreateModalOpen, setIsSubjectCreateModalOpen] =
  //   useState(false);
  const [editClassData, setIsEditClassData] = useState(null);
  const [editSubjectData, setIsEditSubjectData] = useState(null);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const [isViewExamModalOpen, setIsViewExamModalOpen] = useState(false);
  const [isTeacherAddModal, setIsTeacherAddModal] = useState(false);

  const {
    data: classData,
    isLoading: isClassListLoading,
    // isError: isClassListError,
    // isSuccess: isClassListSuccess,
  } = useListClass({
    page: 1,
    size: 30,
    sortBy: "id",
    sortOrder: "ASC",
  });

  const [position, setPosition] = useState("10");

  const [activeTab, setActiveTab] = useState<string>("all");

  const start: number = (1 - 1) * 10 + 1;
  const end: number = Math.min(1 * 10, 12);

  if (isClassListLoading) {
    return <ClassListSkeleton />;
  }

  const handleStudentSelect = (selectedStudents: any) => {
    // Handle the selected subjects
    console.log("Selected subjects:", selectedStudents);
    // You can send this data to your backend
  };

  const initialStudentSelected = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "555-1234",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];

  const handleClassAddModal = () => {
    setIsEditClassData(null);
    setIsClassModalOpen(true);
  };

  const handleClassEditModal = (data: any) => {
    setIsClassModalOpen(true);
    setIsEditClassData(data);
  };

  // @ts-ignore
  const handleSubjectAddModal = () => {
    setIsEditSubjectData(null);
    setIsSubjectModalOpen(true);
  };

  // @ts-ignore
  const handleSubjectEditModal = (data: any) => {
    setIsSubjectModalOpen(true);
    setIsEditSubjectData(data);
  };

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
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all">
          <div className="flex items-center">
            {classData?.data && classData?.data.length > 0 && (
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            )}
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
                    onClick={() => setIsSubjectModalOpen(true)}
                    className="h-8 gap-1"
                  >
                    <PlusCircle className="h-3.5 w-3.5" /> Subjects
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsSubjectViewModalOpen(true);
                    }}
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

              {/* <DropdownMenu>
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
              </DropdownMenu> */}
            </div>
          </div>
          {classData?.data && classData?.data.length > 0 ? (
            <TabsContent value={activeTab}>
              <Card className="h-[80vh] flex flex-col">
                <CardHeader>
                  <CardTitle>Classes</CardTitle>
                  <CardDescription>Manage your classes here.</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[350px] overflow-scroll hide-scrollbar flex-1">
                  <Table className=" overflow-scroll">
                    <TableHeader>
                      <TableRow>
                        {[
                          "Class Name",
                          "Student Count",
                          "Subject Count",
                          "Teacher Count",
                        ].map((value, index) => (
                          <TableHead key={index}>{value}</TableHead>
                        ))}
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="max-h-[400px] overflow-hidden">
                      <ClassListComponent
                        classes={classData?.data}
                        handleClassEditModal={handleClassEditModal}
                      />
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="mt-auto">
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
                          {["10", "20", "30", "40", "50"].map((size, index) => (
                            <DropdownMenuRadioItem key={index} value={size}>
                              {size}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>{" "}
                    Showing <strong>{`${start} - ${end}`}</strong> of{" "}
                    <strong>{30}</strong> teachers
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          ) : (
            <div
              className={`flex flex-1 items-center h-[80vh] justify-center rounded-lg border border-dashed shadow-sm mt-3 `}
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  No Classes
                </h3>
                <p className="text-sm text-muted-foreground">Add classes</p>
              </div>
            </div>
          )}
          {/* API Done - Backend */}
          <Dialog open={false} onOpenChange={setIsStudentModalOpen}>
            <DialogContent className="max-w-[90%] h-[550px]">
              <StudentGridSelector
                onStudentSelect={handleStudentSelect}
                students={students}
                // @ts-ignore
                initialSelectedSubjects={initialStudentSelected}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={isClassAddModalOpen} onOpenChange={setIsClassModalOpen}>
            <DialogContent>
              {isClassAddModalOpen && (
                <ClassAddComp
                  modalAction={setIsClassModalOpen}
                  classData={editClassData}
                />
              )}
            </DialogContent>
          </Dialog>
          <Dialog
            open={isCreateExamModalOpen}
            onOpenChange={setIsCreateExamModalOpen}
          >
            {isCreateExamModalOpen && (
              <DialogContent className="max-w-[90%] max-h-[90%] overflow-y-scroll hide-scrollbar">
                <CreateExam />
              </DialogContent>
            )}
          </Dialog>
          <Dialog
            open={isSubjectViewModalOpen}
            onOpenChange={setIsSubjectViewModalOpen}
          >
            {isSubjectViewModalOpen && (
              <DialogContent className="max-w-[90%] max-h-[90%] overflow-y-scroll hide-scrollbar">
                <SubjectList />
              </DialogContent>
            )}
          </Dialog>
          {/* api iNTEGRATION DONE */}
          <Dialog
            open={isSubjectModalOpen}
            onOpenChange={setIsSubjectModalOpen}
          >
            <DialogContent>
              <CreateSubject
                modalAction={setIsSubjectModalOpen}
                subjectData={editSubjectData}
              />
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
            <DialogContent className="max-w-[90%] max-h-[90%] overflow-y-scroll hide-scrollbar">
              <EventList />
            </DialogContent>
          </Dialog>
          <Dialog
            open={isViewExamModalOpen}
            onOpenChange={setIsViewExamModalOpen}
          >
            <DialogContent className="max-w-[97%] max-h-[90%]">
              <ExamList />
            </DialogContent>
          </Dialog>
        </Tabs>
      </main>
    </>
  );
};
