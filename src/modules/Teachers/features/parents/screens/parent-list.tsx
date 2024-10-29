import {
  ChevronLeftIcon,
  ChevronRightIcon,
  File,
  ListFilter,
  PlusCircle,
  PlusIcon,
  MoreHorizontal,
} from "lucide-react"; // Added MoreHorizontal import
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@radix-ui/react-select"; // Import Select components

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentListComponent } from "../components/student-list";
import { useEffect, useState } from "react";
import { NoListComponent } from "@/modules/admins/components/no-list";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Parent {
  id: number;
  fullName: string;
  childName: string;
  contactNumber: string;
  email: string;
  profilePicture: string;
}

export function ParentList() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredParents, setFilteredParents] = useState<Parent[]>([]);

  const parents: Parent[] = [
    {
      id: 1,
      fullName: "Ranajit Maity",
      childName: "Rihana",
      contactNumber: "+1234567890",
      email: "ranajit@example.com",
      profilePicture: "https://github.com/shadcn.png",
    },
    {
      id: 2,
      fullName: "Thouseef",
      childName: "Rihana",
      contactNumber: "+1234567890",
      email: "thouseef@example.com",
      profilePicture: "https://github.com/shadcn.png",
    },
  ];

  useEffect(() => {
    setFilteredParents(parents);
  }, [activeTab]);

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
        {parents && parents.length > 0 ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="all"
          >
            <div className="flex items-center">
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
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" /> Add Parents
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Add Parents</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4">
                      <Input
                        type="text"
                        placeholder="First Name"
                        className="w-full"
                      />
                      <Input
                        type="text"
                        placeholder="Last Name"
                        className="w-full"
                      />
                      <Input
                        type="text"
                        placeholder="Email"
                        className="w-full"
                      />
                      <select
                        className="w-full border rounded-md p-2"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Student
                        </option>
                        <option value="student1">Rihana</option>
                        <option value="student2">Aman</option>
                        <option value="student3">Sneha</option>
                        <option value="student4">Karan</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full">
                      Add Parents
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <TabsContent value={activeTab}>
              {filteredParents.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Parents</CardTitle>
                    <CardDescription>Manage your Parents.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Full Name</TableHead>
                          <TableHead>Child Name</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Contact
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Email
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredParents.map((parent) => (
                          <TableRow key={parent.id}>
                            <TableCell className="hidden w-[100px] sm:table-cell">
                              <img
                                src={parent.profilePicture}
                                alt={parent.fullName}
                                className="w-10 h-10 rounded-full"
                              />
                            </TableCell>
                            <TableCell>{parent.fullName}</TableCell>
                            <TableCell>{parent.childName}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {parent.contactNumber}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {parent.email}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-5 h-5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of{" "}
                      <strong>{filteredParents.length}</strong> parents
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                <NoListComponent
                  className="h-[400px] lg:h-[510px]"
                  label="Parent"
                />
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <NoListComponent label="Parent" action={() => {}} />
        )}
      </main>
    </>
  );
}
