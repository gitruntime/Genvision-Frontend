import { ListFilter, PlusCircle } from "lucide-react";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateExam from "../components/create-exams";
import { useListExam } from "../store/hooks";
import ExamListComponent from "../components/exam-list";

const TableSkeleton: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 items-center mb-2 animate-pulse"
        >
          <Skeleton className="h-10 w-24 rounded" />
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-6 w-32 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
        </div>
      ))}
    </div>
  );
};

// const ClassListSkeleton: React.FC = () => {
//   return (
//     <>
//       <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
//         <Skeleton className="h-8 w-40" />
//         <Tabs defaultValue="all">
//           <div className="flex items-center">
//             <Skeleton className="h-6 w-16 rounded gap-1" />{" "}
//             <Skeleton className="h-6 w-16 rounded" />
//             <Skeleton className="h-6 w-16 rounded" />
//             <div className="ml-auto flex items-center gap-2">
//               <Skeleton className="h-8 w-24 rounded" />{" "}
//             </div>
//           </div>
//           <TabsContent value="all">
//             <Skeleton className="h-6 w-32" />
//             <div className="max-h-[350px] overflow-auto">
//               <TableSkeleton />
//             </div>
//             <div className="text-xs text-muted-foreground">
//               <Skeleton className="h-6 w-64" />
//             </div>
//           </TabsContent>
//         </Tabs>
//       </main>
//     </>
//   );
// };

export const ExamListPreview: React.FC = () => {

  const { data: examList, isLoading } = useListExam({});

  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
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
                {[
                  { id: "id", label: "ID" },
                  { id: "firstName", label: "First Name" },
                  { id: "lastName", label: "Last Name" },
                  { id: "email", label: "Email" },
                ].map((value) => (
                  <DropdownMenuCheckboxItem key={value.id}>
                    {value.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => setIsCreateExamModalOpen(true)}
              size="sm"
              className="h-8 gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" /> Add Exams
            </Button>
          </div>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : examList?.data.length > 0 ? (
          <>
            <Card className="h-[80vh] flex flex-col">
              <CardHeader>
                <CardTitle>Exams</CardTitle>
                <CardDescription>Manage your exams here.</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[350px] overflow-scroll hide-scrollbar flex-1">
                <Table className=" overflow-scroll">
                  <TableHeader>
                    <TableRow>
                      {["Exam Name", "Start Date", "End Date", "Classes"].map(
                        (value, index) => (
                          <TableHead key={index}>{value}</TableHead>
                        )
                      )}
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="max-h-[400px] overflow-hidden">
                    <ExamListComponent examItem={examList?.data} />
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="mt-auto">
                {/* <div className="text-xs text-muted-foreground">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="default">{position}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Page Size</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={position}
                          onValueChange={setPosition}
                        >
                          {["10", "20", "30", "40", "50"].map((size, index) => (
                            <DropdownMenuRadioItem key={index} value={size}>
                              {size}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>{" "}
                    Showing <strong>{`${start} - ${end}`}</strong> of{" "}
                    <strong>{30}</strong> teachers
                  </div> */}
              </CardFooter>
            </Card>
          </>
        ) : (
          <div
            className={`flex flex-1 items-center h-[80vh] justify-center rounded-lg border border-dashed shadow-sm mt-3 `}
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">No Classes</h3>
              <p className="text-sm text-muted-foreground">Add classes</p>
            </div>
          </div>
        )}
        <Dialog
          open={isCreateExamModalOpen}
          onOpenChange={setIsCreateExamModalOpen}
        >
          {isCreateExamModalOpen && (
            <DialogContent className="max-w-[60%] max-h-[90%] overflow-y-scroll hide-scrollbar">
              <CreateExam modalAction={setIsCreateExamModalOpen} />
            </DialogContent>
          )}
        </Dialog>
        {/* API Done - Backend */}
      </main>
    </>
  );
};
