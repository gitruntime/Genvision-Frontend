import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, CheckCircle2, Save, User, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  useAddStudentsToClass,
  useListStudents,
} from "../../students/store/hooks";
import { toast } from "@/hooks/use-toast";

interface StudentProfile {
  profilePicture: string | null;
  bio: string | null;
  bloodGroup: string | null;
  classId: number | null;
}

interface Student {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  studentProfile: StudentProfile;
}

const StudentGridSelector = ({ classId = null }:any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Fetch students data
  const { data: studentsResponse, isLoading, isError } = useListStudents({});

  // Filter out students with classId and then apply search filter
  const filteredStudents =
    studentsResponse?.data
      .filter((student:any) => !student.studentProfile.classId)
      .filter(
        (student:any) =>
          student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

  const toggleStudent = (student: Student) => {
    const isSelected = selectedStudents.find((s:any) => s.id === student.id);
    const updatedSelection: any = isSelected
      ? selectedStudents.filter((s:any) => s.id !== student.id)
      : [...selectedStudents, student];
    setSelectedStudents(updatedSelection);
  };

  const {
    mutate: addStudentMutate,
    isPending: isAddStudentPending,
    isError: isAddStudentError,
    isSuccess: isAddStudentSuccess,
    error: addStudentError,
  } = useAddStudentsToClass(classId);

  useEffect(() => {
    if (isAddStudentError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title: addStudentError.response?.data.message,
      });
    }

    if (isAddStudentSuccess) {
      toast({
        variant: "success",
        title: `Student added Successfully.`,
      });
    }
  }, [isAddStudentError, isAddStudentSuccess]);

  const handleSave = () => {
    const studentIds = selectedStudents.map((student:any) => student.id);
    // console.log(studentIds,"thousi               lkl");

    addStudentMutate(studentIds);
  };

  const isStudentSelected = (studentId: number) => {
    return selectedStudents.some((s: any) => s.id === studentId);
  };

  if (isLoading) {
    return <div className="w-full text-center py-8">Loading students...</div>;
  }

  if (isError) {
    return (
      <div className="w-full text-center py-8 text-destructive">
        Error loading students. Please try again.
      </div>
    );
  }

  return (
    <div className="w-full mt-2">
      {isAddStudentPending && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Select Students</h2>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{selectedStudents.length} selected</Badge>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Selected Students */}
      {selectedStudents.length > 0 && (
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium mb-2">Selected Students:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedStudents.map((student:any) => (
              <Badge
                key={student.id}
                variant="default"
                className="flex items-center gap-1 px-3 py-1"
              >
                {student.fullName}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStudent(student);
                  }}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Scrollable Grid */}
      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student: any) => {
              const isSelected = isStudentSelected(student.id);
              return (
                <div
                  key={student.id}
                  className={`cursor-pointer p-4 rounded-lg border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => toggleStudent(student)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {student.studentProfile.profilePicture ? (
                        <img
                          src={student.studentProfile.profilePicture}
                          alt={student.fullName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-base">
                      {student.fullName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {student.email}
                    </p>
                    {student.phoneNumber && (
                      <p className="text-sm text-muted-foreground">
                        {student.phoneNumber}
                      </p>
                    )}
                    {student.studentProfile.bloodGroup && (
                      <Badge variant="outline" className="mt-2">
                        {student.studentProfile.bloodGroup}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              {searchQuery
                ? "No students found matching your search criteria"
                : "No students available without class assignments"}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StudentGridSelector;
