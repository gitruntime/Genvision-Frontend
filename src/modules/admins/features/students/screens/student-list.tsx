import { ListFilter, PlusCircle } from "lucide-react";

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
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentListComponent } from "../components/student-list";
import { FC, useEffect, useState } from "react";
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
import { useListStudents } from "../store/hooks";
import StudentCreateComp from "../components/student-create";
import { Skeleton } from "@/components/ui/skeleton";

interface Students {
  id: number;
  fullName: string;
  status: "Present" | "Absent" | "Late";
  grade: string;
  teacher: string;
  joinedAt: string;
  profilePicture: string;
}

const StudentListSkeleton = () => {
  return (
    <Card className="max-h-[70%] overflow-y-scroll hide-scrollbar">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-32 rounded-md" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-48 rounded-md" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <Skeleton className="h-4 w-12 rounded-md" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-24 rounded-md" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-20 rounded-md" />
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Skeleton className="h-4 w-16 rounded-md" />
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Skeleton className="h-4 w-20 rounded-md" />
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Skeleton className="h-4 w-20 rounded-md" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-12 rounded-md" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell className="hidden w-[100px] sm:table-cell">
                  <Skeleton className="h-10 w-10 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20 rounded-md" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-4 w-16 rounded-md" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-4 w-20 rounded-md" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-4 w-20 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-48 rounded-md" />
      </CardFooter>
    </Card>
  );
};

const StudentList: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredStudents, setFilteredStudents] = useState<Students[]>([]);
  const [studentCreateModal, setStudentCreateModal] = useState(false);

  const { data: studentsData, isLoading: isStudentsLoading } = useListStudents({
    page: 1,
    size: 10,
    sortBy: "id",
    sortOrder: "ASC",
  });
  console.log(studentsData);

  //   {
  //     id: 1,
  //     fullName: "Thouseef",
  //     status: "Present",
  //     grade: "1st",
  //     teacher: "Akshitha",
  //     joinedAt: "10/12/2024",
  //     profilePicture: "https://github.com/shadcn.png",
  //   },
  //   {
  //     id: 2,
  //     fullName: "Thouseef",
  //     status: "Present",
  //     grade: "1st",
  //     teacher: "Akshitha",
  //     joinedAt: "10/12/2024",
  //     profilePicture: "https://github.com/shadcn.png",
  //   },
  //   {
  //     id: 3,
  //     fullName: "Thouseef",
  //     status: "Present",
  //     grade: "1st",
  //     teacher: "Akshitha",
  //     joinedAt: "10/12/2024",
  //     profilePicture: "https://github.com/shadcn.png",
  //   },
  //   {
  //     id: 4,
  //     fullName: "Thouseef",
  //     status: "Absent",
  //     grade: "1st",
  //     teacher: "Akshitha",
  //     joinedAt: "10/12/2024",
  //     profilePicture: "https://github.com/shadcn.png",
  //   },
  //   {
  //     id: 5,
  //     fullName: "Thouseef",
  //     status: "Absent",
  //     grade: "1st",
  //     teacher: "Akshitha",
  //     joinedAt: "10/12/2024",
  //     profilePicture: "https://github.com/shadcn.png",
  //   },
  // ];

  // useEffect(() => {
  //   const filtered = students.filter((student) => {
  //     if (activeTab === "present") return student.status === "Present";
  //     if (activeTab === "absent") return student.status === "Absent";
  //     if (activeTab === "late") return student.status === "Late";
  //     return true; // For 'all'
  //   });
  //   setFilteredStudents(filtered);
  // }, [activeTab]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all">
        <div className="flex items-center">
          {/* <TabsList> */}
          {/* <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="present">Present</TabsTrigger>
              <TabsTrigger value="absent">Absent</TabsTrigger>
              <TabsTrigger value="late" className="hidden sm:flex">
                Late
              </TabsTrigger> */}
          {/* </TabsList> */}
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
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              onClick={() => setStudentCreateModal(true)}
              className="h-8 gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" /> Add Student
            </Button>
          </div>
        </div>
        <TabsContent value={activeTab}>
          {isStudentsLoading ? (
            <StudentListSkeleton />
          ) : studentsData?.data && studentsData?.data.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>Manage your students.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table className="max-h-[70%] overflow-y-scroll hide-scrollbar">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Grade
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Responsibility
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Joined
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsData?.data && (
                      <StudentListComponent students={studentsData?.data} />
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of{" "}
                  <strong>{filteredStudents.length}</strong> students
                </div>
              </CardFooter>
            </Card>
          ) : (
            <div
              className={`flex flex-1 items-center lg:h-[510px] justify-center rounded-lg border border-dashed shadow-sm`}
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  No Students
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add some students to manage
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      <Dialog open={studentCreateModal} onOpenChange={setStudentCreateModal}>
        {studentCreateModal && (
          <StudentCreateComp modalAction={setStudentCreateModal} />
        )}
      </Dialog>
    </main>
  );
};

export default StudentList;
