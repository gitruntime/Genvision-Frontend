import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useListTeacher } from "../store/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TeachersSkeleton = () => {
  return (
    <Card className="m-10">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-40" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-64" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const TeachersList = () => {

  const { data, isLoading } = useListTeacher();


  return (
    <>
      {isLoading ? (
        <>
          <TeachersSkeleton />
        </>
      ) : data?.data.length > 0 ? (
        <Card className="m-10">
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
            <CardDescription>View all your teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile Picture</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((teacher: any) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={teacher.profilePicture}
                          alt={teacher.teacherName}
                        />
                        <AvatarFallback>
                          {teacher.teacherName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{teacher.teacherName}</TableCell>
                    <TableCell>{teacher.subjectName}</TableCell>
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

export default TeachersList;
