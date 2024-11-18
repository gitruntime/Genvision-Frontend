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
import { CircularProgress, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import { Clock, Hourglass, LogOut, User } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/modules/Teachers/apiConfig/Interceptor";
import { useParams } from "react-router-dom";
import { Edit, Delete, MoreVert } from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";
import { Modal, Button, Typography } from "@mui/material";



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
  setValue: any;
  setModalOpen: (value: boolean) => void;
  id: string;
  fetchAttendance: () => void;
}> = ({ data, setValue, setModalOpen, id, fetchAttendance }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState<string | null>(null);
  const [selectedAttendanceItem, setSelectedAttendanceItem] = useState<AttendanceData | null>(null); // Store selected item for editing

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (selectedAttendanceDate) {
      console.log(selectedAttendanceDate)
      try {
        await api.delete(`/teacher/students/${id}/attendances/${selectedAttendanceDate}`);
        fetchAttendance(); // Refresh the table data
      } catch (error) {
        console.error("Failed to delete attendance:", error);
      } finally {
        setDeleteModalOpen(false);
        setSelectedAttendanceDate(null);
      }
    }
  };


  const handleEdit = async (item: AttendanceData) => {
    // Open the modal with the current item's data for editing
    setSelectedAttendanceItem(item); // Set the selected attendance item for editing
    setValue("attendanceDate", item.attendanceDate);
    setValue("status", item.status);
    setValue("checkIn", item.checkIn);
    setValue("checkOut", item.checkOut);
    setModalOpen(true); // Open the modal
  };
  

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
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.attendanceDate}</TableCell>
              <TableCell>{item.checkIn}</TableCell>
              <TableCell>{item.checkOut}</TableCell>
              <TableCell>
                <Badge
                  className={`${item.status === "PRESENT"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    }`}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <IconButton aria-label="actions" onClick={handleMenuOpen}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{
                      "& .MuiPaper-root": {
                        borderRadius: 2,
                        minWidth: 200,
                        backgroundColor: "#f9f9f9",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                        padding: "8px 0",
                      },
                      "& .MuiMenuItem-root": {
                        fontSize: "0.875rem",
                        padding: "10px 20px",
                        "&:hover": {
                          backgroundColor: "#f0f0f5",
                        },
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "1rem",
                        color: "#6b7280",
                        marginRight: "10px",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        handleEdit(item); // Trigger the edit action
                      }}
                    >
                      <Edit fontSize="small" />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        setSelectedAttendanceDate(item.id);
                        setDeleteModalOpen(true); // Open delete confirmation modal
                      }}
                    >
                      <Delete fontSize="small" />
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto mt-20">
          <Typography variant="h6" className="mb-4">
            Confirm Deletion
          </Typography>
          <Typography variant="body2" className="mb-6">
            Are you sure you want to delete this attendance record? This action cannot be undone.
          </Typography>
          <div className="flex justify-end gap-2">
            <Button
              variant="text"
              onClick={() => setDeleteModalOpen(false)}
              className="text-gray-500"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="bg-red-500 text-white"
              onClick={handleDelete}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
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

export const Attendance: FC = () => {

  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams(); // Get the id from the URL
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


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

  // Edit Form Submission (PUT API Request)
  const onSubmit = async (data: AttendanceData) => {
    console.log("Form Data: ", data); // Log the data to check for issues
    try {
      // Check if it's an edit or a new submission
      const transformedData = {
        ...data,
        status: data.status.toLowerCase(), // Convert status to lowercase
      };

      setLoading(true);

      if (selectedAttendanceItem) {
        // If editing, make a PUT request
        await api.put(`/teacher/students/${id}/attendances/${selectedAttendanceItem.attendanceDate}`, transformedData);
      } else {
        // If new attendance, make a POST request
        await api.post(`/teacher/students/${id}/attendances`, transformedData);
      }

      fetchAttendance(); // Refresh attendance list
      reset(); // Reset the form
      setModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Failed to submit attendance:", error);
    } finally {
      setLoading(false);
    }
  };
  // Call fetchAttendance when the component mounts
  useEffect(() => {
    fetchAttendance();
  }, [id]); // Dependency array ensures it re-fetches when `id` changes

  const toggleModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    if (id) {
      fetchAttendance();
    }
  }, [id]);


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

            className="bg-purple-500 text-white hover:bg-purple-400 hover:text-white"
            onClick={toggleModal}
          >
            Add Attendance
          </Button>
          {loading && <CircularProgress size={20} className="ml-2" />}
        </div>

        <AttendanceTable
          data={attendanceData}
          setValue={setValue}
          setModalOpen={setModalOpen}
          id={id}
          fetchAttendance={fetchAttendance}
        />


        <Modal open={modalOpen} onClose={toggleModal}>
          <div className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto mt-20">
            <h2 className="text-lg font-bold mb-4">Add Attendance</h2>
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
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </Card>
  );
};
