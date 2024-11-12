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
import { FC } from "react";
import { GroupListComponent } from "../components/group-list";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoIcon,
  ListFilter,
  PlusCircle,
  PlusIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export const GroupList: FC = () => {
  const groups = [
    { id: 1, name: "Admin", permissionCount: 3 },
    { id: 2, name: "Teachers", permissionCount: 4 },
    { id: 3, name: "Parents", permissionCount: 7 },
    { id: 4, name: "Students", permissionCount: 9 },
  ];
  const availableGroups = [
    "Teacher",
    "Student",
    "Parent",
  ];

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
                <PlusCircle className="h-3.5 w-3.5" /> Add Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add Group</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4">
                <Input
                  type="text"
                  placeholder="Group Name"
                  className="w-full"
                />
                <div className="flex items-stretch space-x-4">
                  <div className="w-[220px]">
                    <Card className="border-gray-300 h-[250px]">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="bg-gray-100 p-2 flex items-center justify-between">
                          <span className="text-sm font-semibold">Available groups</span>
                          <InfoIcon className="h-4 w-4 text-gray-500" />
                        </div>
                          <Input type="text" placeholder="Filter" className="mb-2" />
                        <div className="p-2 flex-grow flex flex-col scrollbar">
                          {/* <ScrollArea className="flex-grow border border-gray-200 rounded"> */}
                            <ul className="p-1">
                              {availableGroups.map((group, index) => (
                                <li
                                  key={index}
                                  className="flex items-center justify-between p-1 hover:bg-gray-100 rounded text-sm"
                                >
                                  <span className={index === 5 ? "text-red-500" : ""}>
                                    {group}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          {/* </ScrollArea> */}
                        </div>
                      </CardContent>
                    </Card>
                    <Button variant="link" size="sm" className="text-xs p-0 mt-2">
                      Choose all
                    </Button>
                  </div>

                  <div className="flex flex-col justify-center space-y-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="w-[220px]">
                    <Card className="border-gray-300 h-[250px]">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="bg-blue-100 p-2 flex items-center justify-between">
                          <span className="text-sm font-semibold">Chosen groups</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <ScrollArea className="flex-grow">
                          <ul className="p-1">
                            {/* This would be populated with chosen items */}
                          </ul>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                    <Button variant="link" size="sm" className="text-xs p-0 mt-2">
                      Remove all
                    </Button>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Add Group
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="mt-0">
          <CardHeader>
            <CardTitle>Groups</CardTitle>
            <CardDescription>Manage your groups.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Permission count</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <GroupListComponent groups={groups} />
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>{groups.length}</strong>{" "}
              students
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};