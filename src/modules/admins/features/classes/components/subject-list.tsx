import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, CheckCircle2, Save } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const SubjectGridSelector = ({
  onSubjectSelect,
  initialSelectedSubjects = [],
  subjects = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState(
    initialSelectedSubjects
  );

  // Filter subjects based on search query
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSubject = (subject) => {
    const isSelected = selectedSubjects.find((s) => s.id === subject.id);
    const updatedSelection = isSelected
      ? selectedSubjects.filter((s) => s.id !== subject.id)
      : [...selectedSubjects, subject];
    setSelectedSubjects(updatedSelection);
    if (onSubjectSelect) {
      onSubjectSelect(updatedSelection);
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Select Subjects</h2>
        <div>
          <Button>
            <Save />
          </Button>
          {/* <Badge variant="secondary" className="ml-2">
            {selectedSubjects.length} selected
          </Badge> */}
        </div>
      </div>

      {/* Selected Subjects */}
      {selectedSubjects.length > 0 && (
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium mb-2">Your Selected Subjects:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSubjects.map((subject) => (
              <Badge
                key={subject.id}
                variant="default"
                className="flex items-center gap-1 px-3 py-1"
              >
                {subject.name}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubject(subject);
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
          placeholder="Search subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Scrollable Grid */}
      <ScrollArea className="max-h-[300px]  overflow-y-scroll hide-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => {
              const isSelected = selectedSubjects.find(
                (s) => s.id === subject.id
              );
              return (
                <div
                  key={subject.id}
                  className={`cursor-pointer p-4 rounded-lg border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => toggleSubject(subject)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{subject.name}</h3>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              No subjects found matching your criteria
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SubjectGridSelector;
