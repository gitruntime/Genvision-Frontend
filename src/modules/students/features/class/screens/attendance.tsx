import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, Hourglass, LogOut, MoreVertical, User } from "lucide-react";
import { FC } from "react";

interface StatCardProps {
  icon: JSX.Element;
  value: string;
  label: string;
  bgColor: string;
  className?: string;
}

const attendances = [
  {
    id: 1,
    date: "2024-11-21",
    checkIn: "08:45 am",
    checkOut: "12:30 pm",
    status: "PRESENT",
  },
  {
    id: 2,
    date: "2024-11-20",
    checkIn: "09:00 am",
    checkOut: "01:15 pm",
    status: "PRESENT",
  },
  {
    id: 3,
    date: "2024-11-19",
    checkIn: "08:50 am",
    checkOut: "12:00 pm",
    status: "ABSENT",
  },
  {
    id: 4,
    date: "2024-11-18",
    checkIn: "09:10 am",
    checkOut: "12:45 pm",
    status: "PRESENT",
  },
  {
    id: 5,
    date: "2024-11-17",
    checkIn: "08:30 am",
    checkOut: "12:00 pm",
    status: "ABSENT",
  },
];

const AttendanceTable: FC = ({ attendances }) => (
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
            <TableCell>{attendance.date}</TableCell>
            <TableCell>{attendance.checkIn}</TableCell>
            <TableCell>{attendance.checkOut}</TableCell>
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

const Attendance: FC = () => {
  return (
    <>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4  mb-8">
          <StatCard
            icon={<User className="text-purple-500" />}
            value="256"
            label="Total Present"
            bgColor="bg-purple-50"
          />
          <StatCard
            icon={<Clock className="text-blue-500" />}
            value="02"
            label="Total Leave"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<LogOut className="text-green-500" />}
            value="07"
            label="Total Event Leave"
            bgColor="bg-green-50"
          />
          {/* <StatCard
          icon={<Hourglass className="text-orange-500" />}
          value="608:15"
          label="Total Hour"
          bgColor="bg-orange-50"
        /> */}
        </div>
        <AttendanceTable attendances={attendances} />
      </div>
    </>
  );
};

export default Attendance;
