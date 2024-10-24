import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC, useState } from "react";
import { PermissionListComponent } from "../components/permission-list";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Define types for permission
interface Permission {
  id: number;
  name: string;
}

export const PermissionList: FC = () => {
  // Use state to manage permission data
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 1,
      name: "Student Can View Profile",
    },
    {
      id: 2,
      name: "Student Can View Profile",
    },
    {
      id: 3,
      name: "Student Can View Profile",
    },
    {
      id: 4,
      name: "Student Can View Profile",
    },
    {
      id: 5,
      name: "Student Can View Profile",
    },
  ]);

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-0 mt-3">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="focus:bg-red-600 focus:text-white">
                Inactive
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" /> Add Permission
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Permission</DialogTitle>
                <br />
                <DialogDescription className="flex flex-col space-y-4 items-center">
                  <Input
                    type="text"
                    placeholder="Name"
                    className="w-full max-w-md"
                  />
                  <Input
                    type="text"
                    placeholder="Code Name"
                    className="w-full max-w-md"
                  />
                  <Button type="submit" className="w-full max-w-md">
                    Submit
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="mt-0">
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Manage your permissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <PermissionListComponent permissions={permissions} />
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of{" "}
              <strong>{permissions.length}</strong> permissions
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};
