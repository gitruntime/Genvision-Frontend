import { Loader, LucideLoader } from "lucide-react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  File,
  ListFilter,
  PlusCircle,
  PlusIcon,
} from "lucide-react";
import { Link } from 'react-router-dom';
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
import { useEffect, useState } from "react";
import { NoListComponent } from "@/modules/admins/components/no-list";
import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import api from "@/modules/Teachers/apiConfig/Interceptor";
import { useForm } from "react-hook-form";

interface Student {
  id: number;
  fullName: string;
  status: "Present" | "Absent" | "Late";
  grade: string;
  teacher: string;
  joinedAt: string;
  profilePicture: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export function StudentList() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [students, setStudents] = useState<Student[]>([]); // Initialize as an empty array
  const [totalPages, setTotalPages] = useState(1); // Dynamic total pages
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const studentsPerPage = 10;


  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.post("/teacher/students", data); // Replace with your actual API endpoint
      console.log("Student added successfully", response.data);
      
      // Navigate to the same page to refresh the student list
      navigate(0); // This reloads the page
    } catch (err) {
      console.error("Error adding student:", err);
      setError("Failed to add student.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async (page: number) => {
    setLoading(true); // Start loader
    try {
      const response = await api.get(`/teacher/students?page=${page}&limit=${studentsPerPage}`);
      setStudents(response.data?.data);
      setTotalPages(response.data?.totalPages); // Assuming backend returns total pages
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    fetchDetails(currentPage);
  }, [currentPage]);
  
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    fetchDetails(page);
  };

  const renderPagination = () => {
    const buttons = [];
    
    // If totalPages exceeds 5, only show first, last, and ellipsis
    if (totalPages > 5) {
      buttons.push(
        <Button key={1} variant={currentPage === 1 ? "default" : "outline"} onClick={() => handlePageClick(1)}>
          1
        </Button>
      );
  
      if (currentPage > 3) {
        buttons.push(
          <Button key="dots-left" variant="outline" disabled>
            ...
          </Button>
        );
      }
  
      // Show current page and adjacent pages if needed
      const range = [currentPage - 1, currentPage, currentPage + 1];
      range.forEach((page) => {
        if (page > 1 && page < totalPages) {
          buttons.push(
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </Button>
          );
        }
      });
  
      if (currentPage < totalPages - 2) {
        buttons.push(
          <Button key="dots-right" variant="outline" disabled>
            ...
          </Button>
        );
      }
  
      buttons.push(
        <Button key={totalPages} variant={currentPage === totalPages ? "default" : "outline"} onClick={() => handlePageClick(totalPages)}>
          {totalPages}
        </Button>
      );
    } else {
      // If totalPages <= 5, show buttons for all pages
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            variant={i === currentPage ? "default" : "outline"}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </Button>
        );
      }
    }
  
    return buttons;
  };
  
  

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students; // Backend already returns paginated data
  
  
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <LucideLoader className="animate-spin h-8 w-8 text-muted-foreground" />
          </div>
        ): students && students.length > 0 ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="all"
          >
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
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
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
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                      <Input
                        type="text"
                        placeholder="First Name"
                        className="w-full"
                        {...register("firstName", { required: "First Name is required" })}
                      />
                      {errors.firstName && <span>{errors.firstName.message}</span>}

                      <Input
                        type="text"
                        placeholder="Last Name"
                        className="w-full"
                        {...register("lastName", { required: "Last Name is required" })}
                      />
                      {errors.lastName && <span>{errors.lastName.message}</span>}

                      <Input
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        {...register("email", {
                          required: "Email is required", pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address"
                          }
                        })}
                      />
                      {errors.email && <span>{errors.email.message}</span>}

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Adding..." : "Add Student"}
                      </Button>
                    </form>
                    {error && <div className="text-red-500">{error}</div>}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <TabsContent value={activeTab} >
              {students.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Students</CardTitle>
                    <CardDescription>Manage your students.</CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-[450px] overflow-y-scroll scrollbar-thin">
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
                        <StudentListComponent students={students} />

                        {/* <TableBody>
                          {filteredStudents.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell className="hidden w-[100px] sm:table-cell">
                                <img
                                  src={student.profilePicture}
                                  alt={student.fullName}
                                  className="w-10 h-10 rounded-full"
                                />
                              </TableCell>
                              <TableCell>
                                <Link to={`/teacher/students/${student.id}`}>
                                  {student.fullName}
                                </Link>
                              </TableCell>
                              <TableCell>{student.status}</TableCell>
                              <TableCell className="hidden md:table-cell">
                                {student.grade}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {student.teacher}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {student.joinedAt}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody> */}

                      </TableBody>
                    </Table>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-muted-foreground ">
                      Showing <strong>{indexOfFirstStudent + 1}</strong> to{" "}
                      <strong>{Math.min(indexOfLastStudent, students.length)}</strong> of{" "}
                      <strong>{students.length}</strong> students 
                    </div>
                    <div className="flex gap-2 ml-2">
                      <Button
                        variant="outline"
                        onClick={() => handlePageClick(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </Button>
                      {renderPagination()}
                      <Button
                        variant="outline"
                        onClick={() => handlePageClick(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </Button>
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
          <NoListComponent label="Student" action={() => { }} />
        )}
      </main>
    </>
  );
}
