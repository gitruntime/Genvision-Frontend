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
}

const AttendanceTable: FC = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>DATE</TableHead>
        <TableHead>CHECK IN</TableHead>
        <TableHead>CHECK OUT</TableHead>
        <TableHead>STATUS</TableHead>
        <TableHead>ACTION</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>22 OCT, 2020</TableCell>
        <TableCell>08:51 am</TableCell>
        <TableCell>12:01 pm</TableCell>
        <TableCell>
          <Badge className="bg-green-100 text-green-800">PRESENT</Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="text-purple-600 hover:text-purple-800"
            >
              Edit
            </Button>
            <Button variant="ghost">
              <MoreVertical size={16} />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>1 FEB, 2020</TableCell>
        <TableCell>01:08 pm</TableCell>
        <TableCell>05:49 pm</TableCell>
        <TableCell>
          <Badge className="bg-green-100 text-green-800">PRESENT</Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="text-purple-600 hover:text-purple-800"
            >
              Edit
            </Button>
            <Button variant="ghost">
              <MoreVertical size={16} />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const StatCard: FC<StatCardProps> = ({ icon, value, label, bgColor }) => (
  <Card className={`${bgColor} border-${bgColor} shadow-sm`}>
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
    <Card>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
          <StatCard
            icon={<Hourglass className="text-orange-500" />}
            value="608:15"
            label="Total Hour"
            bgColor="bg-orange-50"
          />
        </div>

        <AttendanceTable />
      </div>
    </Card>
  );
};

export default Attendance
