import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useListMarks } from "../store/hooks";
import { Skeleton } from "@/components/ui/skeleton";



const DetailedMarksSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
            <div className="w-[180px]">
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-24" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const StudentMarksDetailedDashboard = () => {

  const { data } = useListMarks();

  return (
    <>
      {false ? (
        <DetailedMarksSkeleton />
      ) : data?.data.length > 0 ? (
        <div className="p-4 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Detailed Marks Dashboard</CardTitle>
                {/* <Select value={viewType} onValueChange={setViewType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="View Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semesters">Semesters</SelectItem>
                    <SelectItem value="classTests">Class Tests</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
            </CardHeader>
            <CardContent>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Max Marks</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((mark:any) => (
                    <TableRow key={mark.id}>
                      <TableCell>{mark.examName}</TableCell>
                      <TableCell>{mark.subjectName}</TableCell>
                      <TableCell>{mark.marksObtained}</TableCell>
                      <TableCell>{mark.maxScore}</TableCell>
                      <TableCell>
                        {((mark.marksObtained / mark.maxScore) * 100).toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex-1">
          <div
            className={
              "flex flex-1 m-16 items-center h-[500px] justify-center rounded-lg border border-dashed shadow-sm"
            }
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">No Teachers</h3>
              <p className="text-sm text-muted-foreground">
                There is no Teachers where assigned to your class
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentMarksDetailedDashboard;
