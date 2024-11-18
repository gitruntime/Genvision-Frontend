import {
  ListFilter,
  PlusCircle,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface Class {
  id: number;
  grade: string;
  teacher: string;
  studentCount: number;
  createdAt: string;
}

export function ClassList() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);

  const classes: Class[] = [
    {
      id: 1,
      grade: "1st Grade",
      teacher: "Akshitha",
      studentCount: 25,
      createdAt: "08/15/2023",
    },
    {
      id: 2,
      grade: "2nd Grade",
      teacher: "Ranajit Maity",
      studentCount: 22,
      createdAt: "08/15/2023",
    },
  ];

  useEffect(() => {
    setFilteredClasses(classes); // Placeholder: Filter logic can be added if needed
  }, [activeTab]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
      {classes && classes.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All Classes</TabsTrigger>
            </TabsList>
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
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" /> Add Class
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Add Class</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4">
                    <Input type="text" placeholder="Grade" className="w-full" />
                    <Input type="text" placeholder="Teacher Name" className="w-full" />
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    Add Class
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <TabsContent value={activeTab}>
            {filteredClasses.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Classes</CardTitle>
                  <CardDescription>Manage your classes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Grade</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClasses.map((classItem) => (
                        <TableRow key={classItem.id}>
                          <TableCell>{classItem.grade}</TableCell>
                          <TableCell>{classItem.teacher}</TableCell>
                          <TableCell>{classItem.studentCount}</TableCell>
                          <TableCell>{classItem.createdAt}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Edit
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
                    <strong>{filteredClasses.length}</strong> classes
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <NoListComponent
                className="h-[400px] lg:h-[510px]"
                label="Classes"
              />
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <NoListComponent label="Classes" action={() => {}} />
      )}
    </main>
  );
}
