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

interface Student {
  id: number;
  fullName: string;
  status: "Present" | "Absent" | "Late";
  grade: string;
  teacher: string;
  joinedAt: string;
  profilePicture: string;
}

export const StudentList: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  const students: Student[] = [
    {
      id: 1,
      fullName: "Thouseef",
      status: "Present",
      grade: "1st",
      teacher: "Akshitha",
      joinedAt: "10/12/2024",
      profilePicture: "https://github.com/shadcn.png",
    },
    {
      id: 2,
      fullName: "Thouseef",
      status: "Present",
      grade: "1st",
      teacher: "Akshitha",
      joinedAt: "10/12/2024",
      profilePicture: "https://github.com/shadcn.png",
    },
    {
      id: 3,
      fullName: "Thouseef",
      status: "Present",
      grade: "1st",
      teacher: "Akshitha",
      joinedAt: "10/12/2024",
      profilePicture: "https://github.com/shadcn.png",
    },
    {
      id: 4,
      fullName: "Thouseef",
      status: "Absent",
      grade: "1st",
      teacher: "Akshitha",
      joinedAt: "10/12/2024",
      profilePicture: "https://github.com/shadcn.png",
    },
    {
      id: 5,
      fullName: "Thouseef",
      status: "Absent",
      grade: "1st",
      teacher: "Akshitha",
      joinedAt: "10/12/2024",
      profilePicture: "https://github.com/shadcn.png",
    },
  ];

  useEffect(() => {
    const filtered = students.filter((student) => {
      if (activeTab === "present") return student.status === "Present";
      if (activeTab === "absent") return student.status === "Absent";
      if (activeTab === "late") return student.status === "Late";
      return true; // For 'all'
    });
    setFilteredStudents(filtered);
  }, [activeTab]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
      {students.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="present">Present</TabsTrigger>
              <TabsTrigger value="absent">Absent</TabsTrigger>
              <TabsTrigger value="late" className="hidden sm:flex">
                Late
              </TabsTrigger>
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
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" /> Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Add Student</DialogTitle>
                    <DialogDescription> </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4">
                    <Input
                      type="text"
                      placeholder="First Name"
                      className="w-full"
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      className="w-full"
                    />
                    <Input type="text" placeholder="Email" className="w-full" />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Student
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <TabsContent value={activeTab}>
            {filteredStudents.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Students</CardTitle>
                  <CardDescription>Manage your students.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
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
                      <StudentListComponent students={filteredStudents} />
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
              <NoListComponent
                className="h-[400px] lg:h-[510px]"
                label="Student"
              />
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <NoListComponent label="Student" action={() => {}} />
      )}
    </main>
  );
};
