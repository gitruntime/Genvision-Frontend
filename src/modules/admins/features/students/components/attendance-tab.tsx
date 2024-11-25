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
import {
  Clock,
  Hourglass,
  Loader2,
  LogOut,
  MoreVertical,
  Plus,
  User,
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import {
  useSAttendanceListAPI,
  useSCreateAttendanceAPI,
  useSUpdateAttendanceAPI,
} from "../store/hooks";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import Yup from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface StatCardProps {
  icon: JSX.Element;
  value: string;
  label: string;
  bgColor: string;
}

const StatCardSkeleton = () => (
  <Card>
    <CardContent className="flex items-center p-4">
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse mr-4" />
      <div>
        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mb-1" />
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
      </div>
    </CardContent>
  </Card>
);

const AttendanceTableSkeleton = () => (
  <div className="rounded-md border max-h-[90%] hide-scrollbar">
    <div className="border-b">
      <div className="grid grid-cols-5 gap-4 p-4">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="h-6 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    </div>

    {[...Array(5)].map((_, rowIdx) => (
      <div key={rowIdx} className="border-b">
        <div className="grid grid-cols-5 gap-4 p-4">
          <div className="h-5 w-24 bg-gray-200 animate-pulse rounded" />
          <div className="h-5 w-20 bg-gray-200 animate-pulse rounded" />
          <div className="h-5 w-20 bg-gray-200 animate-pulse rounded" />
          <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-full" />
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const AttendanceDashboardSkeleton = () => {
  return (
    <div className="container mx-auto p-4 overflow-hidden max-h-[90%]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, idx) => (
          <StatCardSkeleton key={idx} />
        ))}
      </div>
      <AttendanceTableSkeleton />
    </div>
  );
};

const AttendanceTable: FC = ({ attendances, studentId }) => {
  const { mutate, isPending, isSuccess, isError, error } =
    useSUpdateAttendanceAPI(studentId);
  const [studentEditId, setStudentEditId] = useState(null);
  const [isAttendanceModal, setIsAttendanceModal] = useState(false);

  const formatTime = (time) => {
    if (!time) return null;
    return time.slice(0, 5);
  };

  const validationSchema = Yup.object({
    attendanceDate: Yup.date()
      .required("Attendance date is required")
      .max(new Date(), "Attendance date cannot be in the future"),
    status: Yup.string()
      .required("Status is required")
      .oneOf(["present", "absent", "excused", "late"], "Invalid status"),
    checkIn: Yup.string()
      .nullable()
      .test("time-format", "Invalid time format", function (value) {
        if (!value) return true; // Optional field
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      }),
    checkOut: Yup.string()
      .nullable()
      .test("time-format", "Invalid time format", function (value) {
        if (!value) return true; // Optional field
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      })
      .test(
        "checkout-after-checkin",
        "Check-out must be after check-in",
        function (value) {
          const { checkIn } = this.parent;
          if (!value || !checkIn) return true; // Skip validation if either is empty
          return value > checkIn;
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      attendanceDate: "2024-01-14",
      status: "excused",
      checkIn: "",
      checkOut: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate([studentEditId, values]);
    },
  });

  const handleEditModal = (data) => {
    formik.setValues({
      attendanceDate: data.attendanceDate,
      status: data.status,
      checkIn: formatTime(data.checkIn),
      checkOut: formatTime(data.checkOut),
    });
    setStudentEditId(data.id);
    setIsAttendanceModal(true);
  };

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title: error.response?.data.message,
        description: "Try Again",
      });
    }

    if (isSuccess) {
      setIsAttendanceModal(false);
      toast({
        variant: "success",
        title: `Attendance updated Successfully.`,
      });
    }
  }, [isSuccess, isError]);

  return (
    <>
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
          {attendances.map((attendance: any) => (
            <TableRow key={attendance.id}>
              <TableCell>{attendance.attendanceDate}</TableCell>
              <TableCell>
                {" "}
                {
                  attendance.checkIn ? attendance.checkIn : "N/A" // Fallback value if checkIn is not available
                }
              </TableCell>
              <TableCell>
                {" "}
                {
                  attendance.checkOut ? attendance.checkIn : "N/A" // Fallback value if checkIn is not available
                }
              </TableCell>
              <TableCell>
                <Badge
                  className={`bg-green-100 ${
                    attendance.status === "present"
                      ? "text-green-800"
                      : attendance.status === "late"
                      ? "text-orange-800"
                      : attendance.status === "excused"
                      ? "text-blue-500"
                      : "text-red-500"
                  } `}
                >
                  {attendance.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-800"
                    onClick={() => handleEditModal(attendance)}
                  >
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isAttendanceModal} onOpenChange={setIsAttendanceModal}>
        {isAttendanceModal && (
          <DialogContent>
            <>
              {isPending && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
              <DialogHeader>Edit Attendance</DialogHeader>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="attendanceDate">Attendance Date</Label>
                  <Input
                    type="date"
                    id="attendanceDate"
                    name="attendanceDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.attendanceDate}
                    className={`w-full ${
                      formik.touched.attendanceDate &&
                      formik.errors.attendanceDate
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.attendanceDate &&
                    formik.errors.attendanceDate && (
                      <div className="text-sm text-red-500">
                        {formik.errors.attendanceDate}
                      </div>
                    )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    name="status"
                    onValueChange={(value) =>
                      formik.setFieldValue("status", value)
                    }
                    defaultValue={formik.values.status}
                  >
                    <SelectTrigger
                      className={`w-full ${
                        formik.touched.status && formik.errors.status
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="excused">Excused</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="text-sm text-red-500">
                      {formik.errors.status}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in Time (Optional)</Label>
                  <Input
                    type="time"
                    id="checkIn"
                    name="checkIn"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.checkIn}
                    className={`w-full ${
                      formik.touched.checkIn && formik.errors.checkIn
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.checkIn && formik.errors.checkIn && (
                    <div className="text-sm text-red-500">
                      {formik.errors.checkIn}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out Time (Optional)</Label>
                  <Input
                    type="time"
                    id="checkOut"
                    name="checkOut"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.checkOut}
                    className={`w-full ${
                      formik.touched.checkOut && formik.errors.checkOut
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.checkOut && formik.errors.checkOut && (
                    <div className="text-sm text-red-500">
                      {formik.errors.checkOut}
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

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

const Attendance: FC = ({ studentId }) => {
  const { data: ATTENDANCES, isLoading: isAttendanceLoading } =
    useSAttendanceListAPI(studentId);

  const {
    mutate,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = useSCreateAttendanceAPI(studentId);

  const validationSchema = Yup.object({
    attendanceDate: Yup.date()
      .required("Attendance date is required")
      .max(new Date(), "Attendance date cannot be in the future"),
    status: Yup.string()
      .required("Status is required")
      .oneOf(["present", "absent", "excused", "late"], "Invalid status"),
    checkIn: Yup.string()
      .nullable()
      .test("time-format", "Invalid time format", function (value) {
        if (!value) return true; // Optional field
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      }),
    checkOut: Yup.string()
      .nullable()
      .test("time-format", "Invalid time format", function (value) {
        if (!value) return true; // Optional field
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      })
      .test(
        "checkout-after-checkin",
        "Check-out must be after check-in",
        function (value) {
          const { checkIn } = this.parent;
          if (!value || !checkIn) return true; // Skip validation if either is empty
          return value > checkIn;
        }
      ),
  });

  const [isAttendanceModal, setIsAttendanceModal] = useState(false);
  const formik = useFormik({
    initialValues: {
      attendanceDate: "2024-01-14",
      status: "excused",
      checkIn: "",
      checkOut: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      mutate(values);
    },
  });

  useEffect(() => {
    if (isCreateError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title: createError.response?.data.message,
        description: "Try Again",
      });
    }

    if (isCreateSuccess) {
      setIsAttendanceModal(false);
      toast({
        variant: "success",
        title: `Class ${isCreateSuccess ? "created" : "updated"} Successfully.`,
      });
    }
  }, [isCreateError, isCreateSuccess]);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Create Attendance Button */}
      <div className="flex justify-end px-4">
        <Button
          onClick={() => setIsAttendanceModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Attendance
        </Button>
      </div>
      <Card className="max-h-[calc(100%-60px)] overflow-y-scroll hide-scrollbar relative">
        {isAttendanceLoading ? (
          <AttendanceDashboardSkeleton />
        ) : ATTENDANCES?.data.length > 0 ? (
          <div className="container mx-auto p-4 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={<User className="text-green-500" />}
                value={ATTENDANCES?.stats?.present}
                label="Total Present"
                bgColor="bg-purple-50"
              />
              <StatCard
                icon={<Clock className="text-orange-500" />}
                value={ATTENDANCES?.stats?.late}
                label="Total Late"
                bgColor="bg-blue-50"
              />
              <StatCard
                icon={<LogOut className="text-red-500" />}
                value={ATTENDANCES?.stats?.absent}
                label="Total Absent"
                bgColor="bg-green-50"
              />
              <StatCard
                icon={<Hourglass className="text-orange-500" />}
                value={ATTENDANCES?.stats?.excused}
                label="Total Excused"
                bgColor="bg-orange-50"
              />
            </div>

            <AttendanceTable
              attendances={ATTENDANCES?.data}
              studentId={studentId}
            />
          </div>
        ) : (
          <div
            className={`flex flex-1 items-center h-[270px] justify-center rounded-lg border border-dashed shadow-sm`}
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                No Attendancess
              </h3>
              <p className="text-sm text-muted-foreground">
                No attendances data found for this student
              </p>
            </div>
          </div>
        )}
      </Card>
      <Dialog open={isAttendanceModal} onOpenChange={setIsAttendanceModal}>
        {isAttendanceModal && (
          <DialogContent>
            <>
              {isCreatePending && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
              <DialogHeader>Add Attendance</DialogHeader>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="attendanceDate">Attendance Date</Label>
                  <Input
                    type="date"
                    id="attendanceDate"
                    name="attendanceDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.attendanceDate}
                    className={`w-full ${
                      formik.touched.attendanceDate &&
                      formik.errors.attendanceDate
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.attendanceDate &&
                    formik.errors.attendanceDate && (
                      <div className="text-sm text-red-500">
                        {formik.errors.attendanceDate}
                      </div>
                    )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    name="status"
                    onValueChange={(value) =>
                      formik.setFieldValue("status", value)
                    }
                    defaultValue={formik.values.status}
                  >
                    <SelectTrigger
                      className={`w-full ${
                        formik.touched.status && formik.errors.status
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="excused">Excused</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="text-sm text-red-500">
                      {formik.errors.status}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in Time (Optional)</Label>
                  <Input
                    type="time"
                    id="checkIn"
                    name="checkIn"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.checkIn}
                    className={`w-full ${
                      formik.touched.checkIn && formik.errors.checkIn
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.checkIn && formik.errors.checkIn && (
                    <div className="text-sm text-red-500">
                      {formik.errors.checkIn}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out Time (Optional)</Label>
                  <Input
                    type="time"
                    id="checkOut"
                    name="checkOut"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.checkOut}
                    className={`w-full ${
                      formik.touched.checkOut && formik.errors.checkOut
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.checkOut && formik.errors.checkOut && (
                    <div className="text-sm text-red-500">
                      {formik.errors.checkOut}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  Submit
                </Button>
              </form>
            </>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Attendance;
