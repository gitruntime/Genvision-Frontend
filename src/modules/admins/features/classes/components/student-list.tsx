import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, CheckCircle2, Save } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const StudentGridSelector = ({
  students,
  onStudentSelect,
  initialSelectedStudents = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState(
    initialSelectedStudents
  );

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStudent = (student) => {
    const isSelected = selectedStudents.find((s) => s.id === student.id);
    const updatedSelection = isSelected
      ? selectedStudents.filter((s) => s.id !== student.id)
      : [...selectedStudents, student];
    setSelectedStudents(updatedSelection);
    if (onStudentSelect) {
      onStudentSelect(updatedSelection);
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Select Students</h2>
        <div>
          <Button>
            <Save />
          </Button>
          {/* <Badge variant="secondary" className="ml-2">
            {selectedSubjects.length} selected
          </Badge> */}
        </div>
      </div>

      {/* Selected Students */}
      {selectedStudents.length > 0 && (
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium mb-2">Your Selected Students:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedStudents.map((student) => (
              <Badge
                key={student.id}
                variant="default"
                className="flex items-center gap-1 px-3 py-1"
              >
                {student.name}
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
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Scrollable Grid */}
      <ScrollArea className="max-h-[300px]  overflow-y-scroll hide-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              const isSelected = filteredStudents.find(
                (s) => s.id === student.id
              );
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
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={student.profilePicture} alt={student.name} />
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.email}</p>
                    <p className="text-sm text-gray-500">
                      {student.phoneNumber}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              No students found matching your criteria
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StudentGridSelector;
