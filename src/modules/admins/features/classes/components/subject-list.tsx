import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, CheckCircle2, Save, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAddSubjectsToClass, useGetSubjectsFromClass } from "../store/hooks";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const SubjectGridSelector = ({
  onSubjectSelect,
  modalAction,
  subjects = [],
  classId,
}: any) => {
  const {
    data: subjectList,
    isLoading: getSubjectLoading,
    isSuccess: getSubjectsSuccess,
  } = useGetSubjectsFromClass(classId);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    if (getSubjectsSuccess && subjectList) {
      const getSubjectsUsingId = subjects.filter((subject) =>
        subjectList.subjectIds.some((item) => item === subject.id)
      );
      setSelectedSubjects(getSubjectsUsingId);
    }
  }, [getSubjectsSuccess, subjectList, subjects]);

  const filteredSubjects = subjects.filter((subject: any) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSubject = (subject: any) => {
    console.log(subject, "subject");
    console.log(selectedSubjects, "selectedSubjects");

    const isSelected = selectedSubjects.some((s: any) => s.id === subject.id);

    console.log(isSelected, "isSelected");

    const updatedSelection: any = isSelected
      ? selectedSubjects.filter((s: any) => s.id !== subject.id)
      : [...selectedSubjects, subject];
    console.log(updatedSelection, "updated Selection");

    setSelectedSubjects(updatedSelection);
  };

  const {
    mutate: addSubjectMutate,
    isPending: addSubjectLoading,
    isSuccess: isAddSuccess,
    isError: isAddError,
    error: addSubjectError,
  } = useAddSubjectsToClass();

  useEffect(() => {
    if (isAddError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title:
          addSubjectError?.response?.data?.message ||
          "Uh oh! Something went wrong during adding the subjects.",
        description: "Try Again",
      });
    }

    if (isAddSuccess) {
      modalAction(false);
      toast({
        variant: "success",
        title: `Subjects to this class added successfully.!`,
      });
    }
  }, [isAddError, isAddSuccess]);

  const submitSubjectstoClass = (e) => {
    e.preventDefault();
    console.log("handle subject triggered");
    console.log(classId);

    const subjectIds = selectedSubjects.map((subject) => subject.id);
    console.log(subjectIds, "onnooodey nokkate");

    if (classId) {
      addSubjectMutate([classId, { subjectIds: subjectIds }]);
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center mb-4">
        {addSubjectLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
        <h2 className="text-lg font-semibold">Select Subjects</h2>
        <div>
          <Button onClick={submitSubjectstoClass}>
            <Save />
          </Button>
          {/* <Badge variant="secondary" className="ml-2">
            {selectedSubjects.length} selected
          </Badge> */}
        </div>
      </div>

      {/* Selected Subjects */}
      {selectedSubjects && selectedSubjects.length > 0 && (
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium mb-2">Your Selected Subjects:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSubjects.map((subject: any) => (
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
      {/* <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div> */}

      {/* Scrollable Grid */}
      <ScrollArea className="max-h-[300px]  overflow-y-scroll hide-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getSubjectLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border transition-all border-muted"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-2/3" />{" "}
                  <Skeleton className="h-5 w-5" /> {/* Simulating the icon */}
                </div>
              </div>
            ))
          ) : filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject: any) => {
              const isSelected = selectedSubjects.find(
                (s: any) => s.id === subject.id
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
                    {/* @ts-ignore */}
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
