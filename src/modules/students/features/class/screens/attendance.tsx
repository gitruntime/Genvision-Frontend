import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, Hourglass, LogOut, User } from "lucide-react";
import { FC } from "react";
import { useListAttendance } from "../store/hooks";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  icon: JSX.Element;
  value: string;
  label: string;
  bgColor: string;
  className?: string;
}

interface Attendance {
  // Define the structure of each attendance object
  id: number;
  attendanceDate: number;
  checkIn: string;
  checkOut : string;
  status: 'present' | 'absent' | 'late';
}

interface AttendanceTableProps {
  attendances: Attendance[]; // Adjust based on the actual type of your attendances
}


const AttendanceTable: FC<AttendanceTableProps> = ({ attendances }:any) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>DATE</TableHead>
        <TableHead>CHECK IN</TableHead>
        <TableHead>CHECK OUT</TableHead>
        <TableHead>STATUS</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {attendances && attendances.length > 0 ? (
        attendances.map((attendance: any) => (
          <TableRow key={attendance.id}>
            <TableCell>{attendance.attendanceDate}</TableCell>
            <TableCell>{attendance.checkIn || "N/A"}</TableCell>
            <TableCell>{attendance.checkOut || "N/A"}</TableCell>
            <TableCell>
              <Badge
                className={`bg-white hover:bg-white ${
                  attendance.status === "PRESENT"
                    ? "text-green-800"
                    : attendance.status === "ABSENT"
                    ? "text-red-600"
                    : "text-blue-500"
                } `}
              >
                {attendance.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4}>No attendance records available</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

const CardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 bg-white shadow rounded-lg flex items-center space-x-4 animate-pulse"
        >
          <Skeleton className="w-10 h-10 rounded-full bg-gray-300" />
          <div>
            <Skeleton className="h-4 w-24 bg-gray-300 mb-2" />
            <Skeleton className="h-6 w-16 bg-gray-300" />
          </div>
        </div>
      ))}
    </>
  );
};

const StatCard: FC<StatCardProps> = ({
  icon,
  value,
  label,
  bgColor,
  className,
}) => (
  <Card className={`${bgColor} border-${bgColor} shadow-sm ${className}`}>
    <CardContent className="flex items-center p-4">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </CardContent>
  </Card>
);

const AttendanceTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-4 w-20 bg-gray-300" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-20 bg-gray-300" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-20 bg-gray-300" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-20 bg-gray-300" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <Skeleton className="h-4 w-24 bg-gray-300" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20 bg-gray-300" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20 bg-gray-300" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16 bg-gray-300" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Attendance: FC = () => {
  const { data: ATTENDANCES, isLoading } = useListAttendance();
  return (
    <>
      <div className="p-6 space-y-6">
        {isLoading ? (
          <>
            <CardSkeleton />
            <AttendanceTableSkeleton />
          </>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-4  mb-8">
              <StatCard
                icon={<User className="text-purple-500" />}
                value={ATTENDANCES?.stats.present}
                label="Total Present"
                bgColor="bg-purple-50"
              />
              <StatCard
                icon={<Clock className="text-blue-500" />}
                value={ATTENDANCES?.stats.absent}
                label="Total Leave"
                bgColor="bg-blue-50"
              />
              <StatCard
                icon={<LogOut className="text-green-500" />}
                value={ATTENDANCES?.stats.late}
                label="Late"
                bgColor="bg-green-50"
              />
              <StatCard
                icon={<Hourglass className="text-orange-500" />}
                value={ATTENDANCES?.stats.excused}
                label="Excused"
                bgColor="bg-orange-50"
              />
            </div>
            <AttendanceTable attendances={ATTENDANCES?.data} />
          </>
        )}
      </div>
    </>
  );
};

export default Attendance;
