import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Plus, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useListVolunteer,
  useVolunteerCreate,
  useVolunteerDelete,
  useVolunteerUpdate,
} from "../store/hooks";

const VolunteerForm = ({
  onSubmit,
  initialValues,
  onCancel,
  isCreatePending,
  isUpdatePending,
}: any) => {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: initialValues || {
        organisationName: "",
        role: "",
        duration: "",
      },
      validationSchema: Yup.object({
        organisationName: Yup.string().required("Organisation is required"),
        role: Yup.string().required("Role is required"),
        duration: Yup.string().required("Duration is required"),
      }),
      onSubmit: (values) => {
        console.log("Values :> ", values);

        onSubmit(values);
      },
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(isCreatePending || isUpdatePending) && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="organisationName">Organization</Label>
        <Input
          id="organisationName"
          name="organisationName"
          value={values.organisationName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            touched.organisationName && errors.organisationName
              ? "border-red-500"
              : ""
          }
        />
        {touched.organisationName && errors.organisationName && (
          <p className="text-sm text-red-500">{errors.organisationName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.role && errors.role ? "border-red-500" : ""}
        />
        {touched.role && errors.role && (
          <p className="text-sm text-red-500">{errors.role}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            type="text"
            value={values.duration}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              touched.duration && errors.duration ? "border-red-500" : ""
            }
          />
          {touched.duration && errors.duration && (
            <p className="text-sm text-red-500">{errors.duration}</p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  );
};

const VolunteerSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          <Skeleton className="h-6 w-48" />
        </CardTitle>
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-32" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const VolunteerTab = () => {
  const [volunteerRecords, setVolunteerRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const {
    mutate: createMutate,
    isSuccess: isCreateSuccess,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useVolunteerCreate();

  const {
    mutate: updateMutate,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useVolunteerUpdate();

  const {
    mutate: deleteMutate,
    isSuccess: isDeleteSuccess,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useVolunteerDelete();

  const handleAddVolunteer = (values: any) => {
    if (editingRecord) {
      updateMutate([
        values.id,
        {
          organisationName: values.organisationName,
          role: values.role,
          duration: values.duration,
        },
      ]);
    } else {
      createMutate(values);
    }
  };

  useEffect(() => {
    if (isCreateError) {
      toast({
        title: createError.response?.data.message,
        variant: "destructive",
      });
    }

    if (isCreateSuccess) {
      setIsModalOpen(false);
      setEditingRecord(null);
      toast({
        title: "Volunteer record created successfully",
        variant: "success",
      });
    }

    if (isUpdateError) {
      toast({
        title: updateError.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
    }

    if (isUpdateSuccess) {
      setIsModalOpen(false);
      setEditingRecord(null);
      toast({
        title: "Volunteer record updated successfully",
        variant: "success",
      });
    }
  }, [isCreateError, isCreateSuccess, isUpdateSuccess, isUpdateError]);


  useEffect(() => {
    if (isDeleteError) {
      toast({
        title: deleteError.response?.data.message,
        variant: "destructive",
      });
    }

    if (isDeleteSuccess) {
      toast({
        title: "Volunteer deleted successfully",
        variant: "success",
      });
    }
  }, [isDeleteError, isDeleteSuccess]);

  const handleDeleteVolunteer = (id) => {
    deleteMutate(id);
  };

  const handleEditVolunteer = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const { data: VOLUNTEERS, isLoading: isVolunteerLoading } =
    useListVolunteer();

  return (
    <TabsContent value="volunteer" className="space-y-4">
      {isVolunteerLoading ? (
        <VolunteerSkeleton />
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Volunteer Experience</CardTitle>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Volunteer Experience
            </Button>
          </CardHeader>
          <CardContent>
            {VOLUNTEERS?.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {VOLUNTEERS?.data.map((volunteer) => (
                    <TableRow key={volunteer.id}>
                      <TableCell>{volunteer.organisationName}</TableCell>
                      <TableCell>{volunteer.role}</TableCell>
                      <TableCell>{volunteer.duration}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditVolunteer(volunteer)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteVolunteer(volunteer.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div
                className={`flex flex-1 items-center lg:h-[510px] justify-center rounded-lg border border-dashed shadow-sm`}
                x-chunk="dashboard-02-chunk-1"
              >
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    No Volunteers
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Add some volunteers to manage
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {isModalOpen && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingRecord
                  ? "Edit Volunteer Experience"
                  : "Add Volunteer Experience"}
              </DialogTitle>
            </DialogHeader>
            <VolunteerForm
              onSubmit={handleAddVolunteer}
              initialValues={editingRecord}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingRecord(null);
              }}
              isCreatePending={isCreatePending}
              isUpdatePending={isUpdatePending}
            />
          </DialogContent>
        )}
      </Dialog>
    </TabsContent>
  );
};

export default VolunteerTab;
