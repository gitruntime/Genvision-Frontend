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
import { CircularProgress, FormControl, TextField, Modal, MenuItem, InputLabel } from "@mui/material";
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
    const [selectedClassId, setSelectedClassId] = useState(editingItem?.classId || "");
    const selectedClassData = classList.filter((cls) => cls.id === selectedClassId);
    const subject = selectedClassData[0]?.ClassTeachers[0]?.Subject || { name: "", id: "" };

    const { id } = useParams();

    // Fetch assignments
    const fetchAssignment = async () => {
        try {
            setLoading(true);
            const response = await api.get("/teacher/classes/assignments");
            setAssignmentData(response.data?.data || []);
        } catch (error) {
            console.error("Failed to fetch assignment data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAssignment();
    }, [id]);

    // Fetch class list
    const fetchClassList = async () => {
        try {
            setLoadingClasses(true);
            const response = await api.get("/teacher/classes");
            setClassList(response.data?.data || []);
        } catch (error) {
            console.error("Failed to fetch class list:", error);
            setClassList([]);
        } finally {
            setLoadingClasses(false);
        }
    };

    useEffect(() => {
        fetchClassList();
    }, []);

    // Add or Update Assignment
    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            
            // Ensure subjectId is a number
            if (data.subjectId) {
                data.subjectId = Number(data.subjectId);
            }
    
            if (editingItem) {
                // Update logic
                data.id = editingItem.id;
                await api.put(`/teacher/classes/assignments/${editingItem.id}`, data); // Fixed endpoint
            } else {
                // Add logic
                await api.post("/teacher/classes/assignments", data); // Fixed endpoint
            }
    
            fetchAssignment(); // Refresh assignments list after success
            toggleModal(); // Close modal
        } catch (error) {
            console.error("Failed to save assignment data:", error);
        } finally {
            setLoading(false);
        }
    };
    

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        if (!modalOpen) {
            reset();
            setEditingItem(null);
            setSelectedClassId(null);
        }
    };

    // Populate editing state
    const onEdit = (item: any) => {
        setEditingItem(item);
        console.log("editi",item)
        setSelectedClassId(item.classId); // Set the classId of the item being edited
        setModalOpen(true);
        reset({
            ...item, // Spread the item to populate all form fields with current data
            subjectId: item?.subjectId || "", // Set subjectId explicitly if not present
        });
    };

    // Delete Assignment
    const onDelete = async (id: number) => {
        try {
            setLoading(true);
            await api.delete(`/teacher/classes/assignments/${id}`); // Fixed endpoint
            fetchAssignment(); // Refresh assignments list after deletion
        } catch (error) {
            console.error("Failed to delete assignment:", error);
        } finally {
            setLoading(false);
        }
    };

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
                                    Add Assignment
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
                            <InputLabel htmlFor="name"></InputLabel>
                            <TextField
                                {...register("name", { required: true })}
                                label="Name"
                                type="text"
                                id="name"
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="dueDate"></InputLabel>
                            <TextField
                                {...register("dueDate", { required: true })}
                                label="Due Date"
                                type="date"
                                id="dueDate"
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="priority"></InputLabel>
                            <TextField
                                {...register("priority", { required: true })}
                                label="Priority"
                                type="text"
                                id="priority"
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="Class"></InputLabel>
                            <TextField
                                {...register("classId")}
                                select
                                label="Class"
                                id="classId"
                                value={selectedClassId || ""}
                                onChange={(e) => setSelectedClassId(e.target.value)}
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

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="Subject"></InputLabel>
                            <TextField
                                label="Subject"
                                value={subject?.name || "No Subject Selected"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <input
                                type="hidden"
                                id="subjectId"
                                {...register("subjectId")}
                                value={subject?.id || ""}
                            />
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
