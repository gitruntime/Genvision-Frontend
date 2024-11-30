import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Pencil } from "lucide-react";

const ExamListComponent = ({ examItem }:any) => {
  console.log(examItem, "thousi");
  return (
    <>
      {examItem.map((item:any) => (
        <TableRow key={item.id}>
          <TableCell className="font-medium">{item.name}</TableCell>
          <TableCell className="hidden md:table-cell">
            {item.startDate}
          </TableCell>
          <TableCell className="hidden md:table-cell">{item.endDate}</TableCell>
          <TableCell className="hidden md:table-cell">
            {item.teacherCount}
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
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" /> Exam
                </DropdownMenuItem>
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
};

export default ExamListComponent;
