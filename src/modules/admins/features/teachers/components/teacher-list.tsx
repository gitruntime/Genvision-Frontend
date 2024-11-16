import { TableCell, TableRow } from "@/components/ui/table";

import { MoreHorizontal, PlusCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FC, memo } from "react";

interface Teachers {
  id: number;
  fullName: string;
  profilePicture?: string;
  status?: string;
  joinedAt?: string;
  createdAt: string;
}
interface TeacherListComponentProps {
  teachers: Teachers[];
}

const convertToDateOnly = (timestamp: string): string => {
  const dateObj = new Date(timestamp);
  return dateObj.toISOString().split("T")[0];
};

export const TeacherListComponent: FC<TeacherListComponentProps> = memo(
  ({ teachers }) => {
    const navigate = useNavigate();
    return (
      <>
        {teachers.map((teacher) => (
          <TableRow key={teacher.id}>
            <TableCell className="hidden sm:table-cell">
              <Avatar>
                <AvatarImage src={teacher.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{teacher.fullName}</TableCell>
            {/* <TableCell>
              <Badge variant="outline">{teacher.status}</Badge>
            </TableCell> */}
            <TableCell className="hidden md:table-cell">
              {convertToDateOnly(teacher.joinedAt || teacher.createdAt)}
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
                    onClick={() => navigate(`/admin/teachers/${teacher.id}`)}
                  >
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="focus:text-white">
                      <span>Mail</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span>Whatsapp</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
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
