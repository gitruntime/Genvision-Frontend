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
import { CircularProgress, Modal, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import { Clock, Hourglass, LogOut, MoreVertical, Pencil, Trash, User } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/modules/Teachers/apiConfig/Interceptor";
import { useParams } from "react-router-dom";

interface StatCardProps {
  icon: JSX.Element;
  value: string;
  label: string;
  bgColor: string;
}

interface AttendanceData {
  attendanceDate: string;
  status: string;
  checkIn?: string;
  checkOut?: string;
}

const AttendanceTable: FC<{
  data: AttendanceData[];
  onEdit: (item: AttendanceData) => void;
  onDelete: (id: string) => void;
}> = ({ data, onEdit, onDelete }) => (
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
      {data.map((item) => (
        
        <TableRow key={item.id}>
          <TableCell>{item.attendanceDate}</TableCell>
          <TableCell>{item.checkIn}</TableCell>
          <TableCell>{item.checkOut}</TableCell>
          <TableCell>
            <Badge
              className={`${
                item.status === "present"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {item.status.toUpperCase()}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="text-purple-600 hover:text-purple-950 hover:bg-transparent"
                onClick={() => onEdit(item)}
              >
                <Pencil size={16} />
              </Button>
              {/* {<h1>{item.id}</h1>} */}
              <Button
                variant="ghost"
                className="text-red-600 hover:text-red-900 hover:bg-transparent"
                onClick={() => onDelete(item.id!)} // Ensure id is not undefined
              >
                <Trash size={16} />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
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

export const Attendance: FC = () => {

  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AttendanceData | null>(null); // Track editing state
  const { id } = useParams();

  const { register, handleSubmit, reset, setValue } = useForm<AttendanceData>({
    defaultValues: {
      status: '', // Make sure the status field has a valid initial value
      attendanceDate: ''
    },
  });

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/teacher/students/${id}/attendances`);
      console.log(response);

      setAttendanceData(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AttendanceData) => {
    try {
      setLoading(true);
  
      // Helper function to format time to 24-hour format
      const formatTo24Hour = (time: string | undefined): string | undefined => {
        if (!time) return undefined;
  
        const [hours, minutes] = time.split(":").map(Number);
        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
          throw new Error(`Invalid time format: ${time}`);
        }
  
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      };
  
      // Format checkIn and checkOut before passing to the API
      const formattedData: AttendanceData = {
        ...data,
        checkIn: formatTo24Hour(data.checkIn),
        checkOut: formatTo24Hour(data.checkOut),
      };
  
      if (editingItem) {
        // Update existing record
        await api.put(`/teacher/students/${id}/attendances/${editingItem.id}`, formattedData);
      } else {
        // Create new record
        await api.post(`/teacher/students/${id}/attendances`, formattedData);
      }
  
      fetchAttendance();
      reset();
      setModalOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      console.error("Failed to save attendance:", error);
  
      // Extract and format validation errors
      if (error.response && error.response.data) {
        const errors = error.response.data;
        const formattedErrors = Object.entries(errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
  
        alert(`Validation Errors:\n${formattedErrors}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (recordId: string) => {
    try {
      setLoading(true);
      await api.delete(`/teacher/students/${id}/attendances/${recordId}`);
      fetchAttendance();
    } catch (error) {
      console.error("Failed to delete attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: AttendanceData) => {
    setEditingItem(item);
    setValue("attendanceDate", item.attendanceDate);
    setValue("status", item.status);
    setValue("checkIn", item.checkIn || "");
    setValue("checkOut", item.checkOut || "");
    setModalOpen(true);
  };

  // Call fetchAttendance when the component mounts
  useEffect(() => {
    fetchAttendance();
  }, [id]); // Dependency array ensures it re-fetches when `id` changes

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (!modalOpen) {
      reset(); // Clear the form when closing
      setEditingItem(null); // Reset editing state
    }
  };

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
        <div className="flex justify-end items-center mb-4 mr-4">
          <Button
            variant="outlined"
            className="bg-purple-500 text-white hover:bg-purple-600"
            onClick={toggleModal}
          >
           Add Attendance
          </Button>
          {loading && <CircularProgress size={20} className="ml-2" />}
        </div>

        <AttendanceTable
          data={attendanceData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Modal open={modalOpen} onClose={toggleModal}>
          <div className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto mt-20">
          <h2 className="text-lg font-bold mb-4">
              {editingItem ? "Edit Attendance" : "Add Attendance"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="attendanceDate"></InputLabel>
                <TextField
                  {...register("attendanceDate", { required: true })}
                  label="Date"
                  type="date"
                  id="attendanceDate"
                  required
                  InputLabelProps={{ shrink: true }} // Ensures label shrinks when date is selected
                />
              </FormControl>

              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Select
                  {...register("status", { required: true })}
                  label="Status"
                  id="status"
                  required
                >
                  <MenuItem value="present">PRESENT</MenuItem>
                  <MenuItem value="absent">ABSENT</MenuItem>
                  <MenuItem value="late">LATE</MenuItem>
                  <MenuItem value="excused">EXCUSED</MenuItem>
                </Select>
              </FormControl>

              <TextField
                {...register("checkIn")}
                label="Check-In"
                type="time"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                {...register("checkOut")}
                label="Check-Out"
                type="time"
                InputLabelProps={{ shrink: true }}
              />

              <div className="flex justify-end gap-2">
                <Button
                  variant="text"
                  onClick={toggleModal}
                  className="text-gray-500"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" className="bg-purple-500 text-white">
                  {editingItem ? "Update" : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </Card>
  );
};
