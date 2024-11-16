import { TableCell, TableRow } from "@/components/ui/table";

import { Eye, MoreHorizontal, PlusCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FC, memo } from "react";

export const ClassListComponent: FC<any> = memo(
  ({ classes, setIsSubjectModalOpen, setIsStudentModalOpen }: any) => {
    const handleSubjectModal = () => setIsSubjectModalOpen(true);
    const handleStudentModal = () => setIsStudentModalOpen(true);
    return (
      <>
        {classes.map((classItem: any) => (
          <TableRow key={classItem.id}>
            <TableCell className="font-medium">{classItem.name}</TableCell>
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
                  <DropdownMenuItem onClick={handleSubjectModal}>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Subject</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleStudentModal}>
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
                  <DropdownMenuItem className="text-red-500 focus:bg-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }
);
