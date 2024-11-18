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
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
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

interface Subject {
  id: number;
  name: string;
  teacher: string;
  grade: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

export function SubjectList() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  const subjects: Subject[] = [
    {
      id: 1,
      name: "Mathematics",
      teacher: "Akshitha",
      grade: "1st",
      status: "Active",
      createdAt: "10/12/2024",
    },
    {
      id: 2,
      name: "Science",
      teacher: "Ravi Kumar",
      grade: "1st",
      status: "Inactive",
      createdAt: "10/12/2024",
    },
    // Additional subjects can be added here
  ];

  useEffect(() => {
    const filtered = subjects.filter((subject) => {
      if (activeTab === "active") return subject.status === "Active";
      if (activeTab === "inactive") return subject.status === "Inactive";
      return true; // For 'all'
    });
    setFilteredSubjects(filtered);
  }, [activeTab]);

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
        {subjects && subjects.length > 0 ? (
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
                    <DropdownMenuCheckboxItem>
                      Inactive
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" /> Add Subject
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Add New Subject</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4">
                      <Input
                        type="text"
                        placeholder="Subject Name"
                        className="w-full"
                      />
                      <Input
                        type="text"
                        placeholder="Teacher Name"
                        className="w-full"
                      />
                      <Input
                        type="text"
                        placeholder="Grade Level"
                        className="w-full"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Add Subject
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <TabsContent value={activeTab}>
              {filteredSubjects.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Subjects</CardTitle>
                    <CardDescription>Manage your subjects.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Created At</TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
  {filteredSubjects.map((subject) => (
    <TableRow key={subject.id}>
      <TableCell>{subject.name}</TableCell>
      <TableCell>{subject.status}</TableCell>
      <TableCell>{subject.grade}</TableCell>
      <TableCell>{subject.teacher}</TableCell>
      <TableCell>{subject.createdAt}</TableCell>
      <TableCell>
        {/* Replace with desired actions, e.g., edit/delete buttons */}
        <Button variant="ghost" size="sm">Edit</Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of{" "}
                      <strong>{filteredSubjects.length}</strong> subjects
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                <NoListComponent
                  className="h-[400px] lg:h-[510px]"
                  label="Subject"
                />
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <NoListComponent label="Subject" action={() => {}} />
        )}
      </main>
    </>
  );
}
