import { TableCell, TableRow } from "@/components/ui/table";

import {
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
import { useDeleteClass } from "../store/hooks";
import { toast } from "@/hooks/use-toast";

export const ClassListComponent: FC<any> = memo(
  ({ classes, handleClassEditModal }: any) => {
    // const handleSubjectModal = () => setIsSubjectModalOpen(true);
    // const handleStudentModal = () => setIsStudentModalOpen(true);
    const [isDeleteClass, setIsDeleteClass] = useState(false);
    const [classData, setClassData] = useState<any>(null);

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
        setIsDeleteClass(false)
        toast({
          variant: "success",
          title: "Class deleted Successfully",
        });
      }
    }, [isDeleteClassSuccess]);
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
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Subject</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Students</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" /> Events
                  </DropdownMenuItem>

                  <DropdownMenuGroup>
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
                  </DropdownMenuGroup>
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
      </>
    );
  }
);
