import { TableCell, TableRow } from "@/components/ui/table";

import {
  AlertCircle,
  Eye,
  Loader2,
  MoreHorizontal,
  Pencil,
  PlusCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FC, memo, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteClass, useListSubject } from "../store/hooks";
import { toast } from "@/hooks/use-toast";
import SubjectGridSelector from "./subject-list";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import TeacherAddComp from "./teacher-add";
import TeacherAddList from "./teacherAdd-list";
import StudentGridSelector from "./student-list";
import StudentAddList from "./class-student-list";

export const ClassListComponent: FC<any> = memo(
  ({ classes, handleClassEditModal }: any) => {
    const [isDeleteClass, setIsDeleteClass] = useState(false);
    const [classData, setClassData] = useState<any>(null);

    const [classSubjectsModal, setClassSubjectsModal] = useState(false);
    const [classId, setClassId] = useState(null);
    const [isTeacherAddModal, setIsTeacherAddModal] = useState(false);
    const [isClassTeachersViewModal, setIsClassTeachersViewModal] =
      useState(false);

    const { data: subjects, isLoading: isSubjectListLoading } = useListSubject({
      page: 1,
      size: 50,
      sortBy: "id",
      sortOrder: "ASC",
    });

    const handleSubjectSelect = (selectedSubject) => {
      console.log(
        selectedSubject.map((subject) => subject.id),
        "thousi"
      );
    };

    const {
      mutate: deleteClassMutate,
      // @ts-ignore
      isError: isDeleteClassError,
      isSuccess: isDeleteClassSuccess,
      // @ts-ignore
      error: deleteClassError,
      isPending: isDeleteClassPending,
    } = useDeleteClass();

    const handleDeleteClass = (data: any) => {
      deleteClassMutate(data?.id);
    };

    useEffect(() => {
      if (isDeleteClassSuccess) {
        setIsDeleteClass(false);
        toast({
          variant: "success",
          title: "Class deleted Successfully",
        });
      }
    }, [isDeleteClassSuccess]);

    const [isStudentAddModal, setIsStudentAddModal] = useState(false);
    const [isStudentAddListModal, setIsStudentAddListModal] = useState(false);

    return (
      <>
        {classes.map((classItem: any) => (
          <TableRow key={classItem.id}>
            <TableCell className="font-medium">{`${classItem.name} ${
              classItem.section || ""
            }`}</TableCell>
            <TableCell className="hidden md:table-cell">
              {classItem.studentCount}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {classItem.subjectCount}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {classItem.teacherCount}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      handleClassEditModal({
                        id: classItem.id,
                        name: classItem.name,
                        section: classItem.section,
                      })
                    }
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Class
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setClassSubjectsModal(true);
                      setClassId(classItem?.id);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Subject</span>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" /> Events
                  </DropdownMenuItem> */}

                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="focus:text-white">
                        <span>Teacher</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setIsTeacherAddModal(true);
                              setClassId(classItem?.id);
                            }}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>Teacher</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setIsClassTeachersViewModal(true);
                              setClassId(classItem?.id);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Teacher
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>

                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="focus:text-white">
                        <span>Student</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setClassId(classItem.id);
                              setIsStudentAddModal(true);
                            }}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>Student</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setClassId(classItem.id);
                              setIsStudentAddListModal(true);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Student
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>

                  {/* <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="focus:text-white">
                        <span>Assignments</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>Assignments</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Assignments
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup> */}
                  <DropdownMenuItem
                    onClick={() => {
                      setClassData(classItem);
                      setIsDeleteClass(true);
                    }}
                    className="text-red-500 focus:bg-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}

        <Dialog open={classSubjectsModal} onOpenChange={setClassSubjectsModal}>
          {classSubjectsModal && (
            <DialogContent className="max-w-[90%] h-[550px]">
              {isSubjectListLoading ? (
                [...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-4 rounded-lg border transition-all border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <Skeleton className="w-1/2 h-4" />
                      <Skeleton className="w-5 h-5" />
                    </div>
                  </div>
                ))
              ) : subjects?.data && subjects?.data.length > 0 ? (
                <SubjectGridSelector
                  modalAction={setClassSubjectsModal}
                  onSubjectSelect={handleSubjectSelect}
                  // @ts-ignore
                  classId={classId}
                  subjects={subjects?.data}
                />
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Create Subjects before adding to the class
                  </AlertDescription>
                </Alert>
              )}
            </DialogContent>
          )}
        </Dialog>

        <Dialog open={isDeleteClass} onOpenChange={setIsDeleteClass}>
          {classData && (
            <DialogContent>
              {isDeleteClassPending && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
              <DialogHeader>
                <DialogTitle>
                  Delete {classData?.name + " " + classData?.section}?
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteClass(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteClass(classData)}
                >
                  Confirm Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>

        <Dialog open={isTeacherAddModal} onOpenChange={setIsTeacherAddModal}>
          {isTeacherAddModal && (
            <TeacherAddComp
              classId={classId}
              modalAction={setIsTeacherAddModal}
            />
          )}
        </Dialog>

        <Dialog
          open={isClassTeachersViewModal}
          onOpenChange={setIsClassTeachersViewModal}
        >
          {isClassTeachersViewModal && classId && (
            <TeacherAddList
              classId={classId}
              modalAction={setIsClassTeachersViewModal}
            />
          )}
        </Dialog>

        <Dialog open={isStudentAddModal} onOpenChange={setIsStudentAddModal}>
          {classId && (
            <DialogContent className="max-w-[90%] h-[550px]">
              <StudentGridSelector
                classId={classId}
                modalAction={setIsStudentAddModal}
                // @ts-ignore
              />
            </DialogContent>
          )}
        </Dialog>

        <Dialog
          open={isStudentAddListModal}
          onOpenChange={setIsStudentAddListModal}
        >
          <DialogContent className="max-w-[50%] max-h-[90%] overflow-y-scroll hide-scrollbar">
            <StudentAddList classId={classId} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
);
