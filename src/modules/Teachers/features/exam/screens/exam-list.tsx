import React, { useEffect, useState } from "react";
import {
    ListFilter,
    PlusCircle,
    Pencil,
    Trash,
    
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CircularProgress, FormControl, TextField, Modal, MenuItem } from "@mui/material";
import api from "@/modules/Teachers/apiConfig/Interceptor";
import { useParams } from "react-router-dom";
import Cookies from 'universal-cookie';




const ExamList = () => {
    const [activeTab, setActiveTab] = useState<string>("all");
    const [assignmentData, setAssignmentData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();
const cookies = new Cookies();
const teacherName = cookies.get('teacherName');


    // Fetch assignments
    const fetchAssignment = async () => {
        try {
            setLoading(true);
            const response = await api.get("/assignments"); // Update the API endpoint as needed
            setAssignmentData(response.data?.data || []);
        } catch (error) {
            console.error("Failed to fetch assignment data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Add or Update Attendance
    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            if (editingItem) {
                // Update logic
                await api.put(`/assignments/${editingItem.id}`, data); // Adjust endpoint and payload
            } else {
                // Add logic
                await api.post("/assignments", data); // Adjust endpoint and payload
            }
            fetchAssignment(); // Refresh data after success
            toggleModal(); // Close modal
        } catch (error) {
            console.error("Failed to save assignment data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle modal toggling
    const toggleModal = () => {
        setModalOpen(!modalOpen);
        if (!modalOpen) {
            reset();
            setEditingItem(null);
        }
    };

    // Populate editing state
    const onEdit = (item: any) => {
        setEditingItem(item);
        setModalOpen(true);
        reset(item); // Populate the form with existing data
    };

    // Delete Assignment
    const onDelete = async (id: number) => {
        try {
            setLoading(true);
            await api.delete(`/assignments/${id}`); // Adjust endpoint
            fetchAssignment(); // Refresh data
        } catch (error) {
            console.error("Failed to delete assignment:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignment();
    }, [id]);

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All Exams</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value={activeTab}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Exams</CardTitle>
                            <CardDescription>Manage your Exams.</CardDescription>
                            <div className="flex justify-end items-center mb-4 mr-4">
                                <Button
                                    variant="outlined"
                                    className="bg-purple-500 text-white hover:bg-purple-600"
                                    onClick={toggleModal}
                                >
                                    Add Exams
                                </Button>
                                {loading && <CircularProgress size={20} className="ml-2" />}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Sr.No.</TableHead>
                                        <TableHead>Exam Name</TableHead>
                                        <TableHead>Exam Type</TableHead>
                                        <TableHead>Teacher Name</TableHead>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Start date</TableHead>
                                        <TableHead>End date</TableHead>
                                        <TableHead>Action</TableHead>

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assignmentData.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id + 1}</TableCell>
                                            <TableCell>{item.examName}</TableCell>
                                            <TableCell>{item.examType}</TableCell>
                                            <TableCell>{item.teachaerName}</TableCell>
                                            <TableCell>{item.class}</TableCell>
                                            <TableCell>{item.subject}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.startdate}</TableCell>
                                            <TableCell>{item.enddate}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        className="text-purple-600 hover:text-purple-950 hover:bg-transparent"
                                                        onClick={() => onEdit(item)}
                                                    >
                                                        <Pencil size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="text-red-600 hover:text-red-900 hover:bg-transparent"
                                                        onClick={() => onDelete(item.id)}
                                                    >
                                                        <Trash size={16} />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>{assignmentData.length}</strong> Exams.
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            <Modal open={modalOpen} onClose={toggleModal}>
                <div
                    className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto mt-20 max-h-[90vh] overflow-y-auto"
                >
                    <h2 className="text-lg font-bold mb-4">
                        {editingItem ? "Edit Attendance" : "Add Attendance"}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormControl variant="outlined" fullWidth>
                            <TextField
                                {...register("examName", { required: true })}
                                label="Exam Name"
                                type="text"
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                            <br />
                            <TextField
                                select
                                {...register("examType", { required: true })}
                                label="Exam Type"
                                required
                                InputLabelProps={{ shrink: true }}
                            >
                                {["Semester", "Final", "Quiz", "Practice Test"].map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <TextField
                            {...register("teacherName")}
                            label="Teacher Name"
                            type="text"
                            InputLabelProps={{ shrink: true }}
                            defaultValue={teacherName} // Replace with actual API value
                            disabled
                        />
                        <TextField
                            {...register("date")}
                            label="Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            {...register("startTime")}
                            label="Start Time"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            {...register("endTime")}
                            label="End Time"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            select
                            {...register("subject")}
                            label="Subject"
                            InputLabelProps={{ shrink: true }}
                        >
                            {["Math", "Science", "History", "English"].map((subject) => (
                                <MenuItem key={subject} value={subject}>
                                    {subject}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            {...register("class")}
                            label="Class"
                            InputLabelProps={{ shrink: true }}
                        >
                            {["Class A", "Class B", "Class C"].map((className) => (
                                <MenuItem key={className} value={className}>
                                    {className}
                                </MenuItem>
                            ))}
                        </TextField>
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


        </main>
    );
};

export default ExamList;
