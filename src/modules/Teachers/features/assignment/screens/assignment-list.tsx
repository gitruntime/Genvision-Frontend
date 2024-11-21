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

const AssignmentList = () => {
    const [activeTab, setActiveTab] = useState<string>("all");
    const [assignmentData, setAssignmentData] = useState([]);
    const [classList, setClassList] = useState([]);
    const [loadingClasses, setLoadingClasses] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [selectedClassId, setSelectedClassId] = useState(editingItem?.classId || null);
    const [subjectList, setSubjectList] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);


    const { id } = useParams();
    console.log("hey.....", assignmentData)

    // Fetch assignments
    const fetchAssignment = async () => {
        try {
            setLoading(true);
            const response = await api.get("/teacher/classes/assignments"); // Update the API endpoint as needed
            setAssignmentData(response.data?.data || []);
        } catch (error) {
            console.error("Failed to fetch assignment data:", error);
        } finally {
            setLoading(false);
        }
    };


    const fetchClassList = async () => {
        try {
            setLoadingClasses(true);
            const response = await api.get("/teacher/classes"); // Replace with your API endpoint
            const data = response.data?.data || []; // Adjust based on the API response structure
            setClassList(data);
        } catch (error) {
            console.error("Failed to fetch class list:", error);
            setClassList([]); // Fallback to an empty array on error
        } finally {
            setLoadingClasses(false);
        }
    };


    useEffect(() => {
        fetchClassList();
    }, []);

    // Add or Update Attendance
    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            if (editingItem) {
                // Update logic
                await api.put(`teacher/classes/assignments`, data); // Adjust endpoint and payload
            } else {
                // Add logic
                await api.post("teacher/classes/assignments", data); // Adjust endpoint and payload
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
            setSelectedClassId(null); // Clear the selected class
        }
    };


    // Populate editing state
    const onEdit = (item) => {
        setEditingItem(item);
        setSelectedClassId(item.classId);
    
        // Update subject list based on class
        const selectedClass = classList.find((cls) => cls.id === item.classId);
        setSubjectList(selectedClass ? selectedClass.subjects || [] : []);
        setSelectedSubject(item.subjectId); // Populate subject field
    
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

    const handleClassChange = (e) => {
        const selectedClassId = e.target.value;
        setSelectedClassId(selectedClassId);

        // Find the selected class and update the subject list
        const selectedClass = classList.find((cls) => cls.id === selectedClassId);
        if (selectedClass) {
            setSubjectList(selectedClass.ClassTeachers.[0].subject.id || []); // Adjust based on API structure
        } else {
            setSubjectList([]); // Clear the subject list if no class is selected
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
                        <TabsTrigger value="all">All Assignments</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value={activeTab}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Assignments</CardTitle>
                            <CardDescription>Manage your Assignments.</CardDescription>
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
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Sr.no.</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead>Document </TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Action</TableHead>

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assignmentData.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id + 1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.dueDate}</TableCell>
                                            <TableCell>{item.dueDate}</TableCell>
                                            <TableCell>{item.document}</TableCell>
                                            <TableCell>{item.priority}</TableCell>
                                            <TableCell>{item.createdAt}</TableCell>
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
                                Showing <strong>{assignmentData.length}</strong> assignments.
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            <Modal open={modalOpen} onClose={toggleModal}>
                <div className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto mt-20">
                    <h2 className="text-lg font-bold mb-4">
                        {editingItem ? "Edit Assignment" : "Add Assignment"}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormControl variant="outlined" fullWidth>
                            <TextField
                                {...register("name", { required: true })}
                                label="Name"
                                type="text"
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                            <br />
                            <TextField
                                {...register("dueDate", { required: true })}
                                label="Due Date"
                                type="date"
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>

                        <TextField
                            {...register("priority")}
                            label="Priority"
                            type="text"
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControl variant="outlined" fullWidth>
                            <TextField
                                {...register("classId", { required: true })}
                                select
                                label="Class"
                                required
                                InputLabelProps={{ shrink: true }}
                                value={selectedClassId || ""}
                                onChange={handleClassChange} // Dynamically update subject list
                            >
                                {loadingClasses ? (
                                    <MenuItem disabled>
                                        <CircularProgress size={20} />
                                    </MenuItem>
                                ) : (
                                    classList.map((cls) => (
                                        <MenuItem key={cls.id} value={cls.id}>
                                            {cls.name}
                                        </MenuItem>
                                    ))
                                )}
                            </TextField>
                        </FormControl>

                        {/* Subject Field */}
                        <FormControl variant="outlined" fullWidth>
                            <TextField
                                {...register("subjectId", { required: true })}
                                select
                                label="Subject"
                                required
                                InputLabelProps={{ shrink: true }}
                                value={selectedSubject || ""}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                            >
                                {subjectList.map((subject) => (
                                    <MenuItem key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>


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

export default AssignmentList;
