import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Groups {
    id: number;
    name: string;
    permissionCount: number;
}

interface GroupListComponentProps{
    groups:Groups[]
}

export const GroupListComponent:FC<GroupListComponentProps> = ({groups}) => {
    const navigate = useNavigate()
    return (
        <>
            {groups.map((group) => (
          <TableRow key={group.id}>
            <TableCell className="font-medium">{group.name}</TableCell>
            <TableCell className="hidden md:table-cell">
                <Badge variant="secondary" className="rounded">{group.permissionCount}</Badge>
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
                    onClick={() => navigate("/admin/groups/1")}
                  >
                    View
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
    )
}