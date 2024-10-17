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
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { memo } from "react";

interface Permissions {
  id: number;
  name: string;
  codeName: string;
}
interface PermissionListComponentProps {
  permissions: Permissions[];
}

export const PermissionListComponent: React.FC<PermissionListComponentProps> = memo(
  ({ permissions }) => {
    const navigate = useNavigate();
    return (
      <>
        {permissions.map((permission) => (
          <TableRow key={permission.id}>
            <TableCell className="font-medium">{permission.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {permission.codeName}
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
                    onClick={() => navigate("/admin/permissions/1")}
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
    );
  }
);
