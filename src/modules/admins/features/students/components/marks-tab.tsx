import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC, useState } from "react";
import ExamGradeModal from "./create-marks";
import { Dialog } from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import { useSMarkListAPI } from "../store/hooks";
import { Skeleton } from "@/components/ui/skeleton";

const MarksTableSkeleton = () => {
  // Number of skeleton rows to display
  const skeletonRows = 5;

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader className="flex flex-row items-start justify-start">
        <Skeleton className="h-8 w-24" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Exam Name",
                "Subject Name",
                "Total Marks",
                "Marks Obtained",
                "Grade",
              ].map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: skeletonRows }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const Marks: FC = () => {
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  const { id } = useParams();

  const {
    data: MARKS_DATA,
    isLoading: IS_MARKSDATA_LOADING,
  } = useSMarkListAPI(id);

  console.log(
    MARKS_DATA,
    "ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
  );

  return (
    <>
      <div className="flex justify-end space-x-2 m-2">
        <Button onClick={() => setIsExamModalOpen(true)}>Create Marks</Button>
      </div>
      {IS_MARKSDATA_LOADING ? (
        <MarksTableSkeleton />
      ) : MARKS_DATA?.data.length > 0 ? (
        <Card className="w-full max-w-5xl">
          <CardHeader className="flex flex-row items-start justify-start">
            Marks
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    "Exam Name",
                    "Subject Name",
                    "Total Marks",
                    "Marks Obtained",
                    "Grade",
                  ].map((value) => (
                    <TableHead>{value}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {MARKS_DATA?.data.map((exam:any) => (
                  <TableRow key={exam.id}>
                    <TableCell>{exam?.examSubjects?.exam?.name}</TableCell>
                    <TableCell>
                      {exam?.examSubjects?.Subject?.name +
                        " " +
                        exam?.examSubjects?.Subject?.code}
                    </TableCell>
                    <TableCell>{exam?.examSubjects?.maxScore}</TableCell>
                    <TableCell>{exam?.marksObtained}</TableCell>
                    <TableCell>{exam?.grade}</TableCell>
                    {/* <TableCell className={getScoreColor(12)}>{12}</TableCell>
              <TableCell className={getScoreColor(40)}>{40}</TableCell>
              <TableCell className={getScoreColor(23)}>{23}</TableCell>
              <TableCell className={getScoreColor(10)}>{10}</TableCell>
              <TableCell className={getScoreColor(76)}>{76}</TableCell>
              <TableCell className={getScoreColor(78)}>{78}</TableCell>
              <TableCell className={getScoreColor(34)}>{34}</TableCell> */}
                    {/* <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`text-xs py-1 px-2 bg-green-100 text-green-800 hover:bg-green-200`}
                  >
                    {"Unit Test"} <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Unit Test</DropdownMenuItem>
                  <DropdownMenuItem>First Half</DropdownMenuItem>
                  <DropdownMenuItem>Spcl CL</DropdownMenuItem>
                  <DropdownMenuItem>Second Half</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="flex-1">
          <div
            className={
              "flex flex-1 items-center h-[380px] justify-center rounded-lg border border-dashed shadow-sm"
            }
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">No Marks</h3>
              <p className="text-sm text-muted-foreground">
                No marks data for this student.
              </p>
            </div>
          </div>
        </div>
      )}

      <Dialog open={isExamModalOpen} onOpenChange={setIsExamModalOpen}>
        {/* This is useless idea */}
        {isExamModalOpen && id && (
          <ExamGradeModal modalAction={setIsExamModalOpen} studentId={id} />
        )}
      </Dialog>
    </>
  );
};

export default Marks;
