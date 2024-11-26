import React from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useListClassmates } from "../store/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StudentsSkeleton = () => {
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

const ClassmatesList = () => {
  const { data, isLoading } = useListClassmates();

  return (
    <>
      {isLoading ? (
        <StudentsSkeleton />
      ) : data?.data.length > 0 ? (
        <Card className="m-10">
          <CardHeader>
            <CardTitle>Classmates</CardTitle>
            <CardDescription>View all your classmates</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((classmate) => (
                  <TableRow key={classmate.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={classmate.profilePicture}
                          alt={classmate.accounts.fullName}
                        />
                        <AvatarFallback>
                          {classmate.accounts.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{classmate.accounts.fullName}</TableCell>
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

export default ClassmatesList;
